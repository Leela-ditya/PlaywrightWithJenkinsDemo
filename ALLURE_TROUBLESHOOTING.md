# Allure Results Troubleshooting Guide

## Issue: Allure Results Not Being Generated

If you're not seeing Allure results in the pipeline, this guide helps you diagnose and fix the issue.

## Why Allure Results Might Not Be Generated

### 1. Allure Reporter Not Configured in Playwright
**Check:** `playwright.config.ts`

```typescript
reporter: [
  ['html', {
    outputFolder: 'playwright-report',
    open: "always"
  }],
  ['allure-playwright', {
    detail: true,
    outputFolder: 'allure-results',
    suiteTitle: false
  }]
]
```

✅ Your config already has this configured!

### 2. Allure Package Not Installed
**Solution:** Install via npm

```bash
npm install --save-dev allure-playwright
npm install -g allure-commandline
```

### 3. Tests Not Executed
- If tests don't run, Allure results won't be created
- Check **Run Tests with Retry** stage in Jenkins logs
- Verify test files exist in `tests/` directory

## Debugging Steps

### Step 1: Check Test Execution
In Jenkins logs, look for:
```
🧪 Running Playwright tests...
🏷️ Running tests with tag: @StaticTable
```

And verify the tests actually ran:
```
Running 1 test using 1 worker
```

### Step 2: Verify Allure Results Directory
After tests run, check if `allure-results/` folder was created:

```powershell
# In Jenkins workspace
cd C:\ProgramData\Jenkins\.jenkins\workspace\[JobName]
dir allure-results
```

Should show JSON files like:
- `executor.json`
- `categories.json`
- Test result files (`.json`)

### Step 3: Check Allure Generation
In Jenkins logs, look for:
```
✅ Allure results found
Generating Allure report...
Allure ZIP created successfully
```

### Step 4: Verify Report Directory Structure
```
test-reports/
├── allure-report/         # Generated Allure HTML
│   └── index.html
├── allure-results/        # Raw Allure JSON results
│   ├── executor.json
│   ├── categories.json
│   └── [test-results].json
└── allure.zip            # Compressed Allure report
```

## Common Issues & Solutions

### Issue 1: "No allure-results found"
**Cause:** Tests didn't run or Allure reporter wasn't enabled

**Solution:**
1. Verify `allure-playwright` is in `package.json` devDependencies
2. Run: `npm install`
3. Check test files have tags: `@StaticTable`, `@smoke`, etc.

### Issue 2: "allure-commandline not found"
**Error in Jenkins logs:**
```
'allure' is not recognized as an internal or external command
```

**Solution:**
Pipeline automatically installs it, but you can manually install:
```bash
npm install -g allure-commandline --force
```

### Issue 3: "Allure ZIP not created"
**Cause:** Allure generation failed or report folder is empty

**Check:**
1. Does `allure-report/` folder exist?
2. Run PowerShell command manually:
```powershell
cd test-reports
Compress-Archive -Path allure-report -DestinationPath allure.zip -Force
```

### Issue 4: Reports Generated But Not Showing in Jenkins
**Solution:**

1. Check **Publish Reports** stage runs successfully
2. Verify Jenkins has permission to read/write reports
3. Check Jenkins workspace has enough disk space

## How Allure Reports Are Generated

```
┌─ Playwright Tests Execute
│  └─ allure-playwright reporter creates allure-results/*.json
│
├─ Extract Test Results Stage
│  └─ Parses HTML report for test counts
│
├─ Organize Reports Stage
│  ├─ Copies allure-results/ to test-reports/
│  ├─ Runs: allure generate allure-results --clean -o test-reports/allure-report
│  └─ Creates: test-reports/allure.zip
│
└─ Publish Reports Stage
   └─ Publishes test-reports/allure-report as Jenkins artifact
```

## Viewing Allure Reports

### In Jenkins:
1. Go to your Jenkins job build
2. Click **Allure Report** (in left sidebar)
3. Or click the link in the email

### Direct File Access:
```
test-reports/allure-report/index.html
```

### Download ZIP:
From Jenkins build artifacts → `allure.zip`

## Test Annotations for Allure

To ensure tests are properly categorized in Allure, use annotations:

```typescript
import { test, expect } from '@playwright/test';

test('verify static table data', {
    tag: ['@StaticTable', '@smoke', '@regression']
}, async ({ page }) => {
    // Your test code
});
```

## Pipeline Parameter Effects on Reports

| Parameter | Effect on Allure |
|-----------|------------------|
| TAG: `@StaticTable` | Only tests with @StaticTable tag run |
| SPEC: `tests/api/01_GET.spec.ts` | Only that file runs |
| BROWSER: `chromium` | Tests run on Chromium only |
| Both TAG & SPEC | Error - choose one |
| Neither TAG nor SPEC | All tests run |

## Allure Report Features

The generated Allure report includes:

✅ **Overview** - Test statistics, timeline
✅ **Categories** - Test categories and grouping
✅ **Suites** - Test suite organization
✅ **Graphs** - Pass/fail trends
✅ **Behaviors** - Feature-based organization
✅ **Timeline** - Test execution timeline
✅ **Environment** - Testing environment details

## Next Steps

1. **Verify Tests Have Tags:**
   ```bash
   grep -r "@smoke\|@regression\|@StaticTable" tests/
   ```

2. **Run Pipeline with Debug:**
   - Set TAG: `@StaticTable`
   - Monitor Jenkins logs for Allure generation
   - Check test-reports folder after build completes

3. **Check Build Artifacts:**
   - Click build → Artifacts
   - Look for `test-reports/allure.zip`
   - Download and extract to verify content

4. **Verify Email Includes Links:**
   - Check email for "Allure Report" link
   - Click to view in Jenkins
   - Verify all report types load correctly

## Need More Help?

If Allure reports still aren't generating:

1. Check Jenkins system log for errors:
   - Manage Jenkins → System Log
   - Search: "allure"

2. Run tests locally to verify they work:
   ```bash
   npx playwright test --grep "@StaticTable"
   ```

3. Check that dependencies are installed:
   ```bash
   npm list allure-playwright
   npx allure --version
   ```

4. Verify file permissions on Jenkins workspace
