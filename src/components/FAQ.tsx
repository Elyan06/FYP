
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
    {
        question: "How accurate is the detection model?",
        answer: "Our model currently achieves a 98.5% validation accuracy on the benchmark dataset. However, real-world results may vary depending on lighting and image quality."
    },
    {
        question: "Is my data private?",
        answer: "Yes. LeafGuardAI runs entirely in your browser using TensorFlow.js. Your photos are never uploaded to any server, ensuring complete privacy."
    },
    {
        question: "Which plants are supported?",
        answer: "Currently, we specialize in Tomato and Pepper plants. We support detection for common diseases like Early Blight, Late Blight, Bacterial Spot, and more."
    },
    {
        question: "Does it work offline?",
        answer: "Yes! Once the website loads, the model is cached in your browser. You can use the detection feature even without an active internet connection."
    },
    {
        question: "Is this tool free to use?",
        answer: "LeafGuardAI is currently a free research prototype. We believe in open access to agricultural technology."
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
