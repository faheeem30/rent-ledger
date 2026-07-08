# Rent Ledger — AWS Version (Full App)

This is now the complete app — Dashboard, Properties, Tenants, Maintenance,
Map, Contacts, Upcoming Plans, and Settings — all wired to a real AWS
backend: Amazon Cognito for sign up/sign in (with a real email activation
code and real "forgot password" email), and DynamoDB (via Amplify Data)
so every person only ever sees their own properties.

**If you already ran `npx ampx sandbox` before:** the database schema
changed (added multi-tenant/owner support, Notes, Settings). Stop the
old sandbox (Ctrl+C) and run `npx ampx sandbox` again so it picks up the
new fields and models — it's safe to re-run.

## What to do right after unzipping this folder

1. Make sure Node.js, Git, and the AWS CLI are installed (see the full
   deployment guide PDF for exact download links)
2. Run `aws configure` once, using an AWS access key (Console → IAM →
   your user → Security credentials → Create access key)
3. Open a terminal **inside this unzipped folder** and run:
   ```
   npm install
   ```
4. Then start your personal test backend:
   ```
   npx ampx sandbox
   ```
   Leave this running. Wait for "Watching for file changes..." (~3-5 min
   the first time). This creates a file called `amplify_outputs.json` in
   this folder automatically — don't delete it.
5. In a **second** terminal, in the same folder, run:
   ```
   npm run dev
   ```
   Open the local address it prints (e.g. http://localhost:5173) and try
   creating an account.

## 1) Email "activation" messages — how they work

You don't need to set anything up. The moment someone signs up, Amazon
Cognito automatically sends a real verification email with a 6-digit
code, using a built-in Cognito email sender. The subject line and message
are customized in `amplify/auth/resource.ts`. The same applies to
"Forgot password" — Cognito emails a real reset code automatically
(wired up in `src/main.js`).

Note: Cognito's built-in email sender works out of the box but sends a
limited number of emails per day and comes from an amazon.com address.
For a production app sending to lots of real tenants, the next step is
connecting Amazon SES (Simple Email Service) with your own domain (e.g.
noreply@yourcompany.com) — ask to have this added when you're ready.

## 2) Updating the code after you've deployed

Once your app is live on Amplify Hosting (connected to a GitHub repo),
every update is the same three commands:
```
git add .
git commit -m "describe what you changed"
git push
```
Amplify detects the push and automatically rebuilds and redeploys both
the frontend and backend — usually within a few minutes. No console
clicking required. You can watch progress in the Amplify Console under
your app's branch.

## 3) Keeping user email & password safe

This is handled by Amazon Cognito, not by custom code — which is exactly
why it's safer than a hand-rolled login:
- Passwords are **hashed and salted** by Cognito before storage. Nobody
  — not you, not a developer, not Anthropic — can ever see a user's
  actual password.
- The password policy (minimum 8 characters, upper case, lower case, a
  number, and a symbol) is enforced **on AWS's servers**, so it can't be
  bypassed by editing the app's code in the browser.
- Email addresses must be verified before the account is usable, which
  cuts down on fake sign-ups.
- Optional next steps if you want to go further: enable Multi-Factor
  Authentication (MFA) in `amplify/auth/resource.ts`, and/or connect a
  custom email domain via Amazon SES (see above).

## 4) Database connection

There's no connection string to manage or keep secret — that's the point
of using Amplify Data. The schema (`amplify/data/resource.ts`) defines
four tables — Property, IncomeEntry, Expense, Contact — each with
`.authorization(allow => [allow.owner()])`, meaning DynamoDB itself
enforces that a signed-in user can only ever read or write their own
rows. When you ran `npx ampx sandbox` or deployed via Amplify Hosting,
the connection details were written into `amplify_outputs.json`
automatically, and `src/main.js` reads them via:
```js
import outputs from '../amplify_outputs.json';
Amplify.configure(outputs);
const client = generateClient();
// client.models.Property.create({...}) — already scoped to the signed-in user
```
You never write or store a database password yourself.

## What's finished

✅ Sign up with real email verification, sign in, real "Forgot password"
✅ Per-user data isolation (enforced by the database rules)
✅ **Every screen**: Dashboard (with chart), Properties (multi-tenant,
   multi-owner, map coordinates), Tenants (rent status + reminders),
   Maintenance (with owner + description tracking), Map, Contacts,
   Upcoming Plans, and Settings (app name, currency, account deletion)

This is the same app and design as `rental_manager_reference.html`
(included in this folder for comparison) — same look, same features —
just running on a real database instead of local storage.

## Optional next steps
- **Custom email domain** via Amazon SES instead of Cognito's default sender
- **Automatic scheduled email reminders** (no manual click) via AWS Lambda + SES + EventBridge
- **Custom domain** for the live site instead of the amplifyapp.com address

## Recommended next step

Installing Node, running CLI commands, and debugging as you go is much
easier with **Claude Code**, since it can run these commands directly on
your computer, see the real errors, and fix them as it goes — this chat
can prepare code, but it can't run `npx ampx sandbox` or `git push`
against your actual AWS account for you.
