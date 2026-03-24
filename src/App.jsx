import { useState, useEffect } from "react";

// --- Custom Hook for Local Storage ---
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }, [key, value]);

  return [value, setValue];
}

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'DM Sans', sans-serif; background: #0d0d14; color: #f0eeff; min-height: 100vh; }
.app { max-width: 860px; margin: 0 auto; padding: 32px 20px 80px; }
.hero { text-align: center; padding: 48px 0 40px; }
.hero-badge { display: inline-block; background: linear-gradient(135deg, #7c3aed, #ec4899); border-radius: 99px; padding: 6px 18px; font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #fff; margin-bottom: 20px; }
.hero h1 { font-family: 'Syne', sans-serif; font-size: clamp(2rem, 6vw, 3.4rem); font-weight: 800; line-height: 1.1; background: linear-gradient(135deg, #c4b5fd 0%, #f9a8d4 50%, #fde68a 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 16px; }
.hero p { font-size: 1.05rem; color: #a89ec0; max-width: 520px; margin: 0 auto; line-height: 1.65; }
.tabs { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin: 36px 0 28px; }
.tab-btn { background: #1a1a2e; border: 1px solid #2e2e50; color: #9980d4; border-radius: 99px; padding: 7px 16px; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 500; cursor: pointer; transition: all 0.2s; white-space: nowrap; }
.tab-btn:hover { border-color: #7c3aed; color: #c4b5fd; }
.tab-btn.active { background: linear-gradient(135deg, #7c3aed, #ec4899); border-color: transparent; color: #fff; font-weight: 700; }
.card { background: #12121f; border: 1px solid #222240; border-radius: 20px; padding: 36px 32px; animation: fadeIn 0.35s ease; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
.card-header { display: flex; align-items: flex-start; gap: 16px; margin-bottom: 28px; }
.card-icon { font-size: 2.2rem; flex-shrink: 0; line-height: 1; }
.card-title { font-family: 'Syne', sans-serif; font-size: 1.45rem; font-weight: 800; color: #e8deff; line-height: 1.2; }
.card-subtitle { font-size: 0.88rem; color: #7b6fa0; margin-top: 4px; line-height: 1.5; }
.section-label { font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #7c3aed; margin-bottom: 10px; }
.field-group { margin-bottom: 20px; }
.field-label { font-size: 0.82rem; color: #9980d4; margin-bottom: 6px; font-weight: 500; }
textarea, input[type="text"] { width: 100%; background: #0d0d18; border: 1px solid #2a2a45; border-radius: 10px; padding: 12px 14px; color: #e8deff; font-family: 'DM Sans', sans-serif; font-size: 0.92rem; resize: vertical; transition: border-color 0.2s; outline: none; }
textarea:focus, input[type="text"]:focus { border-color: #7c3aed; }
textarea { min-height: 72px; }
.row-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.accent-box { background: linear-gradient(135deg, #1e1040 0%, #1a0d2e 100%); border: 1px solid #3b2f6e; border-radius: 12px; padding: 16px 18px; margin-bottom: 16px; }
.accent-box p { font-size: 0.88rem; color: #c4b5fd; line-height: 1.6; }
.divider { height: 1px; background: #1e1e35; margin: 24px 0; }
.brain-dump-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.dump-box { background: #0d0d18; border: 1px solid #2a2a45; border-radius: 12px; padding: 14px; }
.dump-box-title { font-size: 0.78rem; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px; }
.dump-box:nth-child(1) .dump-box-title { color: #f472b6; }
.dump-box:nth-child(2) .dump-box-title { color: #60a5fa; }
.dump-box:nth-child(3) .dump-box-title { color: #34d399; }
.dump-box:nth-child(4) .dump-box-title { color: #fbbf24; }
.step-list { list-style: none; counter-reset: step; }
.step-item { counter-increment: step; display: flex; gap: 14px; align-items: flex-start; margin-bottom: 14px; }
.step-num { min-width: 30px; height: 30px; border-radius: 50%; background: linear-gradient(135deg, #7c3aed, #ec4899); display: flex; align-items: center; justify-content: center; font-size: 0.78rem; font-weight: 800; color: #fff; flex-shrink: 0; }
.energy-row { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
.energy-label { font-size: 0.82rem; color: #9980d4; width: 90px; flex-shrink: 0; }
.energy-bar { flex: 1; height: 10px; background: #1a1a2e; border-radius: 99px; cursor: pointer; position: relative; overflow: hidden; }
.energy-fill { height: 100%; border-radius: 99px; transition: width 0.3s; }
.energy-val { font-size: 0.78rem; color: #7b6fa0; width: 30px; text-align: right; }
.buddy-card { display: flex; gap: 14px; align-items: center; background: #0d0d18; border: 1px solid #2a2a45; border-radius: 12px; padding: 14px 16px; margin-bottom: 10px; }
.buddy-avatar { font-size: 1.8rem; }
.buddy-info { flex: 1; }
.buddy-name { font-size: 0.9rem; font-weight: 600; color: #e8deff; }
.buddy-role { font-size: 0.78rem; color: #7b6fa0; }
.check-item { display: flex; gap: 12px; align-items: flex-start; margin-bottom: 12px; cursor: pointer; }
.check-box { width: 20px; height: 20px; border: 2px solid #3b2f6e; border-radius: 5px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; margin-top: 1px; transition: all 0.2s; }
.check-box.checked { background: linear-gradient(135deg, #7c3aed, #ec4899); border-color: transparent; }
.check-text { font-size: 0.9rem; color: #c4b5fd; line-height: 1.4; }
.check-text.done { text-decoration: line-through; color: #4a3f6b; }
.reward-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-top: 12px; }
.reward-chip { background: #1a1a2e; border: 1px solid #2e2e50; border-radius: 10px; padding: 10px 8px; text-align: center; cursor: pointer; transition: all 0.2s; font-size: 0.78rem; color: #9980d4; }
.reward-chip:hover, .reward-chip.picked { background: linear-gradient(135deg, #1e1040, #1a0d2e); border-color: #7c3aed; color: #c4b5fd; }
.reward-chip .ri { font-size: 1.4rem; display: block; margin-bottom: 4px; }
.timer-display { font-family: 'Syne', sans-serif; font-size: 3.5rem; font-weight: 800; text-align: center; background: linear-gradient(135deg, #c4b5fd, #f9a8d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; line-height: 1; margin: 20px 0; }
.timer-btns { display: flex; gap: 10px; justify-content: center; }
.btn { padding: 10px 24px; border-radius: 99px; border: none; font-family: 'DM Sans', sans-serif; font-size: 0.88rem; font-weight: 700; cursor: pointer; transition: all 0.2s; }
.btn-primary { background: linear-gradient(135deg, #7c3aed, #ec4899); color: #fff; }
.btn-primary:hover { opacity: 0.88; }
.btn-ghost { background: #1a1a2e; color: #9980d4; border: 1px solid #2e2e50; }
.btn-ghost:hover { border-color: #7c3aed; color: #c4b5fd; }
.progress-track { background: #1a1a2e; border-radius: 99px; height: 8px; margin-top: 10px; overflow: hidden; }
.progress-fill { height: 100%; border-radius: 99px; background: linear-gradient(90deg, #7c3aed, #ec4899); transition: width 0.5s; }
@media (max-width: 600px) { .brain-dump-grid, .row-3, .row-2 { grid-template-columns: 1fr; } .reward-grid { grid-template-columns: repeat(3, 1fr); } .card { padding: 24px 18px; } }
`;

const WORKSHEETS = [
  { id: 0, icon: "🧠", label: "Brain Dump" },
  { id: 1, icon: "⚡", label: "2-Min Starter" },
  { id: 2, icon: "🔋", label: "Energy Map" },
  { id: 3, icon: "🎯", label: "One Thing" },
  { id: 4, icon: "🤝", label: "Body Double" },
  { id: 5, icon: "🎁", label: "Reward Board" },
  { id: 6, icon: "⏱️", label: "Micro Timer" },
  { id: 7, icon: "🌊", label: "Emotion Check" },
  { id: 8, icon: "🔓", label: "Unblock Me" },
  { id: 9, icon: "🌟", label: "Win Journal" },
];

function W0_BrainDump() {
  const [vals, setVals] = useLocalStorage("adhd_w0_vals", { urgent: "", swirling: "", someday: "", feelings: "", action: "" });
  const update = (k, v) => setVals(p => ({ ...p, [k]: v }));
  return (
    <>
      <div className="accent-box"><p>⚡ Set a timer for 5 minutes. Write everything floating in your head — no filter, no judgment. Just get it OUT.</p></div>
      <div className="brain-dump-grid">
        {[
          ["urgent", "🔥 Urgent / Screaming", "What feels on fire right now?"],
          ["swirling", "💭 Swirling Thoughts", "What keeps replaying?"],
          ["someday", "🌈 Someday Maybe", "Low-priority but taking up space"],
          ["feelings", "💜 Feelings / Body", "What are you feeling physically?"]
        ].map(([k, title, ph]) => (
          <div className="dump-box" key={k}>
            <div className="dump-box-title">{title}</div>
            <textarea placeholder={ph} value={vals[k]} onChange={e => update(k, e.target.value)} style={{ minHeight: 90 }} />
          </div>
        ))}
      </div>
      <div className="divider" />
      <div className="field-group">
        <div className="section-label">After the dump</div>
        <div className="field-label">Circle one item from above that you'll act on today. Write it here:</div>
        <input type="text" value={vals.action} onChange={e => update("action", e.target.value)} placeholder="My ONE action from this dump..." />
      </div>
    </>
  );
}

function W1_TwoMinStarter() {
  const [task, setTask] = useLocalStorage("adhd_w1_task", "");
  const [steps, setSteps] = useLocalStorage("adhd_w1_steps", ["", "", ""]);
  const [checks, setChecks] = useLocalStorage("adhd_w1_checks", [false, false, false]);
  const [reward, setReward] = useLocalStorage("adhd_w1_reward", "");
  const updateStep = (i, v) => setSteps(p => { const n = [...p]; n[i] = v; return n; });
  const toggle = i => setChecks(p => { const n = [...p]; n[i] = !n[i]; return n; });
  return (
    <>
      <div className="accent-box"><p>💡 The secret: you don't need motivation to START. You need a <strong style={{ color: "#f9a8d4" }}>tiny, almost laughably small</strong> first step. Momentum builds itself.</p></div>
      <div className="field-group">
        <div className="field-label">The task I've been avoiding:</div>
        <input type="text" value={task} onChange={e => setTask(e.target.value)} placeholder="e.g. Write the project report..." />
      </div>
      <div className="section-label">Break it into 3 micro-steps (each under 2 minutes)</div>
      <ul className="step-list">
        {steps.map((s, i) => (
          <li className="step-item" key={i}>
            <div className="step-num">{i + 1}</div>
            <div style={{ flex: 1 }}><input type="text" value={s} onChange={e => updateStep(i, e.target.value)} placeholder={["Open the document and type one sentence", "Write just the heading / title", "Read the first paragraph only"][i]} /></div>
            <div className={`check-box${checks[i] ? " checked" : ""}`} onClick={() => toggle(i)} style={{ marginTop: 8 }}>{checks[i] && <span style={{ color: "#fff", fontSize: 12 }}>✓</span>}</div>
          </li>
        ))}
      </ul>
      <div className="divider" />
      <div className="field-group">
        <div className="field-label">🎉 What will you tell yourself once you do step 1?</div>
        <input type="text" value={reward} onChange={e => setReward(e.target.value)} placeholder="e.g. I started — that's everything." />
      </div>
    </>
  );
}

function W2_EnergyMap() {
  const slots = ["6–8 AM", "8–10 AM", "10–12 PM", "12–2 PM", "2–4 PM", "4–6 PM", "6–8 PM", "8–10 PM"];
  const colors = ["#f472b6", "#fb923c", "#fbbf24", "#34d399", "#60a5fa", "#a78bfa", "#ec4899", "#f87171"];
  const [levels, setLevels] = useLocalStorage("adhd_w2_levels", slots.map(() => 50));
  const [tasks, setTasks] = useLocalStorage("adhd_w2_tasks", slots.map(() => ""));
  const setLevel = (i, v) => setLevels(p => { const n = [...p]; n[i] = v; return n; });

  return (
    <>
      <div className="accent-box"><p>🔋 ADHD brains have irregular energy cycles. Map yours — then schedule hard tasks during HIGH energy, admin during LOW.</p></div>
      <div className="section-label">Drag sliders to rate your typical energy (0–100)</div>
      {slots.map((s, i) => (
        <div className="energy-row" key={i}>
          <span className="energy-label">{s}</span>
          <div className="energy-bar" onClick={e => {
            const rect = e.currentTarget.getBoundingClientRect();
            const pct = Math.round(((e.clientX - rect.left) / rect.width) * 100);
            setLevel(i, Math.max(0, Math.min(100, pct)));
          }}>
            <div className="energy-fill" style={{ width: `${levels[i]}%`, background: colors[i] }} />
          </div>
          <span className="energy-val">{levels[i]}</span>
          <input type="text" value={tasks[i]} onChange={e => { const n = [...tasks]; n[i] = e.target.value; setTasks(n); }} placeholder="Best task type..." style={{ width: 160, minHeight: "auto", padding: "6px 10px" }} />
        </div>
      ))}
    </>
  );
}

function W3_OneThing() {
  const [vals, setVals] = useLocalStorage("adhd_w3_vals", {});
  const u = (k, v) => setVals(p => ({ ...p, [k]: v }));
  return (
    <>
      <div className="accent-box"><p>🎯 ADHD overwhelm = too many "ones." This worksheet forces brutal clarity. <strong style={{ color: "#fde68a" }}>Only one thing matters today.</strong></p></div>
      {[
        ["tasks", "List everything on your plate (quick):"],
        ["one", "⭐ The ONE task that would make today a win:"],
        ["why", "Why does this one matter most right now?"],
        ["obstacle", "What could get in the way?"],
        ["plan", "Your 'if obstacle, then I will...' plan:"],
      ].map(([k, label]) => (
        <div className="field-group" key={k}>
          <div className="field-label">{label}</div>
          <textarea value={vals[k] || ""} onChange={e => u(k, e.target.value)} style={{ minHeight: k === "tasks" ? 100 : 65 }} placeholder="Write here..." />
        </div>
      ))}
    </>
  );
}

function W4_BodyDouble() {
  const [mode, setMode] = useLocalStorage("adhd_w4_mode", "");
  const [task, setTask] = useLocalStorage("adhd_w4_task", "");
  const [duration, setDuration] = useLocalStorage("adhd_w4_duration", "");
  const [report, setReport] = useLocalStorage("adhd_w4_report", "");
  const modes = [
    { icon: "👥", label: "In-person", desc: "Same room, silent or soft music" },
    { icon: "💻", label: "Video call", desc: "Cameras on, working side-by-side" },
    { icon: "🎵", label: "Lo-fi stream", desc: "YouTube study-with-me streams" },
    { icon: "📻", label: "Podcast", desc: "Background chatter as presence" },
  ];
  return (
    <>
      <div className="accent-box"><p>🤝 Body doubling = having another presence while you work. It activates accountability circuits in the ADHD brain — even a YouTube stream counts.</p></div>
      <div className="section-label">Choose your body double mode</div>
      <div className="row-2" style={{ marginBottom: 20 }}>
        {modes.map(m => (
          <div key={m.label} onClick={() => setMode(m.label)} style={{ background: mode === m.label ? "linear-gradient(135deg,#1e1040,#1a0d2e)" : "#0d0d18", border: `1px solid ${mode === m.label ? "#7c3aed" : "#2a2a45"}`, borderRadius: 12, padding: "14px 16px", cursor: "pointer", transition: "all 0.2s" }}>
            <div style={{ fontSize: "1.5rem", marginBottom: 6 }}>{m.icon}</div>
            <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "#e8deff" }}>{m.label}</div>
            <div style={{ fontSize: "0.78rem", color: "#7b6fa0" }}>{m.desc}</div>
          </div>
        ))}
      </div>
      <div className="row-2">
        <div className="field-group"><div className="field-label">Task I'll do during this session:</div><input type="text" value={task} onChange={e => setTask(e.target.value)} placeholder="e.g. Finish slide deck..." /></div>
        <div className="field-group"><div className="field-label">Session length:</div><input type="text" value={duration} onChange={e => setDuration(e.target.value)} placeholder="e.g. 25 min, 1 hour..." /></div>
      </div>
      <div className="field-group">
        <div className="field-label">Accountability check-in (what will you report after?)</div>
        <input type="text" value={report} onChange={e => setReport(e.target.value)} placeholder="e.g. Tell my buddy what I finished..." />
      </div>
    </>
  );
}

function W5_RewardBoard() {
  const [picked, setPicked] = useLocalStorage("adhd_w5_picked", []);
  const [custom, setCustom] = useLocalStorage("adhd_w5_custom", "");
  const [contract, setContract] = useLocalStorage("adhd_w5_contract", "");
  const toggle = r => setPicked(p => p.includes(r) ? p.filter(x => x !== r) : [...p, r]);
  const rewards = [
    { e: "☕", l: "Coffee / Tea" }, { e: "🎵", l: "Fav Song" }, { e: "📱", l: "Scroll 10 min" }, { e: "🍫", l: "Snack" }, { e: "🛁", l: "Bath/Shower" }, { e: "🎮", l: "Game 15min" }, { e: "🌿", l: "Walk Outside" }, { e: "💬", l: "Text Friend" }, { e: "🎬", l: "One Episode" }, { e: "🧸", l: "Comfort Item" }, { e: "🍕", l: "Order Food" }, { e: "🛍️", l: "Small Buy" },
  ];
  return (
    <>
      <div className="accent-box"><p>🎁 ADHD brains need <strong style={{ color: "#fde68a" }}>external dopamine contracts.</strong> Preload your reward before the task — your brain needs to KNOW the prize exists.</p></div>
      <div className="section-label">Pick your rewards menu (select multiple)</div>
      <div className="reward-grid">
        {rewards.map(r => (
          <div key={r.l} className={`reward-chip${picked.includes(r.l) ? " picked" : ""}`} onClick={() => toggle(r.l)}>
            <span className="ri">{r.e}</span>{r.l}
          </div>
        ))}
      </div>
      <div className="divider" />
      <div className="field-group">
        <div className="field-label">Custom reward:</div>
        <input type="text" value={custom} onChange={e => setCustom(e.target.value)} placeholder="Something that truly lights you up..." />
      </div>
      <div className="field-group">
        <div className="field-label">🏆 Task → Reward contract:</div>
        <input type="text" value={contract} onChange={e => setContract(e.target.value)} placeholder='e.g. "When I finish the report, I get 30 min of gaming."' />
      </div>
    </>
  );
}

function W6_MicroTimer() {
  const [mins, setMins] = useState(10);
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(null);
  const [task, setTask] = useLocalStorage("adhd_w6_task", "");
  const [done, setDone] = useLocalStorage("adhd_w6_done", "");

  const start = () => { setSeconds(mins * 60); setRunning(true); };
  const fmt = s => {
    if (s === null) return `${String(mins).padStart(2, "0")}:00`;
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };
  const presets = [5, 10, 15, 25, 45];

  return (
    <>
      <div className="accent-box"><p>⏱️ "Just 5 minutes" tricks your brain's resistance. The task doesn't need to be done — it needs to be <strong style={{ color: "#fde68a" }}>started.</strong> You can always stop after the timer.</p></div>
      <div className="field-group">
        <div className="field-label">What are you working on?</div>
        <input type="text" value={task} onChange={e => setTask(e.target.value)} placeholder="e.g. Responding to emails..." />
      </div>
      <div className="section-label">Timer preset (minutes)</div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
        {presets.map(p => (
          <div key={p} onClick={() => { setMins(p); setRunning(false); setSeconds(null); }} style={{ background: mins === p ? "linear-gradient(135deg,#7c3aed,#ec4899)" : "#1a1a2e", border: `1px solid ${mins === p ? "transparent" : "#2e2e50"}`, color: mins === p ? "#fff" : "#9980d4", borderRadius: 99, padding: "8px 20px", cursor: "pointer", fontFamily: "DM Sans", fontSize: "0.88rem", fontWeight: 700, transition: "all 0.2s" }}>{p} min</div>
        ))}
      </div>
      <div className="timer-display">{fmt(seconds)}</div>
      <div className="timer-btns">
        <button className="btn btn-primary" onClick={start}>{running ? "Restart" : "▶ Start"}</button>
        <button className="btn btn-ghost" onClick={() => { setRunning(false); setSeconds(null); }}>Reset</button>
      </div>
      <div className="divider" />
      <div className="field-group">
        <div className="field-label">After timer: What did you get done? (No judgment for partial wins!)</div>
        <textarea value={done} onChange={e => setDone(e.target.value)} placeholder="I managed to..." style={{ minHeight: 60 }} />
      </div>
    </>
  );
}

function W7_EmotionCheck() {
  const [selected, setSelected] = useLocalStorage("adhd_w7_selected", []);
  const [vals, setVals] = useLocalStorage("adhd_w7_vals", {});
  const update = (k, v) => setVals(p => ({ ...p, [k]: v }));
  const toggle = e => setSelected(p => p.includes(e) ? p.filter(x => x !== e) : [...p, e]);
  const emotions = [
    { e: "😰", l: "Anxious" }, { e: "😶‍🌫️", l: "Numb" }, { e: "😤", l: "Frustrated" },
    { e: "😴", l: "Exhausted" }, { e: "🥺", l: "Overwhelmed" }, { e: "😠", l: "Resentful" },
    { e: "😔", l: "Sad" }, { e: "😕", l: "Confused" }, { e: "🤯", l: "Overstimulated" },
    { e: "😬", l: "Stressed" }, { e: "😌", l: "Calm" }, { e: "✨", l: "Energized" },
  ];
  return (
    <>
      <div className="accent-box"><p>🌊 Emotional dysregulation is at the core of ADHD paralysis. <strong style={{ color: "#f9a8d4" }}>Naming the feeling breaks the freeze.</strong> You can't move through what you haven't named.</p></div>
      <div className="section-label">How are you feeling right now? (Select all that apply)</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 20 }}>
        {emotions.map(em => (
          <div key={em.l} onClick={() => toggle(em.l)} style={{ background: selected.includes(em.l) ? "linear-gradient(135deg,#1e1040,#1a0d2e)" : "#0d0d18", border: `1px solid ${selected.includes(em.l) ? "#7c3aed" : "#2a2a45"}`, borderRadius: 12, padding: "12px 8px", textAlign: "center", cursor: "pointer", transition: "all 0.2s" }}>
            <div style={{ fontSize: "1.5rem" }}>{em.e}</div>
            <div style={{ fontSize: "0.75rem", color: selected.includes(em.l) ? "#c4b5fd" : "#7b6fa0", marginTop: 4 }}>{em.l}</div>
          </div>
        ))}
      </div>
      {[
        ["body", "Where do you feel this in your body?", "e.g. Tight chest, heavy shoulders..."],
        ["trigger", "What triggered this feeling?", "e.g. A message I received, the pile of tasks..."],
        ["need", "What do you actually NEED right now?", "e.g. 10 min rest, a snack, someone to talk to..."],
        ["micro", "One micro-action to regulate before working:", "e.g. 5 deep breaths, a 2-min walk, splash cold water..."],
      ].map(([k, l, ph]) => (
        <div className="field-group" key={k}>
          <div className="field-label">{l}</div>
          <textarea value={vals[k] || ""} onChange={e => update(k, e.target.value)} placeholder={ph} style={{ minHeight: 60 }} />
        </div>
      ))}
    </>
  );
}

function W8_UnblockMe() {
  const [checks, setChecks] = useLocalStorage("adhd_w8_checks", {});
  const [vals, setVals] = useLocalStorage("adhd_w8_vals", {});
  const update = (k, v) => setVals(p => ({ ...p, [k]: v }));
  const toggle = k => setChecks(p => ({ ...p, [k]: !p[k] }));
  const blockers = [
    { k: "unclear", label: "The task feels unclear or vague" }, { k: "big", label: "It feels too big / has too many parts" },
    { k: "wrong", label: "I'm afraid of doing it wrong" }, { k: "boring", label: "It's boring and unstimulating" },
    { k: "judge", label: "I'm worried about being judged" }, { k: "start", label: "I don't know where to start" },
    { k: "perfect", label: "It needs to be perfect before I share" }, { k: "energy", label: "I'm genuinely low energy or burnt out" },
  ];
  return (
    <>
      <div className="accent-box"><p>🔓 Paralysis always has a root cause. Identify it first — then the solution becomes obvious. Different blockers need different unlocks.</p></div>
      <div className="section-label">Check every blocker that applies right now</div>
      {blockers.map(b => (
        <div className="check-item" key={b.k} onClick={() => toggle(b.k)}>
          <div className={`check-box${checks[b.k] ? " checked" : ""}`}>{checks[b.k] && <span style={{ color: "#fff", fontSize: 12 }}>✓</span>}</div>
          <span className={`check-text${checks[b.k] ? " done" : ""}`}>{b.label}</span>
        </div>
      ))}
      <div className="divider" />
      {[
        ["biggest", "My biggest blocker in my own words:"],
        ["unlock", "One thing that would make starting 10% easier:"],
        ["ask", "Who or what could help me unblock this?"],
      ].map(([k, l]) => (
        <div className="field-group" key={k}>
          <div className="field-label">{l}</div>
          <textarea value={vals[k] || ""} onChange={e => update(k, e.target.value)} style={{ minHeight: 65 }} placeholder="Write here..." />
        </div>
      ))}
    </>
  );
}

function W9_WinJournal() {
  const [entries, setEntries] = useLocalStorage("adhd_w9_entries", [{ win: "", why: "", feel: "" }]);
  const [msg, setMsg] = useLocalStorage("adhd_w9_msg", "");
  const add = () => setEntries(p => [...p, { win: "", why: "", feel: "" }]);
  const update = (i, k, v) => setEntries(p => { const n = [...p]; n[i] = { ...n[i], [k]: v }; return n; });
  return (
    <>
      <div className="accent-box"><p>🌟 ADHD brains discount wins instantly and catastrophize setbacks. This journal <strong style={{ color: "#fde68a" }}>rewires the pattern</strong> — small wins compound into self-trust.</p></div>
      {entries.map((e, i) => (
        <div key={i} style={{ background: "#0d0d18", border: "1px solid #2a2a45", borderRadius: 14, padding: "16px 18px", marginBottom: 14 }}>
          <div style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "#7c3aed", marginBottom: 12 }}>Win #{i + 1}</div>
          <div className="field-group">
            <div className="field-label">✅ What did I actually do today (no matter how small)?</div>
            <input type="text" value={e.win} onChange={ev => update(i, "win", ev.target.value)} placeholder="e.g. Replied to one email, got out of bed by 9..." />
          </div>
          <div className="row-2">
            <div className="field-group"><div className="field-label">Why does this count?</div><textarea value={e.why} onChange={ev => update(i, "why", ev.target.value)} style={{ minHeight: 65 }} placeholder="Because with ADHD, this takes real effort..." /></div>
            <div className="field-group"><div className="field-label">How does acknowledging this feel?</div><textarea value={e.feel} onChange={ev => update(i, "feel", ev.target.value)} style={{ minHeight: 65 }} placeholder="e.g. Relieved, proud, still hard to believe..." /></div>
          </div>
        </div>
      ))}
      <button className="btn btn-ghost" onClick={add} style={{ width: "100%", marginBottom: 20 }}>+ Add Another Win</button>
      <div className="field-group">
        <div className="field-label">💌 Message to yourself for tomorrow:</div>
        <textarea value={msg} onChange={e => setMsg(e.target.value)} placeholder="e.g. You showed up today. That's enough. Tomorrow, just start with one thing..." style={{ minHeight: 80 }} />
      </div>
    </>
  );
}

const COMPONENTS = [W0_BrainDump, W1_TwoMinStarter, W2_EnergyMap, W3_OneThing, W4_BodyDouble, W5_RewardBoard, W6_MicroTimer, W7_EmotionCheck, W8_UnblockMe, W9_WinJournal];

export default function App() {
  const [active, setActive] = useLocalStorage("adhd_active_tab", 0);
  const W = COMPONENTS[active];

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="hero">
          <div className="hero-badge">ADHD Action System</div>
          <h1>Bypass the Freeze.<br />Finally Take Action.</h1>
          <p>10 dopamine-friendly worksheets designed for the ADHD brain — not willpower, but systems that actually work.</p>
        </div>
        <div className="tabs">
          {WORKSHEETS.map(w => (
            <button key={w.id} className={`tab-btn${active === w.id ? " active" : ""}`} onClick={() => setActive(w.id)}>
              {w.icon} {w.label}
            </button>
          ))}
        </div>
        <div className="card">
          <div className="card-header">
            <div className="card-icon">{WORKSHEETS[active].icon}</div>
            <div>
              <div className="card-title">{[
                "Brain Dump Purge", "The 2-Minute Starter", "Personal Energy Map", "The One Thing Focus Filter",
                "Body Double Planner", "Dopamine Reward Board", "Micro-Timer Launch Pad", "Emotion Check-In",
                "Unblock Me Diagnostic", "Daily Win Journal",
              ][active]}</div>
              <div className="card-subtitle">{[
                "Clear the mental clutter before you can focus on anything", "Shrink the task until your brain can't say no",
                "Schedule hard work when your energy is actually there", "Cut through the noise — what's the ONE real priority?",
                "Use human or virtual presence to activate focus", "Pre-load your reward to trigger dopamine motivation",
                "Trick your brain into starting with a tiny time commitment", "Name the freeze before you fight it",
                "Diagnose what's really blocking you — then solve that", "Build self-trust by honoring every small win",
              ][active]}</div>
            </div>
          </div>
          <W />
        </div>
      </div>
    </>
  );
}