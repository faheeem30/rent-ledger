# Rent Ledger – AWS Version

This is a Rent Ledger application built with **AWS Amplify**.

It includes:

* Dashboard
* Properties
* Tenants
* Maintenance
* Map
* Contacts
* Upcoming Plans
* Settings

The app uses:

* **Amazon Cognito** for user authentication (Sign Up, Sign In, Email Verification, Forgot Password)
* **Amazon DynamoDB** to securely store each user's data

Each user can only view and manage their own properties and records.

---

# Before You Start

Make sure you have installed:

* Node.js
* Git
* AWS CLI

Configure AWS once:

```bash
aws configure
```

Enter your AWS Access Key, Secret Access Key, Region, and Output Format.

---

# Installation

Open a terminal inside the project folder and run:

```bash
npm install
```

---

# Start the Backend

Run:

```bash
npx ampx sandbox
```

The first run may take **3–5 minutes**.

Wait until you see:

```
Watching for file changes...
```

Amplify will automatically create a file named:

```
amplify_outputs.json
```

Do not delete this file.

> If you have already run the sandbox before and the database schema has changed, stop it with **Ctrl + C** and run the command again.

---

# Start the App

Open a second terminal in the same folder and run:

```bash
npm run dev
```

Open the local address shown in the terminal (for example):

```
http://localhost:5173
```

Now you can create an account and start using the app.

---

# Authentication

The app supports:

* Sign Up
* Email Verification
* Sign In
* Forgot Password
* Password Reset

Amazon Cognito automatically sends the verification and password reset emails.

No additional setup is required.

---

# Database

The app uses **Amazon DynamoDB** through **AWS Amplify Data**.

Each user can only access their own data.

There is no database username or password to manage manually.

---

# Updating the Project

After making changes:

```bash
git add .
git commit -m "Your message"
git push
```

If the project is connected to AWS Amplify Hosting, it will automatically build and deploy after every push.

---

# Security

User authentication is handled by Amazon Cognito.

* Passwords are securely encrypted.
* Email verification is required.
* Each user's data is isolated from other users.

---

# Features

* User Authentication
* Email Verification
* Forgot Password
* Dashboard
* Property Management
* Tenant Management
* Maintenance Tracking
* Contact Management
* Property Map
* Upcoming Plans
* Settings
* Secure Cloud Database

---

# Optional Improvements

Future enhancements could include:

* Custom email domain using Amazon SES
* Automatic email reminders
* Custom website domain
* Multi-Factor Authentication (MFA)

---

