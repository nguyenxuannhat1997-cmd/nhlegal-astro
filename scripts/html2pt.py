# -*- coding: utf-8 -*-
"""HTML bài SEO -> Sanity Portable Text (type `post`).

Dùng: python scripts/html2pt.py "<file.html>" > out.json
- h1 -> title; h2/h3/h4 -> style tương ứng; p -> normal; ul/ol -> listItem;
  blockquote -> style blockquote; table -> bullet "cell — cell"; strong/em/a -> marks.
- div.answer-box -> answerBox custom type (ô teal trái)
- div.cta-box -> ctaBox custom type (heading + checklist + contact)
- img -> imageExt {url, alt, caption} trỏ https://nhlegal.com.vn/images/blog/<tên>.webp
  (ảnh có "featured" trong tên bị bỏ qua — đó là ảnh bìa, dùng coverImageUrl);
  figcaption -> caption của ảnh liền trước.
- Bỏ qua: style/script/nav/header/footer.
"""
import sys, re, json, secrets, io
from html.parser import HTMLParser

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

def key():
    return secrets.token_hex(6)

SKIP = {"style", "script", "nav", "footer", "svg",
        "head", "title", "meta", "link", "form", "button", "iframe"}
IMG_BASE = "https://nhlegal.com.vn/images/blog/"
HEADINGS = {"h2": "h2", "h3": "h3", "h4": "h4", "h5": "h4"}

class PT(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.blocks = []
        self.title = ""
        self.meta_desc = ""
        self.skip_depth = 0
        self.in_h1 = False
        self.cur = None
        self.marks = []
        self.markdefs = []
        self.list_stack = []
        self.in_blockquote = False
        self.cells = None
        self.cell_buf = None
        # answer-box
        self.in_answer_box = False
        self.answer_box_start = 0
        # cta-box
        self.in_cta_box = False
        self.cta_heading = ""
        self.cta_items = []
        self.cta_contact = []
        self.in_cta_heading = False
        self.in_cta_item = False
        self.cta_item_buf = ""
        self.in_cta_contact = False
        self.cta_contact_buf = ""
        # figure/figcaption
        self.in_figcaption = False
        self.figcaption_buf = ""

    # ---------- helpers ----------
    def open_block(self, style, list_item=None):
        self.close_block()
        b = {"_type": "block", "_key": key(), "style": style, "markDefs": [], "children": []}
        if list_item:
            b["listItem"] = list_item
            b["level"] = 1
        self.cur = b
        self.markdefs = []

    def close_block(self):
        if self.cur is None:
            return
        ch = [c for c in self.cur["children"] if c["text"].strip().strip("\x00")]
        if ch:
            for c in ch:
                c["text"] = re.sub(r"\s+", " ", c["text"]).replace("\x00", "\n")
            ch[0]["text"] = ch[0]["text"].lstrip()
            ch[-1]["text"] = ch[-1]["text"].rstrip()
            self.cur["children"] = ch
            self.cur["markDefs"] = self.markdefs
            self.blocks.append(self.cur)
        self.cur = None
        self.markdefs = []

    def span(self, text):
        if self.cur is None:
            if not text.strip():
                return
            self.open_block("normal")
        self.cur["children"].append({"_type": "span", "_key": key(), "text": text, "marks": list(self.marks)})

    # ---------- parser ----------
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "meta" and a.get("name") == "description":
            self.meta_desc = a.get("content", "")
        if tag in SKIP:
            if tag not in ("meta", "link", "br"):
                self.skip_depth += 1
            return
        if self.skip_depth:
            return

        if tag == "img":
            src = (a.get("src") or "").split("?")[0]
            name = src.replace("\\", "/").rsplit("/", 1)[-1]
            if not name or "featured" in name.lower():
                return  # ảnh bìa: dùng coverImageUrl, không chèn vào body
            name = re.sub(r"\.(png|jpe?g)$", ".webp", name, flags=re.I)
            self.close_block()
            self.blocks.append({
                "_type": "imageExt", "_key": key(),
                "url": IMG_BASE + name, "alt": a.get("alt", ""), "caption": "",
            })
            return
        if tag == "figure":
            return
        if tag == "figcaption":
            self.in_figcaption = True
            self.figcaption_buf = ""
            return

        # Detect special div types
        if tag == "div":
            cls = a.get("class", "")
            if "answer-box" in cls:
                self.in_answer_box = True
                self.answer_box_start = len(self.blocks)
            elif "cta-box" in cls:
                self.in_cta_box = True
                self.cta_heading = ""
                self.cta_items = []
                self.cta_contact = []
            # all other divs: pass through (table-responsive, etc.)
            return

        # Inside cta-box: collect structured data, don't touch blocks
        if self.in_cta_box:
            if tag == "h3":
                self.in_cta_heading = True
            elif tag == "li":
                self.in_cta_item = True
                self.cta_item_buf = ""
            elif tag == "p":
                cls = a.get("class", "")
                if "cta-contact" in cls:
                    self.in_cta_contact = True
                    self.cta_contact_buf = ""
            elif tag == "br" and self.in_cta_contact:
                if self.cta_contact_buf.strip():
                    self.cta_contact.append(self.cta_contact_buf.strip())
                self.cta_contact_buf = ""
            # strong/em/a inside cta-box: skip marks, just capture text via handle_data
            return

        if tag == "h1":
            self.in_h1 = True
            return
        if tag in HEADINGS:
            self.open_block(HEADINGS[tag])
        elif tag == "p":
            if self.cells is not None:
                return
            if not self.in_blockquote and not self.list_stack:
                self.open_block("normal")
        elif tag == "blockquote":
            self.in_blockquote = True
            self.open_block("blockquote")
        elif tag in ("ul", "ol"):
            self.close_block()
            self.list_stack.append("bullet" if tag == "ul" else "number")
        elif tag == "li":
            self.open_block("normal", list_item=self.list_stack[-1] if self.list_stack else "bullet")
        elif tag == "tr":
            self.cells = []
        elif tag in ("td", "th"):
            self.cell_buf = []
        elif tag in ("strong", "b"):
            self.marks.append("strong")
        elif tag in ("em", "i"):
            self.marks.append("em")
        elif tag == "a" and a.get("href"):
            href = a["href"]
            if href.startswith("#"):
                return
            if href.startswith("/"):
                href = "https://nhlegal.com.vn" + href
            # Link nội bộ dạng nhlegal.com.vn/<slug> (1 cấp, không phải trang tĩnh)
            # là link bài viết → tự thêm tiền tố /bai-viet/
            m = re.match(r"^https://nhlegal\.com\.vn/([^/]+)/?$", href)
            if m and m.group(1) not in (
                "bai-viet", "dich-vu", "bang-gia", "gioi-thieu", "lien-he",
                "tai-lieu", "chinh-sach-bao-mat", "dieu-khoan-su-dung",
            ):
                href = "https://nhlegal.com.vn/bai-viet/" + m.group(1)
            mk = key()
            self.markdefs.append({"_type": "link", "_key": mk, "href": href})
            self.marks.append(mk)
        elif tag == "br":
            # Dùng sentinel \x00 để sống sót qua bước gộp khoảng trắng ở close_block,
            # sau đó đổi thành \n thật (renderer dùng white-space: pre-line)
            if self.cur and self.cur["children"]:
                self.cur["children"][-1]["text"] += "\x00"

    def handle_endtag(self, tag):
        if tag in SKIP and tag not in ("img", "meta", "link", "br"):
            self.skip_depth = max(0, self.skip_depth - 1)
            return
        if self.skip_depth:
            return

        if tag == "div":
            if self.in_answer_box:
                self.close_block()
                body = self.blocks[self.answer_box_start:]
                self.blocks = self.blocks[:self.answer_box_start]
                if body:
                    self.blocks.append({"_type": "answerBox", "_key": key(), "body": body})
                self.in_answer_box = False
            elif self.in_cta_box:
                # save any pending contact line
                if self.in_cta_contact and self.cta_contact_buf.strip():
                    self.cta_contact.append(self.cta_contact_buf.strip())
                self.in_cta_contact = False
                self.blocks.append({
                    "_type": "ctaBox", "_key": key(),
                    "heading": self.cta_heading.strip(),
                    "items": [i for i in self.cta_items if i.strip()],
                    "contact": [c for c in self.cta_contact if c.strip()],
                })
                self.in_cta_box = False
            return

        # End-tags inside cta-box
        if self.in_cta_box:
            if tag == "h3":
                self.in_cta_heading = False
            elif tag == "li":
                if self.cta_item_buf.strip():
                    self.cta_items.append(self.cta_item_buf.strip())
                self.in_cta_item = False
                self.cta_item_buf = ""
            elif tag == "p" and self.in_cta_contact:
                if self.cta_contact_buf.strip():
                    self.cta_contact.append(self.cta_contact_buf.strip())
                self.cta_contact_buf = ""
                self.in_cta_contact = False
            return

        if tag == "figcaption":
            cap = re.sub(r"\s+", " ", self.figcaption_buf).strip()
            if cap and self.blocks and self.blocks[-1].get("_type") == "imageExt":
                self.blocks[-1]["caption"] = cap
            self.in_figcaption = False
            self.figcaption_buf = ""
            return

        if tag == "h1":
            self.in_h1 = False
        elif tag in HEADINGS or tag == "p":
            if self.cells is None and not self.in_blockquote and not self.list_stack:
                self.close_block()
        elif tag == "blockquote":
            self.close_block()
            self.in_blockquote = False
        elif tag in ("ul", "ol"):
            self.close_block()
            if self.list_stack:
                self.list_stack.pop()
        elif tag == "li":
            self.close_block()
        elif tag in ("td", "th"):
            if self.cells is not None and self.cell_buf is not None:
                txt = re.sub(r"\s+", " ", "".join(self.cell_buf)).strip()
                if txt:
                    self.cells.append(txt)
            self.cell_buf = None
        elif tag == "tr":
            if self.cells:
                self.open_block("normal", list_item="bullet")
                self.span(" — ".join(self.cells))
                self.close_block()
            self.cells = None
        elif tag in ("strong", "b"):
            if "strong" in self.marks:
                self.marks.remove("strong")
        elif tag in ("em", "i"):
            if "em" in self.marks:
                self.marks.remove("em")
        elif tag == "a":
            self.marks = [m for m in self.marks if m in ("strong", "em")]

    def handle_data(self, data):
        data = data.replace("﻿", "")  # bỏ BOM lạc trong nội dung
        if self.skip_depth:
            return
        if self.in_figcaption:
            self.figcaption_buf += data
            return
        if self.in_h1:
            self.title += data
            return
        if self.in_cta_box:
            if self.in_cta_heading:
                self.cta_heading += data
            elif self.in_cta_item:
                self.cta_item_buf += data
            elif self.in_cta_contact:
                self.cta_contact_buf += data
            return
        if self.cell_buf is not None:
            self.cell_buf.append(data)
            return
        if not data.strip() and self.cur is None:
            return
        self.span(data)

if __name__ == "__main__":
    src = sys.argv[1]
    html = open(src, encoding="utf-8").read()
    p = PT()
    p.feed(html)
    p.close_block()
    out = {
        "title": re.sub(r"\s+", " ", p.title).strip(),
        "excerpt": p.meta_desc.strip(),
        "blockCount": len(p.blocks),
        "body": p.blocks,
    }
    print(json.dumps(out, ensure_ascii=False))
