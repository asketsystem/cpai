import React, { useState } from 'react';
import './App.css';
import OfflineContentForm from './components/OfflineContentForm';
import CompressContentForm from './components/CompressContentForm';
import AdaptContentForm from './components/AdaptContentForm';

function App() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, name: 'Offline Content', component: <OfflineContentForm /> },
    { id: 1, name: 'Compress Content', component: <CompressContentForm /> },
    { id: 2, name: 'Adapt Content', component: <AdaptContentForm /> },
  ];

  return (
    <div className="App">
      <header className="App-header">
        <h1>🧠 Contextually Personal AI</h1>
        <p>Advanced Adaptation Models - Phase 4</p>
      </header>

      <main className="App-main">
        <div className="tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.name}
            </button>
          ))}
        </div>

        <div className="tab-content">
          {tabs[activeTab].component}
        </div>
      </main>

      <footer className="App-footer">
        <p>Human-Centered Intelligence for Africa's Future</p>
      </footer>
    </div>
  );
}

export default App;
