import { google } from 'googleapis';

// Use the same OAuth client setup
const oauth2Client = new google.auth.OAuth2(
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI
);

// Set credentials if we have a refresh token
if (process.env.GOOGLE_REFRESH_TOKEN) {
  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN
  });
}

const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  cc?: string;
  bcc?: string;
  attachments?: Array<{
    filename: string;
    content: Buffer | string;
    contentType?: string;
  }>;
}

// Send an email
export async function sendEmail(options: EmailOptions) {
  try {
    // Create email headers
    const headers = [
      'Content-Type: text/html; charset=utf-8',
      'MIME-Version: 1.0',
      `To: ${options.to}`,
      'From: W9 Studios <business@w9studio.net>',
      `Subject: ${options.subject}`,
    ];

    if (options.cc) headers.push(`Cc: ${options.cc}`);
    if (options.bcc) headers.push(`Bcc: ${options.bcc}`);

    // Create the email body
    const message = [
      ...headers,
      '',
      options.html
    ].join('\n');

    // Encode the message
    const encodedMessage = Buffer.from(message)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    const response = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
}

// Send booking confirmation email
export async function sendBookingConfirmation(
  clientEmail: string,
  clientName: string,
  company: string,
  bookingDetails: any
) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Manila'
    }).format(date);
  };

  const locationInfo = bookingDetails.type === 'studio'
    ? '<p><strong>Location:</strong> W9 Studios, Makati CBD, Philippines</p>'
    : bookingDetails.type === 'consultation'
    ? '<p><strong>Meeting:</strong> Google Meet link will be sent separately</p>'
    : '<p><strong>Location:</strong> To be confirmed</p>';

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #0066FF 0%, #E84141 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border: 1px solid #e0e0e0; border-radius: 0 0 10px 10px; }
          .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 14px; color: #666; }
          .button { display: inline-block; padding: 12px 30px; background: #0066FF; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          h1 { margin: 0; font-size: 28px; }
          h2 { color: #0066FF; margin-top: 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Booking Confirmed!</h1>
          </div>
          <div class="content">
            <p>Dear ${clientName},</p>

            <p>Thank you for booking with W9 Studios. We're excited to work with ${company} on your upcoming project.</p>

            <div class="booking-details">
              <h2>${bookingDetails.type === 'consultation' ? 'Consultation Details' : bookingDetails.type === 'studio' ? 'Studio Rental Details' : 'Production Planning Details'}</h2>

              <p><strong>Date & Time:</strong> ${formatDate(new Date(bookingDetails.date))}</p>
              <p><strong>Duration:</strong> ${bookingDetails.duration} minutes</p>
              ${locationInfo}
              <p><strong>Type:</strong> ${bookingDetails.type.charAt(0).toUpperCase() + bookingDetails.type.slice(1)}</p>
            </div>

            <h3>What's Next?</h3>
            <ul>
              <li>You'll receive a calendar invitation shortly</li>
              <li>We'll send a reminder 24 hours before your appointment</li>
              ${bookingDetails.type === 'consultation' ? '<li>Google Meet link will be included in the calendar invite</li>' : ''}
              ${bookingDetails.type === 'studio' ? '<li>Please arrive 10 minutes early for check-in</li>' : ''}
            </ul>

            <h3>Need to Reschedule?</h3>
            <p>If you need to change your booking, please contact us at least 24 hours in advance:</p>
            <ul>
              <li>Email: <a href="mailto:business@w9studio.net">business@w9studio.net</a></li>
              <li>Phone: +63 968 269 9265</li>
            </ul>

            <div class="footer">
              <p><strong>W9 Studios</strong><br>
              Premium Commercial Production<br>
              Makati CBD, Philippines<br>
              <a href="https://w9studio.net">www.w9studio.net</a></p>

              <p style="font-size: 12px; color: #999;">
                This is an automated confirmation email. Please do not reply directly to this message.
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: clientEmail,
    subject: `Booking Confirmation - ${bookingDetails.type.charAt(0).toUpperCase() + bookingDetails.type.slice(1)} with W9 Studios`,
    html: html,
    cc: 'business@w9studio.net', // Send a copy to the business email
  });
}

// Send cancellation email
export async function sendCancellationEmail(
  clientEmail: string,
  clientName: string,
  bookingDetails: any,
  reason?: string
) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #E84141; color: white; padding: 30px; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border: 1px solid #e0e0e0; border-radius: 0 0 10px 10px; }
          h1 { margin: 0; font-size: 28px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Booking Cancelled</h1>
          </div>
          <div class="content">
            <p>Dear ${clientName},</p>

            <p>Your booking with W9 Studios has been cancelled.</p>

            ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ''}

            <p>If you'd like to reschedule, please visit our website or contact us directly.</p>

            <p>Best regards,<br>
            W9 Studios Team<br>
            <a href="mailto:business@w9studio.net">business@w9studio.net</a></p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: clientEmail,
    subject: 'Booking Cancellation - W9 Studios',
    html: html,
  });
}