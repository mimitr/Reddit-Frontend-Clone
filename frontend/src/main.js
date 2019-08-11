/**
 * Written by A. Hinds with Z. Afzal 2018 for UNSW CSE.
 * 
 * Updated 2019.
 */

// import your own scripts here.

// your app must take an apiUrl as an argument --
// this will allow us to verify your apps behaviour with 
// different datasets.
import feed from './feed.js';
import login from './login.js';
import signup from './signup.js';
import nav from './nav.js';
import profile from './profile.js';

function initApp(apiUrl) {
  // your app initialisation goes here
  const root = document.getElementById("root");
  function create_header() {
    const header = document.createElement("header");
    header.className = "banner";
    header.id = "nav";
    return header;
  }

  function create_logo() {
    const h1_logo = document.createElement("h1");
    h1_logo.id = "logo";
    h1_logo.className = "flex-center";
    h1_logo.innerText = "Seddit";
    return h1_logo;
  }

  function create_main() {
    const main = document.createElement("main");
    main.setAttribute("role", "main");
    return main;
  }

  function create_footer() {
    const footer = document.createElement("footer");
    footer.innerText = "Seddit to my Reddit";
    return footer;
  }

  const header = create_header();
  const logo = create_logo();
  const main = create_main();
  const footer = create_footer();

  root.appendChild(header);
  root.appendChild(main);
  root.appendChild(footer);
  header.appendChild(logo);

  header.appendChild(nav);

  main.appendChild(feed);
  if (localStorage.getItem("token") == null) {
    main.appendChild(login);
    main.appendChild(signup);
  } else {
    //main.appendChile(profile);
    profile();
  }




}
export default initApp;

