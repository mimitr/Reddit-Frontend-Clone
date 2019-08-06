/**
 * Written by A. Hinds with Z. Afzal 2018 for UNSW CSE.
 *
 * Updated 2019.
 */

// import your app here
import initApp from './main.js';

//const API_URL = 'http://127.0.0.1:8080/data';

// comment above line and uncomment below line when you start using the back-end server
import API_URL from './backend_url.js';

// and run it
initApp(API_URL);

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




function create_login_form() {

    const div_modal = document.createElement("div");
    div_modal.className = "modal";
    div_modal.id = "modal_login";

    const div_modal_content = document.createElement("div");
    div_modal_content.className = "modal-content";
    div_modal_content.id = "modal-content";
    div_modal.appendChild(div_modal_content);


    const form = document.createElement("form");
    //form.setAttribute('method', "post");
    div_modal_content.appendChild(form);

    const h1 = document.createElement("h1");
    h1.innerText = "Login";
    form.appendChild(h1);

    const username = document.createElement("input");
    username.setAttribute('type', "text");
    username.setAttribute('name', "username");
    username.setAttribute("placeholder", "Enter Username");
    form.appendChild(username);

    const password = document.createElement("input");
    password.setAttribute('type', "password");
    password.setAttribute('name', "password");
    password.setAttribute("placeholder", "Enter Password");
    form.appendChild(password);

    const button_login = document.createElement("button");
    button_login.className = "btn_login";
    button_login.id = "btn_login_login";
    button_login.setAttribute("type", "submit");
    button_login.innerText = "Login";
    form.appendChild(button_login);

    const button_cancel = document.createElement("button");
    button_cancel.className = "btn_cancel";
    button_cancel.id = "btn_cancel_login";

    button_cancel.setAttribute("type", "submit");
    button_cancel.addEventListener('click', closeForm);
    button_cancel.innerText = "Cancel";
    form.appendChild(button_cancel);

    return div_modal;

}

function create_signup_form() {

    const div_modal = document.createElement("div");
    div_modal.className = "modal";
    div_modal.id = "modal_signup";

    const div_modal_content = document.createElement("div");
    div_modal_content.className = "modal-content";
    div_modal_content.id = "modal-content";
    div_modal.appendChild(div_modal_content);


    const form = document.createElement("form");
    //form.setAttribute('method', "post");
    div_modal_content.appendChild(form);

    const h1 = document.createElement("h1");
    h1.innerText = "Sign Up";
    form.appendChild(h1);

    const username = document.createElement("input");
    username.setAttribute('type', "text");
    username.setAttribute('name', "username");
    username.setAttribute("placeholder", "Choose a Username");
    form.appendChild(username);

    const password = document.createElement("input");
    password.setAttribute('type', "password");
    password.setAttribute('name', "password");
    password.setAttribute("placeholder", "Enter Password");
    form.appendChild(password);


    const button_login = document.createElement("button");
    button_login.className = "btn_login";
    button_login.id = "btn_login_signup";
    button_login.setAttribute("type", "submit");
    button_login.innerText = "Sign Up";
    form.appendChild(button_login);

    const button_cancel = document.createElement("button");
    button_cancel.className = "btn_cancel";
    button_cancel.id = "btn_cancel_signup";
    button_cancel.setAttribute("type", "submit");
    button_cancel.addEventListener('click', closeForm);
    button_cancel.innerText = "Cancel";
    form.appendChild(button_cancel);

    return div_modal;

}



function create_nav() {
    const ul = document.createElement("ul");
    ul.className = "nav";

    const li1 = document.createElement("li");
    li1.className = "nav-item";

    const input = document.createElement("input");
    input.id = "search";
    const input_attr = document.createAttribute("data-id-search");
    input.setAttributeNode(input_attr);
    input.placeholder = "Search Seddit"
    input.type = "search"

    const li2 = document.createElement("li");
    li2.className = "nav-item";

    const button1 = document.createElement("button");
    button1.className = "button button-primary";
    button1.id = "button_login";
    const button1_attr = document.createAttribute("data-id-login");
    button1.setAttributeNode(button1_attr);
    button1.innerHTML = "Log In";
    button1.addEventListener("click", openForm);

    const li3 = document.createElement("li");
    li3.className = "nav-item";

    const button2 = document.createElement("button");
    button2.className = "button button-secondary";
    button2.id = "button_signup";
    const button2_attr = document.createAttribute("data-id-signup");
    button2.setAttributeNode(button2_attr);
    button2.innerHTML = "Sign Up";
    button2.addEventListener("click", openForm);

    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
    li1.appendChild(input);
    li2.appendChild(button1);
    li3.appendChild(button2);

    return ul;

}

function closeForm(e) {
    if (e.target.id === "btn_cancel_login") {
        document.getElementById("modal_login").style.display = "none";
    } else {
        document.getElementById("modal_signup").style.display = "none";
    }
}

function openForm(e) {
    if (e.target.id === "button_login") {
        document.getElementById("modal_login").style.display = "block";
    } else {
        document.getElementById("modal_signup").style.display = "block";
    }
}

function create_main() {
    const main = document.createElement("main");
    //const main_role = document.createAttribute("role");
    main.setAttribute("role", "main");
    return main;
}

function create_feed() {
    const ul_feed = document.createElement("ul");
    ul_feed.id = "feed";
    const ul_attr = document.createAttribute("data-id-feed");
    ul_feed.setAttributeNode(ul_attr);

    const div_feed_header = document.createElement("div");
    div_feed_header.className = "feed-header";

    const h3_feed_title = document.createElement("h3");
    h3_feed_title.className = "feed-title alt-text";
    h3_feed_title.innerText = "Popular posts";

    const button_secondary = document.createElement("button");
    button_secondary.className = "button button-secondary";
    button_secondary.innerText = "Post";

    const li_post = document.createElement("li");
    li_post.className = "post";
    const li_post_attr = document.createAttribute("data-id-post");
    li_post.setAttributeNode(li_post_attr);

    const div_vote = document.createElement("div");
    div_vote.className = "vote";
    const div_vote_attr = document.createAttribute("data-id-upvotes");
    div_vote.setAttributeNode(div_vote_attr);

    const div_content = document.createElement("div");
    div_content.className = "content";

    const h4_post_title = document.createElement("h4");
    const h4_post_title_attr = document.createAttribute("data-id-title");
    h4_post_title.setAttributeNode(h4_post_title_attr);
    h4_post_title.className = "post-title alt-text";
    h4_post_title.innerText = "Avenger’s Endgame Officially Passes Avatar To Become The Highest Grossing Movie Of All Time";

    const p_author = document.createElement("p");
    p_author.className = "post-author";
    const p_author_attr = document.createAttribute("data-id-author");
    p_author.setAttributeNode(p_author_attr);
    p_author.innerText = "Posted by @some_dude69";

    ul_feed.appendChild(div_feed_header);
    div_feed_header.appendChild(h3_feed_title);
    div_feed_header.appendChild(button_secondary);
    ul_feed.appendChild(li_post);
    li_post.appendChild(div_vote);
    li_post.appendChild(div_content);
    div_content.appendChild(h4_post_title);
    div_content.appendChild(p_author);

    return ul_feed;
}

function create_footer() {
    const footer = document.createElement("footer");
    footer.innerText = "Seddit to my Reddit";

    return footer;
}

const header = create_header();
const logo = create_logo();
const nav = create_nav();
const main = create_main();
const ul_feed = create_feed();
const footer = create_footer();
const login_form = create_login_form();
const signup_form = create_signup_form();

root.appendChild(header);
root.appendChild(main);
root.appendChild(footer);
header.appendChild(logo);
header.appendChild(nav);
main.appendChild(ul_feed);
main.appendChild(login_form);
main.appendChild(signup_form);

// for login
//localStorage.setItem('token', token);


/* // handle the submit event 
function submit() {
    let d = getFormData(_el);
    // perform the login action 
    axios.post('auth/login', d).then(j => {
        // perform the login routine
        login(j.token);
    })
} */

//const API_URL = 'http://localhost:5000/auth/login';
fetch(API_URL + "auth/login").then(response => console.log(response));
