# NovaSmart AI Governance Studio

![NovaSmart Agent Demo](./demo.gif)

NovaSmart AI Governance Studio is an agentic AI control plane and interactive dialogue interface designed for real-time AI compliance monitoring, policy enforcement, multi-agent orchestration, and multimodal media generation.

---

## 📁 Project Directory & File Structure

```text
novasmart-ai-governance-studio/
├── README.md                     # Comprehensive project documentation & guide
├── demo.gif                      # Optimized looping demo video recording
├── index.html                    # Main glassmorphic dialogue UI application
├── index.css                     # Glassmorphism design tokens, theme palettes & animations
├── app.js                        # Token streaming engine, audio synthesizer & workflow graph
├── avatar.png                    # Brand avatar asset for NovaSmart AI agent
├── generate_item_video_tool.py   # ADK tool for Gemini Omni video generation & GCS upload
├── start_server_daemon.py        # Python HTTP server daemon script
├── record_agent_demo.js          # Playwright script for automated video demo recording
├── run_playwright_test.js        # End-to-end automated UI verification test suite
├── package.json                  # Node.js project manifest & dependencies
├── package-lock.json             # Locked dependency versions (Playwright, ffmpeg-static)
├── .gitignore                    # Git ignore file excluding build and temporary assets
├── tools/                        # ADK Python tools directory
│   └── generate_item_video_tool.py
├── scripts/                      # Utility and automation scripts
│   ├── start_server_daemon.py
│   ├── record_agent_demo.js
│   └── run_playwright_test.js
└── assets/                       # Media and visual assets
    ├── avatar.png
    └── demo.gif
```

### Detailed File & Directory Descriptions

- **`index.html`**: Main entry point for the glassmorphic Dialogue Studio layout, housing the three-column resizable canvas, preset selector, chat stream feed, 6-node SVG graph container, and decision modal overlay.
- **`index.css`**: Design system CSS containing custom variable tokens (`--glass-bg`, `--accent-primary`, `--radius-lg`), themes (NovaSmart, Cyberpunk, Emerald, Sunset), and micro-animations.
- **`app.js`**: Core frontend engine powering real-time token streaming, confidence ring gauges, expandable tool accordions, SVG A2A node graph renderer, and Web Audio spatial sound engine.
- **`generate_item_video_tool.py` / `tools/generate_item_video_tool.py`**: ADK Python tool function `generate_item_video` invoking Google's Omni model (`gemini-omni-flash-preview`) in the `global` region, saving artifacts to the Playground panel via `tool_context.save_artifact`, and uploading bytes directly to GCS.
- **`start_server_daemon.py` / `scripts/start_server_daemon.py`**: Daemon script for serving static application files locally on port 8080.
- **`record_agent_demo.js` / `scripts/record_agent_demo.js`**: Playwright automation script for recording HD interactive agent sessions.
- **`run_playwright_test.js` / `scripts/run_playwright_test.js`**: Comprehensive visual test suite verifying UI load, preset switching, graph rendering, and modal popups with zero console errors.
- **`demo.gif` / `assets/demo.gif`**: High-quality 12 FPS looping GIF demonstrating real-time AI governance streaming and workflow visualization.
- **`avatar.png` / `assets/avatar.png`**: Glowing avatar branding image for NovaSmart AI Agent.

---

## 🚀 Key Features & Implemented Capabilities

The application implements the following verified features and Google Cloud service integrations based on repository code:

### 1. 🎥 Multimodal Video Generation Tool (`generate_item_video_tool.py`)
- **Model**: Google Omni Model (`gemini-omni-flash-preview`) operating in the `global` region via Vertex AI (`google-genai` SDK).
- **Playground Artifact Integration**: Uses `tool_context.save_artifact` to save generated video binary blobs directly to the Playground's Artifacts panel.
- **Direct Cloud Storage Upload**: Uploads generated video bytes in-memory using `google.cloud.storage.Client()` to the public Cloud Storage bucket (`novasmart-seed-bucket-qwiklabs-gcp-03-1405d3f8adce`) without writing to local disk, returning a public HTTPS URL (`https://storage.googleapis.com/novasmart-seed-bucket-qwiklabs-gcp-03-1405d3f8adce/videos/...`).

### 2. 🕸️ High-Definition Multi-Agent Workflow Map
- Interactive 6-node SVG graph (`1280x620` resolution) visualizing the complete Agent-to-Agent (A2A) orchestration pipeline:
  1. `User Query`: Initial user prompt input.
  2. `Agent 1 (Screening)`: Evaluates prompt safety & policy threshold rules.
  3. `Tool Callout`: Executes `generate_item_video` tool.
  4. `Supervisor Agent 2`: Escalation trigger when policy thresholds are breached.
  5. `Human Approval`: Human-in-the-Loop decision popover modal card.
  6. `Policy Guard`: Security shield defense against unauthorized overrides.

### 3. 💬 Real-Time Token Streaming & Dialogue Engine
- Modern glassmorphic design system supporting real-time caret streaming, confidence score ring badges, and interactive tool trace accordions with raw JSON payload inspection.

### 4. 🔊 Spatial Web Audio Synthesizer & Voice Input
- Web Audio synthesizer engine (`SoundEngine`) providing spatial audio feedback for UI events and microphone voice state toggling.

---

## 🛠️ Google Cloud Services & Tools Status

| Service / Tool | Status | Details |
|---|---|---|
| **Google Cloud Storage (GCS)** | `Implemented` | Direct in-memory byte upload to public bucket `novasmart-seed-bucket-qwiklabs-gcp-03-1405d3f8adce`. |
| **Vertex AI / Gemini Omni Model** | `Implemented` | `gemini-omni-flash-preview` model in `global` region via `client.interactions.create`. |
| **ADK Artifact Service** | `Implemented` | Binary artifact persistence using `tool_context.save_artifact`. |
| **Google Agents CLI & ADK** | `Implemented` | Agent Development Kit tool function definitions. |
| **Firestore Audit Logging** | `Planned, not yet implemented` | Firestore project reference hardcoded; live Firestore SDK integration planned for v2.0. |
| **Memory Bank (Long-term Knowledge)** | `Planned, not yet implemented` | Cross-session memory bank integration planned for future release. |

---

## 💻 Local Setup & Run Instructions

To run NovaSmart AI Governance Studio on your local machine, follow these setup commands:

### 1. Prerequisites
Ensure Python 3.10+ and Node.js 18+ are installed.

### 2. Environment Configuration
Set up your Google Cloud project credentials:
```bash
gcloud auth application-default login
export GOOGLE_CLOUD_PROJECT="qwiklabs-gcp-03-1405d3f8adce"
```

### 3. Start Local HTTP Server
Start the local server daemon:
```bash
python3 -m http.server 8080 --bind 0.0.0.0
```

Once running, access the studio in your browser at the local server address on port `8080` (e.g., localhost on port 8080).

### 4. Run Automated Playwright Verification
To execute the automated end-to-end browser test suite:
```bash
node run_playwright_test.js
```
