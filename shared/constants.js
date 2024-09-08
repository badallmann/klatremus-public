// Pubsub topics
export const TOPICS = {
  // Auth state
  AUTH_STATE_CHANGE_SIGNED_OUT: 'auth state change signed out',
  AUTH_STATE_CHANGE_SIGNED_IN:  'auth state change signed in',

  // Navigate to menu
  NAVIGATE_SIGNED_OUT:  'navigate signed out',
  NAVIGATE_SIGN_IN:     'navigate sign in',
  NAVIGATE_CREATE_USER: 'navigate create user',
  NAVIGATE_SIGNED_IN:   'navigate signed in',

  // Auth forms
  SUBMIT_SIGN_IN:     'submit sign in',
  SUBMIT_CREATE_USER: 'submit create user',
  ASK_CONFIRM_DELETE_USER: 'ask confirm delete user',

  // Errors
  ERROR_SIGNING_IN:    'error signing in',
  ERROR_CREATING_USER: 'error creating user',

  // Signed in
  SIGN_OUT:    'sign out',
  DELETE_USER: 'delete user',
};

export const firebaseConfig = {
  apiKey: "AIzaSyD-K1mBWcWXC4QStJzGusofug_sAjLRLb4",
  authDomain: "klatremus.firebaseapp.com",
  projectId: "klatremus",
  storageBucket: "klatremus.appspot.com",
  messagingSenderId: "296129534448",
  appId: "1:296129534448:web:ef00957bb30fcd6817a535"
};