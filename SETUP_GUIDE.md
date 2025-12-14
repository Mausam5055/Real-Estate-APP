# 🚀 Real Scout - Complete Setup Guide

<div align="center">

**A Step-by-Step Guide to Setting Up Your Real Estate Application**

_This guide will walk you through every step needed to get Real Scout running on your local machine_

</div>

---

## 📑 Table of Contents

1. [Prerequisites](#prerequisites)
2. [System Requirements](#system-requirements)
3. [Installation Steps](#installation-steps)
4. [Appwrite Setup (Detailed)](#appwrite-setup-detailed)
5. [Database Configuration](#database-configuration)
6. [Google OAuth Setup](#google-oauth-setup)
7. [Environment Variables](#environment-variables)
8. [Database Seeding](#database-seeding)
9. [Running the Application](#running-the-application)
10. [Verification & Testing](#verification--testing)
11. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, make sure you have the following installed on your computer:

### Required Software

| Software        | Minimum Version | Download Link                                                                                                                      | Purpose                        |
| --------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| **Node.js**     | v18.0.0+        | [nodejs.org](https://nodejs.org/)                                                                                                  | JavaScript runtime environment |
| **npm**         | v9.0.0+         | Comes with Node.js                                                                                                                 | Package manager                |
| **Git**         | v2.30.0+        | [git-scm.com](https://git-scm.com/)                                                                                                | Version control                |
| **Expo Go App** | Latest          | [iOS](https://apps.apple.com/app/expo-go/id982107779) / [Android](https://play.google.com/store/apps/details?id=host.exp.exponent) | Mobile testing                 |

### Accounts Required

- **Appwrite Account** - Sign up at [cloud.appwrite.io](https://cloud.appwrite.io)
- **Google Account** - For OAuth setup
- **GitHub Account** (optional) - For version control

### Knowledge Prerequisites

- Basic understanding of:
  - Command line/terminal usage
  - React Native concepts
  - Mobile app development basics
  - REST APIs

---

## System Requirements

### For Development

| OS          | Minimum Specs                | Recommended Specs               |
| ----------- | ---------------------------- | ------------------------------- |
| **Windows** | Windows 10 (64-bit), 8GB RAM | Windows 11, 16GB RAM, SSD       |
| **macOS**   | macOS 10.15+, 8GB RAM        | macOS 13+, 16GB RAM, M1/M2 chip |
| **Linux**   | Ubuntu 20.04+, 8GB RAM       | Ubuntu 22.04+, 16GB RAM, SSD    |

### Mobile Devices (for Testing)

- **iOS**: iPhone running iOS 13.4 or later
- **Android**: Device running Android 8.0 (API level 26) or later

---

## Installation Steps

### Step 1: Verify Node.js Installation

Open your terminal/command prompt and run:

```bash
node --version
npm --version
```

**Expected Output:**

```
v18.x.x  (or higher)
9.x.x    (or higher)
```

> 💡 **Tip**: If these commands don't work, you need to install Node.js from [nodejs.org](https://nodejs.org/)

### Step 2: Clone the Repository

```bash
# Navigate to your desired directory
cd ~/projects  # On macOS/Linux
cd C:\projects  # On Windows

# Clone the repository
git clone https://github.com/Mausam5055/Real-Estate-APP.git

# Navigate into the project directory
cd Real-Estate-APP
```

### Step 3: Install Dependencies

```bash
npm install
```

**What this does:**

- Downloads all required packages listed in `package.json`
- Creates a `node_modules` folder with all dependencies
- May take 2-5 minutes depending on your internet speed

**Expected Output:**

```
added 1234 packages in 2m
```

> ⚠️ **Warning**: If you see errors about missing dependencies, try running `npm install --legacy-peer-deps`

---

## Appwrite Setup (Detailed)

Appwrite is our Backend-as-a-Service (BaaS) platform. Think of it as your app's backend server that handles:

- **Authentication** (user login/signup)
- **Database** (storing properties, agents, reviews)
- **Storage** (images and files)
- **Security** (permissions and access control)

### Step 1: Create an Appwrite Account

1. Visit [cloud.appwrite.io](https://cloud.appwrite.io)
2. Click **"Get Started"** or **"Sign Up"**
3. Sign up using:
   - Email and password, OR
   - GitHub account, OR
   - Google account (recommended)

### Step 2: Create a New Project

1. After logging in, click **"Create Project"**
2. Enter project details:
   - **Name**: `Real Scout` (or any name you prefer)
   - **Project ID**: Will be auto-generated (e.g., `real-scout-123abc`)
3. Click **"Create"**

> 📝 **Note**: Save your **Project ID** - you'll need it later!

### Step 3: Configure Platform

1. In your project dashboard, click **"Add Platform"**
2. Select **"New App"**
3. Choose platform type based on your testing preference:

#### For iOS App:

- **Type**: iOS
- **Name**: `Real Scout iOS`
- **Bundle ID**: `com.yourname.realscout`

#### For Android App:

- **Type**: Android
- **Name**: `Real Scout Android`
- **Package Name**: `com.yourname.realscout`

> 💡 **Tip**: The Bundle ID/Package Name should match what's in your `app.json` file

---

## Database Configuration

This is the most critical part. We'll create 4 collections (like tables in a database) to store our app data.

### Understanding Collections

Think of collections as Excel sheets:

- **Properties Collection** - Stores property listings
- **Agents Collection** - Stores real estate agent information
- **Reviews Collection** - Stores customer reviews
- **Galleries Collection** - Stores property images

### Step 1: Create Database

1. In your Appwrite console, click **"Databases"** in the left sidebar
2. Click **"Create Database"**
3. Enter:
   - **Database ID**: `real-estate-db` (use lowercase, hyphens only)
   - **Name**: `Real Estate Database`
4. Click **"Create"**

> 📝 **Save this Database ID** - you'll need it for your `.env.local` file!

### Step 2: Create Collections

Now we'll create 4 collections. For each collection:

#### Collection 1: Properties

1. Click **"Create Collection"**
2. Set:
   - **Collection ID**: `properties`
   - **Name**: `Properties`
3. Click **"Create"**

**Add Attributes** (click "Create Attribute" for each):

| Attribute Key | Type    | Size | Required | Default | Array      | Notes                         |
| ------------- | ------- | ---- | -------- | ------- | ---------- | ----------------------------- |
| `name`        | String  | 255  | ✅ Yes   | -       | ❌ No      | Property name                 |
| `type`        | String  | 50   | ✅ Yes   | -       | ❌ No      | House, Villa, Apartment, etc. |
| `description` | String  | 5000 | ✅ Yes   | -       | ❌ No      | Detailed description          |
| `address`     | String  | 500  | ✅ Yes   | -       | ❌ No      | Physical address              |
| `geolocation` | String  | 100  | ❌ No    | -       | ❌ No      | Lat,Long coordinates          |
| `price`       | Integer | -    | ✅ Yes   | -       | ❌ No      | Price in dollars              |
| `area`        | Integer | -    | ✅ Yes   | -       | ❌ No      | Area in sq ft                 |
| `bedrooms`    | Integer | -    | ✅ Yes   | -       | ❌ No      | Number of bedrooms            |
| `bathrooms`   | Integer | -    | ✅ Yes   | -       | ❌ No      | Number of bathrooms           |
| `rating`      | Integer | -    | ✅ Yes   | 0       | ❌ No      | Rating 1-5                    |
| `facilities`  | String  | 50   | ❌ No    | -       | ✅ **Yes** | Amenities (Gym, Pool, etc.)   |
| `image`       | String  | 2000 | ✅ Yes   | -       | ❌ No      | Main image URL                |

**Add Relationships** (click "Create Attribute" → "Relationship"):

| Related Collection | Type         | Attribute Key | On Delete |
| ------------------ | ------------ | ------------- | --------- |
| `agents`           | Many to One  | `agent`       | Set Null  |
| `reviews`          | Many to Many | `reviews`     | Cascade   |
| `galleries`        | Many to Many | `gallery`     | Cascade   |

**Set Permissions**:

1. Click on "Settings" tab in the Properties collection
2. Under "Permissions", click "Add Role"
3. Select **"Any"**
4. Check permissions: ✅ Read, ✅ Create, ✅ Update, ✅ Delete
5. Click "Update"

#### Collection 2: Agents

1. Click **"Create Collection"**
2. Set:
   - **Collection ID**: `agents`
   - **Name**: `Agents`
3. Click **"Create"**

**Add Attributes**:

| Attribute Key | Type   | Size | Required | Default | Array |
| ------------- | ------ | ---- | -------- | ------- | ----- |
| `name`        | String | 255  | ✅ Yes   | -       | ❌ No |
| `email`       | Email  | 255  | ✅ Yes   | -       | ❌ No |
| `avatar`      | String | 2000 | ❌ No    | -       | ❌ No |

**Set Permissions**: Same as Properties (Any → Read, Create, Update, Delete)

#### Collection 3: Reviews

1. Click **"Create Collection"**
2. Set:
   - **Collection ID**: `reviews`
   - **Name**: `Reviews`
3. Click **"Create"**

**Add Attributes**:

| Attribute Key | Type    | Size | Required | Default | Array |
| ------------- | ------- | ---- | -------- | ------- | ----- |
| `name`        | String  | 255  | ✅ Yes   | -       | ❌ No |
| `avatar`      | String  | 2000 | ❌ No    | -       | ❌ No |
| `review`      | String  | 2000 | ✅ Yes   | -       | ❌ No |
| `rating`      | Integer | -    | ✅ Yes   | 5       | ❌ No |

**Set Permissions**: Same as above

#### Collection 4: Galleries

1. Click **"Create Collection"**
2. Set:
   - **Collection ID**: `galleries`
   - **Name**: `Galleries`
3. Click **"Create"**

**Add Attributes**:

| Attribute Key | Type   | Size | Required | Default | Array |
| ------------- | ------ | ---- | -------- | ------- | ----- |
| `image`       | String | 2000 | ✅ Yes   | -       | ❌ No |

**Set Permissions**: Same as above

> ✅ **Checkpoint**: You should now have 4 collections with all attributes and relationships configured!

### Step 3: Save Collection IDs

After creating each collection, save their IDs:

1. Click on each collection
2. Click "Settings" tab
3. Copy the **Collection ID**
4. Keep these for the `.env.local` file:
   - Properties Collection ID: `properties`
   - Agents Collection ID: `agents`
   - Reviews Collection ID: `reviews`
   - Galleries Collection ID: `galleries`

---

## Google OAuth Setup

Google OAuth allows users to sign in with their Google account instead of creating a new username/password.

### Step 1: Enable Google OAuth in Appwrite

1. In your Appwrite console, go to **"Auth"** in the left sidebar
2. Click on **"Settings"** tab
3. Scroll down to **"OAuth2 Providers"**
4. Find **"Google"** and click on it
5. Toggle the switch to **"Enabled"**

### Step 2: Get OAuth Credentials from Google

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Click on **"APIs & Services"** → **"Credentials"**
4. Click **"Create Credentials"** → **"OAuth 2.0 Client IDs"**
5. If prompted, configure the OAuth consent screen:
   - **App name**: `Real Scout`
   - **User support email**: Your email
   - **Developer contact**: Your email
6. Choose application type: **"Web application"**
7. Add authorized redirect URIs:

   ```
   https://cloud.appwrite.io/v1/account/sessions/oauth2/callback/google/675d7d16001d93cc0cad
   ```

   > Replace the ID at the end with your Appwrite Project ID

8. Click **"Create"**
9. Copy the **Client ID** and **Client Secret**

### Step 3: Configure in Appwrite

1. Back in Appwrite, in the Google OAuth settings
2. Paste:
   - **App ID**: Your Google Client ID
   - **App Secret**: Your Google Client Secret
3. Click **"Update"**

> ✅ **Success**: Google OAuth is now configured!

---

## Environment Variables

Environment variables store sensitive configuration data that shouldn't be in your code.

### Step 1: Create .env.local File

In your project root directory, create a file named `.env.local`:

```bash
# On macOS/Linux
touch .env.local

# On Windows (in Command Prompt)
type nul > .env.local
```

### Step 2: Add Configuration

Open `.env.local` in your text editor and add:

```env
# Appwrite Configuration
EXPO_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_project_id_here
EXPO_PUBLIC_APPWRITE_DATABASE_ID=real-estate-db

# Collection IDs
EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID=properties
EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID=agents
EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID=reviews
EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID=galleries

# Storage (Optional - for future use)
EXPO_PUBLIC_APPWRITE_BUCKET_ID=your_bucket_id_here
```

### Step 3: Replace Placeholder Values

Replace these values with your actual Appwrite data:

- `your_project_id_here` → Your Appwrite Project ID (from Step 2 of Appwrite Setup)
- `real-estate-db` → Your Database ID (if you used a different name)
- Collection IDs should match what you created

**Where to find these values:**

1. **Project ID**: Appwrite Console → Click on your project name → Copy Project ID
2. **Database ID**: Databases → Click on your database → Settings → Copy Database ID
3. **Collection IDs**: Databases → Click on collection → Settings → Copy Collection ID

> ⚠️ **Important**: Never commit `.env.local` to Git! It should be in your `.gitignore` file.

---

## Database Seeding

Seeding means populating your empty database with sample data for testing.

### Understanding the Seed Data

The seed script will create:

- **5 Agents** with random names and avatars
- **20 Reviews** with random ratings and comments
- **10 Gallery images** for properties
- **20 Properties** with complete details, assigned agents, reviews, and galleries

### Method 1: Using the App UI (Recommended)

1. Start your app (instructions in next section)
2. Sign in with Google
3. Navigate to **Profile** tab
4. Scroll down and tap **"🌱 Seed Database"**
5. Wait for confirmation message
6. Check your Appwrite console to verify data was created

### Method 2: Using Code

If you prefer to seed via code:

```typescript
// Create a temporary file: seed-runner.ts
import seed from "./lib/seed";

seed()
  .then(() => console.log("Seeding complete!"))
  .catch((error) => console.error("Seeding failed:", error));
```

Then run:

```bash
npx ts-node seed-runner.ts
```

> 💡 **Tip**: You can run the seed multiple times. It will clear existing data and create fresh sample data each time.

---

## Running the Application

### Step 1: Start the Development Server

```bash
npm start
```

or

```bash
npx expo start
```

**What you should see:**

```
› Metro waiting on exp://192.168.1.x:8081
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)
```

### Step 2: Choose Your Testing Platform

#### Option A: Physical Device (Recommended)

**For iOS:**

1. Open the **Camera** app on your iPhone
2. Point it at the QR code in your terminal
3. Tap the notification that appears
4. App will open in Expo Go

**For Android:**

1. Open **Expo Go** app
2. Tap **"Scan QR Code"**
3. Scan the QR code in your terminal
4. App will load

#### Option B: Emulator/Simulator

**For iOS Simulator (macOS only):**

```bash
# Press 'i' in the terminal
# or
npm run ios
```

**For Android Emulator:**

```bash
# Press 'a' in the terminal
# or
npm run android
```

---

## Verification & Testing

### Test Checklist

- [ ] **App Launches**: App opens without errors
- [ ] **Sign In Works**: Can sign in with Google
- [ ] **Home Screen**: Shows "No properties found" or seeded properties
- [ ] **Explore Tab**: Can view all properties
- [ ] **Search Works**: Can search properties by name
- [ ] **Filters Work**: Can filter by property type
- [ ] **Property Details**: Can view individual property details
- [ ] **Profile**: Shows your Google profile name and avatar
- [ ] **Seed Database**: Can seed sample data successfully

### Verify Data in Appwrite

1. Go to your Appwrite console
2. Navigate to **Databases** → Your database
3. Check each collection:
   - **Properties**: Should have 20 documents (if seeded)
   - **Agents**: Should have 5 documents
   - **Reviews**: Should have 20 documents
   - **Galleries**: Should have 10 documents

---

## Troubleshooting

### Common Issues and Solutions

#### Issue 1: "Metro bundler failed to start"

**Solution:**

```bash
# Clear cache and restart
npm start -- --clear
```

#### Issue 2: "Cannot connect to Appwrite"

**Possible causes:**

- ❌ Wrong Project ID in `.env.local`
- ❌ Appwrite endpoint is incorrect
- ❌ Internet connection issues

**Solution:**

1. Double-check all IDs in `.env.local`
2. Verify endpoint: `https://cloud.appwrite.io/v1`
3. Restart the development server

#### Issue 3: "Google OAuth fails"

**Possible causes:**

- ❌ OAuth credentials not configured
- ❌ Redirect URI mismatch

**Solution:**

1. Verify Google OAuth is enabled in Appwrite
2. Check redirect URI matches your Project ID
3. Ensure Client ID and Secret are correct

#### Issue 4: "Properties not loading"

**Possible causes:**

- ❌ Database is empty
- ❌ Collection permissions not set
- ❌ Wrong Collection IDs in `.env.local`

**Solution:**

1. Run the seed database function
2. Check collection permissions (should allow "Any" to Read)
3. Verify Collection IDs match

#### Issue 5: "Module not found" errors

**Solution:**

```bash
# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Issue 6: "Expo Go version mismatch"

**Solution:**

1. Update Expo Go app on your device
2. Or run: `npx expo install --check`

### Getting Help

If you're still stuck:

1. **Check the logs**: Look for error messages in the terminal
2. **Check Expo errors**: Shake your device → "Show Developer Menu" → "Debug"
3. **Appwrite Logs**: Check Appwrite console logs for API errors
4. **GitHub Issues**: Search or create an issue on the repository
5. **Contact**: Reach out to Mausam Kar (GitHub: @Mausam5055)

---

## 🎉 Success!

If you've completed all steps, you should now have:

✅ A fully functional Real Estate app running on your device  
✅ Appwrite backend configured with your own database  
✅ Google OAuth authentication working  
✅ Sample data seeded and displaying  
✅ All features working (search, filters, property details)

### Next Steps

- **Customize**: Add your own properties and branding
- **Extend**: Add new features from the roadmap
- **Deploy**: Build and publish your app
- **Share**: Contribute back to the project!

---

## 📚 Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Appwrite Documentation](https://appwrite.io/docs)
- [NativeWind Documentation](https://www.nativewind.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

<div align="center">

**Happy Coding! 🚀**

Made with ❤️ by [Mausam Kar](https://github.com/Mausam5055)

</div>
