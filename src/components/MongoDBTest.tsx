// src/components/MongoDBTest.tsx
import { useState } from 'react';
import { connectToDatabase } from '@/lib/mongodb';

export const MongoDBTest = () => {
  const [status, setStatus] = useState<string>('Not tested');
  const [error, setError] = useState<string>('');

  const testConnection = async () => {
    try {
      setStatus('Testing connection...');
      await connectToDatabase();
      setStatus('✅ Connected successfully!');
      setError('');
    } catch (err: any) {
      setStatus('❌ Connection failed');
      setError(err.message);
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-2">MongoDB Connection Test</h3>
      <button 
        onClick={testConnection}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Test Connection
      </button>
      <div className="mt-2">
        <p>Status: {status}</p>
        {error && <p className="text-red-500">Error: {error}</p>}
      </div>
    </div>
  );
};