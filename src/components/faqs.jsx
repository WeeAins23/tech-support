import React from 'react';

export function FAQ() {
  const faqData = [
    { id: 1, question: "Is this website free to use?", answer: "Yes! All the lessons, games, and practice modules on Tech Support are completely free to use. Our goal is to help you feel confident using your computer at your own pace." },
    { id: 2, question: "Do I have to register to use the site?", answer: "While you can look at some parts of the site without an account, registering will grant you access to our modules and keep track of your progress!" },
    { id: 3, question: "What do I do if I forget my password?", answer: "Don't worry! On the Login page, you can click 'Forgot Password' to reset it." },
    { id: 4, question: "How do I know if I have finished a lesson?", answer: "Once you finish a reading module or a game, look at your Dashboard. A 'Complete' message will appear next to that lesson to show you've done it" },
    { id: 5, question: "Can I do the same lesson more than once?", answer: "Absolutely! You can go back to any module as many times as you like until you feel comfortable with the topic. Our games even have a best time recorded so you can always try and beat your previous best!" },
    { id: 6, question: "What is the 'Mouse Practice' game for?", answer: "The Mouse Practice game is designed to help you get used to moving the cursor and clicking on specific items. It's a great way to build 'muscle memory' for using a computer mouse." },
    { id: 7, question: "Is my information safe on this website?", answer: "Yes. We only ask for a name and a username to save your progress. We do not share your details with anyone else, and we don't ask for any private financial information." },
    { id: 8, question: "Can I use this website on my Tablet or Phone?", answer: "Yes! The website is designed to grow or shrink to fit your screen. However some of the games will be unavailable depending on what device you are on e.g. you can't play Mouse Practice on mobile or tablet as they don't have a mouse connected to them." }
  ];

  return (
  <div className="info-wrapper">
    <h1>Frequently Asked Questions</h1>
    {faqData.map((item, index) => (
      <React.Fragment key={item.id}>
        <details style={{ border: 'none' }}>
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

        {/* This adds the line after every item EXCEPT the last one */}
        {index < faqData.length - 1 && <hr className="info-divider" />}
      </React.Fragment>
    ))}
  </div>
  );
}