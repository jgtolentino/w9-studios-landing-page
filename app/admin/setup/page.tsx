'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminSetup() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const success = searchParams.get('success');
    const error = searchParams.get('error');

    if (success) {
      setStatus('success');
      setMessage('Google Calendar connected successfully! Check console for refresh token to save in .env.local');
    } else if (error) {
      setStatus('error');
      setMessage(`Error: ${error}`);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            W9 Studios Admin Setup
          </h1>

          {status === 'idle' && (
            <div className="space-y-6">
              <p className="text-gray-600">
                Connect your Google Workspace account to enable booking functionality.
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Before you start:</h3>
                <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800">
                  <li>Create a Google Cloud Project</li>
                  <li>Enable Calendar & Gmail APIs</li>
                  <li>Set up OAuth 2.0 credentials</li>
                  <li>Add redirect URI: {typeof window !== 'undefined' ? `${window.location.origin}/api/auth/google/callback` : 'your-domain/api/auth/google/callback'}</li>
                </ol>
              </div>

              <Link
                href="/api/auth/google"
                className="block w-full text-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Connect Google Calendar
              </Link>
            </div>
          )}

          {status === 'success' && (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 font-medium">{message}</p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-900 mb-2">Next steps:</h3>
                <ol className="list-decimal list-inside space-y-1 text-sm text-yellow-800">
                  <li>Check browser console for refresh token</li>
                  <li>Add to .env.local file</li>
                  <li>Restart the development server</li>
                </ol>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800">{message}</p>
              </div>
              <Link
                href="/api/auth/google"
                className="block w-full text-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}