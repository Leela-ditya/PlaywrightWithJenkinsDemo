# Jenkins Email Configuration Guide

## Issue: Email Not Showing in Email Application

The Jenkins pipeline sends emails using the `emailext` plugin, but emails might not appear in your email client due to Jenkins SMTP configuration.

## Solution: Configure Email in Jenkins

### Step 1: Access Jenkins Configuration
1. Go to **Manage Jenkins** → **Configure System**
2. Scroll down to **Email Notification** section

### Step 2: Configure SMTP Settings

#### For Gmail (Recommended):
```
SMTP Server: smtp.gmail.com
SMTP Port: 465
Use SSL: Yes
Username: your-email@gmail.com
Password: Your App Password (NOT regular password)
```

**Note:** You need to:
- Enable 2-Factor Authentication on your Gmail account
- Generate an App Password: https://myaccount.google.com/apppasswords
- Use this App Password in Jenkins, not your regular Gmail password

#### For Office 365:
```
SMTP Server: smtp.office365.com
SMTP Port: 587
Use TLS: Yes
Username: your-email@company.com
Password: Your Office 365 password
```

#### For Outlook:
```
SMTP Server: smtp-mail.outlook.com
SMTP Port: 587
Use TLS: Yes
Username: your-email@outlook.com
Password: Your Outlook password
```

### Step 3: Configure Extended Email Notification (Required for EmailExt Plugin)

1. In **Configure System**, find **Extended E-mail Notification**
2. Configure the same SMTP settings as above
3. Set **Default Recipients**: `leelasonu12@gmail.com` (or your email)
4. Set **Default Subject**: `$DEFAULT_SUBJECT`
5. Set **Default Content**: `$DEFAULT_CONTENT`

### Step 4: Test Email Configuration
1. Click **Test configuration by sending test e-mail** button
2. Enter a test email address
3. Click **Test** to send a test email
4. Check your email inbox (including spam/junk folder)

## Jenkins Pipeline Email Features

Your pipeline now sends professional HTML emails containing:

✅ **Test Status** - PASSED/FAILED with color coding
✅ **Test Counts** - Total, Passed, and Failed test numbers
✅ **Build Information** - Build number, browser type, timestamp
✅ **Direct Links** to:
   - Playwright HTML Report
   - Allure Report
   - All Artifacts (screenshots, videos, traces)
   - Console Log
   - allure.zip file

## Troubleshooting Email Issues

### Email goes to spam/junk:
- Add `jenkins@yourcompany.com` to your contacts
- Ask your email provider to whitelist the Jenkins server IP
- Use a verified email address in Jenkins

### Authentication error:
- Verify SMTP credentials in Jenkins Config
- Check that SSL/TLS settings match your email provider
- For Gmail: Make sure you're using an App Password, not regular password

### Test email works but pipeline emails don't send:
- Check Jenkins logs: **Manage Jenkins** → **System Log**
- Search for "emailext" in logs
- Verify email address in pipeline parameters (default: `leelasonu12@gmail.com`)

### Email arrives but with no content/broken formatting:
- Ensure email client supports HTML emails
- Check **Extended E-mail Notification** plugin is installed
- Verify MIME type is set to "text/html" in pipeline

## Report Files Generated

After each test run, the `test-reports` folder contains:

```
test-reports/
├── index.html                    # Playwright HTML Report
├── data/                         # Report data files
├── trace/                        # Trace files
├── screenshots/                  # Failed test screenshots
├── videos/                       # Test execution videos
├── traces/                       # Detailed execution traces (*.zip)
├── allure-report/               # Allure Report Dashboard
│   ├── index.html               # Allure Report HTML
│   └── ...                      # Allure assets
├── allure-results/              # Allure JSON results
└── allure.zip                   # Compressed Allure report
```

## Running the Pipeline

```
Parameters:
- GITHUB_REPO_URL: Repository URL (auto-filled)
- BRANCH: Branch to test (default: main)
- TAG: Test tag (e.g., @smoke) - Leave empty if using SPEC
- SPEC: Specific test file - Leave empty if using TAG
- EMAIL: Email recipients (comma-separated)
- BROWSER: Browser to test (chromium, firefox, webkit, all)
```

**Example runs:**
- Run all tests: Leave TAG and SPEC empty
- Run specific tag: TAG = `@StaticTable`, SPEC = empty
- Run specific file: SPEC = `tests/api/01_GETRequest.spec.ts`, TAG = empty

## Next Steps

1. Configure Jenkins SMTP settings following the guide above
2. Test email with the Jenkins configuration test button
3. Run the pipeline again - you should receive the HTML email
4. Check that all report links work in the email
