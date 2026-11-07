# Security Specification (`security_spec.md`)

## 1. Data Invariants
1. **Default Deny**: All paths not explicitly matched in `/databases/{database}/documents` are unconditionally denied (`allow read, write: if false;`).
2. **Ownership & PII Isolation**: Every document in `/consultations/{consultationId}` belongs strictly to the authenticated user whose `request.auth.uid` matches `ownerId`. No other user may read (`get` or `list`), create, update, or delete another user's consultation log.
3. **Verified Identity for Mutations**: All write operations (`create`, `update`, `delete`) require a verified email (`request.auth.token.email_verified == true`).
4. **Strict Key & Schema Enforcement**: Documents in `/consultations/{consultationId}` must contain exact keys `['ownerId', 'merek', 'modelTahun', 'layanan', 'keluhan', 'catatanDiagnosa', 'status', 'createdAt', 'updatedAt']` with bounded string lengths and valid enums matching `firebase-blueprint.json`.
5. **Temporal Integrity & Immutability**: `createdAt` must equal `request.time` on creation and is immutable on update. `updatedAt` must equal `request.time` on both creation and update. `ownerId`, `merek`, and `modelTahun` are immutable after creation.
6. **Terminal State Lock**: Once `status` reaches `'selesai'`, no further updates are permitted on that document.

## 2. The "Dirty Dozen" Payloads
1. **Unauthenticated Write**: Creating a consultation with `request.auth == null`.
2. **Unverified Email Write**: Creating a consultation when `request.auth.token.email_verified == false`.
3. **Identity Spoofing on Create**: Setting `ownerId: 'victim_uid'` when `request.auth.uid == 'attacker_uid'`.
4. **Shadow/Ghost Field Injection**: Sending an extra field `isAdmin: true` or `discount: 100` on create or update.
5. **ID Poisoning Attack**: Using a 500-character or special-character document ID containing spaces or slashes.
6. **Brand Enum Violation**: Setting `merek: 'Toyota'` (outside `['Jaguar', 'Land Rover', 'Bentley', 'Rolls-Royce']`).
7. **Denial-of-Wallet Oversized String**: Sending a 10,000-character string in `keluhan` (exceeding `maxLength: 1000`).
8. **Client Timestamp Forgery**: Providing a past or future timestamp instead of `request.time` for `createdAt` or `updatedAt`.
9. **Owner Reassignment on Update**: Attempting to mutate `ownerId` during an update operation.
10. **Immutable CreatedAt Mutation**: Attempting to alter `createdAt` during an update operation.
11. **Terminal State Bypass**: Attempting to update `keluhan` or `status` on a document whose existing `status` is already `'selesai'`.
12. **Cross-User Read/List Scraping**: Querying or reading `/consultations/{consultationId}` where `resource.data.ownerId != request.auth.uid`.
