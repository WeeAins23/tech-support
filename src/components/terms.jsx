import React from "react";

const Terms = () => {
  // Terms Of Use data
  const termsData = [
  {
    id: 1,
    title: "1. A Safe Place to Learn",
    content: "This website is a dedicated learning tool. Everything you see here is designed to teach you about technology in a protected environment. You will never be redirected to outside websites or asked for payment."
  },
  {
    id: 2,
    title: "2. Your Progress is Private",
    content: "We only save information about which lessons you have read so you can pick up where you left off. This data is linked only to your username and is never shared with third parties or advertisers."
  },
  {
    id: 3,
    title: "3. Educational Accuracy",
    content: "Our lessons are designed to be simple and easy to follow. While we strive for accuracy, technology changes fast! These guides are intended as a helpful starting point for your digital journey."
  }
];

  return (
    <div id="terms" className="info-wrapper">
      <h1>Terms of Use</h1>
      
      {termsData.map((item, index) => (
        <React.Fragment key={item.id}>
          <details style={{ border: 'none' }}>
            <summary className="summary">
              <span>{item.title}</span>
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
              <p className="answer">{item.content}</p>
            </div>
          </details>

          {/* Consistent divider line */}
          {index < termsData.length - 1 && <hr className="info-divider" />}
        </React.Fragment>
      ))}

      {/* Friendly Reminder box at the bottom */}
      <div className="reassurance-box">
        <h2>Friendly Reminder</h2>
        <p>
          You are doing a great job learning something new. These terms are just here to make sure this stays a safe place for everyone!
        </p>
      </div>
    </div>
  );
};

export { Terms };