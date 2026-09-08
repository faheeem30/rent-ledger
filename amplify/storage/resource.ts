import { defineStorage } from '@aws-amplify/backend';

/**
 * File storage for tenant agreement PDFs.
 * Each signed-in user can only read/write/delete files under their own
 * "agreements/{their-identity-id}/..." folder — the same private,
 * per-user isolation the DynamoDB tables already give you via
 * allow.owner(), just for files instead of records.
 */
export const storage = defineStorage({
  name: 'rentLedgerAgreements',
  access: (allow) => ({
    'agreements/{entity_id}/*': [
      allow.entity('identity').to(['read', 'write', 'delete']),
    ],
  }),
});
