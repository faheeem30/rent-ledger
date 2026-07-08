import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

/**
 * .authorization(allow => [allow.owner()]) means: each signed-in user
 * can only ever see and edit their OWN records. This is what gives you
 * "multiple people, separate logins, separate properties" for free —
 * DynamoDB + Cognito handle the isolation, you don't write that logic.
 */
const schema = a.schema({
  Property: a.model({
    name: a.string().required(),
    address: a.string(),
    lat: a.string(),
    lng: a.string(),
    rent: a.float(),
    advanceAmount: a.float(),
    occupancy: a.string(),          // "occupied" | "vacant"
    occupiedSince: a.string(),      // lease start date
    agreementDone: a.string(),      // "yes" | "no"
    rentDueDay: a.integer(),
    notes: a.string(),
    ownershipType: a.string(),      // "single" | "multiple"
    owners: a.json(),               // [{id, name, phone}]
    tenants: a.json(),              // [{id, name, phone, email, mailAlertEnabled}]
  }).authorization(allow => [allow.owner()]),

  IncomeEntry: a.model({
    propertyId: a.string().required(),
    month: a.string().required(),   // "YYYY-MM"
    amount: a.float(),
    paidDate: a.string(),
  }).authorization(allow => [allow.owner()]),

  Expense: a.model({
    propertyId: a.string().required(),
    category: a.string(),
    cost: a.float(),
    description: a.string(),
    date: a.string(),
    contactId: a.string(),
    ownerId: a.string(),            // which co-owner this expense is tied to, if multiple
  }).authorization(allow => [allow.owner()]),

  Contact: a.model({
    propertyId: a.string().required(),
    type: a.string(),               // Plumber, Electrician, etc.
    name: a.string(),
    phone: a.string(),
    notes: a.string(),
  }).authorization(allow => [allow.owner()]),

  Note: a.model({
    text: a.string().required(),
    date: a.string(),
    done: a.boolean(),
  }).authorization(allow => [allow.owner()]),

  Settings: a.model({
    appName: a.string(),
    currency: a.string(),
  }).authorization(allow => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});
