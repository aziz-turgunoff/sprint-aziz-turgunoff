import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface FormData {
  companyName: string;
  website: string;
  companySize: string;
  industry: string;
  fullName: string;
  workEmail: string;
  role: string;
  phone: string;
  primaryGoals: string[];
  expectedVolume: string;
  additionalInfo: string;
  agreedToTerms: boolean;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { formData } = await req.json() as { formData: FormData }

    // Validate required fields
    if (!formData.companyName || !formData.workEmail || !formData.fullName) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Insert submission into database
    const { data: submission, error: dbError } = await supabase
      .from('onboarding_submissions')
      .insert({
        payload: formData,
        status: 'received'
      })
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      throw new Error('Failed to save submission')
    }

    // Send emails using Resend
    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    
    if (resendApiKey) {
      // Send user confirmation email
      const userEmailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Onboarding <onboarding@resend.dev>',
          to: [formData.workEmail],
          subject: 'Welcome - Next Steps',
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <style>
                  body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                  .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
                  .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
                  .summary { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
                  .summary-item { margin: 10px 0; }
                  .summary-label { font-weight: bold; color: #666; }
                  .cta-button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
                  .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1>Welcome, ${formData.fullName}!</h1>
                    <p>Thank you for your interest in our platform</p>
                  </div>
                  <div class="content">
                    <p>Hi ${formData.fullName},</p>
                    <p>We've received your onboarding submission and are excited to help ${formData.companyName} achieve its goals.</p>
                    
                    <div class="summary">
                      <h3>Your Submission Summary</h3>
                      <div class="summary-item">
                        <span class="summary-label">Company:</span> ${formData.companyName}
                      </div>
                      <div class="summary-item">
                        <span class="summary-label">Industry:</span> ${formData.industry}
                      </div>
                      <div class="summary-item">
                        <span class="summary-label">Company Size:</span> ${formData.companySize} employees
                      </div>
                      <div class="summary-item">
                        <span class="summary-label">Primary Goals:</span> ${formData.primaryGoals.join(', ')}
                      </div>
                      <div class="summary-item">
                        <span class="summary-label">Expected Volume:</span> ${formData.expectedVolume}
                      </div>
                    </div>

                    <h3>What's Next?</h3>
                    <ul>
                      <li>Our team will review your information within 1-2 business days</li>
                      <li>We'll reach out to schedule a personalized demo</li>
                      <li>You'll receive a custom proposal tailored to your needs</li>
                    </ul>

                    <center>
                      <a href="https://calendly.com/your-company/demo" class="cta-button">Book a Call Now</a>
                    </center>

                    <p>If you have any questions in the meantime, feel free to reply to this email.</p>
                    
                    <p>Best regards,<br>The Onboarding Team</p>
                  </div>
                  <div class="footer">
                    <p>This email was sent because you submitted an onboarding form on our website.</p>
                  </div>
                </div>
              </body>
            </html>
          `,
        }),
      })

      // Send admin notification email
      const adminEmailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Onboarding System <onboarding@resend.dev>',
          to: ['admin@example.com'], // Replace with actual admin email
          subject: `[New Onboarding] ${formData.companyName}`,
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <style>
                  body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                  .header { background: #1f2937; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
                  .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
                  .field { margin: 15px 0; padding: 10px; background: white; border-radius: 4px; }
                  .label { font-weight: bold; color: #666; display: block; margin-bottom: 5px; }
                  .value { color: #111; }
                  .goals { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 5px; }
                  .goal-tag { background: #dbeafe; color: #1e40af; padding: 4px 12px; border-radius: 12px; font-size: 12px; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h2>🎉 New Onboarding Submission</h2>
                    <p>Submission ID: ${submission.id}</p>
                  </div>
                  <div class="content">
                    <div class="field">
                      <span class="label">Company Name:</span>
                      <span class="value">${formData.companyName}</span>
                    </div>
                    <div class="field">
                      <span class="label">Website:</span>
                      <span class="value"><a href="${formData.website}">${formData.website}</a></span>
                    </div>
                    <div class="field">
                      <span class="label">Company Size:</span>
                      <span class="value">${formData.companySize} employees</span>
                    </div>
                    <div class="field">
                      <span class="label">Industry:</span>
                      <span class="value">${formData.industry}</span>
                    </div>
                    <div class="field">
                      <span class="label">Contact Name:</span>
                      <span class="value">${formData.fullName}</span>
                    </div>
                    <div class="field">
                      <span class="label">Email:</span>
                      <span class="value"><a href="mailto:${formData.workEmail}">${formData.workEmail}</a></span>
                    </div>
                    <div class="field">
                      <span class="label">Role:</span>
                      <span class="value">${formData.role}</span>
                    </div>
                    ${formData.phone ? `
                    <div class="field">
                      <span class="label">Phone:</span>
                      <span class="value">${formData.phone}</span>
                    </div>
                    ` : ''}
                    <div class="field">
                      <span class="label">Primary Goals:</span>
                      <div class="goals">
                        ${formData.primaryGoals.map(goal => `<span class="goal-tag">${goal}</span>`).join('')}
                      </div>
                    </div>
                    <div class="field">
                      <span class="label">Expected Volume:</span>
                      <span class="value">${formData.expectedVolume}</span>
                    </div>
                    ${formData.additionalInfo ? `
                    <div class="field">
                      <span class="label">Additional Information:</span>
                      <span class="value">${formData.additionalInfo}</span>
                    </div>
                    ` : ''}
                    <div class="field">
                      <span class="label">Submitted:</span>
                      <span class="value">${new Date().toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </body>
            </html>
          `,
        }),
      })

      console.log('User email sent:', await userEmailResponse.json())
      console.log('Admin email sent:', await adminEmailResponse.json())
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        submissionId: submission.id 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Internal server error' 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
