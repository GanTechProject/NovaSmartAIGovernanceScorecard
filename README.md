# NovaSmart AI Governance Studio

![NovaSmart Agent Demo](./demo.gif)

NovaSmart AI Governance Studio is an agentic AI control plane and interactive dialogue interface designed for real-time AI compliance monitoring, policy enforcement, multi-agent orchestration, and multimodal media generation.

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
