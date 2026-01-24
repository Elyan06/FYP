
import { Leaf, Twitter, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">
                LeafGuard<span className="text-emerald-600">AI</span>
              </span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              Empowering farmers with enterprise-grade computer vision technology for early disease detection and crop protection.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="p-2 rounded-full bg-slate-200 text-slate-600 hover:bg-emerald-100 hover:text-emerald-600 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-slate-200 text-slate-600 hover:bg-emerald-100 hover:text-emerald-600 transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-slate-200 text-slate-600 hover:bg-emerald-100 hover:text-emerald-600 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h4 className="font-bold text-slate-900 mb-6">Product</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#detect" className="text-slate-600 hover:text-emerald-600 transition-colors">Diagnosis Engine</a></li>
              <li><a href="#features" className="text-slate-600 hover:text-emerald-600 transition-colors">API Access</a></li>
              <li><a href="#pricing" className="text-slate-600 hover:text-emerald-600 transition-colors">Enterprise Solutions</a></li>
              <li><a href="#monitor" className="text-slate-600 hover:text-emerald-600 transition-colors">Field Monitoring</a></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="font-bold text-slate-900 mb-6">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-slate-600 hover:text-emerald-600 transition-colors">Documentation</a></li>
              <li><a href="#" className="text-slate-600 hover:text-emerald-600 transition-colors">Plant Pathology Guide</a></li>
              <li><a href="#" className="text-slate-600 hover:text-emerald-600 transition-colors">Community Forum</a></li>
              <li><a href="#" className="text-slate-600 hover:text-emerald-600 transition-colors">Help Center</a></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="font-bold text-slate-900 mb-6">Stay Updated</h4>
            <p className="text-slate-600 text-sm mb-4">
              Get the latest updates on agricultural AI research.
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="Enter email"
                className="bg-white border-slate-200 focus-visible:ring-emerald-500"
              />
              <Button size="icon" className="bg-emerald-600 hover:bg-emerald-700">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © 2024 LeafGuard AI. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-emerald-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
