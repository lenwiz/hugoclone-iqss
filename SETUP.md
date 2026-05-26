# IQSS Hugo Clone - Setup Instructions

## 🚀 Quick Start Guide

This document provides step-by-step instructions to deploy your IQSS Hugo site to GitHub Pages.

## Prerequisites

- GitHub account: `lenwiz`
- Git configured on your local machine
- Hugo Extended installed (already done)

## Step 1: Create GitHub Repository

1. **Go to GitHub.com** and sign in as `lenwiz`
2. **Create a new repository**:
   - Repository name: `hugoclone-iqss`
   - Description: `Hugo-powered archive of IQSS website content`
   - Set to **Public** (required for GitHub Pages)
   - Do **NOT** initialize with README (we already have one)

## Step 2: Connect Local Repository to GitHub

```bash
# From the hugoclone-iqss directory
git remote add origin https://github.com/lenwiz/hugoclone-iqss.git
git branch -M main
git push -u origin main
```

## Step 3: Enable GitHub Pages

1. **Go to repository Settings**
2. **Navigate to "Pages"** in the left sidebar
3. **Set Source** to "GitHub Actions"
4. **Save the configuration**

The GitHub Actions workflow (`.github/workflows/hugo.yml`) will automatically:
- Build the Hugo site on every push
- Deploy to GitHub Pages
- Make the site available at: `https://lenwiz.github.io/hugoclone-iqss`

## Step 4: Set Up Giscus Comments (Optional)

To enable interactive comments on blog posts:

1. **Enable GitHub Discussions**:
   - Go to repository Settings → General
   - Scroll to "Features" section
   - Check "Discussions"

2. **Configure Giscus**:
   - Visit https://giscus.app/
   - Enter your repository: `lenwiz/hugoclone-iqss`
   - Copy the generated configuration
   - Update `hugo.toml` with the `repoId` and `categoryId`

3. **Install Giscus App**:
   - Visit: https://github.com/apps/giscus
   - Click "Install" and select your repository

## Step 5: Convert More IQSS Content

To convert all 1,075+ people profiles and remaining content:

```bash
# Edit convert_iqss_to_hugo.py to remove the limit
# Change line: for html_file in html_files[:5]:
# To: for html_file in html_files:

python3 ../convert_iqss_to_hugo.py
```

This will convert all IQSS content to Hugo format.

## Step 6: Custom Domain (Optional)

To use `hugoclone.iq.harvard.edu` or similar:

1. **Add CNAME file**:
   ```bash
   echo "hugoclone.iq.harvard.edu" > static/CNAME
   ```

2. **Update hugo.toml**:
   ```toml
   baseURL = 'https://hugoclone.iq.harvard.edu'
   ```

3. **Configure DNS**:
   - Add CNAME record pointing to `lenwiz.github.io`

## Expected Results

After setup, you'll have:

- ✅ **Live website** at `https://lenwiz.github.io/hugoclone-iqss`
- ✅ **Automatic deployments** on every git push
- ✅ **1,075+ people profiles** (after full conversion)
- ✅ **Complete IQSS content** archive
- ✅ **Interactive blog** with Giscus comments
- ✅ **Mobile-responsive** design
- ✅ **Fast, secure** Hugo-powered site

## Site Structure

```
Site URL: https://lenwiz.github.io/hugoclone-iqss/
├── /                    # Homepage
├── /about/              # About IQSS
├── /people/             # People directory (1,075+ profiles)
├── /programs/           # Research programs
├── /data-science/       # Data science services  
├── /technology/         # Technology services
├── /news/               # News articles
├── /events/             # Events
├── /blog/               # Blog with comments
└── /contact/            # Contact information
```

## Development Workflow

```bash
# Make changes to content
hugo server --buildDrafts    # Preview locally

# Commit and push changes
git add .
git commit -m "Add new content"
git push origin main         # Triggers automatic deployment
```

## Troubleshooting

**Build fails?**
- Check Hugo version in `.github/workflows/hugo.yml`
- Verify theme submodule is properly added

**Giscus not working?**
- Ensure Discussions are enabled
- Verify repository is public
- Check Giscus app is installed

**Content missing?**
- Run full conversion script without file limits
- Check file permissions and paths

---

🎉 **You're ready to launch your IQSS Hugo archive!**