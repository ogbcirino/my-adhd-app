import React, { useState, useEffect, useRef } from "react";

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

export default function ADHDApp() {
  const [activeTab, setActiveTab] = useLocalStorage("activeTab", "dash");
  const [wins, setWins] = useLocalStorage("wins_count", 0);
  const [tasks, setTasks] = useLocalStorage("global_tasks", []);
  const [history, setHistory] = useLocalStorage("task_history", []);
  const [purgeText, setPurgeText] = useLocalStorage("purge_text", "");
  const [theme, setTheme] = useLocalStorage("app_theme", "deep");
  
  const [timeLeft, setTimeLeft] = useState(300); 
  const [isActive, setIsActive] = useState(false);
  const [currentSound, setCurrentSound] = useState(null);
  const audioRef = useRef(new Audio());

  const themes = {
    deep: { bg: "#0a0a0f", card: "#12121e", accent: "#7c3aed", text: "#f0eeff" },
    neon: { bg: "#000000", card: "#0a0a0a", accent: "#00ff41", text: "#00ff41" },
    amber: { bg: "#1a120b", card: "#2c1e12", accent: "#d4a373", text: "#faedcd" }
  };

  const t = themes[theme];

  const styles = `
    :root { --bg: ${t.bg}; --card: ${t.card}; --accent: ${t.accent}; --text: ${t.text}; --gradient: linear-gradient(135deg, ${t.accent} 0%, #ec4899 100%); }
    body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--text); margin: 0; transition: all 0.4s ease; }
    .container { max-width: 900px; margin: 0 auto; padding: 40px 20px; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .nav-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(90px, 1fr)); gap: 10px; margin-bottom: 30px; }
    .nav-card { background: var(--card); padding: 12px; border-radius: 12px; text-align: center; cursor: pointer; border: 1px solid #333; transition: 0.2s; font-size: 0.75rem; font-weight: bold; }
    .nav-card.active { background: var(--accent); color: var(--bg); border-color: transparent; }
    .main-card { background: var(--card); border-radius: 20px; padding: 40px; border: 1px solid #333; min-height: 450px; }
    .btn { background: var(--accent); color: var(--bg); border: none; padding: 12px 24px; border-radius: 8px; font-weight: 700; cursor: pointer; margin-top: 15px; }
    .stat-box { background: rgba(255,255,255,0.05); padding: 12px; border-radius: 10px; border: 1px solid #444; margin-bottom: 10px; }
    input, textarea { width: 100%; background: rgba(0,0,0,0.3); border: 1px solid #444; border-radius: 8px; padding: 14px; color: var(--text); margin-top: 10px; font-family: inherit; }
  `;

  const toggleSound = (key) => {
    const sounds = {
      rain: "https://www.soundjay.com/nature/rain-01.mp3",
      white: "https://www.soundjay.com/misc/white-noise-01.mp3",
      cafe: "https://www.soundjay.com/misc/soundshell-1.mp3"
    };
    if (currentSound === key) { audioRef.current.pause(); setCurrentSound(null); } 
    else { audioRef.current.src = sounds[key]; audioRef.current.loop = true; audioRef.current.play(); setCurrentSound(key); }
  };

  const handleComplete = (taskName) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setHistory([{ name: taskName, time: timestamp }, ...history].slice(0, 50));
    setWins(prev => prev + 1);
    setTasks(prev => prev.filter(item => item !== taskName));
  };

  return (
    <div className="container">
      <style>{styles}</style>
      <header className="header">
        <h1>ADHD_OS</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          {Object.keys(themes).map(name => (
            <button key={name} onClick={() => setTheme(name)} style={{ width: '20px', height: '20px', borderRadius: '50%', border: 'none', cursor: 'pointer', background: themes[name].accent }} />
          ))}
        </div>
      </header>

      <nav className="nav-grid">
        {['dash', 'dump', 'focus', 'timer', 'history'].map(tab => (
          <div key={tab} className={`nav-card ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
            {tab.toUpperCase()}
          </div>
        ))}
      </nav>

      <main className="main-card">
        {activeTab === 'dash' && (
          <div>
            <h2>Dashboard</h2>
            <div className="stat-box"><strong>Dopamine Balance:</strong> {wins}</div>
            <div style={{ marginTop: '20px' }}>
              <h3>Ambient Control</h3>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button className="nav-card" onClick={() => toggleSound('rain')}>🌧️ Rain</button>
                <button className="nav-card" onClick={() => toggleSound('white')}>🌫️ White</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'dump' && (
          <div>
            <h2>Brain Purge</h2>
            <textarea rows="10" value={purgeText} onChange={(e) => setPurgeText(e.target.value)} placeholder="One task per line..." />
            <button className="btn" onClick={() => { setTasks([...tasks, ...purgeText.split('\n').filter(l => l.trim())]); setPurgeText(""); setActiveTab("focus"); }}>Convert</button>
          </div>
        )}

        {activeTab === 'focus' && (
          <div>
            <h2>Focus List</h2>
            <input placeholder="New mission..." onKeyDown={(e) => { if(e.key === 'Enter' && e.target.value) { setTasks([...tasks, e.target.value]); e.target.value = ""; }}} />
            {tasks.map((t, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px' }}>
                {t} <button onClick={() => handleComplete(t)}>DONE</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'timer' && (
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '6rem' }}>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</h2>
            <button className="btn" onClick={() => setIsActive(!isActive)}>{isActive ? "PAUSE" : "START"}</button>
          </div>
        )}

        {activeTab === 'history' && (
          <div>
            <h2>Win Log</h2>
            {history.map((h, i) => <div key={i} className="stat-box" style={{ display: 'flex', justifyContent: 'space-between' }}><span>{h.name}</span><span>{h.time}</span></div>)}
          </div>
        )}
      </main>
    </div>
  );
}