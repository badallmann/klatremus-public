import { html } from "/shared/html.js";
import { menu } from "/views/menu.js";
import { halvorhansen } from "/tests/halvorhansen.js";

let urlDetails = null;

function parseURL() {
  const url = new URL(window.location.href);
  const hostnameParts = url.hostname.split('.');
  
  const apexDomain = hostnameParts.slice(-2).join('.');
  const subdomain = hostnameParts.length > 2 ? hostnameParts[0] : '';
  const trailingPath = url.pathname;
  const cleanUrl = `${url.protocol}//${subdomain ? `${subdomain}.` : ''}${apexDomain}`;
  
  return { subdomain, apexDomain, trailingPath, cleanUrl };
}

function renderSubdomainContent(subdomain) {
  console.log(`Rendering content for subdomain: ${subdomain}`);
  
  switch (subdomain) {
    case 'baslak':
      document.write('Baslak');
      break;
    case 'halvorhansen':
      halvorhansen();
      break;
    default:
      console.log(`No content available for subdomain: ${subdomain}`);
  }
}

function doesSubdomainExist(subdomain) {
  const existingSubdomains = ['baslak', 'halvorhansen'];
  return existingSubdomains.includes(subdomain);
}

function handleSubdomain() {
  if (doesSubdomainExist(urlDetails.subdomain)) {
    renderSubdomainContent(urlDetails.subdomain);
  } else {
    console.log('Subdomain does not exist (provide link to service)');
  }
}

function service() {
  console.log('Rendering service page');
  document.body.appendChild(html.create('h1', {}, 'Snublr'));
  menu.show();
}

function handleProduction() {
  console.log('Production Environment');

  if (urlDetails.subdomain) {
    handleSubdomain();
  } else {
    service();
  }
}

function handleDevelopment() {
  console.log('Development Environment');
  service();
}

function handleLanding() {
  urlDetails = parseURL();
  
  if (urlDetails.apexDomain === 'snublr.net') {
    handleProduction();
  } else {
    handleDevelopment();
  }
}

function testWithSubdomain(subdomain) {
  if (doesSubdomainExist(subdomain)) {
    renderSubdomainContent(subdomain);
    console.log('Subdomain exists and was rendered');
  } else {
    console.log('Subdomain does not exist');
  }
}

export { handleLanding, testWithSubdomain }