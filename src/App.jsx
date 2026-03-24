import React, { useState, useEffect } from "react";

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

const styles = `
:root { --bg: #0a0a0f; --card: #12121e; --accent: #7c3aed; --text: #f0eeff; --gradient: linear-gradient(135deg, #7c3aed 0%, #ec4899 100%); }
body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--text); margin: 0; }
.container { max-width: 900px; margin: 0 auto; padding: 40px 20px; }
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
.nav-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 10px; margin-bottom: 30px; }
.nav-card { background: var(--card); padding: 15px; border-radius: 12px; text-align: center; cursor: pointer; border: 1px solid #222; transition: 0.2s; font-weight: bold; }
.nav-card.active { background: var(--gradient); border-color: transparent; }
.main-card { background: var(--card); border-radius: 20px; padding: 40px; border: 1px solid #222; min-height: 400px; animation: fadeIn 0.3s ease; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
.btn { background: var(--gradient); color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 700; cursor: pointer; margin-top: 15px; }
.stat-box { background: #080810; padding: 15px; border-radius: 10px; border: 1px solid #2a2a45; margin-bottom: 10px; }
input, textarea { width: 100%; background: #080810; border: 1px solid #2a2a45; border-radius: 8px; padding: 14px; color: white; margin-top: 10px; font-family: inherit; font-size: 1rem; }
.task-item { display: flex; justify-content: space-between; align-items: center; background: #1a1a2e; padding: 12px; border-radius: 8px; margin-top: 8px; border-left: 4px solid #7c3aed; }
`;

export default function ADHDApp() {
  const [activeTab, setActiveTab] = useLocalStorage("activeTab", "dash");
  const [wins, setWins] = useLocalStorage("wins_count", 0);
  const [tasks, setTasks] = useLocalStorage("global_tasks", []);
  const [purgeText, setPurgeText] = useLocalStorage("purge_text", "");
  
  const [timeLeft, setTimeLeft] = useState(300); 
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      setIsActive(false);
      setWins(prev => prev + 1);
      alert("Burst Complete! +1 Win earned.");
      setTimeLeft(300);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, setWins]);

  const handleConvert = () => {
    const newTasks = purgeText.split('\n').filter(line => line.trim() !== "");
    setTasks([...tasks, ...newTasks]);
    setPurgeText("");
    setActiveTab("focus");
  };

  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <div className="container">
      <style>{styles}</style>
      <header className="header">
        <h1>ADHD_OS</h1>
        <div className="stat-box">Total Wins: <span style={{ color: '#f9a8d4' }}>{wins}</span></div>
      </header>

      <nav className="nav-grid">
        {['dash', 'dump', 'focus', 'timer'].map(tab => (
          <div key={tab} className={`nav-card ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
            {tab.toUpperCase()}
          </div>
        ))}
      </nav>

      <main className="main-card">
        {activeTab === 'dash' && (
          <div>
            <h2>Command Center</h2>
            <div className="stat-box">
              <strong>Active Mission Queue:</strong>
              <p>{tasks.length > 0 ? `${tasks.length} tasks pending.` : "No active tasks."}</p>
            </div>
          </div>
        )}

        {activeTab === 'dump' && (
          <div>
            <h2>Brain Purge</h2>
            <p style={{color: 'var(--muted)'}}>Write your thoughts (one per line). Hit convert to move them to Focus.</p>
            <textarea 
              rows="10" 
              value={purgeText} 
              onChange={(e) => setPurgeText(e.target.value)} 
              placeholder="E.g.&#10;Pay rent&#10;Email Sarah&#10;Buy groceries" 
            />
            <button className="btn" onClick={handleConvert}>Convert to Tasks →</button>
          </div>
        )}

        {activeTab === 'focus' && (
          <div>
            <h2>The Focus List</h2>
            <input 
              placeholder="Add a single mission..." 
              onKeyDown={(e) => { if(e.key === 'Enter' && e.target.value) { setTasks([...tasks, e.target.value]); e.target.value = ""; }}} 
            />
            {tasks.map((t, i) => (
              <div key={i} className="task-item">
                {t} 
                <button className="btn" style={{marginTop: 0, padding: '5px 10px'}} onClick={() => {
                  setTasks(tasks.filter((_, index) => index !== i));
                  setWins(wins + 1);
                }}>DONE</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'timer' && (
          <div style={{ textAlign: 'center' }}>
            <h2>Micro-Burst</h2>
            <div style={{ fontSize: '5rem', margin: '20px 0', color: '#7c3aed' }}>{formatTime(timeLeft)}</div>
            <button className="btn" onClick={() => setIsActive(!isActive)}>{isActive ? "PAUSE" : "START 5 MINS"}</button>
          </div>
        )}
      </main>
    </div>
  );
}