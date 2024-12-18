import * as firebaseAdmin from "firebase-admin";

// get this JSON from the Firebase board
// you can also store the values in environment variables

let firebaseApp;

if (!firebaseAdmin.apps.length) {
  firebaseApp = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY,
      clientEmail: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    }),
    databaseURL: "https://kolonihave.eur3.firebaseio.com",
  });
}

export { firebaseAdmin, firebaseApp };
