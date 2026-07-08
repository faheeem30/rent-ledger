import { defineAuth } from '@aws-amplify/backend';

/**
 * Every person who signs up gets their own private Cognito account.
 * Their data (properties, income, expenses, contacts) is automatically
 * locked to them via the "owner" authorization rule in data/resource.ts
 * — no extra code needed to keep users' data separate.
 *
 * SECURITY NOTES:
 * - Cognito never stores passwords in plain text — they're hashed and
 *   salted automatically. You (and Anthropic) never see or handle them.
 * - Amplify's DEFAULT password policy is already strong: minimum 8
 *   characters, requires upper case, lower case, a number, and a symbol.
 *   This is enforced by Cognito on the server, not just in the browser,
 *   so it can't be bypassed. No extra config needed.
 * - accountRecovery: 'EMAIL_ONLY' below is what powers real "Forgot
 *   password" — Cognito emails a reset code automatically.
 * - Email verification (the "activation" message) is sent automatically
 *   by Cognito the moment someone signs up — no extra setup needed for
 *   this to work once deployed.
 */
export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailSubject: 'Verify your Rent Ledger account',
      verificationEmailBody: (createCode) =>
        `Welcome to Rent Ledger! Your verification code is ${createCode()}. Enter this code to activate your account.`,
    },
  },
  accountRecovery: 'EMAIL_ONLY',
});
