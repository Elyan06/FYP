import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

const SampleComparison = () => {
    return (
        <section className="section-padding bg-white/40 backdrop-blur-sm relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
            </div>

            <div className="container-tight mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                        <span className="w-2 h-2 rounded-full bg-primary"></span>
                        <span className="text-sm font-semibold text-primary">Visual Guide</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
                        Healthy vs Diseased Leaves
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Learn to identify the difference between healthy and diseased plant leaves for better crop management.
                    </p>
                </motion.div>

                {/* Comparison Grid */}
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Healthy Leaf */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="premium-card overflow-hidden group"
                    >
                        <div className="aspect-square bg-gradient-to-br from-green-50 to-green-100/50 relative overflow-hidden">
                            <img
                                src="/healthy_tomato_leaf_1768465422066.png"
                                alt="Healthy tomato leaf"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                                <CheckCircle className="w-5 h-5" />
                                <span className="font-semibold">Healthy</span>
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-foreground mb-3">Healthy Leaf Characteristics</h3>
                            <ul className="space-y-2 text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>Vibrant, uniform green color</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>Smooth texture without spots</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>No discoloration or wilting</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>Firm and turgid structure</span>
                                </li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* Diseased Leaf */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="premium-card overflow-hidden group"
                    >
                        <div className="aspect-square bg-gradient-to-br from-amber-50 to-amber-100/50 relative overflow-hidden">
                            <img
                                src="/diseased_tomato_leaf_1768465437835.png"
                                alt="Diseased tomato leaf"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-4 right-4 bg-amber-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                                <XCircle className="w-5 h-5" />
                                <span className="font-semibold">Diseased</span>
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-foreground mb-3">Disease Warning Signs</h3>
                            <ul className="space-y-2 text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <XCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                                    <span>Brown or yellow spots on leaves</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <XCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                                    <span>Irregular discoloration patterns</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <XCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                                    <span>Wilting or curling edges</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <XCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                                    <span>Lesions or necrotic tissue</span>
                                </li>
                            </ul>
                        </div>
                    </motion.div>
                </div>

                {/* Info Box */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="mt-12 max-w-3xl mx-auto premium-card p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20"
                >
                    <p className="text-center text-muted-foreground">
                        <span className="font-semibold text-foreground">Early detection is key!</span> Upload photos of your leaves regularly to catch diseases before they spread. Our AI can detect subtle changes that might be invisible to the naked eye.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default SampleComparison;
