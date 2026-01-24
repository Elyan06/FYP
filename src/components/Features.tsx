
import { Zap, ShieldCheck, Cpu, Leaf, Brain, Activity } from "lucide-react";
import { motion } from "framer-motion";

const features = [
    {
        icon: Zap,
        title: "Instant Analysis",
        description: "Get results in under 2 seconds using our optimized CNN model. Fast, reliable detection."
    },
    {
        icon: Brain,
        title: "Advanced AI Model",
        description: "Powered by a custom CNN architecture trained on thousands of plant pathology images."
    },
    {
        icon: ShieldCheck,
        title: "Privacy First",
        description: "All analysis happens directly in your browser. Your images never leave your device."
    },
    {
        icon: Leaf,
        title: "38+ Disease Classes",
        description: "Specialized detection for common tomato and pepper diseases with 95% accuracy."
    },
    {
        icon: Cpu,
        title: "CNN-Based Detection",
        description: "State-of-the-art Convolutional Neural Network for precise disease identification."
    },
    {
        icon: Activity,
        title: "Real-time Advice",
        description: "Get immediate treatment recommendations alongside every diagnosis."
    }
];

const Features = () => {
    return (
        <section className="section-padding bg-white/40 backdrop-blur-sm relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            </div>

            <div className="container-tight mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                        <span className="w-2 h-2 rounded-full bg-primary"></span>
                        <span className="text-sm font-semibold text-primary">Why Choose Our Platform</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
                        Professional-grade precision for your crops
                    </h2>
                    <p className="text-xl text-muted-foreground">
                        We handle the complexity of machine learning so you can focus on maximizing yield and protecting your harvest.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="premium-card p-8 group"
                        >
                            <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <feature.icon className="w-7 h-7 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
