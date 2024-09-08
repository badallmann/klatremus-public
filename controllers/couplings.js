import { sub }    from "/shared/pubsub.js";
import { TOPICS } from "/shared/constants.js";
import { authentication } from "/models/authentication.js";
import { menu }   from "/views/menu.js";

export function coupleTopics() {
  // Shorthand: Event to menuPage
  function e2m(event, menuPage) {
    sub(event, () => { menu.update(menuPage) })
  }

  // Auth state
  sub(TOPICS.AUTH_STATE_CHANGE_SIGNED_OUT, () => {
    menu.update(menu.pages.signedOut, authentication.wasSignedInEarlier);
  });
  sub(TOPICS.AUTH_STATE_CHANGE_SIGNED_IN,  () => {
    menu.update(menu.pages.signedIn);
    authentication.wasSignedInEarlier = true;
  });

  // Navigation
  sub(TOPICS.NAVIGATE_SIGNED_OUT, () => {
    menu.update(menu.pages.signedOut,
      authentication.wasSignedInEarlier
    );
  });
  e2m(TOPICS.NAVIGATE_SIGN_IN,     menu.pages.signIn);
  e2m(TOPICS.NAVIGATE_CREATE_USER, menu.pages.createUser);
  e2m(TOPICS.NAVIGATE_SIGNED_IN,   menu.pages.signedIn);

  // Auth forms
  sub(TOPICS.SUBMIT_SIGN_IN,     authentication.signIn);
  sub(TOPICS.SUBMIT_CREATE_USER, authentication.createFirebaseUser);
  e2m(TOPICS.ASK_CONFIRM_DELETE_USER, menu.pages.confirmDeleteUser)

  // Errors
  e2m(TOPICS.ERROR_SIGNING_IN,    menu.pages.errorSigningIn);
  e2m(TOPICS.ERROR_CREATING_USER, menu.pages.errorCreatingUser);

  // Signed in
  sub(TOPICS.SIGN_OUT,    authentication.signOut);
  sub(TOPICS.DELETE_USER, authentication.deleteFirebaseUser)
}