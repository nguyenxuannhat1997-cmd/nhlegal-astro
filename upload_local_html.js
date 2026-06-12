import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';
import crypto from 'crypto';

// 1. Mock browser environment
const dom = new JSDOM();
global.window = dom.window;
global.document = dom.window.document;
global.DOMParser = dom.window.DOMParser;
global.Node = dom.window.Node;

// Modern Node has global.crypto, but if not we can add it safely.
// If it is there, getRandomValues is already defined on it.
if (typeof global.crypto === 'undefined') {
  Object.defineProperty(global, 'crypto', {
    value: {
      getRandomValues(arr) {
        return crypto.randomBytes(arr.length);
      }
    },
    writable: true,
    configurable: true
  });
}

// Import the updated HTML parser
import { parseHtmlToPortableText } from '../nh-legal-website/studio/components/htmlParser.js';

const client = createClient({
  projectId: 'te8s7pep',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'skUvYIWIJNooXt1ZrKwLjd19art2Aru8OC4yNYS1td42vJm0UKdt30DdWdHQIZfSPZgISxmgxSWGb7yJr',
});

const DESKTOP_SEO_DIR = "c:/Users/ASUS/Desktop/Bài viết SEO";

const POSTS_TO_UPDATE = [
  {
    id: "3811c33b-63f1-4964-9901-40bc470a09cb", // ly-hon
    htmlFile: "ly-hon-don-phuong-mat-bao-lau.html",
    coverFile: "ly-hon-don-phuong-mat-bao-lau-featured.png",
    inlineImages: {
      "quy-trinh-ly-hon-don-phuong-mat-bao-lau.webp": "quy-trinh-ly-hon-don-phuong-mat-bao-lau.png",
      "chi-phi-ly-hon-don-phuong-2026.webp": "chi-phi-ly-hon-don-phuong-2026.png"
    }
  },
  {
    id: "fcaf92f1-2bfe-4060-9d15-10c90fea0a26", // chu-cu
    htmlFile: "chu-cu-da-mat-dat-giay-tay-co-lam-duoc-so-do-khong.html",
    coverFile: "chu-cu-da-mat-dat-giay-tay-featured.png",
    inlineImages: {
      "quy-trinh-cap-so-do-chu-cu-da-mat.webp": "quy-trinh-cap-so-do-chu-cu-da-mat.png",
      "chi-phi-hop-thuc-hoa-chu-cu-da-mat.webp": "chi-phi-hop-thuc-hoa-chu-cu-da-mat.png"
    }
  }
];

async function uploadImage(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`Image not found at path: ${filePath}`);
    return null;
  }
  const fileStream = fs.createReadStream(filePath);
  const asset = await client.assets.upload('image', fileStream, {
    filename: path.basename(filePath)
  });
  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: asset._id }
  };
}

async function processPost(config) {
  console.log(`\nProcessing post ID: ${config.id}...`);
  const htmlPath = path.join(DESKTOP_SEO_DIR, config.htmlFile);
  if (!fs.existsSync(htmlPath)) {
    console.log(`HTML file not found at path: ${htmlPath}`);
    return;
  }

  // 1. Parse HTML
  const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
  const parsed = parseHtmlToPortableText(htmlContent);
  console.log(`Parsed HTML successfully. Found ${parsed.blockCount} blocks.`);

  // 2. Upload Cover Image if it exists
  let coverImageObj = null;
  if (config.coverFile) {
    const coverPath = path.join(DESKTOP_SEO_DIR, config.coverFile);
    console.log(`Uploading cover image: ${config.coverFile}...`);
    coverImageObj = await uploadImage(coverPath);
  }

  // 3. Process Body Blocks — upload inline images
  const processedBody = [];
  for (const block of parsed.body) {
    if (block._type === 'imageExt') {
      const urlFilename = block.url.split('/').pop(); // e.g. "quy-trinh-ly-hon-don-phuong-mat-bao-lau.webp"
      const localFilename = config.inlineImages[urlFilename]; // e.g. "quy-trinh-ly-hon-don-phuong-mat-bao-lau.png"
      
      if (localFilename) {
        const localImagePath = path.join(DESKTOP_SEO_DIR, localFilename);
        console.log(`Uploading inline image: ${localFilename}...`);
        const imgAsset = await uploadImage(localImagePath);
        if (imgAsset) {
          processedBody.push({
            ...imgAsset,
            _key: block._key,
            alt: block.alt || '',
            caption: block.caption || '',
          });
          continue;
        }
      }
    }
    processedBody.push(block);
  }

  // 4. Estimate read time
  const wordCount = processedBody
    .filter((b) => b._type === 'block')
    .flatMap((b) => b.children || [])
    .map((c) => c.text || '')
    .join(' ')
    .split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  // 5. Update post in Sanity
  const data = {
    title: parsed.title,
    body: processedBody,
    readTime,
    excerpt: parsed.excerpt,
    coverImageUrl: parsed.coverImageUrl
  };
  if (coverImageObj) {
    data.coverImage = coverImageObj;
  }

  console.log('Updating Sanity database...');
  await client.patch(config.id).set(data).commit();
  console.log('Published version updated!');

  const draft = await client.getDocument(`drafts.${config.id}`);
  if (draft) {
    await client.patch(`drafts.${config.id}`).set(data).commit();
    console.log('Draft version updated!');
  }
}

async function run() {
  for (const config of POSTS_TO_UPDATE) {
    await processPost(config);
  }
  console.log('\nAll posts updated in Sanity!');
}

run().catch(console.error);
