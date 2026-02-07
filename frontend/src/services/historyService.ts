import { supabase } from "@/integrations/supabase/client";

export interface PredictionRecord {
  id: string;
  image_url: string | null;
  disease_detected: string;
  confidence: number;
  is_healthy: boolean;
  created_at: string;
}

export const savePrediction = async (
  disease: string,
  confidence: number,
  isHealthy: boolean,
  imageUrl?: string
) => {
  console.log('Attempting to save prediction to Supabase...');
  try {
    const { data: { user } } = await supabase.auth.getUser();

    // If no user is logged in, we can't save to their history
    // In a real app, we might save to local storage or prompt login
    if (!user) {
      console.log('No user logged in, skipping history save');
      return null;
    }

    const { data, error } = await supabase
      .from('predictions')
      .insert([
        {
          user_id: user.id,
          disease_detected: disease,
          confidence,
          is_healthy: isHealthy,
          image_url: imageUrl || '',
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error saving prediction:', error);
      throw error;
    }

    console.log('Prediction saved successfully:', data);
    return data;
  } catch (error) {
    console.warn('Failed to save prediction history:', error);
    // We don't want to block the user if history save fails
    return null;
  }
};

export const fetchHistory = async (): Promise<PredictionRecord[]> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('predictions')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as unknown as PredictionRecord[];
  } catch (error) {
    console.error('Error fetching history:', error);
    return [];
  }
};
