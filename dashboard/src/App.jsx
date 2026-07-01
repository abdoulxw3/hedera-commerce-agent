import { useState, useEffect, useRef } from "react";

const C = {
  bg:"#050511", surf:"rgba(255,255,255,0.03)", surf2:"rgba(255,255,255,0.05)",
  border:"rgba(255,255,255,0.08)", borderH:"rgba(139,92,246,0.5)",
  purple:"#8b5cf6", purpleL:"#a78bfa", purpleD:"rgba(139,92,246,0.15)",
  cyan:"#06b6d4", cyanL:"#67e8f9", cyanD:"rgba(6,182,212,0.12)",
  green:"#10b981", greenL:"#34d399", greenD:"rgba(16,185,129,0.12)",
  amber:"#f59e0b", red:"#ef4444",
  t1:"#f0eeff", t2:"rgba(240,238,255,0.65)",
  t3:"rgba(240,238,255,0.38)", t4:"rgba(240,238,255,0.2)"
};
const GRAD = "linear-gradient(135deg,#8b5cf6,#06b6d4)";
const GRAD2 = "linear-gradient(135deg,rgba(139,92,246,0.2),rgba(6,182,212,0.1))";

const AGENTS = [
  { id:"weather",          icon:"🌤️", name:"Weather Oracle",           cat:"Data",     price:1,   stars:4.8, uses:1240, desc:"Real-time global weather data & forecasts for any location",          verified:true,  status:"live"   },
  { id:"market",           icon:"📊", name:"Market Data Feed",         cat:"DeFi",     price:2,   stars:4.6, uses:890,  desc:"Live crypto prices, volumes and market analytics",                   verified:true,  status:"live"   },
  { id:"research",         icon:"🤖", name:"AI Research Agent",        cat:"AI",       price:5,   stars:4.9, uses:430,  desc:"Deep AI-generated research reports on any topic on demand",          verified:true,  status:"live"   },
  { id:"hcs",              icon:"📝", name:"HCS Logger",               cat:"Hedera",   price:1,   stars:4.7, uses:2100, desc:"Store messages permanently on Hedera Consensus Service",             verified:true,  status:"live"   },
  { id:"tokens",           icon:"🪙", name:"Token Creator",            cat:"Tokens",   price:2,   stars:4.5, uses:670,  desc:"Launch your own HTS fungible token in seconds",                      verified:false, status:"live"   },
  { id:"nft",              icon:"🖼️", name:"NFT Minter",               cat:"NFTs",     price:3,   stars:4.4, uses:310,  desc:"Mint NFTs directly on Hedera Token Service",                        verified:false, status:"live"   },
  { id:"defi",             icon:"💹", name:"DeFi Rates",               cat:"DeFi",     price:0.5, stars:4.3, uses:1560, desc:"Live DeFi rates and yields from the Hedera ecosystem",               verified:true,  status:"live"   },
  { id:"biz",              icon:"🏢", name:"Enterprise Agent",         cat:"B2B",      price:10,  stars:4.9, uses:88,   desc:"Custom B2B automation workflows, reports and integrations",          verified:true,  status:"live"   },
  { id:"mcp",              icon:"🔌", name:"MCP Commerce Agent",       cat:"AI",       price:3,   stars:4.7, uses:220,  desc:"Agent-to-agent x402 machine commerce on Hedera",                    verified:true,  status:"live"   },
  { id:"explorer",         icon:"🔍", name:"Hedera Explorer Agent",    cat:"Hedera",   price:1,   stars:4.8, uses:0,    desc:"Query any account, transaction or token on Hedera via Mirror Node",  verified:true,  status:"coming" },
  { id:"treasury",         icon:"💰", name:"HBAR Treasury Agent",      cat:"Data",     price:2,   stars:4.7, uses:0,    desc:"Real-time HBAR price, staking yields and treasury reports",          verified:true,  status:"coming" },
  { id:"governance",       icon:"🏛️", name:"Governance Agent",         cat:"Hedera",   price:2,   stars:4.6, uses:0,    desc:"Analyze Hedera Improvement Proposals and governance updates",        verified:true,  status:"coming" },
  { id:"orchestrator",     icon:"🧠", name:"Multi-Agent Orchestrator", cat:"AI",       price:5,   stars:4.9, uses:0,    desc:"Route requests across multiple agents autonomously in one pipeline", verified:true,  status:"coming" },
  { id:"wallet-analytics", icon:"👛", name:"Wallet Analytics Agent",   cat:"Data",     price:2,   stars:4.5, uses:0,    desc:"Full HBAR wallet history, P&L and spending breakdown",               verified:true,  status:"coming" },
  { id:"learning",         icon:"🎓", name:"Learning Agent",           cat:"AI",       price:1,   stars:4.8, uses:0,    desc:"Interactive Hedera tutorials — learn SDK, tokens, smart contracts",  verified:false, status:"coming" },
  { id:"payment-gateway",  icon:"⚡", name:"Payment Gateway Agent",    cat:"Payments", price:1,   stars:4.7, uses:0,    desc:"Add HBAR and USDC payment gating to any app via x402 in minutes",   verified:true,  status:"coming" },
  { id:"recurring",        icon:"🔄", name:"Recurring Payment Agent",  cat:"Payments", price:2,   stars:4.6, uses:0,    desc:"Set up weekly or monthly HBAR streams via scheduled transactions",   verified:true,  status:"coming" },
  { id:"bulk-payment",     icon:"💸", name:"Bulk Payment Agent",       cat:"Payments", price:2,   stars:4.5, uses:0,    desc:"Send HBAR to multiple accounts in one transaction",                  verified:true,  status:"coming" },
  { id:"invoice",          icon:"🧾", name:"Invoice Agent",            cat:"Payments", price:1,   stars:4.4, uses:0,    desc:"Generate HBAR payment requests, track status and send receipts",     verified:false, status:"coming" },
  { id:"splitter",         icon:"🔀", name:"Payment Splitter Agent",   cat:"Payments", price:2,   stars:4.6, uses:0,    desc:"Split incoming HBAR between multiple wallets automatically",          verified:true,  status:"coming" },
  { id:"pay-analytics",    icon:"📊", name:"Payment Analytics Agent",  cat:"Payments", price:2,   stars:4.7, uses:0,    desc:"Full history of every HBAR payment by agent, user and time period",  verified:true,  status:"coming" },
  { id:"bridge",           icon:"🌉", name:"Cross-Chain Bridge Agent", cat:"Payments", price:3,   stars:4.5, uses:0,    desc:"Accept ETH or USDC on other chains and bridge to HBAR for HashPay", verified:false, status:"coming" },
  { id:"policy",           icon:"⚖️", name:"Policy and Compliance",    cat:"Utility",  price:3,   stars:4.8, uses:0,    desc:"Enforce payment rules, spending limits and compliance logging to HCS",verified:true, status:"coming" },
  { id:"nft-collection",   icon:"🎨", name:"NFT Collection Generator", cat:"NFTs",     price:4,   stars:4.9, uses:0,    desc:"Describe your collection — AI generates unique images, traits and rarity for any supply size, then mints the full collection on Hedera Token Service", verified:true, status:"coming" },
];

const CATS = ["All","AI","DeFi","Data","Hedera","Tokens","NFTs","B2B","Payments","Utility"];

const NAV = [
  { icon:"⚡", label:"Marketplace", id:"market"    },
  { icon:"🤖", label:"My Agents",   id:"mine"      },
  { icon:"🚀", label:"Build",       id:"build"     },
  { icon:"💰", label:"Earnings",    id:"earn"      },
  { icon:"📊", label:"Analytics",   id:"analytics" },
];

const LIVE = [
  { agent:"Weather Oracle", amt:1,   acc:"0.0.9100182", time:"2s" },
  { agent:"DeFi Rates",     amt:0.5, acc:"0.0.7823441", time:"14s" },
  { agent:"HCS Logger",     amt:1,   acc:"0.0.5512009", time:"1m" },
  { agent:"AI Research",    amt:5,   acc:"0.0.3341882", time:"3m" },
  { agent:"NFT Minter",     amt:3,   acc:"0.0.9100182", time:"5m" },
];

const BUILDER_SYSTEM = `You are the HashPay Agent Builder — a warm, concise AI that helps anyone create and deploy a custom AI agent on the HashPay marketplace on Hedera blockchain.

Your goal: have a SHORT natural conversation to gather:
1. What the agent does
2. Who uses it  
3. Price in HBAR (suggest 0.5-10)
4. Tools: web_search, hcs_logger, hedera_tools, defi_data, webhook
5. A catchy name

Rules:
- Max 2-3 sentences per reply
- ONE question at a time
- Be warm and encouraging
- After 4-5 exchanges generate the config
- Output config EXACTLY like this:
<config>{"name":"...","description":"...","price":2,"category":"AI","prompt":"You are...","tools":[],"pricingTier":"per-use"}</config>
- After config invite user to test it
- On change requests re-output full config block`;

const useMobile = () => {
  const get = () => window.innerWidth <= 900;
  const [mobile, setMobile] = useState(get);
  useEffect(() => {
    const fn = () => setMobile(get());
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return mobile;
};

const b = {
  card: (hover=false) => ({
    background: hover ? C.surf2 : C.surf,
    border: `1px solid ${hover ? C.borderH : C.border}`,
    borderRadius: 20, transition: "all 0.2s",
    transform: hover ? "translateY(-2px)" : "none",
    boxShadow: hover ? "0 16px 48px rgba(139,92,246,0.12)" : "none",
  }),
  input: {
    width:"100%", background:"rgba(255,255,255,0.06)",
    border:`1px solid ${C.border}`, color:C.t1,
    padding:"13px 16px", borderRadius:12, fontSize:14,
    outline:"none", boxSizing:"border-box", fontFamily:"inherit",
  },
  btn: {
    background:GRAD, border:"none", color:"#fff",
    padding:"13px 24px", borderRadius:12, fontSize:14,
    cursor:"pointer", fontWeight:700, fontFamily:"inherit",
    transition:"opacity 0.15s",
  },
  ghost: {
    background:"rgba(255,255,255,0.05)", border:`1px solid ${C.border}`,
    color:C.t2, padding:"13px 24px", borderRadius:12, fontSize:14,
    cursor:"pointer", fontFamily:"inherit", transition:"all 0.15s",
  },
};

function GT({ children, s={} }) {
  return <span style={{ background:GRAD, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", ...s }}>{children}</span>;
}

function Tag({ children, color=C.purpleL, bg=C.purpleD, border="rgba(139,92,246,0.3)" }) {
  return <span style={{ background:bg, color, border:`1px solid ${border}`, fontSize:11, padding:"4px 10px", borderRadius:20, fontWeight:700, whiteSpace:"nowrap" }}>{children}</span>;
}

function Avatar({ icon, size=48, bg="rgba(139,92,246,0.12)" }) {
  return <div style={{ width:size, height:size, background:bg, borderRadius:size/3, display:"flex", alignItems:"center", justifyContent:"center", fontSize:size*0.5, flexShrink:0 }}>{icon}</div>;
}

function StatMini({ label, value, color=C.purpleL }) {
  return (
    <div style={{ textAlign:"center" }}>
      <div style={{ fontSize:22, fontWeight:800, color }}>{value}</div>
      <div style={{ fontSize:11, color:C.t3, marginTop:2 }}>{label}</div>
    </div>
  );
}

function parseConfig(t) {
  const m = t.match(/<config>([\s\S]*?)<\/config>/);
  if (!m) return null;
  try { return JSON.parse(m[1].trim()); } catch { return null; }
}
function stripConfig(t) { return t.replace(/<config>[\s\S]*?<\/config>/g,"").trim(); }

function Bubble({ msg }) {
  const u = msg.role === "user";
  return (
    <div style={{ display:"flex", justifyContent:u?"flex-end":"flex-start", marginBottom:12 }}>
      {!u && <div style={{ width:32, height:32, borderRadius:10, background:GRAD, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, flexShrink:0, marginRight:10, marginTop:2 }}>⚡</div>}
      <div style={{ maxWidth:"80%", padding:"12px 16px", fontSize:14, lineHeight:1.6,
        background:u?GRAD:C.surf2, border:u?"none":`1px solid ${C.border}`,
        borderRadius:u?"18px 18px 4px 18px":"18px 18px 18px 4px", color:C.t1 }}>
        {msg.text}
      </div>
    </div>
  );
}

function AgentCard({ agent, onAccess }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ ...b.card(hov), padding:22, cursor:"pointer", display:"flex", flexDirection:"column", gap:0 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16 }}>
        <Avatar icon={agent.icon} />
        <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:6 }}>
          <Tag color={C.cyanL} bg={C.cyanD} border="rgba(6,182,212,0.3)">{agent.price} HBAR</Tag>
          {agent.verified && <span style={{ fontSize:11, color:C.greenL, fontWeight:600 }}>✓ Verified</span>}
          {agent.status==="coming" && <span style={{ fontSize:10, color:C.amber, fontWeight:600, background:"rgba(245,158,11,0.1)", border:"1px solid rgba(245,158,11,0.3)", padding:"2px 7px", borderRadius:10 }}>Coming Soon</span>}
        </div>
      </div>
      <div style={{ fontSize:16, fontWeight:700, marginBottom:6, color:C.t1 }}>{agent.name}</div>
      <div style={{ fontSize:13, color:C.t3, marginBottom:16, lineHeight:1.6, flex:1 }}>{agent.desc}</div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
        <span style={{ fontSize:12, color:C.t4 }}>⭐ {agent.stars} · {agent.uses.toLocaleString()} uses</span>
        <Tag>{agent.cat}</Tag>
      </div>
      <button onClick={onAccess} disabled={agent.status==="coming"}
        style={{ ...b.btn, width:"100%", padding:"12px 0", fontSize:13,
          opacity:agent.status==="coming"?0.5:1,
          cursor:agent.status==="coming"?"not-allowed":"pointer",
          background:agent.status==="coming"?"rgba(255,255,255,0.08)":b.btn.background,
          border:agent.status==="coming"?`1px solid ${C.border}`:"none" }}>
        {agent.status==="coming" ? "Coming Soon" : "Pay & Access"}
      </button>
    </div>
  );
}

function MyAgentCard({ agent, onManage }) {
  return (
    <div style={{ ...b.card(), padding:22 }}>
      <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:18 }}>
        <Avatar icon={agent.icon} size={52} />
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:16, fontWeight:700, color:C.t1 }}>{agent.name}</div>
          <div style={{ fontSize:12, color:C.greenL, marginTop:3, display:"flex", alignItems:"center", gap:4 }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:C.greenL, display:"inline-block" }} />
            Active · {agent.price} HBAR per use
          </div>
        </div>
        <Tag color={C.cyanL} bg={C.cyanD} border="rgba(6,182,212,0.3)">{agent.price}ℏ</Tag>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:16 }}>
        {[
          { l:"Total Uses",   v:agent.uses.toLocaleString(), c:C.purpleL },
          { l:"HBAR Earned",  v:`${(agent.uses*agent.price*0.95).toFixed(0)}ℏ`, c:C.cyanL },
          { l:"Rating",       v:`⭐ ${agent.stars}`, c:C.amber },
          { l:"This Month",   v:`${Math.floor(agent.uses*0.12)}ℏ`, c:C.greenL },
        ].map(x=>(
          <div key={x.l} style={{ background:"rgba(255,255,255,0.04)", borderRadius:12, padding:"12px 14px" }}>
            <div style={{ fontSize:17, fontWeight:800, color:x.c }}>{x.v}</div>
            <div style={{ fontSize:11, color:C.t4, marginTop:3 }}>{x.l}</div>
          </div>
        ))}
      </div>
      <div style={{ display:"flex", gap:10 }}>
        <button style={{ ...b.ghost, flex:1, padding:"10px 0", fontSize:13 }}>Pause</button>
        <button onClick={onManage} style={{ ...b.btn, flex:2, padding:"10px 0", fontSize:13 }}>Manage</button>
      </div>
    </div>
  );
}

function ConfigPanel({ config, advanced, setAdvanced, rawJson, setRawJson, onDeploy }) {
  if (!config) return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
      height:"100%", padding:32, textAlign:"center" }}>
      <div style={{ fontSize:48, marginBottom:16, opacity:0.3 }}>⚙️</div>
      <div style={{ fontSize:15, fontWeight:600, color:C.t2, marginBottom:8 }}>Config builds as you chat</div>
      <div style={{ fontSize:13, color:C.t3, lineHeight:1.7 }}>Tell the Builder Agent what your agent should do — the configuration will appear here automatically.</div>
    </div>
  );
  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", overflow:"hidden" }}>
      <div style={{ padding:"16px 20px", borderBottom:`1px solid ${C.border}`, display:"flex", justifyContent:"space-between", alignItems:"center", flexShrink:0 }}>
        <div style={{ fontSize:13, fontWeight:700, color:C.t1 }}>Live Config</div>
        <button onClick={()=>setAdvanced(!advanced)} style={{ ...b.ghost, padding:"5px 12px", fontSize:11 }}>
          {advanced?"← Simple":"{ } Raw JSON"}
        </button>
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:20, display:"flex", flexDirection:"column", gap:14 }}>
        {!advanced ? (
          <>
            <div style={{ background:GRAD, borderRadius:16, padding:20, textAlign:"center" }}>
              <div style={{ fontSize:32, marginBottom:8 }}>🤖</div>
              <div style={{ fontSize:17, fontWeight:800, color:"#fff", marginBottom:4 }}>{config.name}</div>
              <div style={{ fontSize:12, color:"rgba(255,255,255,0.75)", lineHeight:1.5 }}>{config.description}</div>
            </div>
            <div style={{ background:C.surf, border:`1px solid ${C.border}`, borderRadius:14, overflow:"hidden" }}>
              {[
                { label:"Category",    value:config.category },
                { label:"Price",       value:`${config.price} HBAR / use` },
                { label:"Tools",       value:config.tools?.length ? config.tools.join(", ") : "None" },
                { label:"Platform fee",value:"5% per transaction" },
              ].map((r,i)=>(
                <div key={r.label} style={{ display:"flex", justifyContent:"space-between", padding:"12px 16px",
                  borderBottom:i<3?`1px solid ${C.border}`:"none" }}>
                  <span style={{ fontSize:13, color:C.t3 }}>{r.label}</span>
                  <span style={{ fontSize:13, fontWeight:600, color:C.t1 }}>{r.value}</span>
                </div>
              ))}
            </div>
            <div style={{ background:"rgba(0,0,0,0.3)", border:`1px solid ${C.border}`, borderRadius:14, padding:16 }}>
              <div style={{ fontSize:11, color:C.t3, marginBottom:8, fontWeight:700, letterSpacing:"0.06em" }}>SYSTEM PROMPT</div>
              <div style={{ fontSize:12, color:C.t2, lineHeight:1.7 }}>{config.prompt?.slice(0,180)}{config.prompt?.length>180?"...":""}</div>
            </div>
          </>
        ) : (
          <textarea value={rawJson} onChange={e=>setRawJson(e.target.value)}
            style={{ ...b.input, height:320, resize:"vertical", fontFamily:"monospace", fontSize:11, lineHeight:1.6 }} />
        )}
      </div>
      {onDeploy && (
        <div style={{ padding:16, borderTop:`1px solid ${C.border}`, flexShrink:0 }}>
          <button onClick={onDeploy} style={{ ...b.btn, width:"100%", padding:14, fontSize:15 }}>⚡ Deploy to Marketplace</button>
          <div style={{ fontSize:11, color:C.t3, textAlign:"center", marginTop:8 }}>5% platform fee · instant HBAR payments</div>
        </div>
      )}
    </div>
  );
}

function BuildScreen({ onNav, mobile }) {
  const [mode, setMode]               = useState("chat");
  const [msgs, setMsgs]               = useState([{ role:"assistant", text:"Hey! 👋 What kind of agent do you want to create? Tell me what it should help people with — no technical knowledge needed." }]);
  const [sandboxMsgs, setSandboxMsgs] = useState([]);
  const [input, setInput]             = useState("");
  const [loading, setLoading]         = useState(false);
  const [config, setConfig]           = useState(null);
  const [advanced, setAdvanced]       = useState(false);
  const [rawJson, setRawJson]         = useState("");
  const [deployed, setDeployed]       = useState(false);
  const [showConfig, setShowConfig]   = useState(false);
  const bottomRef                     = useRef(null);

  useEffect(()=>{ bottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [msgs, sandboxMsgs]);

  async function callAI(system, messages) {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method:"POST", headers:{ "Content-Type":"application/json" },
      body:JSON.stringify({ model:"claude-sonnet-4-6", max_tokens:1000, system, messages })
    });
    const data = await res.json();
    return data.content?.map(b=>b.text||"").join("") || "Something went wrong.";
  }

  async function sendBuilder() {
    if (!input.trim()||loading) return;
    const text = input.trim(); setInput("");
    const newMsgs = [...msgs, { role:"user", text }];
    setMsgs(newMsgs); setLoading(true);
    try {
      const reply = await callAI(BUILDER_SYSTEM, newMsgs.map(m=>({ role:m.role==="assistant"?"assistant":"user", content:m.text })));
      const cfg = parseConfig(reply);
      if (cfg) { setConfig(cfg); setRawJson(JSON.stringify(cfg,null,2)); }
      setMsgs([...newMsgs, { role:"assistant", text:stripConfig(reply) }]);
    } catch(e) {
      setMsgs(m=>[...m, { role:"assistant", text:"Sorry, something went wrong. Try again!" }]);
    }
    setLoading(false);
  }

  async function sendSandbox() {
    if (!input.trim()||loading||!config) return;
    const text = input.trim(); setInput("");
    const newS = [...sandboxMsgs, { role:"user", text }];
    setSandboxMsgs(newS); setLoading(true);
    try {
      const reply = await callAI(config.prompt||`You are ${config.name}, a helpful AI agent on HashPay.`,
        newS.map(m=>({ role:m.role==="assistant"?"assistant":"user", content:m.text })));
      setSandboxMsgs([...newS, { role:"assistant", text:reply }]);
    } catch(e) {
      setSandboxMsgs(m=>[...m, { role:"assistant", text:"Error: "+e.message }]);
    }
    setLoading(false);
  }

  function enterSandbox() {
    setSandboxMsgs([{ role:"assistant", text:`Hi! I'm ${config?.name||"your agent"}. I'm in test mode — try me out before going live!` }]);
    setMode("sandbox");
  }

  if (deployed) return (
    <div style={{ maxWidth:500, margin:"40px auto", padding:"0 20px", textAlign:"center" }}>
      <div style={{ fontSize:64, marginBottom:20 }}>🚀</div>
      <GT s={{ fontSize:26, fontWeight:800, display:"block", marginBottom:10 }}>{config?.name||"Your Agent"} is live!</GT>
      <div style={{ fontSize:15, color:C.t2, marginBottom:32, lineHeight:1.7 }}>
        Your agent is now discoverable on the HashPay marketplace.<br/>Users pay {config?.price} HBAR for instant access.
      </div>
      <div style={{ background:C.surf, border:`1px solid ${C.border}`, borderRadius:16, padding:20, marginBottom:24, textAlign:"left" }}>
        <div style={{ fontSize:11, color:C.t3, marginBottom:8, fontWeight:700, letterSpacing:"0.06em" }}>LIVE ENDPOINT</div>
        <div style={{ fontSize:13, color:C.cyanL, fontWeight:600, fontFamily:"monospace", wordBreak:"break-all" }}>
          hashpay.up.railway.app/agent/{config?.name?.toLowerCase().replace(/\s+/g,"-")||"my-agent"}
        </div>
      </div>
      <div style={{ display:"flex", gap:12 }}>
        <button onClick={()=>{ setDeployed(false); setMode("chat"); setConfig(null); setMsgs([{ role:"assistant", text:"Hey! 👋 What kind of agent do you want to create?" }]); }}
          style={{ ...b.ghost, flex:1 }}>Build another</button>
        <button onClick={()=>onNav("mine")} style={{ ...b.btn, flex:1 }}>View my agents</button>
      </div>
    </div>
  );

  const activeMsgs = mode==="sandbox" ? sandboxMsgs : msgs;
  const activeSend = mode==="sandbox" ? sendSandbox : sendBuilder;

  return (
    <div style={{ display:"flex", height:"100%", overflow:"hidden", position:"relative" }}>
      {/* Mobile config overlay */}
      {mobile && showConfig && (
        <div style={{ position:"fixed", inset:0, zIndex:200, background:"rgba(0,0,0,0.75)", backdropFilter:"blur(8px)" }}
          onClick={()=>setShowConfig(false)}>
          <div style={{ position:"absolute", right:0, top:0, bottom:0, width:"88%", maxWidth:380,
            background:"#0a0a1f", borderLeft:`1px solid ${C.border}`, display:"flex", flexDirection:"column" }}
            onClick={e=>e.stopPropagation()}>
            <div style={{ padding:"16px 20px", borderBottom:`1px solid ${C.border}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div style={{ fontSize:15, fontWeight:700 }}>Agent Config</div>
              <button onClick={()=>setShowConfig(false)} style={{ background:"none", border:"none", color:C.t3, fontSize:22, cursor:"pointer" }}>✕</button>
            </div>
            <div style={{ flex:1, overflow:"hidden" }}>
              <ConfigPanel config={config} advanced={advanced} setAdvanced={setAdvanced} rawJson={rawJson} setRawJson={setRawJson}
                onDeploy={config?()=>setDeployed(true):null} />
            </div>
          </div>
        </div>
      )}

      {/* Chat */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0, borderRight:mobile?"none":`1px solid ${C.border}` }}>
        {/* Header */}
        <div style={{ padding:"14px 18px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center",
          gap:12, background:"rgba(5,5,17,0.9)", backdropFilter:"blur(16px)", flexShrink:0 }}>
          <div style={{ width:38, height:38, borderRadius:11,
            background:mode==="sandbox"?C.cyanD:C.purpleD,
            display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>
            {mode==="sandbox"?"🤖":"⚡"}
          </div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:14, fontWeight:700, color:C.t1 }}>{mode==="sandbox"?`Testing: ${config?.name||"Agent"}`:"Builder Agent"}</div>
            <div style={{ fontSize:12, color:C.t3 }}>{mode==="sandbox"?"Sandbox — not live yet":"Chat to configure your agent"}</div>
          </div>
          <div style={{ display:"flex", gap:8, flexShrink:0 }}>
            {mobile && config && (
              <button onClick={()=>setShowConfig(true)} style={{ ...b.ghost, padding:"7px 12px", fontSize:12 }}>Config</button>
            )}
            {mode==="chat" && config && <button onClick={enterSandbox} style={{ ...b.btn, padding:"7px 14px", fontSize:12 }}>🧪 Test</button>}
            {mode==="sandbox" && <>
              <button onClick={()=>setMode("chat")} style={{ ...b.ghost, padding:"7px 12px", fontSize:12 }}>← Refine</button>
              <button onClick={()=>setDeployed(true)} style={{ ...b.btn, padding:"7px 14px", fontSize:12 }}>Deploy ⚡</button>
            </>}
          </div>
        </div>

        {/* Tabs */}
        {config && (
          <div style={{ display:"flex", borderBottom:`1px solid ${C.border}`, background:"rgba(0,0,0,0.2)", flexShrink:0 }}>
            {[["chat","💬 Build"],["sandbox","🧪 Test"]].map(([id,label])=>(
              <button key={id} onClick={()=>{ if(id==="sandbox"&&sandboxMsgs.length===0)enterSandbox(); else setMode(id); }}
                style={{ flex:1, padding:"11px 0", border:"none", background:"transparent",
                  color:mode===id?C.purpleL:C.t3, fontSize:13, cursor:"pointer",
                  fontWeight:mode===id?700:400, fontFamily:"inherit",
                  borderBottom:mode===id?`2px solid ${C.purple}`:"2px solid transparent" }}>{label}</button>
            ))}
          </div>
        )}

        {/* Messages */}
        <div style={{ flex:1, overflowY:"auto", padding:"20px 18px", display:"flex", flexDirection:"column" }}>
          {activeMsgs.map((m,i)=><Bubble key={i} msg={m} />)}
          {loading && (
            <div style={{ display:"flex", alignItems:"center", gap:10, color:C.t3, fontSize:13 }}>
              <div style={{ width:32, height:32, borderRadius:10, background:GRAD, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14 }}>⚡</div>
              <span>thinking...</span>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{ padding:"14px 18px", borderTop:`1px solid ${C.border}`,
          flexShrink:0, background:"rgba(5,5,17,0.95)" }}>
          {image && (
            <div style={{ marginBottom:8, position:"relative", display:"inline-block" }}>
              <img src={image} alt="upload" style={{ height:60, borderRadius:8, border:`1px solid ${C.border}` }} />
              <button onClick={()=>setImage(null)} style={{ position:"absolute", top:-6, right:-6,
                width:18, height:18, borderRadius:"50%", background:C.red, border:"none",
                color:"#fff", fontSize:10, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
            </div>
          )}
          <div style={{ display:"flex", gap:10 }}>
            <label style={{ ...b.ghost, padding:"13px 14px", flexShrink:0, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}
              title="Upload image or take photo">
              📎
              <input type="file" accept="image/*" capture="environment" style={{ display:"none" }}
                onChange={e=>{
                  const file = e.target.files[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = ev => setImage(ev.target.result);
                  reader.readAsDataURL(file);
                  e.target.value = "";
                }} />
            </label>
            <input value={input} onChange={e=>setInput(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&activeSend()}
              placeholder={mode==="sandbox"?"Chat with your agent or attach an image...":"What should your agent do?"}
              style={{ ...b.input, flex:1 }} />
            <button onClick={activeSend} disabled={loading}
              style={{ ...b.btn, padding:"13px 18px", opacity:loading?0.5:1, flexShrink:0 }}>Send</button>
          </div>
        </div>
      </div>

      {/* Config panel desktop */}
      {!mobile && (
        <div style={{ width:300, flexShrink:0, display:"flex", flexDirection:"column", background:"rgba(4,4,16,0.6)" }}>
          <ConfigPanel config={config} advanced={advanced} setAdvanced={setAdvanced} rawJson={rawJson} setRawJson={setRawJson}
            onDeploy={config?()=>setDeployed(true):null} />
        </div>
      )}
    </div>
  );
}

function Sidebar({ nav, onNav, mobile, onClose }) {
  return (
    <aside style={{ width:230, display:"flex", flexDirection:"column", height:"100%",
      borderRight:`1px solid ${C.border}`, background:"rgba(5,5,17,0.98)", backdropFilter:"blur(24px)" }}>
      <div style={{ padding:"20px 20px 18px", borderBottom:`1px solid ${C.border}`,
        display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ width:36, height:36, borderRadius:11, background:GRAD, flexShrink:0,
            display:"flex", alignItems:"center", justifyContent:"center", fontSize:17 }}>⚡</div>
          <div>
            <div style={{ fontSize:16, fontWeight:800, letterSpacing:"-0.4px", color:C.t1 }}>HashPay</div>
            <div style={{ fontSize:11, color:C.purpleL, fontWeight:600 }}>Ecosystem</div>
          </div>
        </div>
        {mobile && <button onClick={onClose} style={{ background:"none", border:"none", color:C.t3, fontSize:24, cursor:"pointer", lineHeight:1 }}>✕</button>}
      </div>

      <div style={{ padding:"14px 16px", borderBottom:`1px solid ${C.border}` }}>
        <div style={{ background:GRAD2, border:`1px solid rgba(139,92,246,0.25)`, borderRadius:14, padding:"14px 16px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
            <span style={{ fontSize:11, color:C.t3, fontWeight:600 }}>CONNECTED</span>
            <span style={{ width:7, height:7, borderRadius:"50%", background:C.greenL, display:"inline-block", boxShadow:`0 0 8px ${C.greenL}` }} />
          </div>
          <div style={{ fontSize:12, color:C.cyanL, fontWeight:600, marginBottom:10, fontFamily:"monospace" }}>0.0.9100182</div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
            <div>
              <GT s={{ fontSize:24, fontWeight:800 }}>248.5</GT>
              <span style={{ fontSize:11, color:C.t3, marginLeft:5 }}>HBAR</span>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontSize:13, color:C.greenL, fontWeight:700 }}>+12.5ℏ</div>
              <div style={{ fontSize:10, color:C.t4 }}>today</div>
            </div>
          </div>
        </div>
      </div>

      <nav style={{ flex:1, padding:"14px 12px", overflowY:"auto" }}>
        {NAV.map(n=>(
          <button key={n.id} onClick={()=>onNav(n.id)}
            style={{ width:"100%", display:"flex", alignItems:"center", gap:12,
              padding:"12px 14px", borderRadius:12, border:"none", cursor:"pointer",
              marginBottom:3, fontSize:14, fontWeight:nav===n.id?700:400, fontFamily:"inherit",
              background:nav===n.id?"rgba(139,92,246,0.15)":"transparent",
              color:nav===n.id?C.purpleL:C.t3,
              borderLeft:nav===n.id?`3px solid ${C.purple}`:"3px solid transparent",
              transition:"all 0.15s", textAlign:"left" }}>
            <span style={{ fontSize:19 }}>{n.icon}</span>
            {n.label}
          </button>
        ))}
      </nav>

      <div style={{ padding:"14px 16px", borderTop:`1px solid ${C.border}` }}>
        <div style={{ background:"rgba(245,158,11,0.08)", border:"1px solid rgba(245,158,11,0.2)",
          borderRadius:10, padding:"9px 14px", display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:14 }}>⚠️</span>
          <span style={{ fontSize:12, color:C.amber, fontWeight:600 }}>Hedera Testnet</span>
        </div>
      </div>
    </aside>
  );
}

export default function App() {
  const [nav,      setNav]      = useState("market");
  const [cat,      setCat]      = useState("All");
  const [txCount,  setTxCount]  = useState(7512);
  const [sideOpen, setSideOpen] = useState(false);
  const [search,   setSearch]   = useState("");
  const [stats,    setStats]    = useState(null);
  const [liveTxs,  setLiveTxs]  = useState([]);
  const mobile = useMobile();

  const API = "";

  useEffect(()=>{
    fetch(`${API}/api/stats`)
      .then(r=>r.json())
      .then(d=>{ setStats(d); setTxCount(d.recentTxCount); })
      .catch(()=>{});
    fetch(`${API}/api/transactions?limit=10`)
      .then(r=>r.json())
      .then(d=>{ if(d.transactions) setLiveTxs(d.transactions); })
      .catch(()=>{});
    const iv = setInterval(()=>{
      fetch(`${API}/api/stats`).then(r=>r.json()).then(d=>{ setStats(d); setTxCount(d.recentTxCount); }).catch(()=>{});
      fetch(`${API}/api/transactions?limit=10`).then(r=>r.json()).then(d=>{ if(d.transactions) setLiveTxs(d.transactions); }).catch(()=>{});
    }, 30000);
    return ()=>clearInterval(iv);
  },[]);

  function navTo(id) { setNav(id); setSideOpen(false); }

  const filtered = AGENTS.filter(a=>{
    const matchCat = cat==="All" || a.cat===cat;
    const matchSearch = !search || a.name.toLowerCase().includes(search.toLowerCase()) || a.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const pageTitle = { market:"Marketplace", mine:"My Agents", build:"Build an Agent", earn:"Earnings", analytics:"Analytics" }[nav];

  return (
    <div style={{ display:"flex", height:"100vh", background:C.bg, color:C.t1,
      fontFamily:"'Inter',system-ui,-apple-system,sans-serif", overflow:"hidden" }}>

      {/* Ambient */}
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0,
        background:"radial-gradient(ellipse at 20% 60%,rgba(139,92,246,0.08) 0%,transparent 50%),radial-gradient(ellipse at 80% 10%,rgba(6,182,212,0.05) 0%,transparent 50%),radial-gradient(ellipse at 50% 100%,rgba(16,185,129,0.03) 0%,transparent 40%)" }} />

      {/* Mobile sidebar overlay */}
      {mobile && sideOpen && (
        <div style={{ position:"fixed", inset:0, zIndex:150 }} onClick={()=>setSideOpen(false)}>
          <div onClick={e=>e.stopPropagation()} style={{ height:"100%", width:240 }}>
            <Sidebar nav={nav} onNav={navTo} mobile onClose={()=>setSideOpen(false)} />
          </div>
          <div style={{ position:"absolute", inset:0, left:240, background:"rgba(0,0,0,0.6)", backdropFilter:"blur(4px)" }} />
        </div>
      )}

      {/* Desktop sidebar */}
      {!mobile && <Sidebar nav={nav} onNav={navTo} />}

      {/* Main */}
      <main style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden", position:"relative", zIndex:1,
        paddingBottom: mobile ? 72 : 0 }}>

        {/* Topbar */}
        <div style={{ height:60, borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center",
          padding:"0 18px", gap:12, background:"rgba(5,5,17,0.92)", backdropFilter:"blur(20px)", flexShrink:0 }}>
          {mobile && (
            <button onClick={()=>setSideOpen(true)}
              style={{ background:"none", border:"none", color:C.t2, fontSize:24, cursor:"pointer", padding:"2px 4px", flexShrink:0, lineHeight:1 }}>☰</button>
          )}
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:17, fontWeight:800, letterSpacing:"-0.4px", color:C.t1 }}>{pageTitle}</div>
            {nav==="market" && (
              <div style={{ fontSize:11, color:C.t3, marginTop:1 }}>{txCount.toLocaleString()} transactions on Hedera</div>
            )}
          </div>
          <div style={{ display:"flex", gap:8, alignItems:"center", flexShrink:0 }}>
            {!mobile && (
              <div style={{ display:"flex", alignItems:"center", gap:6, background:C.greenD,
                border:`1px solid rgba(16,185,129,0.25)`, color:C.greenL, fontSize:12,
                padding:"5px 12px", borderRadius:20, fontWeight:600 }}>
                <span style={{ width:6, height:6, borderRadius:"50%", background:C.greenL, display:"inline-block" }} />
                Live
              </div>
            )}
            <button onClick={()=>navTo("build")} style={{ ...b.btn, padding:"8px 16px", fontSize:13 }}>+ Build</button>
          </div>
        </div>

        {/* Page content */}
        <div style={{ flex:1, display:"flex", overflow:"hidden" }}>
          <div style={{ flex:1, overflowY:nav==="build"?"hidden":"auto",
            padding:nav==="build"?0:mobile?"16px":"24px", display:"flex", flexDirection:"column" }}>

            {/* ── MARKETPLACE ── */}
            {nav==="market" && (
              <div>
                {/* Hero */}
                <div style={{ background:GRAD2, border:`1px solid rgba(139,92,246,0.2)`, borderRadius:20,
                  padding:mobile?"20px":"28px 32px", marginBottom:20, position:"relative", overflow:"hidden" }}>
                  <div style={{ position:"absolute", top:-20, right:-20, width:120, height:120, borderRadius:"50%",
                    background:"rgba(139,92,246,0.1)", filter:"blur(30px)" }} />
                  <div style={{ fontSize:mobile?11:12, color:C.purpleL, fontWeight:700, marginBottom:8, letterSpacing:"0.08em" }}>⚡ POWERED BY HEDERA</div>
                  <div style={{ fontSize:mobile?22:28, fontWeight:800, letterSpacing:"-0.5px", marginBottom:6 }}>
                    Pay HBAR. <GT>Unlock AI.</GT>
                  </div>
                  <div style={{ fontSize:mobile?13:14, color:C.t2, marginBottom:20, lineHeight:1.6 }}>
                    {mobile ? "Payment-gated AI services on Hedera." : "Payment-gated AI services on Hedera. Connect wallet, pay HBAR, get instant on-chain access."}
                  </div>
                  <div style={{ display:"flex", gap:mobile?24:40 }}>
                    {[
                      { v:"23",                               l:"Agents"  },
                      { v:stats?stats.recentTxCount+"":"...", l:"Txs"     },
                      { v:"$2.00",                            l:"Avg Fee" },
                    ].map(s=>(
                      <div key={s.l}>
                        <GT s={{ fontSize:mobile?18:22, fontWeight:800, display:"block" }}>{s.v}</GT>
                        <div style={{ fontSize:11, color:C.t3, marginTop:2 }}>{s.l}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Search */}
                <div style={{ position:"relative", marginBottom:16 }}>
                  <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", fontSize:16, color:C.t3 }}>🔍</span>
                  <input value={search} onChange={e=>setSearch(e.target.value)}
                    placeholder="Search agents..."
                    style={{ ...b.input, paddingLeft:44 }} />
                </div>

                {/* Category filters */}
                <div style={{ display:"flex", gap:8, marginBottom:20, overflowX:"auto", paddingBottom:4 }}>
                  {CATS.map(c=>(
                    <button key={c} onClick={()=>setCat(c)} style={{ padding:"7px 16px", borderRadius:20, flexShrink:0,
                      border:`1px solid ${cat===c?"rgba(139,92,246,0.55)":C.border}`,
                      background:cat===c?"rgba(139,92,246,0.15)":"transparent",
                      color:cat===c?C.purpleL:C.t3, fontSize:13, cursor:"pointer",
                      fontWeight:cat===c?700:400, fontFamily:"inherit", transition:"all 0.15s" }}>{c}</button>
                  ))}
                </div>

                {/* Grid */}
                <div style={{ display:"grid", gridTemplateColumns:mobile?"1fr":"repeat(auto-fill,minmax(260px,1fr))", gap:16 }}>
                  {filtered.map(a=><AgentCard key={a.id} agent={a} onAccess={()=>{}} />)}
                  {filtered.length===0 && (
                    <div style={{ gridColumn:"1/-1", textAlign:"center", padding:"60px 20px", color:C.t3 }}>
                      <div style={{ fontSize:40, marginBottom:12 }}>🔍</div>
                      <div style={{ fontSize:16, fontWeight:600 }}>No agents found</div>
                      <div style={{ fontSize:13, marginTop:6 }}>Try a different search or category</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── BUILD ── */}
            {nav==="build" && <BuildScreen onNav={navTo} mobile={mobile} />}

            {/* ── MY AGENTS ── */}
            {nav==="mine" && (
              <div>
                <div style={{ display:"grid", gridTemplateColumns:mobile?"1fr":"repeat(auto-fill,minmax(300px,1fr))", gap:16 }}>
                  {AGENTS.slice(0,4).map(a=><MyAgentCard key={a.id} agent={a} onManage={()=>{}} />)}
                  <div onClick={()=>navTo("build")} style={{ background:"rgba(139,92,246,0.04)",
                    border:`1px dashed rgba(139,92,246,0.25)`, borderRadius:20, padding:24,
                    display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
                    cursor:"pointer", minHeight:200, transition:"all 0.2s" }}>
                    <div style={{ width:56, height:56, borderRadius:16, background:C.purpleD, display:"flex",
                      alignItems:"center", justifyContent:"center", fontSize:26, marginBottom:14 }}>+</div>
                    <div style={{ fontSize:15, fontWeight:700, color:C.purpleL }}>Build new agent</div>
                    <div style={{ fontSize:13, color:C.t4, marginTop:6 }}>Chat to configure · deploy in minutes</div>
                  </div>
                </div>
              </div>
            )}

            {/* ── EARNINGS ── */}
            {nav==="earn" && (
              <div>
                <div style={{ display:"grid", gridTemplateColumns:mobile?"1fr 1fr":"repeat(3,1fr)", gap:14, marginBottom:20 }}>
                  {[
                    { label:"Total Earned", value:"9,284ℏ", sub:"+24% MoM",       color:C.purpleL },
                    { label:"This Month",   value:"1,312ℏ", sub:"312 transactions",color:C.cyanL  },
                    { label:"Today",        value:"12.5ℏ",  sub:"↑ vs yesterday",  color:C.greenL },
                  ].map((x,i)=>(
                    <div key={x.label} style={{ ...b.card(), padding:"18px 20px",
                      gridColumn:mobile&&i===2?"1/-1":"auto" }}>
                      <div style={{ fontSize:mobile?20:24, fontWeight:800, color:x.color, marginBottom:4 }}>{x.value}</div>
                      <div style={{ fontSize:13, fontWeight:600, color:C.t2 }}>{x.label}</div>
                      <div style={{ fontSize:11, color:C.greenL, marginTop:3 }}>{x.sub}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display:"grid", gridTemplateColumns:mobile?"1fr":"2fr 1fr", gap:16 }}>
                  <div style={{ ...b.card(), padding:20 }}>
                    <div style={{ fontSize:14, fontWeight:700, marginBottom:18, color:C.t1 }}>Recent Payments</div>
                    {LIVE.map((a,i)=>(
                      <div key={i} style={{ display:"flex", alignItems:"center", gap:14, padding:"12px 0",
                        borderBottom:i<LIVE.length-1?`1px solid ${C.border}`:"none" }}>
                        <Avatar icon={AGENTS.find(ag=>ag.name.includes(a.agent.split(" ")[0]))?.icon||"⚡"} size={38} />
                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ fontSize:14, fontWeight:600, color:C.t1 }}>{a.agent}</div>
                          <div style={{ fontSize:11, color:C.t4, fontFamily:"monospace", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{a.acc}</div>
                        </div>
                        <div style={{ textAlign:"right", flexShrink:0 }}>
                          <div style={{ fontSize:14, fontWeight:700, color:C.greenL }}>+{a.amt}ℏ</div>
                          <div style={{ fontSize:11, color:C.t4 }}>{a.time} ago</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ ...b.card(), padding:20 }}>
                    <div style={{ fontSize:14, fontWeight:700, marginBottom:16, color:C.t1 }}>This Week</div>
                    <div style={{ display:"flex", alignItems:"flex-end", gap:8, height:100 }}>
                      {[42,67,55,80,72,90,100].map((v,i)=>(
                        <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
                          <div style={{ width:"100%", height:`${Math.round(v)}%`, minHeight:4, borderRadius:8, transition:"height 0.5s",
                            background:i===6?GRAD:"rgba(139,92,246,0.2)" }} />
                          <div style={{ fontSize:9, color:C.t4 }}>{["M","T","W","T","F","S","S"][i]}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── ANALYTICS ── */}
            {nav==="analytics" && (
              <div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:20 }}>
                  {[
                    { label:"Total Views",  value:"24.1k", sub:"+18% MoM",       color:C.purpleL },
                    { label:"Conversion",   value:"34%",   sub:"View → Payment", color:C.cyanL  },
                    { label:"Avg Session",  value:"4.2m",  sub:"Per user",        color:C.amber  },
                    { label:"Top Agent",    value:"HCS",   sub:"2,100 uses",      color:C.greenL },
                  ].map(x=>(
                    <div key={x.label} style={{ ...b.card(), padding:"16px 18px" }}>
                      <div style={{ fontSize:22, fontWeight:800, color:x.color, marginBottom:4 }}>{x.value}</div>
                      <div style={{ fontSize:13, fontWeight:600, color:C.t2 }}>{x.label}</div>
                      <div style={{ fontSize:11, color:C.greenL, marginTop:3 }}>{x.sub}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display:"grid", gridTemplateColumns:mobile?"1fr":"3fr 2fr", gap:16 }}>
                  <div style={{ ...b.card(), padding:20 }}>
                    <div style={{ fontSize:14, fontWeight:700, marginBottom:16, color:C.t1 }}>Platform Activity (7 days)</div>
                    <div style={{ display:"flex", alignItems:"flex-end", gap:8, height:110 }}>
                      {[42,67,55,80,72,90,100].map((v,i)=>(
                        <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
                          <div style={{ width:"100%", height:`${v}%`, borderRadius:8,
                            background:i===6?GRAD:"rgba(139,92,246,0.2)" }} />
                          <div style={{ fontSize:9, color:C.t4 }}>{["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i]}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ ...b.card(), padding:20 }}>
                    <div style={{ fontSize:14, fontWeight:700, marginBottom:16, color:C.t1 }}>By Category</div>
                    {[["AI","38%",0.38],["DeFi","24%",0.24],["Hedera","18%",0.18],["Data","12%",0.12],["Other","8%",0.08]].map(([c,p,w])=>(
                      <div key={c} style={{ marginBottom:12 }}>
                        <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, marginBottom:5 }}>
                          <span style={{ color:C.t2, fontWeight:500 }}>{c}</span>
                          <span style={{ color:C.purpleL, fontWeight:700 }}>{p}</span>
                        </div>
                        <div style={{ height:5, background:"rgba(255,255,255,0.06)", borderRadius:5 }}>
                          <div style={{ height:"100%", width:`${w*100}%`, background:GRAD, borderRadius:5 }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Live feed desktop */}
          {!mobile && (nav==="market"||nav==="earn") && (
            <aside style={{ width:210, flexShrink:0, borderLeft:`1px solid ${C.border}`,
              background:"rgba(4,4,16,0.5)", padding:18, overflowY:"auto" }}>
              <div style={{ fontSize:11, fontWeight:700, color:C.t4, marginBottom:14, letterSpacing:"0.1em" }}>LIVE PAYMENTS</div>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {LIVE.map((a,i)=>(
                  <div key={i} style={{ background:C.surf, border:`1px solid ${C.border}`, borderRadius:12, padding:"11px 13px" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                      <div style={{ fontSize:12, fontWeight:600, color:C.t1 }}>{a.agent.split(" ")[0]}</div>
                      <div style={{ fontSize:12, color:C.greenL, fontWeight:700 }}>+{a.amt}ℏ</div>
                    </div>
                    <div style={{ fontSize:10, color:C.t4, fontFamily:"monospace" }}>{a.acc.slice(0,10)}…</div>
                    <div style={{ fontSize:10, color:C.t4, marginTop:3 }}>{a.time} ago</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop:18, background:"rgba(139,92,246,0.07)",
                border:`1px solid rgba(139,92,246,0.2)`, borderRadius:14, padding:16 }}>
                <div style={{ fontSize:10, color:C.t4, marginBottom:8, fontWeight:700, letterSpacing:"0.08em" }}>PLATFORM</div>
                <GT s={{ fontSize:20, fontWeight:800, display:"block", marginBottom:2 }}>{txCount.toLocaleString()}</GT>
                <div style={{ fontSize:11, color:C.t4, marginBottom:12 }}>transactions</div>
                <div style={{ fontSize:20, fontWeight:800, color:C.cyanL }}>9,284ℏ</div>
                <div style={{ fontSize:11, color:C.t4 }}>distributed</div>
              </div>
            </aside>
          )}
        </div>
      </main>

      {/* Mobile bottom nav */}
      {mobile && (
        <div style={{ position:"fixed", bottom:0, left:0, right:0, zIndex:100,
          background:"rgba(5,5,17,0.97)", borderTop:`1px solid ${C.border}`,
          backdropFilter:"blur(20px)", display:"flex", paddingBottom:"env(safe-area-inset-bottom,0px)" }}>
          {NAV.map(n=>(
            <button key={n.id} onClick={()=>navTo(n.id)}
              style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center",
                gap:4, padding:"10px 0 8px", border:"none", background:"transparent",
                cursor:"pointer", fontFamily:"inherit", transition:"all 0.15s" }}>
              <span style={{ fontSize:22 }}>{n.icon}</span>
              <span style={{ fontSize:10, fontWeight:nav===n.id?700:400,
                color:nav===n.id?C.purpleL:C.t4 }}>{n.label.split(" ")[0]}</span>
              {nav===n.id && <span style={{ width:4, height:4, borderRadius:"50%", background:C.purple, marginTop:1 }} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
