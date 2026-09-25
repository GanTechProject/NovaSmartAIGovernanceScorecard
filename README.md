# NovaSmart AI Governance Studio

<p align="center">
  <img src="https://img.shields.io/badge/Google%20Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white" alt="Google Cloud" />
  <img src="https://img.shields.io/badge/Model-Gemini%20Omni%20Flash-8E44AD?style=for-the-badge&logo=google&logoColor=white" alt="Gemini Omni Model" />
  <img src="https://img.shields.io/badge/Python-3.10%2B-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
  <img src="https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Tested%20With-Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white" alt="Playwright" />
  <img src="https://img.shields.io/badge/Status-Passing-success?style=for-the-badge&logo=githubactions&logoColor=white" alt="Build Status" />
  <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="License" />
</p>

![NovaSmart Agent Demo](./demo.gif)

## 📌 Project Overview

**NovaSmart AI Governance Studio** is a state-of-the-art agentic AI control plane and interactive dialogue studio built on Google Cloud Platform and Vertex AI. It provides enterprise teams with real-time AI compliance monitoring, policy enforcement, multi-agent orchestration visualization, and multimodal media generation powered by Google's **Gemini Omni** model (`gemini-omni-flash-preview`).

---

## 🎯 What Problem Does This Project Solve?

Modern AI agents and multi-agent swarms operate with high autonomy, creating critical enterprise governance challenges:

1. **Black-Box Agent Orchestration**: Traditional LLM chats obscure how agents delegate tasks, execute tool calls, and route requests across multi-agent pipelines.
2. **Uncontrolled Risk & Policy Violations**: Autonomous agents can issue unauthorized discounts, override safety thresholds, or bypass pricing guidelines without human confirmation.
3. **Auditability & Traceability Deficits**: Lack of real-time telemetry, structured JSON tool call traces, and persistent cloud audit logs makes regulatory compliance impossible.

---

## 💡 Key Benefits of NovaSmart AI Governance Studio

- **Full Multi-Agent Transparency**: Visualizes agent-to-agent (A2A) workflows on an interactive 6-node SVG graph showing request routing, tool calls, and supervisor escalations.
- **Human-in-the-Loop Policy Guardrails**: Automatically triggers interactive policy approval modals whenever financial or policy risk thresholds (e.g., >15% price override) are breached.
- **Seamless Multimodal Generation**: Integrates Google's Gemini Omni model to generate domain product videos, auto-persist binary artifacts to the ADK Playground panel, and upload public HTTPS video streams directly to Google Cloud Storage.
- **Zero-Latency Telemetry**: Displays live latency (ms), token usage, trace contexts, and confidence ring gauges for every dialogue turn.

---

## 📖 Comprehensive User Manual & Usage Guide

This step-by-step manual guides developers, governance officers, and administrators on how to effectively operate NovaSmart AI Governance Studio.

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        NOVASMART AI GOVERNANCE STUDIO CANVAS                            │
├──────────────────────────────┬──────────────────────────────┬──────────────────────────┤
│ 1. Presets & Controls        │ 2. Real-Time Dialogue Studio │ 3. Multi-Agent Graph     │
│  - Governance Domains        │  - Token Caret Streaming     │  - 6-Node SVG Pipeline   │
│  - Risk Threshold Sliders    │  - Confidence Ring Badges    │  - Active Pulse Traces   │
│  - Theme Palette Selectors   │  - JSON Tool Accordions      │  - Decision Popover Cards│
└──────────────────────────────┴──────────────────────────────┴──────────────────────────┘
```

### Step 1: Launching the Studio
1. Open your terminal and start the server daemon:
   ```bash
   python3 -m http.server 8080 --bind 0.0.0.0
   ```
2. Open your web browser and navigate to:
   ```text
   http://localhost:8080
   ```

---

### Step 2: Interacting with the Dialogue Studio
1. **Selecting a Domain Preset**:
   - In the left sidebar panel, click on a governance domain (e.g. *Enterprise Procurement*, *Financial Risk Mitigation*, or *Healthcare Compliance*).
   - Watch the studio automatically adjust policy threshold rules and system instruction contexts.
2. **Sending Dialogue Prompts**:
   - Type a prompt into the chat input bar at the bottom center of the canvas.
   - Click **Send** or press `Enter`.
   - Toggle the **Voice Input Microphone** icon to enable Web Audio voice feedback effects.
3. **Observing Real-Time Token Telemetry**:
   - Watch response text stream character-by-character with a blinking cursor caret.
   - Inspect the **Confidence Badge Ring** displaying model certainty scores (e.g. `98.4% Confidence`).
   - Click on **Tool Call Accordions** to expand and inspect raw JSON payloads returned by background tools.

---

### Step 3: Visualizing Multi-Agent Workflows
1. Look at the right-hand **High-Definition Workflow Map** (`1280x620` SVG canvas).
2. As requests are processed, glowing pulse animations highlight active pipeline nodes in sequence:
   - **User Query**: Incoming user prompt.
   - **Screening Agent**: Initial policy screening & risk assessment.
   - **Gemini Omni Tool Callout**: Video generation tool invocation.
   - **Supervisor Agent**: Risk escalation when policy thresholds are breached.
   - **Human Approval**: Decision popover card.
   - **Policy Guard**: Safety shield enforcing compliance limits.

---

### Step 4: Exercising Human-in-the-Loop Risk Controls
1. **Triggering a Policy Risk Escalation**:
   - Type a high-risk prompt in the dialogue input:
     ```text
     Issue an emergency 25% price override discount on server hardware order #9941.
     ```
2. **Evaluating the Decision Modal**:
   - When the financial override exceeds the 15% threshold, an interactive **Human Approval Modal Card** automatically pops up over the screen.
   - Review the detailed **Risk Score Card** (`Score: 0.94 - CRITICAL RISK`).
3. **Executing Governance Actions**:
   - Click **Approve Override** (entering mandatory audit reason notes) OR click **Reject & Enforce Guardrails** to block the transaction.

---

### Step 5: Generating Videos with Google's Gemini Omni Model
1. Type a multimodal product request into the dialogue studio:
   ```text
   Generate a short promo video for our flagship Quantum AI Server item.
   ```
2. The `generate_item_video_tool.py` ADK tool function executes:
   - Calls Google's Gemini Omni model (`gemini-omni-flash-preview`) in the `global` region.
   - Saves binary video blobs to the Playground's Artifacts panel via `tool_context.save_artifact`.
   - Uploads bytes in-memory to Google Cloud Storage (`novasmart-seed-bucket-qwiklabs-gcp-03-1405d3f8adce`).
3. View the generated video stream directly within the dialogue stream via public HTTPS player card.

---

## 🔑 Required APIs, Tools & IAM Access Permissions

To deploy and execute all features in this repository, ensure the following Google Cloud APIs, CLI tools, software libraries, and IAM roles are provisioned:

### 1. 🌐 Google Cloud APIs Required
- **Vertex AI API** (`aiplatform.googleapis.com`): Invokes the `gemini-omni-flash-preview` multimodal video generation model in the `global` region using `google-genai`.
- **Cloud Storage API** (`storage.googleapis.com`): Handles direct in-memory byte streams and uploads generated video blobs to GCS.
- **Cloud Resource Manager API** (`cloudresourcemanager.googleapis.com`): Inspects project metadata and manages bucket IAM access bindings.
- **Firestore API** (`datastore.googleapis.com` / `firestore.googleapis.com`): Indexes governance audit logs and risk scorecard history.

### 2. 🛡️ Required IAM Roles & Permissions
- **Vertex AI User** (`roles/aiplatform.user`): Granted to the executing service account/user to run predictions on Gemini Omni models.
- **Storage Object Admin** (`roles/storage.objectAdmin`) or **Creator** (`roles/storage.objectCreator`): Granted to write generated video files into the target GCS bucket.
- **Storage Object Viewer (`roles/storage.objectViewer`) for `allUsers`**: Granted on the target bucket (`gs://<YOUR_BUCKET_NAME>`) to allow public web playback of generated video streams.

### 3. 🐍 Required Python Libraries
```bash
pip install google-genai google-cloud-storage google-cloud-firestore numpy scipy
```

### 4. 📦 Required Node.js Packages
```bash
npm install playwright playwright-core ffmpeg-static
```

### 5. 🛠️ CLI & Runtime Requirements
- **`gcloud` CLI**: Google Cloud SDK for authentication (`gcloud auth application-default login`) and project configuration.
- **`Python 3.10+`**: Python runtime for running ADK tool functions and server daemons.
- **`Node.js 18+`**: JavaScript runtime for running Playwright end-to-end visual test suites.

---

## ⚡ Prerequisites

Before setting up or deploying NovaSmart AI Governance Studio, ensure you have:

1. **Google Cloud Platform Account & Project**:
   - GCP Project ID with active billing enabled.
   - Vertex AI API (`aiplatform.googleapis.com`) enabled.
   - Google Cloud Storage API enabled.
2. **GCP Cloud Storage Bucket**:
   - Public or configured GCS bucket (e.g. `novasmart-seed-bucket-qwiklabs-gcp-03-1405d3f8adce`).
3. **Local Development Tools**:
   - **Python**: Version `3.10` or higher.
   - **Node.js**: Version `18.0` or higher.
   - **Google Cloud SDK (`gcloud`)**: Installed and authenticated (`gcloud auth application-default login`).

---

## ⚙️ Post-Settings & Environment Configuration

After cloning the repository, perform the following post-settings to configure public video uploads and permissions:

### 1. Bucket IAM Public Read Configuration
Grant public object viewer access to your GCS bucket so generated media streams are publicly accessible over HTTPS:
```bash
gcloud storage buckets add-iam-policy-binding gs://<YOUR_BUCKET_NAME> \
  --member=allUsers \
  --role=roles/storage.objectViewer
```

### 2. Vertex AI Global Region Setting
Set your Google Cloud project and region variables in your environment:
```bash
export GOOGLE_CLOUD_PROJECT="<YOUR_GCP_PROJECT_ID>"
export GOOGLE_CLOUD_REGION="global"
```

### 3. Application Authentication
Initialize Application Default Credentials (ADC):
```bash
gcloud auth application-default login
```

---

## 💻 Local Setup & Run Instructions

### 1. Install Node.js Dependencies
```bash
npm install
```

### 2. Start Local Server Daemon
```bash
python3 -m http.server 8080 --bind 0.0.0.0
```

Once running, access the studio in your browser at `http://localhost:8080`.

### 3. Run Automated Playwright Verification Suite
```bash
node run_playwright_test.js
```

---

## 📁 Project Directory & File Structure

```text
novasmart-ai-governance-studio/
├── README.md                     # Comprehensive project documentation & guide
├── LICENSE                       # MIT open source license
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
