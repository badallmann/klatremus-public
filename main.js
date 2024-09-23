import { addStylesheets } from "/style/add-stylesheets.js";
import { css } from "/shared/misc.js";
import { init } from "/controllers/init.js";
import { testWithSubdomain } from "/controllers/landing.js";

window.onload = function() {
  addStylesheets();
  css(`
    body { 
      font-size: 22px;
      font-family: monospace;
    }
  `);
  init();
}

window.testWithSubdomain = testWithSubdomain;