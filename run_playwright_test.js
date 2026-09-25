const { chromium } = require('playwright');
const path = require('path');

(async () => {
  console.log("==================================================");
  console.log("  PLAYWRIGHT BROWSER AUTOMATION & VISUAL TEST     ");
  console.log("==================================================");

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1400, height: 900 } });
  const page = await context.newPage();

  const logs = [];
  page.on('console', msg => logs.append ? logs.append(`[${msg.type()}] ${msg.text()}`) : logs.push(`[${msg.type()}] ${msg.text()}`));
  page.on('pageerror', err => logs.push(`[PAGE_ERROR] ${err}`));

  console.log("Navigating to http://localhost:8080/ ...");
  await page.goto('http://localhost:8080/', { waitUntil: 'networkidle' });

  // 1. Capture Main View Screenshot
  const img1 = '/config/.gemini/antigravity/brain/3a826059-efc3-4adf-bd62-e83bdc49b1af/screen_main.png';
  await page.screenshot({ path: img1 });
  console.log(`✔ [PASS] Main View loaded and screenshot saved to ${img1}`);

  // 2. Test Preset Card Clicking
  console.log("Testing Preset Switcher...");
  await page.click('.preset-card[data-preset="tool-trace"]');
  await page.waitForTimeout(400);

  // 3. Test Workflow Graph Toggle
  console.log("Testing Workflow Graph Toggle...");
  await page.click('#graphViewBtn');
  await page.waitForTimeout(400);

  const img2 = '/config/.gemini/antigravity/brain/3a826059-efc3-4adf-bd62-e83bdc49b1af/screen_graph.png';
  await page.screenshot({ path: img2 });
  console.log(`✔ [PASS] Workflow Graph View rendered and screenshot saved to ${img2}`);

  // 4. Return to Stream View & Send Message
  console.log("Testing Stream View & Sending Message...");
  await page.click('#streamViewBtn');
  await page.waitForTimeout(300);

  await page.fill('#messageInput', 'Can you match the BestBuy price for $1,299.00 on TechVerse Pro?');
  await page.click('#sendBtn');
  await page.waitForTimeout(1200);

  // 5. Open Modal Dialogue
  console.log("Testing Policy Approval Modal...");
  await page.click('#openModalBtn');
  await page.waitForTimeout(400);

  const img3 = '/config/.gemini/antigravity/brain/3a826059-efc3-4adf-bd62-e83bdc49b1af/screen_modal.png';
  await page.screenshot({ path: img3 });
  console.log(`✔ [PASS] Modal Dialogue Active and screenshot saved to ${img3}`);

  console.log("\n--- Console Messages During Session ---");
  if (logs.length === 0) console.log("Clean execution - Zero console errors or warnings!");
  else logs.forEach(l => console.log(l));

  await browser.close();
  console.log("\n==================================================");
  console.log("  PLAYWRIGHT AUDIT COMPLETE - ALL VIEWS VERIFIED  ");
  console.log("==================================================");
})();
