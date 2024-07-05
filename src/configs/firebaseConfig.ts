export const firebaseConfig = {
  apiKey: process.env.NEXT ?? "AIzaSyD6mzxAZjsRJIdFPJ0jdOFfujsd4wJSovk",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "chat-a03bf.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "chat-a03bf",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "chat-a03bf.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "439959351321",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "1:439959351321:web:9f2b8f39ae46655f82fa88",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? "G-7Z2Y2QZ7ZB",
};
