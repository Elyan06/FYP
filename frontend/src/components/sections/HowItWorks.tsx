import { Upload, Brain, FileCheck, Sprout } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    number: 1,
    icon: Upload,
    title: "Upload Image",
    description: "Take a clear photo of your tomato or pepper plant leaf and upload it to our platform.",
  },
  {
    number: 2,
    icon: Brain,
    title: "AI Analysis",
    description: "Our CNN model analyzes cellular patterns and identifies potential diseases instantly.",
  },
  {
    number: 3,
    icon: FileCheck,
    title: "Get Results",
    description: "Receive instant diagnosis with confidence score and detailed disease information.",
  },
  {
    number: 4,
    icon: Sprout,
    title: "Take Action",
    description: "Follow our recommended treatment steps to protect and heal your crops effectively.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="section-padding bg-transparent relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container-tight mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            <span className="text-sm font-semibold text-primary">Simple Process</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Our AI-powered detection process is simple, fast, and accurate. Get results in just four easy steps.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent" style={{ width: 'calc(100% - 8rem)', marginLeft: '4rem' }} />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="premium-card p-6 text-center relative">
                {/* Step Number Badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center font-bold text-lg shadow-glow-primary z-10">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4 mx-auto mt-4 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
