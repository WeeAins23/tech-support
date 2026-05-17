import React from "react";

const PrivacyPolicy = () => {
  const policyData = [
    {
      id: 1,
      title: "Our Promise",
      content: "Your privacy is very important to us. We designed this website so you can learn about technology safely without worrying about your personal information being sold or shared."
    },
    {
      id: 2,
      title: "Information We Collect",
      content: "We only collect a username and a password so that you can log back in and see your progress. We do not ask for your real name, address, or bank details."
    },
    {
      id: 3,
      title: "How We Use Your Data",
      content: "We only use your information to: Remember which lessons you have finished, keep your account secure, and improve our website for other learners."
    },
    {
      id: 4,
      title: "No Hidden Costs",
      content: "This website is 100% free. We will never send you emails asking for money or try to sell you anything."
    }
  ];

  return (
    <div className="info-wrapper">
      <h1>Privacy Policy</h1>
      
      {policyData.map((item, index) => (
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

          {/* Consistent divider line matching the FAQ page */}
          {index < policyData.length - 1 && <hr className="info-divider" />}
        </React.Fragment>
      ))}

      {/* Reassurance box at the bottom */}
      <div className="reassurance-box">
        <h2>Need help?</h2>
        <p>
          If you have any questions about your information, please visit our <b>FAQs</b> page or talk to your local support group.
        </p>
      </div>
    </div>
  );
};

export { PrivacyPolicy };