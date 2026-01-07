import { useState } from "react";
import "./faq.css";

const faqData = [
  {
    question: "Do you offer freelance web development services?",
    answer:
      "Yes, I provide professional freelance web development services including landing pages, business websites, and web apps.",
  },
  {
    question: "What technologies do you use?",
    answer:
      "I primarily work with React, Next.js, Tailwind CSS, JavaScript, and modern UI frameworks.",
  },
  {
    question: "How long does a project usually take?",
    answer:
      "Project timelines depend on complexity, but most websites are completed within 5-14 days.",
  },
  {
    question: "Do you provide website maintenance?",
    answer:
      "Yes, I offer ongoing maintenance, updates, bug fixes, and performance optimization services.",
  },
  {
    question: "Will my website be mobile responsive?",
    answer:
      "Absolutely. Every website I build is fully responsive and optimized for all devices.",
  },
  {
    question: "How much do you charge for a website?",
    answer:
      "Pricing varies based on requirements. Contact me with details and I'll provide a custom quote.",
  },
  
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2 className="faq-title">Frequently Asked Questions</h2>

      {faqData.map((item, index) => (
        <div className="faq-item " key={index}>
          <button className="faq-question" onClick={() => toggleFAQ(index)}>
            <span>{item.question}</span>
            <span className="faq-icon">
              {activeIndex === index ? "-" : "+"}
            </span>
          </button>

          {activeIndex === index && (
            <div className="faq-answer">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
