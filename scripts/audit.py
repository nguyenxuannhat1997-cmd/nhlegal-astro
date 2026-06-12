# Audit toàn diện bản build dist/: link nội bộ gãy, thiếu meta, placeholder, lỗi thường gặp
import os, re, sys
from html.parser import HTMLParser

DIST = r'C:\Users\ASUS\nhlegal-astro\dist'
issues = []

# Thu thập mọi route có thật trong dist
routes = set()
for root, dirs, files in os.walk(DIST):
    for f in files:
        if f.endswith('.html'):
            rel = os.path.relpath(os.path.join(root, f), DIST).replace('\\', '/')
            if rel == '404.html':
                continue
            route = '/' + rel[:-len('index.html')].rstrip('/') if rel.endswith('index.html') else '/' + rel
            routes.add(route if route else '/')
routes.add('/')

# Redirects trong public/_redirects
redirects = set()
rp = r'C:\Users\ASUS\nhlegal-astro\public\_redirects'
if os.path.exists(rp):
    for line in open(rp, encoding='utf-8'):
        parts = line.split()
        if len(parts) >= 2 and parts[0].startswith('/'):
            redirects.add(parts[0].rstrip('/') or '/')

class LinkParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.has_title = False
        self.has_desc = False
        self.h1 = 0
        self.in_title = False
        self.title_text = ''
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'a' and a.get('href'):
            self.links.append(a['href'])
        elif tag == 'title':
            self.in_title = True
            self.has_title = True
        elif tag == 'meta' and a.get('name') == 'description' and a.get('content'):
            self.has_desc = True
        elif tag == 'h1':
            self.h1 += 1
        elif tag == 'img':
            if not a.get('alt'):
                self.links.append('__IMG_NO_ALT__' + (a.get('src') or '?'))
    def handle_endtag(self, tag):
        if tag == 'title':
            self.in_title = False
    def handle_data(self, d):
        if self.in_title:
            self.title_text += d

PLACEHOLDERS = ['đang cập nhật', 'lorem ipsum', 'TODO', 'localhost:', 'undefined', 'NaN', '[object Object]']

pages = {}
for root, dirs, files in os.walk(DIST):
    for f in files:
        if not f.endswith('.html'):
            continue
        path = os.path.join(root, f)
        rel = os.path.relpath(path, DIST).replace('\\', '/')
        html = open(path, encoding='utf-8').read()
        p = LinkParser()
        p.feed(html)
        pages[rel] = p

        if not p.has_title:
            issues.append(f'[META] {rel}: thiếu <title>')
        if not p.has_desc:
            issues.append(f'[META] {rel}: thiếu meta description')
        if p.h1 == 0:
            issues.append(f'[H1] {rel}: không có <h1>')
        elif p.h1 > 1:
            issues.append(f'[H1] {rel}: có {p.h1} thẻ <h1>')
        low = html.lower()
        for ph in PLACEHOLDERS:
            if ph.lower() in low:
                # 'undefined'/'NaN' hay xuất hiện trong JS bundle hợp lệ — chỉ soi phần body text
                if ph in ('undefined', 'NaN'):
                    body_txt = re.sub(r'<script[\s\S]*?</script>', '', html)
                    body_txt = re.sub(r'<[^>]+>', ' ', body_txt)
                    if re.search(r'\b' + re.escape(ph) + r'\b', body_txt):
                        issues.append(f'[PLACEHOLDER] {rel}: chứa "{ph}" trong nội dung')
                else:
                    issues.append(f'[PLACEHOLDER] {rel}: chứa "{ph}"')

        # Link nội bộ
        for href in p.links:
            if href.startswith('__IMG_NO_ALT__'):
                issues.append(f'[IMG-ALT] {rel}: ảnh thiếu alt: {href[14:][:60]}')
                continue
            h = href.split('#')[0].split('?')[0]
            if not h:
                continue
            if h.startswith(('http://', 'https://')):
                if 'nhlegal.com.vn' in h and 'chat-api' not in h:
                    h = re.sub(r'https?://(www\.)?nhlegal\.com\.vn', '', h) or '/'
                else:
                    continue
            if h.startswith(('mailto:', 'tel:', 'javascript:')):
                continue
            if not h.startswith('/'):
                continue
            hh = h.rstrip('/') or '/'
            if hh.startswith(('/images', '/assets', '/_astro', '/favicon', '/og-', '/robots', '/sitemap', '/fonts')):
                fs = os.path.join(DIST, hh.lstrip('/').replace('/', os.sep))
                if not os.path.exists(fs):
                    issues.append(f'[ASSET-404] {rel}: {h}')
                continue
            if hh not in routes and hh not in redirects:
                issues.append(f'[LINK-404] {rel}: link tới {h} không tồn tại')

print(f'Đã quét {len(pages)} trang HTML, {len(routes)} route.')
print(f'Phát hiện {len(issues)} vấn đề:')
seen = set()
for i in issues:
    if i not in seen:
        seen.add(i)
        print(' -', i)
