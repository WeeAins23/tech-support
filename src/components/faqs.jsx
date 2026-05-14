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
        <div className="relative w-full bg-white px-6 pt-10 pb-8 mt-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-2xl sm:rounded-lg sm:px-10">
            <div className="mx-auto px-5">
                <div className="flex flex-col items-center">
                    <h1 className="mt-3 text-lg text-neutral-500 md:text-xl">
                        Frequently Asked Questions
                    </h1>
                </div>
                <div className="mx-auto mt-8 grid max-w-xl divide-y divide-neutral-200">
                    {faqs.map((item, index) => (
                        <div key={index} className="py-5">
                            <details className="group">
                                <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                                    <span>{item.question}</span>
                                    <span className="transition group-open:rotate-180">
                                        <svg
                                            fill="none" 
                                            height="24" 
                                            shapeRendering="geometricPrecision"
                                            stroke="currentColor" 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round"
                                            strokeWidth="1.5" 
                                            viewBox="0 0 24 24" 
                                            width="24"
                                        >
                                            <path d="M6 9l6 6 6-6"></path>
                                        </svg>
                                    </span>
                                </summary>
                                <p className="group-open:animate-fadeIn mt-3 text-neutral-600">
                                    {item.answer}
                                </p>
                            </details>
                        </div>
                    ))}
                </div>
            </div>
            {/* Manual spacer at the bottom */}
            <div className="h-[100px]"></div>
        </div>
    );
};

export { FAQ };