const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const artifactDir = '/config/.gemini/antigravity/brain/3a826059-efc3-4adf-bd62-e83bdc49b1af';
  const videoDir = path.join(artifactDir, 'video_temp');
  if (!fs.existsSync(videoDir)) {
    fs.mkdirSync(videoDir, { recursive: true });
  }

  console.log('Launching Playwright Chromium with 1280x720 video recording...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: {
      dir: videoDir,
      size: { width: 1280, height: 720 }
    }
  });

  const page = await context.newPage();
  console.log('Navigating to http://localhost:8080/ ...');
  await page.goto('http://localhost:8080/');
  await page.waitForTimeout(1500);

  // Take initial screenshot
  await page.screenshot({ path: path.join(artifactDir, 'demo_step1_initial.png') });

  // 1. Send first prompt: Core AI Governance compliance evaluation
  console.log('Sending Prompt 1: Core AI Governance compliance evaluation...');
  const input = page.locator('#messageInput');
  await input.click();
  await input.type('Evaluate real-time AI compliance and safety rules for NovaSmart 4K Ultra TV', { delay: 35 });
  await page.waitForTimeout(500);
  await page.click('#sendBtn');

  // Wait for stream & tool trace accordion to render
  await page.waitForTimeout(3500);

  // 2. Switch to Workflow Graph view
  console.log('Switching to Multi-Agent Workflow Graph...');
  await page.click('#graphViewBtn');
  await page.waitForTimeout(2200);
  await page.screenshot({ path: path.join(artifactDir, 'demo_step2_workflow_graph.png') });

  // Hover over SVG graph nodes
  const svg = page.locator('#nodeGraphSVG');
  await svg.hover();
  await page.waitForTimeout(1500);

  // Switch back to Stream view
  await page.click('#streamViewBtn');
  await page.waitForTimeout(1500);

  // 3. Send second, richer prompt: Tool call, Omni video model & Firestore database lookup
  console.log('Sending Prompt 2: Rich prompt with tool call, Google Omni video model & Firestore lookup...');
  await input.click();
  await input.type('Execute generate_item_video tool for "NovaSmart 4K Ultra TV" using Google Omni model (gemini-omni-flash-preview) in global region & query Firestore audit log', { delay: 25 });
  await page.waitForTimeout(500);
  await page.click('#sendBtn');

  // Wait for second stream response & tool accordion to render
  await page.waitForTimeout(4000);

  // Interact with tool accordion if present
  const toolAccordion = page.locator('.tool-accordion-header').first();
  if (await toolAccordion.count() > 0) {
    await toolAccordion.click();
    await page.waitForTimeout(1500);
  }

  // Click microphone button to demonstrate voice audio state
  console.log('Toggling microphone audio input...');
  await page.click('#micBtn');
  await page.waitForTimeout(1500);
  await page.click('#micBtn');
  await page.waitForTimeout(1000);

  // Open Modal Popup to show policy governance override card
  console.log('Opening Modal Popup dialogue...');
  await page.click('#openModalBtn');
  await page.waitForTimeout(2200);
  await page.screenshot({ path: path.join(artifactDir, 'demo_step3_tool_video_call.png') });

  await page.click('#closeModalBtn');
  await page.waitForTimeout(1500);

  // Close context to finalize video recording file
  const videoObj = page.video();
  let videoPath = null;
  if (videoObj) {
    videoPath = await videoObj.path();
  }

  await context.close();
  await browser.close();

  console.log('Recorded raw video path:', videoPath);

  // Copy recorded webm video to artifact destination
  const targetVideoPath = path.join(artifactDir, 'agent_demo_recording.webm');
  if (videoPath && fs.existsSync(videoPath)) {
    fs.copyFileSync(videoPath, targetVideoPath);
    console.log('✔ Final video artifact successfully saved to:', targetVideoPath);
  } else {
    console.log('Warning: Raw video file not found directly, checking videoDir...');
    const files = fs.readdirSync(videoDir);
    if (files.length > 0) {
      fs.copyFileSync(path.join(videoDir, files[0]), targetVideoPath);
      console.log('✔ Saved video artifact from videoDir to:', targetVideoPath);
    }
  }
})();
