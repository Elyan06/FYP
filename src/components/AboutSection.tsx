import { Target, Zap, Layers, Users } from "lucide-react";
import healthyPlant from "@/assets/healthy-plant.jpg";

const features = [
  {
    icon: Target,
    title: "High Accuracy",
    description: "Trained on thousands of images for precise disease identification.",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Get analysis results in under 2 seconds with our optimized AI.",
  },
  {
    icon: Layers,
    title: "Multiple Diseases",
    description: "Detects 38+ disease classes across tomato and pepper crops.",
  },
  {
    icon: Users,
    title: "Farmer Friendly",
    description: "Simple interface designed for farmers of all technical levels.",
  },
];

const stats = [
  { value: "38+", label: "Disease Classes Detected" },
  { value: "95%", label: "Accuracy" },
  { value: "<2s", label: "Speed" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Empowering Farmers with AI Technology
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              LeafGuard AI is a Final Year Project dedicated to helping farmers detect crop diseases early. Our machine learning model is trained on the PlantVillage dataset, specifically optimized for tomato and pepper disease detection.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Early disease detection can save up to 30% of crop losses, helping farmers maintain healthy yields and sustainable farming practices.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              {features.map((feature) => (
                <div 
                  key={feature.title}
                  className="flex items-start gap-3 p-4 rounded-xl bg-card shadow-soft"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">{feature.title}</h4>
                    <p className="text-muted-foreground text-xs leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Stats */}
          <div className="bg-gradient-primary rounded-3xl p-8 md:p-12">
            {/* Image */}
            <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
              <img 
                src={healthyPlant} 
                alt="Healthy tomato plant with water droplets" 
                className="w-full h-48 md:h-56 object-cover"
              />
            </div>
            
            <div className="grid gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center md:text-left">
                  <div className="text-4xl md:text-5xl font-bold text-primary-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-primary-foreground/80 font-medium text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
