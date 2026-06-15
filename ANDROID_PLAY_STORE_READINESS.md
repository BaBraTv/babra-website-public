# BaBra Store Android Play Store Readiness

Use `https://www.babra.store` as the production web origin and keep `babra.store` consistent in app titles, screenshots, privacy links, and Play Console metadata.

## Recommended path: Trusted Web Activity

TWA is the lightest Play Store path because the website remains the source of truth.

1. Confirm PWA quality:
   - `manifest.webmanifest` resolves.
   - `/sw.js` registers in production.
   - `/offline` works as fallback.
   - App starts at `/store`.
   - Icons and splash colors use BaBra black and gold.
2. Generate Android shell with Bubblewrap:
   - `npm install -g @bubblewrap/cli`
   - `bubblewrap init --manifest https://www.babra.store/manifest.webmanifest`
   - Package name recommendation: `store.babra.app`
   - App name: `BaBra Store`
3. Add Digital Asset Links after Play signing is known:
   - Create `public/.well-known/assetlinks.json`.
   - Include the SHA-256 signing certificate fingerprint from Google Play Console.
   - Do not publish a placeholder fingerprint.
4. Build:
   - `bubblewrap build`
   - Upload the generated Android App Bundle to Play Console.

## Alternative path: Capacitor

Use Capacitor only if BaBra needs native plugins such as push notifications, camera, offline database, or Android-specific checkout integrations.

1. Install:
   - `npm install @capacitor/core @capacitor/cli @capacitor/android`
2. Initialize:
   - `npx cap init "BaBra Store" store.babra.app --web-dir=.next`
3. Add Android:
   - `npx cap add android`
4. Build the Next.js app and sync:
   - `npm run build`
   - `npx cap sync android`

## Play Store content checklist

- App name: `BaBra Store`
- Short description: `Premium Rwanda skincare shopping, delivery, wholesale, and WhatsApp ordering.`
- Privacy Policy URL: `https://www.babra.store/privacy`
- Terms URL: `https://www.babra.store/terms`
- Delivery Policy URL: `https://www.babra.store/delivery`
- Return Policy URL: `https://www.babra.store/returns`
- Contact email: `babracosmeticsltd@gmail.com`
- Category: Shopping
- Content note: Do not upload formulas, full label files, barcodes, QR codes, supplier details, or private compliance documents.
