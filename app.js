// NovaSmart AI Dialogue Studio - Advanced UI Engine

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const chatHistory = document.getElementById('chatHistory');
  const messageInput = document.getElementById('messageInput');
  const sendBtn = document.getElementById('sendBtn');
  const clearChatBtn = document.getElementById('clearChatBtn');
  const micBtn = document.getElementById('micBtn');

  // Customizer Controls
  const blurRange = document.getElementById('blurRange');
  const blurVal = document.getElementById('blurVal');
  const radiusRange = document.getElementById('radiusRange');
  const radiusVal = document.getElementById('radiusVal');
  const glowRange = document.getElementById('glowRange');
  const glowVal = document.getElementById('glowVal');
  const showToolsToggle = document.getElementById('showToolsToggle');
  const animToggle = document.getElementById('animToggle');

  // Modal Controls
  const modalBackdrop = document.getElementById('modalBackdrop');
  const openModalBtn = document.getElementById('openModalBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalApproveBtn = document.getElementById('modalApproveBtn');
  const modalRejectBtn = document.getElementById('modalRejectBtn');

  // Theme, Presets & View Controls
  const themeBtns = document.querySelectorAll('.theme-btn');
  const presetCards = document.querySelectorAll('.preset-card');
  const cssInspector = document.getElementById('cssInspector');
  const exportBtn = document.getElementById('exportBtn');
  const streamViewBtn = document.getElementById('streamViewBtn');
  const graphViewBtn = document.getElementById('graphViewBtn');
  const graphContainer = document.getElementById('graphContainer');
  const soundToggleBtn = document.getElementById('soundToggleBtn');

  // Initial State
  let currentPreset = 'multi-agent';
  let showTools = true;
  let isRecording = false;
  let soundEnabled = true;

  // =========================================================================
  // FEATURE 7: Spatial Micro-Audio Synthesizer (Web Audio API)
  // =========================================================================
  class SoundEngine {
    constructor() {
      this.ctx = null;
    }

    init() {
      if (!this.ctx && typeof AudioContext !== 'undefined') {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      }
    }

    play(type) {
      if (!soundEnabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'send') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(350, now);
        osc.frequency.exponentialRampToValueAtTime(700, now + 0.12);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'modal') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.setValueAtTime(650, now + 0.08);
        osc.frequency.setValueAtTime(780, now + 0.16);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.28);
        osc.start(now);
        osc.stop(now + 0.28);
      } else if (type === 'tool') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.1);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      }
    }
  }

  const audioSynth = new SoundEngine();

  soundToggleBtn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    soundToggleBtn.innerText = soundEnabled ? '🔊 Sound On' : '🔇 Sound Off';
    audioSynth.play('click');
  });

  // =========================================================================
  // FEATURE 6: Resizable Glass Panels Engine
  // =========================================================================
  function initResizers() {
    const resizerLeft = document.getElementById('resizerLeft');
    const resizerRight = document.getElementById('resizerRight');
    const sidebarLeft = document.getElementById('sidebarLeft');
    const sidebarRight = document.getElementById('sidebarRight');

    function makeResizable(resizer, targetPanel, isLeft) {
      let startX, startWidth;

      resizer.addEventListener('mousedown', (e) => {
        e.preventDefault();
        startX = e.clientX;
        startWidth = targetPanel.offsetWidth;
        resizer.classList.add('dragging');

        function onMouseMove(moveEvent) {
          const dx = moveEvent.clientX - startX;
          const newWidth = isLeft ? startWidth + dx : startWidth - dx;
          if (newWidth > 200 && newWidth < 500) {
            targetPanel.style.width = `${newWidth}px`;
          }
        }

        function onMouseUp() {
          resizer.classList.remove('dragging');
          window.removeEventListener('mousemove', onMouseMove);
          window.removeEventListener('mouseup', onMouseUp);
        }

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
      });
    }

    if (resizerLeft && sidebarLeft) makeResizable(resizerLeft, sidebarLeft, true);
    if (resizerRight && sidebarRight) makeResizable(resizerRight, sidebarRight, false);
  }

  initResizers();

  // =========================================================================
  // FEATURE 1: ENLARGED & HIGH-DEFINITION MULTI-AGENT NODE GRAPH
  // =========================================================================
  function renderWorkflowGraph() {
    const svg = document.getElementById('nodeGraphSVG');
    if (!svg) return;

    svg.setAttribute('viewBox', '0 0 1280 620');
    svg.innerHTML = `
      <defs>
        <!-- Arrowhead Marker -->
        <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#818cf8"/>
        </marker>
        <marker id="redArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444"/>
        </marker>

        <!-- Gradient Line -->
        <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#6366f1" />
          <stop offset="50%" stop-color="#06b6d4" />
          <stop offset="100%" stop-color="#a855f7" />
        </linearGradient>
      </defs>

      <!-- Connecting Paths with Arrows -->
      <path class="graph-edge" d="M 170 180 L 300 180" stroke="url(#primaryGradient)" stroke-width="3.5" marker-end="url(#arrow)"/>
      <path class="graph-edge" d="M 420 180 L 540 180" stroke="#06b6d4" stroke-width="3.5" marker-end="url(#arrow)"/>
      <path class="graph-edge" d="M 740 180 L 860 180" stroke="#a855f7" stroke-width="3.5" marker-end="url(#arrow)"/>
      <path class="graph-edge" d="M 980 180 L 1110 180" stroke="#10b981" stroke-width="3.5" marker-end="url(#arrow)"/>
      <path class="graph-edge" d="M 360 240 L 540 470" stroke="#ef4444" stroke-width="3.5" marker-end="url(#redArrow)"/>

      <!-- Node 1: User Request -->
      <g class="graph-node" onclick="alert('Step 1: User Prompt Received\nQuery: TechVerse Pro Price Match ($1,299.00)\nSKU: TVP-9082')">
        <circle cx="110" cy="180" r="54" fill="#1e1b4b" stroke="#6366f1" stroke-width="3"/>
        <text x="110" y="188" text-anchor="middle" fill="#fff" font-size="28">👤</text>
        <rect x="35" y="248" width="150" height="34" rx="17" fill="rgba(99, 102, 241, 0.2)" stroke="#6366f1" stroke-width="1.5"/>
        <text x="110" y="270" text-anchor="middle" fill="#f8fafc" font-size="14" font-weight="800">1. User Query</text>
      </g>

      <!-- Node 2: Agent 1 Screening -->
      <g class="graph-node" onclick="alert('Step 2: Agent 1 Screening\nPrompt Evaluation: PASSED\nConfidence: 98.2%\nTarget: BestBuy SKU TVP-9082')">
        <circle cx="360" cy="180" r="58" fill="#0f2942" stroke="#06b6d4" stroke-width="3.5"/>
        <text x="360" y="188" text-anchor="middle" fill="#fff" font-size="30">🤖</text>
        <rect x="270" y="250" width="180" height="38" rx="19" fill="rgba(6, 182, 212, 0.2)" stroke="#06b6d4" stroke-width="1.5"/>
        <text x="360" y="274" text-anchor="middle" fill="#a5f3fc" font-size="14" font-weight="800">2. Agent 1 (Screening)</text>
      </g>

      <!-- Node 3: Tool Execution (scrape_competitor_price) -->
      <g class="graph-node" onclick="alert('Step 3: Tool Execution\nscrape_competitor_price(sku=\'TVP-9082\')\nMatched Price: $1,299.00\nMSRP: $1,599.00\nDiscount: 18.8%\nLatency: 142ms')">
        <rect x="540" y="125" width="200" height="110" rx="18" fill="#0b192c" stroke="#10b981" stroke-width="3"/>
        <text x="640" y="160" text-anchor="middle" fill="#10b981" font-size="15" font-family="monospace" font-weight="700">⚡ 3. Tool Callout</text>
        <text x="640" y="185" text-anchor="middle" fill="#e2e8f0" font-size="13" font-family="monospace">scrape_price</text>
        <text x="640" y="210" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="monospace">sku: TVP-9082 ($1299)</text>
      </g>

      <!-- Node 4: Agent 2 Supervisor Escalation -->
      <g class="graph-node" onclick="alert('Step 4: Agent 2 Supervisor Escalation\nTrigger: Discount 18.8% > Threshold 15.0%\nPolicy Action: Require Human Supervisor Approval')">
        <circle cx="920" cy="180" r="60" fill="#2e1065" stroke="#a855f7" stroke-width="4"/>
        <text x="920" y="188" text-anchor="middle" fill="#fff" font-size="32">🛡️</text>
        <rect x="820" y="252" width="200" height="40" rx="20" fill="rgba(168, 85, 247, 0.25)" stroke="#a855f7" stroke-width="1.5"/>
        <text x="920" y="277" text-anchor="middle" fill="#e9d5ff" font-size="14" font-weight="800">4. Supervisor Agent 2</text>
      </g>

      <!-- Node 5: Human Supervisor Approval -->
      <g class="graph-node" onclick="alert('Step 5: Human Approval Granted\nSupervisor authorized $1,299.00 price match for SKU TVP-9082.')">
        <circle cx="1170" cy="180" r="54" fill="#064e3b" stroke="#10b981" stroke-width="3.5"/>
        <text x="1170" y="188" text-anchor="middle" fill="#fff" font-size="28">👥</text>
        <rect x="1090" y="248" width="160" height="36" rx="18" fill="rgba(16, 185, 129, 0.25)" stroke="#10b981" stroke-width="1.5"/>
        <text x="1170" y="271" text-anchor="middle" fill="#a7f3d0" font-size="14" font-weight="800">5. Human Approval</text>
      </g>

      <!-- Node 6: Policy Security Guard (Case 4 Anti-Jailbreak) -->
      <g class="graph-node" onclick="alert('Security Shield: Case 4 Emergency Liquidation Defense\nDetected backdoor prompt injection attempt.\nAction: BLOCKED by Security Policy Directive.')">
        <rect x="540" y="420" width="220" height="110" rx="18" fill="#450a0a" stroke="#ef4444" stroke-width="3"/>
        <text x="650" y="458" text-anchor="middle" fill="#ef4444" font-size="16" font-family="monospace" font-weight="800">🛑 6. Security Shield</text>
        <text x="650" y="485" text-anchor="middle" fill="#fca5a5" font-size="13" font-weight="700">Anti-Jailbreak Guard</text>
        <text x="650" y="510" text-anchor="middle" fill="#f87171" font-size="11">Blocks Case 4 Backdoors</text>
      </g>
    `;
  }

  streamViewBtn.addEventListener('click', () => {
    streamViewBtn.style.background = 'var(--accent-primary)';
    graphViewBtn.style.background = 'transparent';
    chatHistory.style.display = 'flex';
    graphContainer.style.display = 'none';
    audioSynth.play('click');
  });

  graphViewBtn.addEventListener('click', () => {
    graphViewBtn.style.background = 'var(--accent-primary)';
    streamViewBtn.style.background = 'transparent';
    chatHistory.style.display = 'none';
    graphContainer.style.display = 'flex';
    renderWorkflowGraph();
    audioSynth.play('click');
  });

  // =========================================================================
  // FEATURE 5: Voice Microphone Input Simulation
  // =========================================================================
  micBtn.addEventListener('click', () => {
    isRecording = !isRecording;
    audioSynth.play('click');

    if (isRecording) {
      micBtn.classList.add('recording');
      messageInput.placeholder = '🎙️ Listening... Speak your prompt now...';
      
      setTimeout(() => {
        if (isRecording) {
          messageInput.value = 'Can you match the BestBuy price for $1,299.00 on TechVerse Pro?';
          micBtn.classList.remove('recording');
          isRecording = false;
          messageInput.placeholder = 'Type a message or trigger an AI dialogue agent response...';
          audioSynth.play('send');
        }
      }, 2500);
    } else {
      micBtn.classList.remove('recording');
      messageInput.placeholder = 'Type a message or trigger an AI dialogue agent response...';
    }
  });

  // Preset Dialogue Templates
  const presetsData = {
    'multi-agent': [
      {
        sender: 'user',
        name: 'User',
        time: '10:42 AM',
        text: 'Can you match the price of the UltraDisplay 4K monitor listed at BestBuy for $449.99? SKU: UD4K-992.'
      },
      {
        sender: 'agent',
        name: 'PriceMatch Agent 1',
        avatar: 'avatar.png',
        confidence: 98,
        risk: 'LOW',
        time: '10:42 AM',
        text: 'Checking competitor price and inventory state for SKU `UD4K-992`...',
        tool: {
          name: 'scrape_competitor_price(sku="UD4K-992", domain="bestbuy.com")',
          result: '{\n  "matched_price": 449.99,\n  "msrp": 599.99,\n  "discount_pct": 25.0,\n  "in_stock": true\n}',
          timing: '142 ms'
        }
      },
      {
        sender: 'agent',
        name: 'Supervisor Agent 2',
        avatar: 'avatar.png',
        confidence: 94,
        risk: 'MEDIUM',
        time: '10:43 AM',
        text: 'Notice: Requested discount is 25.0% (MSRP $599.99 ➔ $449.99), which exceeds the automated Agent 1 threshold of 15.0%. Escalating to Supervisor Agent 2 for policy evaluation.',
        pills: [
          { text: '🛡️ Require Human Supervisor Authorization', type: 'pill-danger', action: 'openModal' },
          { text: '📋 View Telemetry Trace', type: '', action: 'viewTrace' }
        ]
      }
    ],

    'tool-trace': [
      {
        sender: 'user',
        name: 'User',
        time: '11:05 AM',
        text: 'Verify database records and trace context for transaction #TX-98014.'
      },
      {
        sender: 'agent',
        name: 'Trace Analytics Agent',
        avatar: 'avatar.png',
        confidence: 99,
        risk: 'SAFE',
        time: '11:05 AM',
        text: 'Executing distributed trace propagation check across A2A gRPC channels.',
        tool: {
          name: 'query_cloud_trace(trace_id="00-4bf92f3577b34da6a3ce929d0e0e4736")',
          result: '{\n  "span_id": "00f067aa0ba902b7",\n  "sampled": true,\n  "attributes": {\n    "g.co/rsuite/agent_id": "3097920190747246592",\n    "g.co/rsuite/eval_mode": "SPAN_AND_EVENT"\n  }\n}',
          timing: '88 ms'
        },
        waveform: true
      }
    ],

    'decision-popover': [
      {
        sender: 'user',
        name: 'Policy Compliance Bot',
        time: '11:15 AM',
        text: 'Alert: User query matched potential jailbreak pattern (Case 4: Emergency Liquidation Prompt).'
      },
      {
        sender: 'agent',
        name: 'Policy Guard Agent',
        avatar: 'avatar.png',
        confidence: 100,
        risk: 'HIGH_RISK_BLOCK',
        time: '11:15 AM',
        text: 'REJECTED: The request attempts to bypass standard price verification using emergency backdoor commands. Policy Integrity Guard enforcement active.',
        pills: [
          { text: '🔒 Block Request', type: 'pill-danger', action: 'rejectModal' },
          { text: '📄 Audit Log', type: '', action: 'viewTrace' }
        ]
      }
    ],

    'compact-chat': [
      {
        sender: 'user',
        name: 'User',
        time: '11:20 AM',
        text: 'Hello! What can you help me with today?'
      },
      {
        sender: 'agent',
        name: 'NovaSmart AI',
        avatar: 'avatar.png',
        confidence: 96,
        risk: 'SAFE',
        time: '11:20 AM',
        text: 'Welcome! I am your NovaSmart Agentic assistant. I can help evaluate price matches, execute tool calls, and enforce compliance workflows.'
      }
    ]
  };

  // =========================================================================
  // FEATURE 4: Circular Gauge Builder
  // =========================================================================
  function buildGaugeHTML(confidence, risk) {
    if (!confidence) return '';
    const dashVal = (confidence / 100) * 38;
    let strokeColor = 'var(--success-color)';
    if (confidence < 90) strokeColor = 'var(--warning-color)';
    if (risk === 'HIGH_RISK_BLOCK') strokeColor = 'var(--danger-color)';

    return `
      <div class="gauge-badge">
        <svg class="gauge-circle" viewBox="0 0 16 16">
          <circle cx="8" cy="8" r="6" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>
          <circle cx="8" cy="8" r="6" fill="none" stroke="${strokeColor}" stroke-width="2"
                  stroke-dasharray="${dashVal} 38" stroke-dashoffset="0"/>
        </svg>
        <span>${confidence}%</span>
        <div class="gauge-tooltip">
          <strong>Safety Audit:</strong> ${risk || 'PASSED'}<br>
          Model: Gemini 1.5 Pro<br>
          Jailbreak Score: 0.00
        </div>
      </div>
    `;
  }

  // =========================================================================
  // FEATURE 3: Expandable Tool Accordion Builder
  // =========================================================================
  function buildToolAccordionHTML(tool) {
    if (!tool || !showTools) return '';
    return `
      <div class="tool-accordion">
        <div class="accordion-header" onclick="this.parentElement.classList.toggle('open');">
          <div class="accordion-title">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            ${tool.name}
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono);">${tool.timing || '120ms'}</span>
            <svg class="accordion-chevron" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <div class="accordion-body">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem; font-size: 0.75rem; color: var(--text-muted);">
            <span>Formatted JSON Output</span>
            <span style="cursor: pointer; color: var(--accent-secondary);" onclick="navigator.clipboard.writeText(\`${tool.result.replace(/`/g, '\\`')}\`); alert('Copied tool payload!');">Copy JSON</span>
          </div>
          <pre style="color: #a5f3fc; white-space: pre-wrap; margin: 0;">${tool.result}</pre>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // FEATURE 5: Waveform Card Builder
  // =========================================================================
  function buildWaveformHTML(hasWaveform) {
    if (!hasWaveform) return '';
    return `
      <div class="waveform-card">
        <button class="pill-btn" onclick="audioSynth.play('tool');" style="padding: 0.25rem 0.6rem;">▶ Play Voice</button>
        <div class="waveform-bars">
          <div class="bar"></div><div class="bar"></div><div class="bar"></div>
          <div class="bar"></div><div class="bar"></div><div class="bar"></div>
        </div>
        <span style="font-size: 0.75rem; color: var(--accent-secondary); font-family: var(--font-mono);">1.0x</span>
      </div>
    `;
  }

  // Render Dialogue Messages
  function renderMessages(messages) {
    chatHistory.innerHTML = '';
    messages.forEach(msg => {
      const wrapper = document.createElement('div');
      wrapper.className = `chat-bubble-wrapper ${msg.sender}`;

      let avatarHTML = '';
      if (msg.sender === 'user') {
        avatarHTML = `<div class="chat-avatar user-avatar">U</div>`;
      } else {
        avatarHTML = `<img src="${msg.avatar || 'avatar.png'}" alt="${msg.name}" class="chat-avatar" />`;
      }

      const gaugeHTML = buildGaugeHTML(msg.confidence, msg.risk);
      const toolHTML = buildToolAccordionHTML(msg.tool);
      const waveHTML = buildWaveformHTML(msg.waveform);

      let pillsHTML = '';
      if (msg.pills && msg.pills.length > 0) {
        pillsHTML = `<div class="action-pills">`;
        msg.pills.forEach(pill => {
          pillsHTML += `<button class="pill-btn ${pill.type || ''}" data-action="${pill.action}">${pill.text}</button>`;
        });
        pillsHTML += `</div>`;
      }

      wrapper.innerHTML = `
        ${avatarHTML}
        <div class="bubble-content">
          <div class="bubble-header">
            <span class="sender-name">${msg.name}</span>
            ${gaugeHTML}
            <span class="msg-time">${msg.time}</span>
          </div>
          <div class="bubble-box">
            <span class="bubble-text">${msg.text}</span>
            ${toolHTML}
            ${waveHTML}
            ${pillsHTML}
          </div>
        </div>
      `;

      chatHistory.appendChild(wrapper);
    });

    attachPillListeners();
    chatHistory.scrollTop = chatHistory.scrollHeight;
  }

  function attachPillListeners() {
    chatHistory.querySelectorAll('.pill-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = e.target.getAttribute('data-action');
        audioSynth.play('click');
        if (action === 'openModal') {
          openModal();
        } else if (action === 'rejectModal') {
          alert('Request successfully blocked and flagged for security audit.');
        } else if (action === 'viewTrace') {
          alert('Trace ID: 00-4bf92f3577b34da6a3ce929d0e0e4736\nLatency: 142ms\nCompliance: SPAN_AND_EVENT');
        }
      });
    });
  }

  // =========================================================================
  // FEATURE 2: Real-time Streaming Caret & Token Typing Engine
  // =========================================================================
  function streamAgentResponse(fullText, toolObj, onComplete) {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const wrapper = document.createElement('div');
    wrapper.className = 'chat-bubble-wrapper agent';

    const gaugeHTML = buildGaugeHTML(98, 'SAFE');

    wrapper.innerHTML = `
      <img src="avatar.png" alt="NovaSmart AI" class="chat-avatar" />
      <div class="bubble-content">
        <div class="bubble-header">
          <span class="sender-name">NovaSmart AI Agent</span>
          ${gaugeHTML}
          <span class="msg-time">${timeStr}</span>
        </div>
        <div class="bubble-box">
          <span class="streaming-text"></span><span class="streaming-caret"></span>
          <div class="tool-slot"></div>
        </div>
      </div>
    `;

    chatHistory.appendChild(wrapper);
    chatHistory.scrollTop = chatHistory.scrollHeight;

    const streamingTextEl = wrapper.querySelector('.streaming-text');
    const streamingCaretEl = wrapper.querySelector('.streaming-caret');
    const toolSlotEl = wrapper.querySelector('.tool-slot');

    let charIdx = 0;
    const interval = setInterval(() => {
      streamingTextEl.innerText += fullText.charAt(charIdx);
      charIdx++;
      chatHistory.scrollTop = chatHistory.scrollHeight;

      if (charIdx >= fullText.length) {
        clearInterval(interval);
        streamingCaretEl.remove();

        if (toolObj && showTools) {
          toolSlotEl.innerHTML = buildToolAccordionHTML(toolObj);
          audioSynth.play('tool');
        }

        if (onComplete) onComplete();
      }
    }, 20);
  }

  // Handle User Message
  function handleSendMessage() {
    const text = messageInput.value.trim();
    if (!text) return;

    audioSynth.play('send');
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMsg = {
      sender: 'user',
      name: 'User',
      time: timeStr,
      text: text
    };

    if (!presetsData[currentPreset]) presetsData[currentPreset] = [];
    presetsData[currentPreset].push(userMsg);
    renderMessages(presetsData[currentPreset]);

    messageInput.value = '';

    // Stream Agent Response
    setTimeout(() => {
      const responseText = `Analyzed prompt: "${text}". Evaluated across 6 benchmark cases with 100% compliance. Zero jailbreak vulnerability detected.`;
      const toolPayload = showTools ? {
        name: 'evaluate_dialogue_intent(input="' + text.substring(0, 25) + '...")',
        result: '{\n  "status": "ALLOWED",\n  "confidence": 0.982,\n  "jailbreak_risk": 0.00\n}',
        timing: '118 ms'
      } : null;

      streamAgentResponse(responseText, toolPayload, () => {
        updateTelemetry();
      });
    }, 400);
  }

  // Quick Prompt Pill Handler
  window.sendQuickPrompt = function(promptText) {
    messageInput.value = promptText;
    handleSendMessage();
  };

  // Telemetry updates
  function updateTelemetry() {
    const lat = Math.floor(Math.random() * 80) + 110;
    const tok = Math.floor(Math.random() * 200) + 250;
    document.getElementById('telemetryLatency').innerText = `${lat} ms`;
    document.getElementById('telemetryTokens').innerText = `${tok} tok`;
  }

  // Preset Switching
  presetCards.forEach(card => {
    card.addEventListener('click', () => {
      audioSynth.play('click');
      presetCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      currentPreset = card.getAttribute('data-preset');
      renderMessages(presetsData[currentPreset] || []);
    });
  });

  // Theme Switching
  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      audioSynth.play('click');
      themeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const theme = btn.getAttribute('data-theme');
      document.body.className = `theme-${theme}`;
      updateCSSInspector();
    });
  });

  // Customizer Controls
  blurRange.addEventListener('input', (e) => {
    const val = `${e.target.value}px`;
    blurVal.innerText = val;
    document.documentElement.style.setProperty('--glass-blur', val);
    updateCSSInspector();
  });

  radiusRange.addEventListener('input', (e) => {
    const val = `${e.target.value}px`;
    radiusVal.innerText = val;
    document.documentElement.style.setProperty('--radius-lg', val);
    updateCSSInspector();
  });

  glowRange.addEventListener('input', (e) => {
    const opacity = e.target.value / 100;
    glowVal.innerText = `${e.target.value}%`;
    document.documentElement.style.setProperty('--accent-glow', `0 0 25px rgba(99, 102, 241, ${opacity})`);
    updateCSSInspector();
  });

  showToolsToggle.addEventListener('change', (e) => {
    audioSynth.play('click');
    showTools = e.target.checked;
    renderMessages(presetsData[currentPreset] || []);
  });

  animToggle.addEventListener('change', (e) => {
    audioSynth.play('click');
    if (!e.target.checked) {
      document.body.style.setProperty('--bubble-transition', 'none');
    } else {
      document.body.style.removeProperty('--bubble-transition');
    }
  });

  function updateCSSInspector() {
    cssInspector.innerText = `:root {
  --glass-blur: ${blurVal.innerText};
  --radius-lg: ${radiusVal.innerText};
  --accent-glow: ${getComputedStyle(document.documentElement).getPropertyValue('--accent-glow') || '0 0 25px rgba(99, 102, 241, 0.4)'};
  --theme: ${document.body.className};
}`;
  }

  // Modal Dialog Handlers
  function openModal() {
    audioSynth.play('modal');
    modalBackdrop.classList.add('active');
  }

  function closeModal() {
    audioSynth.play('click');
    modalBackdrop.classList.remove('active');
  }

  openModalBtn.addEventListener('click', openModal);
  closeModalBtn.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  modalApproveBtn.addEventListener('click', () => {
    closeModal();
    alert('✅ Price match of $1,299.00 successfully authorized by Supervisor!');
  });

  modalRejectBtn.addEventListener('click', () => {
    closeModal();
    alert('❌ Price match override rejected. User notified of MSRP policy requirement.');
  });

  // Export CSS
  exportBtn.addEventListener('click', () => {
    audioSynth.play('click');
    navigator.clipboard.writeText(cssInspector.innerText).then(() => {
      alert('CSS Component Variables copied to clipboard!');
    });
  });

  // Event Listeners for Send
  sendBtn.addEventListener('click', handleSendMessage);
  messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSendMessage();
  });

  clearChatBtn.addEventListener('click', () => {
    audioSynth.play('click');
    presetsData[currentPreset] = [];
    renderMessages([]);
  });

  // Initial Render
  renderMessages(presetsData['multi-agent']);
  updateCSSInspector();
});
