// html.js
// Why: Encapsulate the construction of HTML/DOM elements

import { pub } from '/shared/pubsub.js';

export const html = {
  // Custom
  create(tagName, attributes = {}, nodes = []) {
    const element = document.createElement(tagName);

    for (const [key, value] of Object.entries(attributes)) {
      element.setAttribute(key, value);
    }

    function appendNodes(nodes) {
      for (const node of nodes) {
        if (typeof node === 'string') {
          // If the node is a string, create a text node
          element.appendChild(document.createTextNode(node));
        } else if (node instanceof Node) {
          // If the node is a Node object, append it directly
          element.appendChild(node);
        } else if (Array.isArray(node)) {
          // If the node is an array, recursively process it
          appendNodes(node);
        } else {
          // Unsupported node type
          console.warn('Unsupported node type:', node);
        }
      }
    }

    appendNodes(nodes);

    return element;
  },

  // Quick typing
  br(count = 1) {
    if (count === 1) {
      return create('br');
    } else {
      return Array.from({ length: count }, () => create('br')); // Return an array for multiple
    }
  },
  p(...nodes) {
    return create('p', {}, nodes);
  },
  em(...nodes) {
    return create('em', {}, nodes);
  },
  strong(...nodes) {
    return create('strong', {}, nodes);
  },
  

  // Menu page elements
  pubButton(text, topic, payload) {
    const b = create('button', {}, [text]);
    b.addEventListener('click', e => {
      const data = Object.assign({}, e, payload);
      pub(topic, data);
    });

    return b;
  },
  emailInput() {
    return create('input', { 
      type: 'email',
      name: 'email',
      id: 'email',
      placeholder: 'Email',
      required: true,
    });
  },
  passwordInput() {
    return create('input', { 
      type: 'password',
      name: 'password',
      id: 'password',
      placeholder: 'Password',
      required: true
    });
  },
  passwordInputStopAutocomplete() {
    const i = passwordInput()
    i.setAttribute('autocomplete', 'new-password');
    return i;
  },
  submitButton(text) {
    return create('button', {
      type: 'submit',
      style: 'font-weight: normal;' // Override iOS (bold)
    }, [text]);
  },
  form(topic, elements) {
    const f = create('form', {
      novalidate: true
    }, elements);

    f.addEventListener("submit", e => {
      e.preventDefault(); // Stop built-in form submission

      const formData = new FormData(e.target);
      const data = {};
      Object.assign(data, Object.fromEntries(formData));
      pub(topic, { formData: data })
    });

    return f;
  },

  // Dep
  funcButton(text, func) {
    const b = create('button', {}, [text]);
    b.addEventListener('click', func);
    return b;
  }
}

// Destructure methods from `html` for simplicity
const { create, br, emailInput, passwordInput } = html;