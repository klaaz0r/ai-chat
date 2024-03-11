// 'use server'
import { SendVerificationRequestParams } from 'next-auth/providers/email'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function sendVerificationRequest(
  params: SendVerificationRequestParams
) {
  const { identifier, url, provider, theme } = params
  const { host } = new URL(url)

  try {
    const data = await resend.emails.send({
      from: '"Taskcrunch.io" <admin@taskcrunch.io>',
      to: [identifier],
      subject: `Log in to Taskcrunch`,
      text: text({ url, host }),
      html: `
      <!DOCTYPE html>
      <html>
      <head>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  color: #333;
                  padding: 20px;
              }
              .container {
                  background-color: #fff;
                  border-radius: 8px;
                  padding: 20px;
                  width: 60%;
                  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
              }
              .button {
                  display: inline-block;
                  padding: 10px 20px;
                  margin-top: 20px;
                  background-color: #ededed;
                  color: #000000;
                  border-radius: 5px;
                  text-decoration: none;
              }
    
          </style>
      </head>
      <body>
          <div class="container">
              <h1>Verify your acount for Taskcrunch</h1>
              <p>Please verify your login.</p>
              <a href="${url}" class="button">Click here to sign in</a>
              <p>This link expires in 5 minutes.</p>
          </div>
      </body>
      </html>
      `
      // react: MagicLinkEmail({ url, host })
    })
    return { success: true, data }
  } catch (error) {
    throw new Error('Failed to send the verification Email.')
  }
}

function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`
}
