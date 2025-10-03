import pLimit from 'p-limit';
import { JSDOM } from 'jsdom';

export const limiter = pLimit(Number(process.env.CRAWL_CONCURRENCY || 4));

export async function fetchHtml(url: string, tries = 3): Promise<string> {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'W9-Migrator/1.0' } });
      if (!res.ok) throw new Error(res.status + ' ' + res.statusText);
      return await res.text();
    } catch (e) {
      if (i === tries - 1) throw e;
      await new Promise(r => setTimeout(r, 500 * (i + 1)));
    }
  }
  throw new Error('unreachable');
}

export function htmlToMdx(html: string) {
  const dom = new JSDOM(html);
  dom.window.document.querySelectorAll('script,style,noscript').forEach(n => n.remove());
  return (dom.window.document.body.textContent || '').trim();
}
