import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export const TestDbConnection = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const testConnection = async () => {
    setLoading(true);
    setError(null);
    try {
      // Test 1: Check auth connection
      const { data: authData, error: authError } = await supabase.auth.getSession();
      
      if (authError) throw new Error(`Auth Error: ${authError.message}`);
      
      // Test 2: List all tables in the public schema
      const { data: tables, error: tablesError } = await supabase
        .from('pg_tables')
        .select('tablename')
        .eq('schemaname', 'public');
      
      if (tablesError) throw new Error(`Tables Error: ${tablesError.message}`);
      
      setResult({
        auth: {
          hasSession: !!authData.session,
          user: authData.session?.user?.email || 'No active session',
        },
        tables: tables.map((t: any) => t.tablename),
        timestamp: new Date().toISOString(),
      });
    } catch (err: any) {
      console.error('Connection test failed:', err);
      setError(err.message || 'Failed to connect to database');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-white dark:bg-gray-800 mt-4">
      <h3 className="text-lg font-semibold mb-2">Database Connection Test</h3>
      <Button 
        onClick={testConnection} 
        disabled={loading}
        variant="outline"
        className="mb-4"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Testing...
          </>
        ) : 'Test Connection'}
      </Button>

      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
          <h4 className="text-red-600 dark:text-red-400 font-medium mb-1">Error</h4>
          <pre className="text-sm text-red-600 dark:text-red-400 overflow-x-auto">
            {error}
          </pre>
        </div>
      )}

      {result && (
        <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
          <h4 className="text-green-700 dark:text-green-400 font-medium mb-2">Connection Successful!</h4>
          <div className="space-y-2">
            <div>
              <span className="font-medium">Status:</span> Connected to Supabase
            </div>
            <div>
              <span className="font-medium">User:</span> {result.auth.user}
            </div>
            <div>
              <span className="font-medium">Tables found ({result.tables.length}):</span>
              <ul className="list-disc list-inside mt-1">
                {result.tables.map((table: string) => (
                  <li key={table} className="text-sm">{table}</li>
                ))}
              </ul>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Last tested: {new Date(result.timestamp).toLocaleString()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
