import React from "react";

const Terms = () => {
  return (
    <div id="terms" className="w-full min-h-screen bg-white font-sans">
      <div className="container mx-auto px-10 py-12">
        
        <h1 
        style={{ color: 'black', textTransform: 'uppercase', paddingBottom: '12px' }}
        className="!text-black text-5xl font-extrabold mb-10 border-b-4 border-[#26d9ca] pb-4 !uppercase">
          Terms Of Use
        </h1>

        <div className="space-y-8 text-black">
          <section>
            <h2 className="text-3xl font-bold mb-4 uppercase">1. Our Agreement</h2>
            <p className="text-xl leading-relaxed">
              By using this website, you agree to use it for learning and practice. This is a friendly community designed to help you feel more confident with technology.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4 uppercase">2. Safe Learning</h2>
            <p className="text-xl leading-relaxed">
              This site is a simulation. The actions you take here stay here. You aren't sending "real" emails to the outside world, so you can practice without worry.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4 uppercase">3. Your Responsibility</h2>
            <p className="text-xl leading-relaxed">
              We ask that you treat the website and other learners with respect. Please do not attempt to use this site for any purpose other than learning support.
            </p>
          </section>

          <section className="bg-gray-100 p-6 rounded-lg border-l-8 border-[#26d9ca]">
            <h2 className="text-2xl font-bold mb-2">Friendly Reminder</h2>
            <p className="text-lg">
              You are doing a great job learning something new. These terms are just here to make sure this stays a safe place for everyone!
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;