'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function SetupPage() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const success = searchParams.get('success');
    const error = searchParams.get('error');

    if (success) {
      setStatus('success');
      setMessage('Google Calendar connected! Check browser console for refresh token.');
      console.log('🔑 Check the Network tab or server logs for the refresh token!');
    } else if (error) {
      setStatus('error');
      setMessage(`Error: ${error}`);
    }
  }, [searchParams]);

  const handleConnect = () => {
    // Direct OAuth URL
    const authUrl = `https://accounts.google.com/o/oauth2/auth?` +
      `client_id=916601142061-acqbgukfia2v24deu3hhcag8au9gjs93.apps.googleusercontent.com&` +
      `redirect_uri=${encodeURIComponent('http://localhost:3000/w9-studios-landing-page/api/auth/google/callback')}&` +
      `scope=${encodeURIComponent('https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events')}&` +
      `response_type=code&` +
      `access_type=offline&` +
      `prompt=consent`;

    window.location.href = authUrl;
  };

  return (
    <div className="min-h-screen bg-studio-black flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-studio-gray border border-studio-blue/30 rounded-lg p-8">
          <h1 className="text-3xl font-bold text-white mb-6">
            W9 Studios OAuth Setup
          </h1>

          {status === 'idle' && (
            <div className="space-y-6">
              <p className="text-gray-400">
                Connect your Google Workspace account to enable automated booking.
              </p>

              <div className="bg-studio-black border border-studio-blue/20 rounded-lg p-4">
                <h3 className="font-semibold text-studio-blue mb-2">Ready to connect:</h3>
                <ul className="text-sm space-y-1 text-gray-300">
                  <li>✓ Client ID configured</li>
                  <li>✓ Client Secret saved</li>
                  <li>✓ Redirect URI set</li>
                  <li>⏳ Refresh token needed</li>
                </ul>
              </div>

              <button
                onClick={handleConnect}
                className="w-full bg-studio-blue text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-all"
              >
                Connect Google Calendar
              </button>

              <p className="text-xs text-gray-500 text-center">
                You'll be redirected to Google to authorize access
              </p>
            </div>
          )}

          {status === 'success' && (
            <div className="space-y-4">
              <div className="bg-green-900/20 border border-green-500 rounded-lg p-4">
                <p className="text-green-400">{message}</p>
              </div>
              <p className="text-sm text-gray-400">
                Check your browser console (F12) and look for the refresh token in the logs.
              </p>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-4">
              <div className="bg-red-900/20 border border-red-500 rounded-lg p-4">
                <p className="text-red-400">{message}</p>
              </div>
              <button
                onClick={handleConnect}
                className="w-full bg-studio-blue text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-all"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}