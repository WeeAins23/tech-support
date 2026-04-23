import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="w-full min-h-screen bg-white font-sans">
      {/* Side gutters for readability (px-6 to px-12) */}
      <div className="max-w-4xl mx-auto px-6 py-12 md:px-12 text-left">
        
        <h1 className="!text-black text-5xl font-extrabold mb-10 border-b-4 border-[#26d9ca] pb-4 uppercase leading-tight">
          Privacy Policy
        </h1>

        <div className="space-y-8 text-black">
          <section>
            <h2 className="text-3xl font-bold mb-4 uppercase">Our Promise</h2>
            <p className="text-xl leading-relaxed">
              Your privacy is very important to us. We designed this website so you can learn about technology safely without worrying about your personal information being sold or shared.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4 uppercase">Information We Collect</h2>
            <p className="text-xl leading-relaxed">
              We only collect a **username** and a **password** so that you can log back in and see your progress. We do not ask for your real name, address, or bank details.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4 uppercase">How We Use Your Data</h2>
            <p className="text-xl leading-relaxed mb-4">
              We only use your information to:
            </p>
            <ul className="list-disc pl-8 space-y-2 text-xl">
              <li>Remember which lessons you have finished.</li>
              <li>Keep your account secure.</li>
              <li>Improve our website for other learners.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4 uppercase">No Hidden Costs</h2>
            <p className="text-xl leading-relaxed">
              This website is 100% free. We will never send you emails asking for money or try to sell you anything.
            </p>
          </section>

          <section className="bg-gray-100 p-6 rounded-lg border-l-8 border-[#26d9ca]">
            <h2 className="text-2xl font-bold mb-2">Need help?</h2>
            <p className="text-lg">
              If you have any questions about your information, please visit our **FAQs** page or talk to your local support group.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;