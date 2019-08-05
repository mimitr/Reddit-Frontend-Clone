/**
 * Written by A. Hinds with Z. Afzal 2018 for UNSW CSE.
 *
 * Updated 2019.
 */

// import your app here
import initApp from './main.js';

const API_URL = 'http://127.0.0.1:8080/data';

// comment above line and uncomment below line when you start using the back-end server
//import API_URL from './backend_url.js';

// and run it
initApp(API_URL);
//console.log('hiii');

const root = document.getElementById("root");

function create_header() {
    const header = document.createElement("header");
    header.className = "banner";
    header.id = "nav";
    return header;
    //root.appendChild(header);
}

function create_logo() {
    const h1_logo = document.createElement("hi");
    h1_logo.id = "logo";
    h1_logo.className = "flex-center";
    h1_logo.innerText = "Seddit";
    return h1_logo;
}

function create_nav() {
    const ul = document.createElement("ul");
    ul.className = "nav";

    /*     const lia = [...Array(3)].map((curr, index) => {
            curr = "li" + (index + 1);
            currcreateElement
        }); 
    console.log(lia); */
    const li1 = document.createElement("li");
    li1.className = "nav-item";

    const input = document.createElement("input");
    input.id = "search";
    input.attribute = "data-id-search";
    input.placeholder = "Search Seddit"
    input.type = "search"

    const li2 = document.createElement("li");
    li2.className = "nav-item";

    const button1 = document.createElement("button");
    button1.className = "button button-primary";
    button1.attribute = "data-id-login";
    button1.innerHTML = "Log In";

    const li3 = document.createElement("li");
    li3.className = "nav-item";

    const button2 = document.createElement("button");
    button2.className = "button button-secondary";
    button2.attribute = "data-id-signup";
    button2.innerHTML = "Sign Up";

    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
    li1.appendChild(input);
    li2.appendChild(button1);
    li3.appendChild(button2);

    return ul;

}

function create_main() {
    const main = document.createElement("main");
    //?
    main.role = "main";
    return main;
}


const header = create_header();
const logo = create_logo();
const nav = create_nav();
const main = create_main();

root.appendChild(header);
root.appendChild(main);
header.appendChild(logo);
header.appendChild(nav);
