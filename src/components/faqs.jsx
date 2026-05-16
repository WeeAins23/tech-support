import React from 'react';

export function FAQ() {
  const faqData = [
    { id: 1, question: "What are the basic features?", answer: "Lorem, ipsum..." },
    { id: 2, question: "How do I get started?", answer: "Lorem, ipsum..." },
    { id: 3, question: "What support options are available?", answer: "Lorem, ipsum..." }
  ];

  return (

    <div className="info-wrapper">
        <h1>Frequently Asked Questions</h1>
      {faqData.map((item) => (
        <details key={item.id} style={{ border: 'none' }}>
          <summary className="summary">
            <span>{item.question}</span>

            {/* Added exact width/height styles to fix the massive SVG */}
            <svg 
              style={{ width: '20px', height: '20px', flexShrink: 0 }} 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </summary>

          <div style={{ padding: '16px' }}>
            <p style={{ color: '#374151' }}>{item.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}