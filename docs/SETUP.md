# whoami Setup Instructions

## 📋 Quick Start Guide

Your professional Linux trainer portfolio website is ready at:
`/home/lin/gitprojects/whoami/`

---

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `whoami`
3. Visibility: Public (recommended for GitHub Pages)
4. **Do NOT initialize** with README (we already have one)
5. Click "Create repository"

---

## Step 2: Push Local Repository

Run these commands in your terminal:

```bash
cd /home/lin/gitprojects/whoami
git branch -M main
git remote add origin https://github.com/stefan-hacks/whoami.git
git push -u origin main
```

---

## Step 3: Enable GitHub Pages

1. Go to https://github.com/stefan-hacks/whoami/settings/pages
2. Under "Source", select "GitHub Actions"
3. The deployment workflow will automatically deploy your site

Or use the GitHub CLI:

```bash
cd /home/lin/gitprojects/whoami
gh repo create whoami --public --source=. --push
```

---

## Step 4: Configure Calendly (Optional)

Your site uses Calendly for booking. To change the calendar:

1. Edit `index.html` line containing:
   ```html
   data-url="https://calendly.com/stefan-hacks/linux-training?hide_gdpr_banner=1"
   ```

2. Replace with your Calendly URL
3. Commit and push changes

---

## 📁 Project Structure

```
whoami/
├── index.html          # Main page
├── css/
│   └── style.css      # Styles (27KB)
├── js/
│   └── main.js        # Interactivity (13KB)
├── .github/workflows/
│   └── deploy.yml     # Auto-deploy to Pages
├── README.md
└── LICENSE (MIT)
```

---

## 🎨 Website Features

| Feature | Status |
|---------|--------|
| 🌙 Dark terminal theme | ✅ |
| 📱 Mobile responsive | ✅ |
| 📝 Contact form | ✅ |
| 📅 Calendly booking | ✅ |
| ⭐ Project showcase | ✅ |
| 💼 Services listing | ✅ |
| 🗣️ Reviews section | ✅ |
| ⚡ Animations | ✅ |

---

## 🌐 Live URL

After deployment, your site will be at:

**https://stefan-hacks.github.io/whoami/**

---

## 📧 Customization Notes

1. **Email**: Update in `index.html` & `js/main.js` if needed
2. **LinkedIn reviews**: Add real testimonials to the Reviews section
3. **Project stars**: Numbers are static; to auto-update, use GitHub API
4. **Custom domain**: Add CNAME file for custom domain

---

## 🚀 Auto-Deployment

The site deploys automatically on every push to main branch via GitHub Actions.

Check deployment status at:
https://github.com/stefan-hacks/whoami/actions

---

*Created for cmdRed Ltd - Linux System Administration Training by Stefan*
