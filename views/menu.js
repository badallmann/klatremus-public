import { TOPICS } from '/shared/constants.js';
import { html }   from '/shared/html.js';
import { auth }   from '/models/firebase-services.js';
import { authentication } from '/models/authentication.js'; // (Non-MVC practise)

function navBtn(text, menuPage) {
  return html.pubButton(text, TOPICS.MENU_NAV, { navTo: menuPage })
}

function backBtn() {
  return html.pubButton('←Back', TOPICS.MENU_NAV_BACK)
}

const pages = {
  signedOut() {
    return [
      authentication.wasSignedInEarlier ? html.p('Signed out') : '',
      navBtn('Sign in', menu.pages.signIn),
      navBtn('Create user', menu.pages.createUser)
    ];
  },
  signIn() {
    return [
      backBtn(),
      html.p('Sign in:'),
      html.form(TOPICS.SUBMIT_SIGN_IN, [
        html.emailInput(),
        html.passwordInput(),
        html.submitButton('Submit')
      ]),
    ];
  },
  createUser() {
    return [
      backBtn(),
      html.p('Create user:'),
      html.form(TOPICS.SUBMIT_CREATE_USER, [
        html.emailInput(),
        html.passwordInputStopAutocomplete(),
        html.submitButton('Submit')
      ])
    ];
  },
  errorSigningIn() {
    return [
      backBtn(),
      html.p('Error:'),
      html.p('Something went wrong. Please try again.'),
    ];
  },
  errorCreatingUser() {
    return [
      backBtn(),
      html.p('Error:'),
      html.p('Something went wrong. Please try again.'),
    ];
  },
  signedIn() {
    return [
      html.p('Signed in as ', html.em(auth.currentUser.email)),
      navBtn('Settings', menu.pages.settings),
      html.pubButton('Sign out', TOPICS.SIGN_OUT)
    ];
  },
  settings() {
    return [
      backBtn(),
      html.p('Settings:'),
      navBtn('Delete user…', menu.pages.askConfirmDeleteUser),
    ]
  },
  askConfirmDeleteUser() {
    return [
      backBtn(),
      html.p('Delete user:'),
      html.p('Are you sure?'),
      html.pubButton('Confirm delete user', TOPICS.DELETE_USER)
    ]
  }
}

export const menu = {
  pages,

  element: html.create('div', { 'class': 'menu' }),

  navHistory: [],

  show() {
    document.body.appendChild(menu.element);
  },

  update(page) {
    if ([menu.pages.signedIn, menu.pages.signedOut].includes(page)) {
      menu.navHistory = [];
    }
    const content = page();
    menu.element.replaceChildren(...content);
    menu.navHistory.push(page);
  },

  navigateBack() {
    menu.navHistory.pop();
    const page = menu.navHistory.pop();
    menu.update(page);
  }
}