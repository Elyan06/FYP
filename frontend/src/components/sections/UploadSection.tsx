import { useState, useCallback } from "react";
import { Upload, Image, Loader2, CheckCircle, XCircle, ScanLine, Leaf, AlertCircle, ArrowUpCircle } from "lucide-react";
import { predictDisease, createImageElement } from "@/services/modelService";
import { savePrediction } from "@/services/historyService";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";

const UploadSection = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [prediction, setPrediction] = useState<{
    disease: string;
    confidence: number;
    isHealthy: boolean;
    description: string;
  } | null>(null);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleImageUpload(file);
    }
  }, []);

  const analyzeImage = async (file: File) => {
    try {
      setIsAnalyzing(true);
      setPrediction(null);
      setAnalysisProgress(0);

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setAnalysisProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 150);

      // Create image element
      const img = await createImageElement(file);

      // Make prediction
      const result = await predictDisease(img);

      clearInterval(progressInterval);
      setAnalysisProgress(100);

      setTimeout(() => {
        setPrediction({
          ...result,
          description: getDiseaseDescription(result.disease)
        });
      }, 300);

      // Save to history
      await savePrediction(
        result.disease,
        result.confidence,
        result.isHealthy,
        uploadedImage || undefined
      );

      // Show result toast
      toast({
        title: result.isHealthy ? '✓ Plant is Healthy!' : '⚠ Disease Detected',
        description: `${formatDiseaseName(result.disease)} (${result.confidence}% confidence)`,
        variant: result.isHealthy ? 'default' : 'destructive',
      });

    } catch (error) {
      console.error('Error analyzing image:', error);
      toast({
        title: 'Analysis Failed',
        description: 'Please upload a clear leaf image and try again.',
        variant: 'destructive',
      });
    } finally {
      setIsAnalyzing(false);
      setAnalysisProgress(0);
    }
  };

  const handleImageUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
      setCurrentFile(file);
      setPrediction(null);
    };
    reader.onerror = () => {
      toast({
        title: 'Error',
        description: 'Failed to read the image file.',
        variant: 'destructive',
      });
    };
    reader.readAsDataURL(file);
  }, [toast]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: 'Invalid file type',
          description: 'Please upload an image file (JPEG, PNG, WEBP)',
          variant: 'destructive',
        });
        return;
      }
      handleImageUpload(file);
    }
  }, [handleImageUpload, toast]);

  const handleDetectDisease = useCallback(async () => {
    if (currentFile) {
      try {
        await analyzeImage(currentFile);
      } catch (error) {
        console.error('Error detecting disease:', error);
        toast({
          title: 'Error',
          description: 'Please upload a clear leaf image.',
          variant: 'destructive',
        });
      }
    }
  }, [currentFile, toast]);

  const formatDiseaseName = useCallback((disease: string) => {
    return disease
      .replace(/_/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase())
      .replace('Tomato ', '')
      .replace('Pepper ', '')
      .replace('Two Spotted Spider Mite', 'Spider Mites')
      .replace('Yellow Leaf Curl Virus', 'Yellow Leaf Curl');
  }, []);

  const getDiseaseRecommendation = useCallback((disease: string): string => {
    const recommendations: Record<string, string> = {
      'Bacterial Spot': 'Remove and destroy infected plants. Use copper-based bactericides and practice crop rotation.',
      'Early Blight': 'Remove affected leaves, improve air circulation, and apply fungicides containing chlorothalonil or copper.',
      'Late Blight': 'Destroy infected plants immediately. Apply appropriate fungicides and avoid overhead watering.',
      'Leaf Mold': 'Improve air circulation, reduce humidity levels, and apply appropriate fungicides.',
      'Septoria Leaf Spot': 'Remove infected leaves, avoid overhead watering, and apply fungicides if necessary.',
      'Spider Mites': 'Spray plants with water to dislodge mites. Use insecticidal soap or neem oil.',
      'Target Spot': 'Remove affected leaves, improve air circulation, and apply appropriate fungicides.',
      'Yellow Leaf Curl Virus': 'Remove and destroy infected plants. Control whitefly populations with insecticides.',
      'Mosaic Virus': 'Remove and destroy infected plants. Control aphid populations and practice good sanitation.',
      'default': 'Please consult with a local agricultural expert for specific treatment recommendations.'
    };

    const formattedDisease = formatDiseaseName(disease);
    return recommendations[formattedDisease] || recommendations['default'];
  }, []);

  const getDiseaseDescription = useCallback((disease: string): string => {
    const descriptions: Record<string, string> = {
      'Bacterial Spot': 'Bacterial spot is caused by Xanthomonas bacteria, leading to small, dark lesions on leaves and fruit.',
      'Early Blight': 'Early blight is a fungal disease affecting tomato leaves, characterized by concentric rings within dark spots.',
      'Late Blight': 'Late blight is a destructive fungal-like disease that causes rapid decay and water-soaked spots on leaves.',
      'Leaf Mold': 'Leaf mold is a fungal disease that causes yellow spots on the upper leaf surface and gray mold on the underside.',
      'Septoria Leaf Spot': 'Septoria leaf spot causes numerous small, circular spots with dark borders and gray centers on older leaves.',
      'Spider Mites': 'Spider mites are tiny pests that suck sap from leaves, causing stippling, yellowing, and fine webbing.',
      'Target Spot': 'Target spot is a fungal disease characterized by brown lesions with concentric rings, resembling a target.',
      'Yellow Leaf Curl Virus': 'Yellow leaf curl virus is a viral disease transmitted by whiteflies, causing upward curling, yellowing, and stunting.',
      'Mosaic Virus': 'Mosaic virus causes mottled patterns of light and dark green on leaves, often stunting growth and reducing yield.',
      'Healthy': 'The plant appears healthy with no visible signs of disease or nutritional deficiencies.',
      'default': 'Symptoms of a plant disease have been detected. Please investigate further.'
    };

    const formattedDisease = formatDiseaseName(disease);
    if (formattedDisease.toLowerCase().includes('healthy')) return descriptions['Healthy'];
    return descriptions[formattedDisease] || descriptions['default'];
  }, [formatDiseaseName]);

  return (
    <section id="detect" className="section-padding relative overflow-hidden bg-gradient-to-b from-white to-muted/30">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container-tight mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <Leaf className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">AI Diagnostic Tool</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
            Upload & Analyze
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Upload a clear photo of your tomato or pepper plant leaf. Our AI model will analyze it to detect diseases.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">

          {/* Upload Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="premium-card p-8">
              <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
                <ArrowUpCircle className="w-5 h-5 text-primary" />
                Step 1: Upload Image
              </h3>

              <label
                htmlFor="image-upload"
                className={`
                  relative block w-full aspect-square rounded-xl border-2 border-dashed cursor-pointer
                  transition-all duration-300 overflow-hidden flex flex-col items-center justify-center
                  ${isDragging
                    ? "border-primary bg-primary/5 scale-[1.02] shadow-glow-primary"
                    : uploadedImage
                      ? "border-primary/30 bg-white"
                      : "border-border hover:border-primary/50 bg-muted/30"
                  }
                `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {uploadedImage ? (
                  <div className="absolute inset-0 w-full h-full group">
                    <img
                      src={uploadedImage}
                      alt="Uploaded leaf"
                      className="w-full h-full object-cover rounded-lg"
                    />

                    {isAnalyzing && (
                      <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
                        <div className="relative">
                          <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
                          <Loader2 className="w-16 h-16 text-primary animate-spin relative z-10" />
                        </div>
                        <div className="text-center space-y-2">
                          <p className="text-foreground font-semibold text-lg">Analyzing Plant Health...</p>
                          <Progress value={analysisProgress} className="w-64" />
                          <p className="text-sm text-muted-foreground">Processing with CNN Model</p>
                        </div>
                      </div>
                    )}

                    {!isAnalyzing && (
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="text-center text-white">
                          <Upload className="w-8 h-8 mx-auto mb-2" />
                          <p className="font-medium">Click to change image</p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <div className={`
                      w-24 h-24 rounded-full flex items-center justify-center mb-6 transition-all duration-300
                      ${isDragging ? "bg-primary/20 scale-110" : "bg-muted"}
                    `}>
                      {isDragging ? (
                        <Image className="w-12 h-12 text-primary" />
                      ) : (
                        <Upload className="w-12 h-12 text-muted-foreground" />
                      )}
                    </div>
                    <h4 className="text-lg font-semibold mb-2 text-foreground">
                      {isDragging ? "Drop your image here" : "Drag & Drop"}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4 max-w-xs">
                      or click to browse from your device
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Supported: JPG, PNG, WEBP
                    </p>
                  </div>
                )}
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="sr-only"
                  disabled={isAnalyzing}
                />
              </label>

              <Button
                onClick={handleDetectDisease}
                disabled={!uploadedImage || isAnalyzing}
                className="w-full mt-6 bg-primary hover:bg-primary/90 text-white shadow-glow-primary rounded-xl py-6 text-base font-semibold"
                size="lg"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <ScanLine className="w-5 h-5 mr-2" />
                    Analyze Plant Health
                  </>
                )}
              </Button>
            </div>

            {/* Info Card */}
            <div className="premium-card p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-semibold text-foreground mb-1">For Best Results:</p>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Use clear, well-lit photos</li>
                    <li>Focus on a single leaf</li>
                    <li>Avoid blurry or dark images</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Results Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="h-full"
          >
            <AnimatePresence mode="wait">
              {prediction ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="premium-card p-8 h-full flex flex-col"
                >
                  <h3 className="text-xl font-semibold mb-6 text-foreground flex items-center gap-2">
                    <ScanLine className="w-5 h-5 text-primary" />
                    Step 2: Analysis Result
                  </h3>

                  {/* Result Badge */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`p-4 rounded-full ${prediction.isHealthy ? 'bg-green-500/10' : 'bg-amber-500/10'}`}>
                      {prediction.isHealthy ? (
                        <CheckCircle className="w-10 h-10 text-green-600" />
                      ) : (
                        <XCircle className="w-10 h-10 text-amber-600" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-foreground">
                        {prediction.isHealthy ? 'Healthy Plant ✓' : 'Disease Detected'}
                      </h4>
                      <p className="text-muted-foreground">
                        Confidence: <span className="text-primary font-semibold">{prediction.confidence}%</span>
                      </p>
                    </div>
                  </div>

                  {/* Disease Info */}
                  {!prediction.isHealthy && (
                    <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl mb-6">
                      <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">Diagnosed Issue</span>
                      <p className="text-lg font-semibold mt-1 text-amber-900">
                        {formatDiseaseName(prediction.disease)}
                      </p>
                    </div>
                  )}

                  {/* Disease Description */}
                  <div className="mb-6 space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Description</span>
                    <p className="text-foreground text-sm leading-relaxed">
                      {prediction.description}
                    </p>
                  </div>

                  {/* Recommendation */}
                  <div className="space-y-3 flex-grow">
                    <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                      <Leaf className="w-4 h-4 text-primary" />
                      RECOMMENDED ACTION
                    </div>
                    <div className="bg-muted/50 p-5 rounded-xl border border-border text-sm leading-relaxed text-foreground">
                      {getDiseaseRecommendation(prediction.disease)}
                    </div>
                  </div>

                  {/* Disclaimer */}
                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="text-xs text-center text-muted-foreground">
                      * AI analysis provides high accuracy but should be verified by agricultural specialists for critical decisions.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="premium-card h-full min-h-[500px] flex flex-col items-center justify-center text-center p-8 bg-gradient-to-br from-muted/30 to-white"
                >
                  <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
                    <ScanLine className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Awaiting Analysis</h3>
                  <p className="text-muted-foreground max-w-sm">
                    Upload an image and click "Analyze Plant Health" to see detailed results and treatment recommendations here.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default UploadSection;
