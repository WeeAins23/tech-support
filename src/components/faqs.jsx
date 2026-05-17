import React from 'react';

export function FAQ() {
  const faqData = [
    { id: 1, question: "Is this website free to use?", answer: "Yes! All the lessons, games, and practice modules on Tech Support are completely free to use. Our goal is to help you feel confident using your computer at your own pace." },
    { id: 2, question: "Do I have to register to use the site?", answer: "While you can look at some parts of the site without an account, registering will grant you access to our modules and keep track of your progress!" },
    { id: 3, question: "How do I know if I have finished a lesson?", answer: "Once you finish a reading module or a game, look at your Dashboard. A 'Complete' message will appear next to that lesson to show you've done it" }
  ];

  return (
    <div className="info-wrapper">
        <h1>Frequently Asked Questions</h1>
      {faqData.map((item) => (
        <details key={item.id} style={{ border: 'none' }}>
          <summary className="summary">
            <span>{item.question}</span>
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

          <div className="answer-container">
            <p className="answer">{item.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}