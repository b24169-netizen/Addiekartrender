# Deploy E-Commerce Chatbot to Render.com (100% FREE)

## ⚡ Quick Start Guide (No Software Installation Needed!)

### Step 1: Create a Free GitHub Account (2 minutes)

1. Go to [github.com](https://github.com)
2. Click **"Sign up"**
3. Enter your email, create a password, choose a username
4. Verify your email

### Step 2: Upload Your Code to GitHub (3 minutes)

**Option A: Using GitHub Website (Easiest - No Git needed!)**

1. **Login to GitHub** → Click the **"+"** icon (top right) → **"New repository"**
2. **Repository name**: `ecom-chatbot` (or any name you like)
3. **Public or Private**: Choose either (both work with Render)
4. Click **"Create repository"**
5. Click **"uploading an existing file"** link
6. **Drag and drop** ALL your project files:
   - `index.js`
   - `package.json`
   - Folders: `lib/`, `data/`, `public/`
7. Click **"Commit changes"**

Done! Your code is now on GitHub.

**Option B: Using Git (If you have it installed)**

```bash
cd your-project-folder
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ecom-chatbot.git
git push -u origin main
```

### Step 3: Deploy to Render (5 minutes)

1. **Sign up at [render.com](https://render.com)** (use your GitHub account to login - it's faster!)

2. Click **"New +"** → Select **"Web Service"**

3. **Connect your GitHub repository**:
   - Click **"Connect account"** or **"Configure account"**
   - Authorize Render to access GitHub
   - Select **"All repositories"** or just your `ecom-chatbot` repo
   - Click **"Install & Authorize"**

4. **Find and select** your `ecom-chatbot` repository from the list

5. **Configure your deployment**:
   - **Name**: `ecom-chatbot` (this becomes `ecom-chatbot.onrender.com`)
   - **Region**: Choose the closest to you
   - **Branch**: `main`
   - **Root Directory**: Leave blank
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Select **"Free"** ✅

6. **Add Environment Variable** (Important!):
   - Click **"Advanced"** button
   - Click **"Add Environment Variable"**
   - **Key**: `GROQ_API_KEY`
   - **Value**: Your Groq API key
   - Click **"Add"**

7. Click **"Create Web Service"**

### Step 4: Wait for Deployment (2-5 minutes)

- Watch the build logs in real-time
- You'll see "npm install" running
- When you see **"Deploy live"** → Your app is ready! 🎉

### Step 5: Access Your Live Chatbot

Your chatbot will be available at:
```
https://your-app-name.onrender.com
```

## ⚠️ Important: Free Tier Sleep Policy

**Render's free tier sleeps after 15 minutes of inactivity.**

- First visit after sleep: Takes 30-60 seconds to wake up
- Subsequent visits: Instant response
- To keep it awake 24/7: Use a service like [UptimeRobot](https://uptimerobot.com) to ping your app every 5 minutes

## 🔄 Auto-Updates

Every time you make changes:
1. Update files on GitHub (upload new versions)
2. Render **automatically rebuilds and deploys**
3. Your live app updates in 2-5 minutes

## 📊 What You Get (FREE)

- ✅ **Always online** (wakes up when visited)
- ✅ **512 MB RAM**
- ✅ **Free SSL certificate** (HTTPS)
- ✅ **Auto-deploys** on every GitHub push
- ✅ **No credit card required**
- ✅ **Custom domain support**

## 🐛 Troubleshooting

**Problem**: "Application failed to respond"
- **Solution**: Check that `index.js` uses `process.env.PORT` and binds to `0.0.0.0`

**Problem**: "Build failed"
- **Solution**: Check build logs for errors, ensure all files are on GitHub

**Problem**: Chatbot not responding to questions
- **Solution**: Verify `GROQ_API_KEY` is added in Environment Variables

## 📞 Support

- Render Docs: https://render.com/docs
- Render Community: https://community.render.com

## 🎯 Your Chatbot Features

Once deployed, users can:
- Ask "Where is my order 12345?" to get order status
- Check refund status
- Get answers about return policies, shipping, COD
- Get AI-powered responses for other questions
