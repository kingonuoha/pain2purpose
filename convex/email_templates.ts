export const templates: Record<string, string> = {
  welcome: `
    <div style="font-family: 'Inter', system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #f1f5f9; border-radius: 32px; overflow: hidden; box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.1);">
      <div style="background: #f8fafc; padding: 60px 40px; text-align: center; border-bottom: 1px solid #f1f5f9;">
        <h1 style="color: #09090b; margin: 0; font-family: 'Georgia', serif; font-size: 32px; letter-spacing: -0.03em;">Welcome to the Circle</h1>
        <p style="color: #64748b; font-size: 12px; margin-top: 12px; text-transform: uppercase; letter-spacing: 0.3em; font-weight: 900;">CounsellingP2P</p>
      </div>
      <div style="padding: 60px 50px; color: #09090b; line-height: 1.8;">
        <h2 style="font-size: 22px; font-weight: 900; margin-bottom: 20px;">Hi {{name}},</h2>
        <p style="font-size: 16px; color: #4b5563; margin-bottom: 24px;">
          You've just joined a community of seekers, healers, and truth-tellers. At CounsellingP2P, we believe that the most profound growth happens when we face our deepest shadows.
        </p>
        <p style="font-size: 16px; color: #4b5563; margin-bottom: 32px;">
          Your journey toward purpose starts with a single step. We're honored to walk beside you.
        </p>
        <div style="text-align: center;">
          <a href="{{siteUrl}}" style="background: #2563eb; color: white; padding: 16px 32px; border-radius: 12px; text-decoration: none; font-weight: 900; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; display: inline-block;">Enter the Portal</a>
        </div>
        <div style="margin-top: 60px; border-top: 1px solid #f1f5f9; padding-top: 40px;">
          <p style="font-size: 14px; color: #94a3b8; margin: 0;">Warmly,</p>
          <p style="font-size: 16px; font-weight: 900; color: #09090b; margin: 8px 0 0 0;">The CounsellingP2P Team</p>
        </div>
      </div>
      <div style="background: #f8fafc; padding: 32px; text-align: center; border-top: 1px solid #f1f5f9;">
        <p style="font-size: 12px; color: #94a3b8; margin: 0;">&copy; 2026 CounsellingP2P. Find Beauty in the Brokenness.</p>
      </div>
    </div>
  `,
  newsletter: `
    <div style="font-family: 'Inter', system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #f1f5f9; border-radius: 32px; overflow: hidden; box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.1);">
      <div style="background: #09090b; padding: 60px 40px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-family: 'Georgia', serif; font-size: 28px; letter-spacing: -0.02em;">Weekly Digest</h1>
        <p style="color: #64748b; font-size: 11px; margin-top: 12px; text-transform: uppercase; letter-spacing: 0.4em; font-weight: 900;">Pain2Purpose Insights</p>
      </div>
      <div style="padding: 60px 50px;">
        <h2 style="font-size: 22px; font-weight: 900; color: #09090b; margin-bottom: 24px;">Hi {{name}},</h2>
        <div style="color: #4b5563; line-height: 1.8; margin-bottom: 40px;">
          {{articlesHtml}}
        </div>
        
        <div style="background: #f8fafc; border-radius: 24px; padding: 40px; margin-bottom: 40px; border: 1px solid #f1f5f9;">
          <p style="color: #09090b; font-size: 18px; font-family: 'Georgia', serif; font-style: italic; line-height: 1.6; margin: 0;">
            "{{quoteText}}"
          </p>
          <p style="color: #64748b; font-size: 12px; font-weight: 900; margin-top: 20px; text-transform: uppercase; letter-spacing: 0.2em;">— {{quoteAuthor}}</p>
        </div>

        <div style="text-align: center; border-top: 1px solid #f1f5f9; padding-top: 40px;">
          <p style="font-size: 14px; color: #94a3b8; margin-bottom: 24px;">Want to explore more?</p>
          <a href="{{siteUrl}}/blog" style="background: #09090b; color: white; padding: 16px 32px; border-radius: 12px; text-decoration: none; font-weight: 900; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; display: inline-block;">Visit the Hub</a>
        </div>
      </div>
      <div style="background: #f8fafc; padding: 32px; text-align: center; border-top: 1px solid #f1f5f9;">
        <p style="font-size: 11px; color: #94a3b8; margin-bottom: 12px;">&copy; 2026 CounsellingP2P. Evolution is mandatory.</p>
        <a href="{{unsubscribeUrl}}" style="color: #64748b; text-decoration: none; font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em;">Unsubscribe</a>
      </div>
    </div>
  `,
  confirm_subscription: `
    <div style="font-family: 'Inter', system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #f1f5f9; border-radius: 32px; overflow: hidden; box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.1);">
      <div style="background: #f8fafc; padding: 60px 40px; text-align: center; border-bottom: 1px solid #f1f5f9;">
        <h1 style="color: #09090b; margin: 0; font-family: 'Georgia', serif; font-size: 32px; letter-spacing: -0.03em;">Confirm Your Choice</h1>
        <p style="color: #64748b; font-size: 12px; margin-top: 12px; text-transform: uppercase; letter-spacing: 0.3em; font-weight: 900;">Subscription Request</p>
      </div>
      <div style="padding: 60px 50px; color: #09090b; line-height: 1.8; text-align: center;">
        <p style="font-size: 16px; color: #4b5563; margin-bottom: 32px;">
          You're one step away from joining our newsletter. Please confirm your email address to start receiving our insights.
        </p>
        <div style="margin-bottom: 32px;">
          <a href="{{confirmUrl}}" style="background: #2563eb; color: white; padding: 18px 36px; border-radius: 12px; text-decoration: none; font-weight: 900; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; display: inline-block;">Confirm Subscription</a>
        </div>
        <p style="font-size: 12px; color: #94a3b8;">
          If you didn't request this, you can safely ignore this email.
        </p>
      </div>
      <div style="background: #f8fafc; padding: 32px; text-align: center; border-top: 1px solid #f1f5f9;">
        <p style="font-size: 12px; color: #94a3b8; margin: 0;">&copy; 2026 CounsellingP2P. Evolution is mandatory.</p>
      </div>
    </div>
  `,
  reset_password: `
    <div style="font-family: 'Inter', system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #f1f5f9; border-radius: 32px; overflow: hidden; box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.1);">
      <div style="background: #f8fafc; padding: 60px 40px; text-align: center; border-bottom: 1px solid #f1f5f9;">
        <h1 style="color: #09090b; margin: 0; font-family: 'Georgia', serif; font-size: 32px; letter-spacing: -0.03em;">Secure Your Account</h1>
        <p style="color: #64748b; font-size: 12px; margin-top: 12px; text-transform: uppercase; letter-spacing: 0.3em; font-weight: 900;">Security Protocol</p>
      </div>
      <div style="padding: 60px 50px; color: #09090b; line-height: 1.8; text-align: center;">
        <p style="font-size: 16px; color: #4b5563; margin-bottom: 32px;">
          We received a request to reset your password. Click the button below to choose a new one.
        </p>
        <div style="margin-bottom: 32px;">
          <a href="{{resetUrl}}" style="background: #09090b; color: white; padding: 18px 36px; border-radius: 12px; text-decoration: none; font-weight: 900; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; display: inline-block;">Reset Password</a>
        </div>
        <p style="font-size: 12px; color: #94a3b8;">
          This link will expire in 1 hour. If you didn't request this, please ignore this email.
        </p>
      </div>
      <div style="background: #f8fafc; padding: 32px; text-align: center; border-top: 1px solid #f1f5f9;">
        <p style="font-size: 12px; color: #94a3b8; margin: 0;">&copy; 2026 CounsellingP2P. Evolution is mandatory.</p>
      </div>
    </div>
  `,
  otp_verification: `
    <div style="font-family: 'Inter', system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #f1f5f9; border-radius: 32px; overflow: hidden; box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.1);">
      <div style="background: #f8fafc; padding: 60px 40px; text-align: center; border-bottom: 1px solid #f1f5f9;">
        <h1 style="color: #09090b; margin: 0; font-family: 'Georgia', serif; font-size: 32px; letter-spacing: -0.03em;">Verification Code</h1>
        <p style="color: #64748b; font-size: 12px; margin-top: 12px; text-transform: uppercase; letter-spacing: 0.3em; font-weight: 900;">Security Protocol</p>
      </div>
      <div style="padding: 60px 50px; color: #09090b; line-height: 1.8; text-align: center;">
        <p style="font-size: 16px; color: #4b5563; margin-bottom: 32px;">
          Use the following code to complete your security verification.
        </p>
        <div style="background: #f1f5f9; border-radius: 16px; padding: 24px; display: inline-block; margin-bottom: 32px;">
          <span style="font-size: 32px; font-weight: 900; letter-spacing: 0.4em; color: #09090b; font-family: 'JetBrains Mono', monospace;">{{code}}</span>
        </div>
        <p style="font-size: 12px; color: #94a3b8;">
          This code expires in 10 minutes. If you didn't request this, please ignore this email.
        </p>
      </div>
      <div style="background: #f8fafc; padding: 32px; text-align: center; border-top: 1px solid #f1f5f9;">
        <p style="font-size: 12px; color: #94a3b8; margin: 0;">&copy; 2026 CounsellingP2P. Evolution is mandatory.</p>
      </div>
    </div>
  `,
  contact_received: `
    <div style="font-family: 'Inter', system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #f1f5f9; border-radius: 32px; overflow: hidden; box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.1);">
      <div style="background: #f8fafc; padding: 60px 40px; text-align: center; border-bottom: 1px solid #f1f5f9;">
        <h1 style="color: #09090b; margin: 0; font-family: 'Georgia', serif; font-size: 32px; letter-spacing: -0.03em;">We've Received Your Message</h1>
        <p style="color: #64748b; font-size: 12px; margin-top: 12px; text-transform: uppercase; letter-spacing: 0.3em; font-weight: 900;">CounsellingP2P Support</p>
      </div>
      <div style="padding: 60px 50px; color: #09090b; line-height: 1.8;">
        <h2 style="font-size: 22px; font-weight: 900; margin-bottom: 20px;">Hi {{name}},</h2>
        <p style="font-size: 16px; color: #4b5563; margin-bottom: 24px;">
          Thank you for reaching out to us. We have received your request and will get back to you as soon as possible.
        </p>
        <p style="font-size: 16px; color: #4b5563; margin-bottom: 32px; font-style: italic; border-left: 4px solid #2563eb; padding-left: 20px; background: #f0f7ff; padding-top: 15px; padding-bottom: 15px;">
          {{quote}}
        </p>
        <p style="font-size: 16px; color: #4b5563; margin-bottom: 24px;">
          Your journey towards healing and purpose is important, and we are honored to be a part of it.
        </p>
        
        <div style="margin-top: 40px; border-top: 1px solid #f1f5f9; padding-top: 40px;">
          <h3 style="font-size: 14px; font-weight: 900; color: #64748b; text-transform: uppercase; letter-spacing: 0.2em; margin-bottom: 20px;">While You Wait</h3>
          <p style="font-size: 15px; color: #4b5563; margin-bottom: 20px;">
            Feel free to explore our latest insights and reflections on our blog:
          </p>
          <div style="text-align: center;">
            <a href="{{siteUrl}}/blog" style="background: #2563eb; color: white; padding: 16px 32px; border-radius: 12px; text-decoration: none; font-weight: 900; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; display: inline-block;">Visit Our Blog</a>
          </div>
        </div>

        <div style="margin-top: 60px; border-top: 1px solid #f1f5f9; padding-top: 40px;">
          <p style="font-size: 14px; color: #94a3b8; margin: 0;">Warmly,</p>
          <p style="font-size: 16px; font-weight: 900; color: #09090b; margin: 8px 0 0 0;">The CounsellingP2P Team</p>
        </div>
      </div>
      <div style="background: #f8fafc; padding: 32px; text-align: center; border-top: 1px solid #f1f5f9;">
        <p style="font-size: 12px; color: #94a3b8; margin: 0;">&copy; 2026 CounsellingP2P. Find Beauty in the Brokenness.</p>
      </div>
    </div>
  `,
  new_article: `
    <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #f1f5f9; border-radius: 32px; overflow: hidden; box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.08);">
      <div style="background: #09090b; padding: 48px; text-align: center;">
        <h1 style="color: white; margin: 0; font-family: 'Georgia', serif; font-size: 28px;">New Insight Published</h1>
        <p style="color: #2563eb; font-size: 12px; margin-top: 12px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.4em;">From Sandra's Desk</p>
      </div>
      <div style="padding: 50px;">
        <h2 style="font-size: 24px; font-weight: 900; color: #09090b; margin-bottom: 16px;">{{articleTitle}}</h2>
        <p style="color: #64748b; font-size: 16px; line-height: 1.7; margin-bottom: 32px;">
          {{excerpt}}
        </p>
        <div style="text-align: center;">
          <a href="{{articleUrl}}" style="background: #2563eb; color: white; padding: 20px 48px; border-radius: 18px; text-decoration: none; font-weight: 900; font-size: 14px; text-transform: uppercase; letter-spacing: 0.2em; display: inline-block;">Read Full Article</a>
        </div>
      </div>
      <div style="background: #f8fafc; padding: 40px; text-align: center; border-top: 1px solid #f1f5f9;">
        <p style="font-size: 11px; color: #94a3b8; margin-bottom: 12px;">&copy; 2026 CounsellingP2P. Deciphering the Human Experience.</p>
        <a href="{{unsubscribeUrl}}" style="color: #64748b; text-decoration: none; font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em;">Unsubscribe</a>
      </div>
    </div>
  `,
  admin_alert: `
    <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #f1f5f9; border-radius: 32px; overflow: hidden; box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.08);">
      <div style="background: #ef4444; padding: 48px; text-align: center;">
        <h1 style="color: white; margin: 0; font-family: 'Georgia', serif; font-size: 28px;">New Action Required</h1>
        <p style="color: rgba(255,255,255,0.8); font-size: 12px; margin-top: 12px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.4em;">Consultation Request Alert</p>
      </div>
      <div style="padding: 50px;">
        <div style="background: #f8fafc; border-radius: 20px; padding: 30px; margin-bottom: 30px; border: 1px solid #e2e8f0;">
          <h3 style="font-size: 14px; font-weight: 900; color: #64748b; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 20px;">Client Details</h3>
          <p style="margin-bottom: 10px;"><strong>Name:</strong> {{name}}</p>
          <p style="margin-bottom: 10px;"><strong>Email:</strong> {{email}}</p>
          <p style="margin-bottom: 10px;"><strong>Phone:</strong> {{phone}}</p>
          <p style="margin-bottom: 10px;"><strong>Service:</strong> {{service}}</p>
          <p style="margin-bottom: 10px;"><strong>Requested Date:</strong> {{date}}</p>
        </div>
        
        <div style="background: #fff; border-radius: 20px; padding: 30px; border: 1px solid #e2e8f0;">
          <h3 style="font-size: 14px; font-weight: 900; color: #64748b; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 15px;">Additional Message</h3>
          <p style="color: #4b5563; line-height: 1.6; margin: 0;">{{message}}</p>
        </div>
      </div>
      <div style="background: #f8fafc; padding: 32px; text-align: center; border-top: 1px solid #f1f5f9;">
        <p style="font-size: 11px; color: #94a3b8;">CounsellingP2P Admin System</p>
      </div>
    </div>
  `,
};

export const renderTemplate = (name: string, data: Record<string, unknown>) => {
  const html = templates[name] || templates["welcome"];
  return html.replace(/{{(\w+)}}/g, (match, key) => {
    if (data[key] !== undefined) return String(data[key]);
    if (key === "name") return "Friend";
    return "";
  });
};
