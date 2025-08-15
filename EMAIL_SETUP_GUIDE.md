# Email Configuration Guide for Contact Form

## Setup Options

### Option 1: EmailJS (Recommended for Client-side)
EmailJS allows sending emails directly from your frontend without a backend server.

#### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. You get 200 free emails per month

#### Step 2: Connect Your Gmail Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Select "Gmail" from the list
4. Click "Connect Account" and sign in with your Gmail account (info@lopes2tech.ch or your preferred Gmail)
5. Grant permissions to EmailJS
6. Your Gmail service will be created with a Service ID (like `service_xxxxxxx`)
7. **Copy this Service ID** - you'll need it for the configuration

#### Step 3: Create Email Template
1. Go to "Email Templates" in the EmailJS dashboard
2. Click "Create New Template"
3. Give it a name like "Contact Form Template"
4. Use this template content:

**Subject:** `New Contact Form Message from {{from_name}}`

**Email Body:**
```
Hello,

You have received a new message from your website contact form:

From: {{from_name}}
Email: {{from_email}}
Company: {{company}}

Message:
{{message}}

---
This message was sent via lopes2tech.ch contact form.
You can reply directly to this email.
```

5. Click "Save" 
6. **Copy the Template ID** (like `template_xxxxxxx`) - you'll need this

#### Step 4: Get Your Public Key
1. In EmailJS dashboard, go to "Account" (top right menu)
2. Select "General" from the left sidebar
3. Find "Public Key" section
4. **Copy your Public Key** (like `user_xxxxxxxxxxxxxxxx`) - you'll need this

#### Step 5: Where to Find All Your IDs

**Service ID:**
- Go to EmailJS → Email Services
- Look for your Gmail service
- The ID is shown next to the service name (e.g., `service_abc123`)

**Template ID:** 
- Go to EmailJS → Email Templates
- Look for your contact form template
- The ID is shown next to the template name (e.g., `template_xyz789`)

**Public Key:**
- Go to EmailJS → Account → General
- Find "Public Key" section
- Copy the key (e.g., `user_abcd1234efgh5678`)

## 📋 Step-by-Step Visual Guide

### 1. EmailJS Dashboard Navigation
```
EmailJS Dashboard
├── Email Services ← Find your Service ID here
├── Email Templates ← Find your Template ID here
└── Account
    └── General ← Find your Public Key here
```

### 2. Example Configuration
After setup, your values should look like this:

```typescript
// Your actual values will be different
emailjs: {
  serviceId: 'service_abc123xyz',      // From Email Services
  templateId: 'template_def456uvw',    // From Email Templates  
  publicKey: 'user_ghi789rst012'       // From Account → General
}
```

### 3. Gmail Service Setup Details
- **Service Type:** Gmail
- **Authentication:** OAuth (automatically handled when you connect)
- **From Email:** Will be your connected Gmail account
- **To Email:** Configured in the template (info@lopes2tech.ch)

#### Step 5: Update Environment Files
Update these files with your EmailJS credentials:

**src/environments/environment.ts**
```typescript
export const environment = {
  production: false,
  emailjs: {
    serviceId: 'your_service_id_here',
    templateId: 'your_template_id_here',
    publicKey: 'your_public_key_here'
  }
};
```

**src/environments/environment.prod.ts**
```typescript
export const environment = {
  production: true,
  emailjs: {
    serviceId: 'your_service_id_here',
    templateId: 'your_template_id_here',
    publicKey: 'your_public_key_here'
  }
};
```

### Option 2: Mailto Link (Fallback/Simple)
If EmailJS is not configured, the form will automatically fall back to opening the user's default email client with a pre-filled message.

### Option 3: Backend Service (Advanced)
For a production environment, consider setting up:
- Node.js with Nodemailer
- PHP with PHPMailer
- Python with SendGrid/SMTP
- Netlify Forms (if hosting on Netlify)
- Vercel Functions (if hosting on Vercel)

## Security Notes
- EmailJS public keys are safe to expose in client-side code
- For sensitive data, use a backend service
- Consider rate limiting for production use

## Testing
1. Fill out the contact form
2. Submit the form
3. Check your email (info@lopes2tech.ch) for the message
4. If EmailJS fails, your default email client will open

## Current Status
✅ EmailJS library installed
✅ Email service created
✅ Contact form updated
✅ Environment configuration ready
⏳ Waiting for EmailJS credentials

## Quick Start (Mailto Only)
If you want to start immediately without EmailJS setup, the form will work with mailto links. Users will see their email client open with the message pre-filled.
