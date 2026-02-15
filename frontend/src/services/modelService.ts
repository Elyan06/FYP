import * as tf from '@tensorflow/tfjs';

// Define the class names based on your model's output
// Define the class names based on your model's output
const CLASS_NAMES = [
  'Pepper___Bacterial_spot',
  'Pepper___healthy',
  'Tomato___Bacterial_spot',
  'Tomato___Early_blight',
  'Tomato___Late_blight',
  'Tomato___Leaf_Mold',
  'Tomato___Septoria_leaf_spot',
  'Tomato___Spider_mites Two-spotted_spider_mite',
  'Tomato___Target_Spot',
  'Tomato___Tomato_Yellow_Leaf_Curl_Virus',
  'Tomato___Tomato_mosaic_virus',
  'Tomato___healthy'
];

// Load the model
let model: tf.LayersModel | null = null;

export const loadModel = async () => {
  try {
    // Load the model from the public directory
    model = await tf.loadLayersModel('/trained_model/model.json');
    console.log('Model loaded successfully');
    return model;
  } catch (error) {
    console.error('Error loading model:', error);
    throw error;
  }
};

// Preprocess the image before prediction
export const preprocessImage = (image: HTMLImageElement): tf.Tensor => {
  // Convert image to tensor
  const tensor = tf.browser.fromPixels(image)
    .resizeBilinear([256, 256]) // Resize to match model's expected input
    .toFloat()
    .div(tf.scalar(255.0)) // Normalize to [0, 1] range
    .expandDims(); // Add batch dimension

  return tensor;
};

// Predict function
export const predictDisease = async (imageElement: HTMLImageElement) => {
  try {
    if (!model) {
      await loadModel();
    }

    // Preprocess the image
    const tensor = preprocessImage(imageElement);

    // Make prediction
    const predictions = model!.predict(tensor) as tf.Tensor;
    const result = await predictions.data();

    // Get the top prediction
    const prediction = Array.from(result);
    const maxPrediction = Math.max(...prediction);
    const predictedClassIndex = prediction.indexOf(maxPrediction);
    const confidence = (maxPrediction * 100).toFixed(2);
    const predictedDisease = CLASS_NAMES[predictedClassIndex];

    // Clean up
    tensor.dispose();
    predictions.dispose();

    return {
      disease: predictedDisease,
      confidence: parseFloat(confidence),
      isHealthy: predictedDisease.includes('healthy')
    };
  } catch (error) {
    console.error('Error during prediction:', error);
    throw error;
  }
};

// Helper function to create an image element from a file
export const createImageElement = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};
