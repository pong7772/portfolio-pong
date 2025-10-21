import { type Analytics, getAnalytics, isSupported } from 'firebase/analytics';
import { type FirebaseApp, getApps, initializeApp } from 'firebase/app';

let app: FirebaseApp | undefined;
let analytics: Analytics | undefined;

export const initFirebase = async (): Promise<{
  app?: FirebaseApp;
  analytics?: Analytics;
}> => {
  if (typeof window === 'undefined') return {};

  if (!getApps().length) {
    app = initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    } as any);
  } else {
    app = getApps()[0]!;
  }

  try {
    if (await isSupported()) {
      analytics = getAnalytics(app);
    }
  } catch {
    // ignore analytics init errors (e.g., unsupported environment)
  }

  return { app, analytics };
};

export { analytics, app };
