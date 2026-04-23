import React from "react";

const FAQ = () => {
    const faqs = [
        {
            question: "Is this safe to use?",
            answer: "Yes! This is a practice website. You cannot break your computer or spend any money here."
        },
        {
            question: "What is a 'Browser'?",
            answer: "A browser is simply the 'window' you use to look at the internet, like the one you are using right now."
        },
        {
            question: "What if I get lost or click the wrong button?",
            answer: "Don't worry! You can always click the logo in the top left corner to return to the homepage."
        },
        {
            question: "What is a 'Scam' email?",
            answer: "A scam is a trick that scammers use to try to steal your information. They often look like they are from a company you know, but they are not. They may ask you to click on a link or download something, which can be dangerous. Don't worry, we will teach you how to spot these scams and stay safe online!"
        },
        {
            question: "What happens to the information I type in?",
            answer: "We only save your name so you can track your progress through the lessons. Your password is kept scrambled and safe."
        },
        {
            question: "Can I use this on my phone or tablet?",
            answer: "While we recommend a computer with a keyboard and mouse for most lessons, the website is designed to work on tablets and smartphones as well."
        }
    ];

    return (
        <div className="max-w-4xl mx-auto px-6 py-12 md:px-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl font-black text-black mb-10 border-b-4 border-black pb-4">Frequently Asked Questions</h1>
                <div className="space-y-8">
                    {faqs.map((item, index) => (
                        <div key={index} className="border-2 border-black p-6 rounded-lg bg--gray-50">
                            <h2 className="text-xl font-bold text-black mb-4">{item.question}</h2>
                            <p className="text-xl text-gray-800 leading-relaxed">{item.answer}</p>
                        </div>
                    ))}
                </div>
            </div>  
        </div>
    );
};

export default FAQ;