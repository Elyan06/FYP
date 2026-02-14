
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
    {
        question: "What is LeafGuardAI?",
        answer: "LeafGuardAI is an AI-powered system that detects diseases in plant leaves. You simply upload a leaf image, and the system analyzes it to determine whether the plant is healthy or affected."
    },
    {
        question: "Which plants are supported?",
        answer: "Currently, the system supports tomato and pepper plants. More crops may be added in future updates as the model is trained on additional datasets."
    },
    {
        question: "How does the system detect diseases?",
        answer: "LeafGuardAI uses a Convolutional Neural Network (CNN) trained on thousands of leaf images. The model identifies disease patterns based on color, texture, and shape."
    },
    {
        question: "How accurate is the detection?",
        answer: "The system provides high accuracy when the image is clear and well-fit. However, results may vary depending on image quality and leaf visibility."
    },
    {
        question: "Do I need an account to use the system?",
        answer: "Yes, creating an account allows you to save your detection history and access previous results. It also helps manage your profile and uploaded images."
    },
    {
        question: "Can this system replace an agricultural expert?",
        answer: "No, the system is designed as a support tool for quick detection. For serious plant health issues, consulting an agricultural expert is recommended."
    },
    {
        question: "Is my data safe and is LeafGuardAI free to use?",
        answer: "Yes, user data and images are stored securely using modern authentication and database systems, and your information is not shared without permission. The system is currently free for educational and research purposes, with possible additional features in future versions."
    }
];

const FAQ = () => {
    return (
        <section className="section-padding bg-white/40 backdrop-blur-sm">
            <div className="container max-w-4xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Frequently Asked Questions</h2>
                    <p className="text-slate-600 text-lg">
                        Everything you need to know about LeafGuardAI.
                    </p>
                </div>

                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, idx) => (
                        <AccordionItem key={idx} value={`item-${idx}`} className="border-b border-slate-200">
                            <AccordionTrigger className="text-lg font-medium text-slate-900 hover:text-emerald-600 hover:no-underline py-6">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-slate-600 text-lg leading-relaxed pb-6">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
};

export default FAQ;
