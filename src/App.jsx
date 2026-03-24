import React, { useState, useEffect, useMemo } from "react";

// --- Advanced Persistence Hook ---
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (e) { return initialValue; }
  });
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

// --- Stylesheet (Enhanced for Abundance) ---
const styles = `
:root {
  --bg: #0a0a0f; --card: #12121e; --accent: #7c3aed; --text: #f0eeff;
  --muted: #7b6fa0; --gradient: linear-gradient(135deg, #7c3aed 0%, #ec4899 100%);
}
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;700&display=swap');
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--text); line-height: 1.6; }
.container { max-width: 1000px; margin: 0 auto; padding: 40px 20px; }

/* Dashboard Header */
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; }
.stats-bar { display: flex; gap: 20px; }
.stat-item { background: var(--card); padding: 10px 20px; border-radius: 12px; border: 1px solid #222240; text-align: center; }
.stat-val { display: block; font-weight: 800; color: #f9a8d4; font-size: 1.2rem; }
.stat-label { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 1px; color: var(--muted); }

/* Navigation Grid */
.nav-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 12px; margin-bottom: 40px; }
.nav-card { 
  background: var(--card); border: 1px solid #222240; padding: 15px; border-radius: 16px; 
  text-align: center; cursor: pointer; transition: 0.2s; 
}
.nav-card:hover { border-color: var(--accent); transform: translateY(-3px); }
.nav-card.active { background: var(--gradient); border-color: transparent; }
.nav-card .icon { font-size: 1.8rem; display: block; margin-bottom: 8px; }
.nav-card .label { font-size: 0.8rem; font-weight: 600; }

/* Main Content Area */
.main-card { background: var(--card); border-radius: 24px; padding: 40px; border: 1px solid #222240; position: relative; overflow: hidden; }
.main-card::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: var(--gradient); }
.card-title { font-family: 'Syne', sans-serif; font-size: 2rem; margin-bottom: 10px; }

/* Form Elements */
input, textarea { 
  width: 100%; background: #080810; border: 1px solid #2a2a45; border-radius: 12px; 
  padding: 14px; color: white; font-family: inherit; margin-top: 8px; outline: none;
}
input:focus { border-color: var(--accent); }
.btn { 
  background: var(--gradient); color: white; border: none; padding: 12px 24px; 
  border-radius: 99px; font-weight: 700; cursor: pointer; margin-top: 20px;
}
.crisis-btn { background: #ef4444; margin-left: 10px; }

/* Animations */
@keyframes slideIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.animate { animation: slideIn 0.3s ease-out; }

@media (max-width: 600px) { .nav-grid { grid-template-columns: 1fr 1fr; } .header { flex-direction: column; gap: 20px; } }
`;

// --- Tool Definitions ---
const TOOLS = [
  { id: 'dash', icon: '🏠', title: 'Command Center', desc: 'Your daily dopamine overview.' },
  { id: 'dump', icon: '🌪️', title: 'Brain Purge', desc: 'Empty the mental junk drawer.' },
  { id: 'focus', icon: '🎯', title: 'Hyper-Focus', desc: 'The "One Thing" filter.' },
  { id: 'timer', icon: '⏱️', title: 'Micro-Burst', desc: 'Start with just 5 minutes.' },
  { id: 'energy', icon: '🔋', title: 'Energy Map', desc: 'Align tasks with your biology.' },
  { id: 'wins', icon: '🏆', title: 'Win Log', desc: 'Proof that you are doing great.' },
];

export default function ADHDApp() {
  const [activeTab, setActiveTab] = useLocalStorage("activeTab", "dash");
  const [streak, setStreak] = useLocalStorage("streak", 0);
  const [wins, setWins] = useLocalStorage("wins_count", 0);
  const [tasks, setTasks] = useLocalStorage("global_tasks", []);

  // Dashboard View
  const Dashboard = () => (
    <div className="animate">
      <h2 className="card-title">Welcome Back.</h2>
      <p style={{ color: '#7b6fa0' }}>Your brain is an engine. These tools are the oil.</p>
      <div style={{ marginTop: '30px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div className="stat-item" style={{ textAlign: 'left' }}>
          <p className="stat-label">Active Focus</p>
          <p style={{ fontSize: '1.1rem', marginTop: '5px' }}>
            {tasks.length > 0 ? tasks[0] : "No active mission. Go to Hyper-Focus!"}
          </p>
        </div>
        <div className="stat-item" style={{ textAlign: 'left' }}>
          <p className="stat-label">Quick Tip</p>
          <p style={{ fontSize: '0.9rem', color: '#c4b5fd' }}>If it takes {"<"} 2 mins, do it now. If not, write it down.</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container">
      <style>{styles}</style>
      
      <header className="header">
        <div>
          <h1 style={{ fontFamily: 'Syne', fontSize: '1.5rem' }}>ADHD_OS v2.0</h1>
          <p style={{ fontSize: '0.8rem', color: '#7b6fa0' }}>SYSTEM STATUS: OPERATIONAL</p>
        </div>
        <div className="stats-bar">
          <div className="stat-item"><span className="stat-val">{streak}</span><span className="stat-label">Days</span></div>
          <div className="stat-item"><span className="stat-val">{wins}</span><span className="stat-label">Wins</span></div>
        </div>
      </header>

      <nav className="nav-grid">
        {TOOLS.map(tool => (
          <div 
            key={tool.id} 
            className={`nav-card ${activeTab === tool.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tool.id)}
          >
            <span className="icon">{tool.icon}</span>
            <span className="label">{tool.title}</span>
          </div>
        ))}
      </nav>

      <main className="main-card">
        {activeTab === 'dash' && <Dashboard />}
        {activeTab === 'dump' && (
          <div className="animate">
            <h2 className="card-title">The Brain Purge</h2>
            <p className="stat-label">Instructions: Write everything. Organize later.</p>
            <textarea style={{ height: '300px' }} placeholder="What is distracting you right now?" />
            <button className="btn" onClick={() => setWins(w => w + 1)}>I feel lighter</button>
          </div>
        )}
        {activeTab === 'focus' && (
          <div className="animate">
            <h2 className="card-title">Hyper-Focus Filter</h2>
            <p className="stat-label">What is the ONE thing that makes today a win?</p>
            <input 
              type="text" 
              placeholder="Enter your mission..." 
              onKeyDown={(e) => {
                if(e.key === 'Enter') {
                  setTasks([e.target.value]);
                  e.target.value = "";
                }
              }}
            />
            <div style={{ marginTop: '20px' }}>
              <p className="stat-label">Current Mission:</p>
              {tasks.map((t, i) => (
                <div key={i} className="stat-item" style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                  {t} <span style={{ cursor: 'pointer' }} onClick={() => {setTasks([]); setWins(w => w + 1)}}>✅</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Placeholder for other tools to keep code concise but scalable */}
        {['timer', 'energy', 'wins'].includes(activeTab) && (
          <div className="animate">
            <h2 className="card-title">Coming in v2.1</h2>
            <p>You've unlocked the core system. Keep using Brain Purge and Hyper-Focus to build your streak!</p>
          </div>
        )}
      </main>

      <footer style={{ marginTop: '40px', textAlign: 'center' }}>
        <button className="btn crisis-btn" onClick={() => alert("🚨 BREATHE. 5-4-3-2-1. Name 5 things you see. Name 4 things you can touch.")}>
          HELP: I AM SPIRALING
        </button>
      </footer>
    </div>
  );
}