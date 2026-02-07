import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export const testDbConnection = async () => {
  try {
    // Test 1: Check if we can connect to Supabase
    const { data: authData, error: authError } = await supabase.auth.getSession();
    
    if (authError) throw authError;
    
    // Test 2: Make a simple query to a public table
    const { data, error } = await supabase
      .from('profiles') // assuming you have a profiles table
      .select('*')
      .limit(1);
    
    if (error) throw error;
    
    return {
      success: true,
      message: 'Successfully connected to Supabase!',
      session: authData.session ? 'Active session found' : 'No active session',
      tableData: data ? `Found ${data.length} records` : 'No data returned',
    };
  } catch (error) {
    console.error('Database connection error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      error: error
    };
  }
};

// Run the test when this module is imported
testDbConnection().then(result => {
  console.log('Database Connection Test Result:', result);
  
  // Show toast notification in the UI
  if (result.success) {
    toast({
      title: 'Database Connection',
      description: result.message,
      variant: 'default',
    });
  } else {
    toast({
      title: 'Database Connection Error',
      description: result.message,
      variant: 'destructive',
    });
  }
});
