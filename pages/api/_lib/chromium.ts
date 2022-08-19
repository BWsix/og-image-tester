import core from "puppeteer-core";
import { getOptions } from "./options";
import { FileType } from "./types";
let _page: core.Page | null;

async function getPage(isDev: boolean) {
  if (_page) {
    return _page;
  }
  const options = await getOptions(isDev);
  const browser = await core.launch(options);
  _page = await browser.newPage();
  return _page;
}

export async function getScreenshot(
  id: string,
  type: FileType,
  isDev: boolean
) {
  const page = await getPage(isDev);
  await page.setViewport({ width: 1980, height: 1080 });
  await page.goto(
    `https://www.clhs.tyc.edu.tw/ischool/public/news_view/show.php?nid=${id}`
  );
  const file = await page.screenshot({ type });
  return file;
}
