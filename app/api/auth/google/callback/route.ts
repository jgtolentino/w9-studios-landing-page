import { NextRequest, NextResponse } from 'next/server';
import { getTokensFromCode } from '@/lib/googleCalendar';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
      return NextResponse.redirect(
        new URL(`/admin/setup?error=${error}`, request.url)
      );
    }

    if (!code) {
      return NextResponse.redirect(
        new URL('/admin/setup?error=no_code', request.url)
      );
    }

    // Exchange code for tokens
    const tokens = await getTokensFromCode(code);

    // In production, you'd save these tokens securely
    // For now, we'll redirect with success message
    console.log('Received tokens:', {
      access_token: tokens.access_token ? 'present' : 'missing',
      refresh_token: tokens.refresh_token ? 'present' : 'missing',
    });

    // Create response with success redirect
    const response = NextResponse.redirect(
      new URL('/admin/setup?success=true', request.url)
    );

    // Note: In production, store the refresh token securely
    // You might want to save it to your database or environment
    if (tokens.refresh_token) {
      console.log('🔑 IMPORTANT: Save this refresh token to your .env.local file:');
      console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`);
    }

    return response;
  } catch (error) {
    console.error('Error handling Google OAuth callback:', error);
    return NextResponse.redirect(
      new URL('/admin/setup?error=token_exchange_failed', request.url)
    );
  }
}