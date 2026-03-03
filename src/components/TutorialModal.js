import React, { useEffect, useState } from 'react';
import '../styles/TutorialModal.css';

export default function TutorialModal({ onClose }) {
  const [visibleSteps, setVisibleSteps] = useState(0);

  useEffect(() => {
    // sequentially reveal each list item
    if (visibleSteps < 5) {
      const timer = setTimeout(() => setVisibleSteps(v => v + 1), 400);
      return () => clearTimeout(timer);
    }
  }, [visibleSteps]);

  // generate a few confetti pieces for visual flair
  const confetti = Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    emoji: ['🎉', '✨', '🌿', '💚'][i % 4],
    style: {
      left: `${10 + i * 15}%`,
      animationDelay: `${Math.random() * 1}s`
    }
  }));

  return (
    <div className="tutorial-modal" onClick={onClose}>
      {confetti.map(p => (
        <span key={p.id} className="confetti" style={p.style}>
          {p.emoji}
        </span>
      ))}

      <div className="tutorial-content" onClick={e => e.stopPropagation()}>
        <button
          className="tutorial-close"
          type="button"
          onClick={onClose}
          aria-label="Close tutorial"
        >
          ×
        </button>

        <div className="bin-animation" role="img" aria-label="bin">
          🗑️
        </div>

        <h2>How to Recycle</h2>
        <ol>
          <li className={visibleSteps >= 1 ? 'step visible' : 'step'}>Check the item label to make sure it is recyclable.</li>
          <li className={visibleSteps >= 2 ? 'step visible' : 'step'}>Walk over to one of our EcoDrop smart bins.</li>
          <li className={visibleSteps >= 3 ? 'step visible' : 'step'}>Open the lid or follow on-screen instructions on the bin display.</li>
          <li className={visibleSteps >= 4 ? 'step visible' : 'step'}>Drop your item inside and let the bin take care of the rest.</li>
          <li className={visibleSteps >= 5 ? 'step visible' : 'step'}>Keep track of your eco points in the dashboard!</li>
        </ol>
      </div>
    </div>
  );
}
