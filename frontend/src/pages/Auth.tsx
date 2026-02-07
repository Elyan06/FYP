import { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { User, ShieldCheck, UserCheck, Briefcase } from "lucide-react";
import { supabase, signInWithOAuth } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Leaf, Mail, Lock, Eye, EyeOff, ArrowLeft, Github, LogIn, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";

const emailSchema = z.string().email("Please enter a valid email address");
const passwordSchema = z.string().min(6, "Password must be at least 6 characters");

const Auth = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');
  const [isLogin, setIsLogin] = useState(mode !== 'signup');
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("farmer");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
  }>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleOAuthSignIn = async (provider: 'google' | 'github') => {
    try {
      setLoading(true);
      await signInWithOAuth(provider);
    } catch (error) {
      console.error('OAuth error:', error);
      toast({
        title: `Error signing in with ${provider}`,
        description: error instanceof Error ? error.message : 'An error occurred',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsLogin(mode !== 'signup');
  }, [mode]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          navigate("/");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const validateForm = () => {
    const newErrors: {
      fullName?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
      terms?: string;
    } = {};

    if (!isLogin && !fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) {
      newErrors.email = emailResult.error.errors[0].message;
    }

    const passwordResult = passwordSchema.safeParse(password);
    if (!passwordResult.success) {
      newErrors.password = passwordResult.error.errors[0].message;
    }

    if (!isLogin) {
      if (password !== confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
      if (!agreeTerms) {
        newErrors.terms = "You must agree to the terms";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          toast({
            title: "Login failed",
            description: error.message.includes("Invalid login credentials")
              ? "Invalid email or password. Please try again."
              : error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Welcome back!",
            description: "You have successfully logged in.",
          });
        }
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              full_name: fullName,
              role: role,
            }
          },
        });

        if (error) {
          toast({
            title: "Registration failed",
            description: error.message.includes("already registered")
              ? "This email is already registered. Please login instead."
              : error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Account created!",
            description: "Check your email for confirmation or start using the platform.",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-background">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 z-10" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden z-20 items-center justify-center p-12">
        <div className="max-w-md w-full">
          <div className="w-20 h-20 rounded-3xl bg-primary/10 backdrop-blur-sm flex items-center justify-center mb-8 border border-primary/20 shadow-glow-primary">
            <Leaf className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight">
            Advanced Intelligence for <span className="text-primary font-extrabold italic underline decoration-accent/30 underline-offset-8">Sustainable</span> Farming
          </h1>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            Join thousands of modern farmers using AI to protect their crops and optimize health in real-time.
          </p>

          <div className="space-y-6 text-foreground/80">
            <div className="flex items-center gap-4 bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-white/50 shadow-soft">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="font-bold">Verified Accuracy</div>
                <div className="text-sm text-muted-foreground">95% success rate in field tests</div>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-white/50 shadow-soft">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6 text-accent" />
              </div>
              <div>
                <div className="font-bold">Instant Diagnosis</div>
                <div className="text-sm text-muted-foreground">Results in under 2 seconds</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 relative z-20">
        <Link
          to="/"
          className="absolute top-6 left-6 flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-all group"
        >
          <div className="w-8 h-8 rounded-full bg-white shadow-soft flex items-center justify-center mr-2 group-hover:scale-110 transition-transform">
            <ArrowLeft className="w-4 h-4" />
          </div>
          Back to Platform
        </Link>

        <div className="w-full max-w-lg bg-white/80 backdrop-blur-xl p-8 sm:p-10 rounded-[2.5rem] shadow-medium border border-white/50 relative overflow-hidden">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 mb-4 lg:hidden">
              <Leaf className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-3">
              {isLogin ? "Welcome Back" : "Get Started"}
            </h2>
            <p className="text-muted-foreground">
              {isLogin
                ? "Enter your credentials to manage your farm profile"
                : "Create your agricultural precision account today"}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {!isLogin && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
                    <Input
                      id="fullName"
                      placeholder="Jane Farmer"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="pl-10 h-12 bg-white/50 border-primary/10 focus:border-primary focus:ring-primary/20 transition-all rounded-xl"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Your Role</Label>
                  <Select onValueChange={setRole} defaultValue={role}>
                    <SelectTrigger className="h-12 bg-white/50 border-primary/10 focus:border-primary rounded-xl">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-primary/10">
                      <SelectItem value="farmer">Modern Farmer</SelectItem>
                      <SelectItem value="researcher">Agricultural Researcher</SelectItem>
                      <SelectItem value="student">Student / Academic</SelectItem>
                      <SelectItem value="other">Other Professional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@farm.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 bg-white/50 border-primary/10 focus:border-primary focus:ring-primary/20 transition-all rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 bg-white/50 border-primary/10 focus:border-primary rounded-xl"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Confirm</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`h-12 bg-white/50 border-primary/10 focus:border-primary rounded-xl ${errors.confirmPassword ? "border-destructive" : ""}`}
                  />
                </div>
              )}
            </div>

            {!isLogin && (
              <div className="flex items-start space-x-3 py-2">
                <Checkbox
                  id="terms"
                  checked={agreeTerms}
                  onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                  className="mt-1 border-primary/30 data-[state=checked]:bg-primary"
                />
                <Label htmlFor="terms" className="text-sm leading-snug text-muted-foreground font-normal">
                  I agree to the <Link to="#" className="text-primary font-bold hover:underline">Terms of Service</Link> and <Link to="#" className="text-primary font-bold hover:underline">Privacy Policy</Link>.
                </Label>
              </div>
            )}

            {Object.values(errors).some(err => err) && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-xl text-xs text-destructive flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-destructive shrink-0" />
                {Object.values(errors).find(err => err)}
              </div>
            )}

            <Button
              type="submit"
              variant="premium"
              className="w-full h-14 rounded-2xl text-lg font-bold shadow-glow-primary"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : isLogin ? (
                "Login to Account"
              ) : (
                "Create Farm Profile"
              )}
            </Button>
          </form>

          <div className="mt-8">
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-primary/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest">
                <span className="bg-white px-4 text-muted-foreground font-bold">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" onClick={() => signInWithOAuth('google')} className="h-12 rounded-xl border-primary/10 hover:bg-primary/5 transition-all">
                <Github size={18} className="mr-2" /> Google
              </Button>
              <Button variant="outline" onClick={() => signInWithOAuth('github')} className="h-12 rounded-xl border-primary/10 hover:bg-primary/5 transition-all">
                <Github size={18} className="mr-2" /> GitHub
              </Button>
            </div>

            <div className="text-center mt-8">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setErrors({});
                }}
                className="text-muted-foreground text-sm hover:text-primary transition-colors"
              >
                {isLogin ? (
                  <>New to the platform? <span className="text-primary font-bold underline underline-offset-4">Register here</span></>
                ) : (
                  <>Already have an account? <span className="text-primary font-bold underline underline-offset-4">Login here</span></>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
