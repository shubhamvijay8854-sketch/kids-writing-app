---
description: How to create an Android APK for KidWrite & Type
---

To create an APK for your app, we will use **Capacitor**. It is a modern tool that wraps your web app into a native Android project that you can open in Android Studio.

### Prerequisites
- [Android Studio](https://developer.android.com/studio) installed.
- [Node.js](https://nodejs.org/) installed.

### Step 1: Install Capacitor
Open your terminal in the `writing-typing-app` folder and run:
```bash
npm.cmd install @capacitor/core @capacitor/cli @capacitor/android
```

### Step 2: Initialize Capacitor
Run the initialization command:
```bash
npx.cmd cap init KidWrite com.kidwrite.app --web-dir .
```
*(When asked for the web directory, ensure it is set to the current folder where your `index.html` is.)*

### Step 3: Add Android Platform
Run this command to create the Android Studio project:
```bash
npx.cmd cap add android
```
> [!NOTE]
> If you see an error saying **"android platform already exists"**, it means the folder is already created. You can skip to the next step or delete the `android` folder to start fresh.

### Step 4: Sync your code
Whenever you make changes to your web code (or if you just added the platform), run this to move your files into the Android project:
```bash
npx.cmd cap copy
```

### Step 5: Build APK in Android Studio
1. Open **Android Studio**.
2. Select **"Open an Existing Project"** and choose the `android` folder inside your `writing-typing-app` directory.
3. Wait for Gradle to sync (this might take a few minutes).
4. Go to **Build > Build Bundle(s) / APK(s) > Build APK(s)**.
5. Once finished, a notification will appear. Click **"locate"** to find your `.apk` file!

### Step 6: Install on Tablet
Copy the generated `app-debug.apk` to your tablet and open it to install!
