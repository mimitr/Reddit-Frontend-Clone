const base_URL = 'http://localhost:5000';

function openForm(e) {
    if (e.target.id === "button-id-login") {
        document.getElementById("modal_login").style.display = "block";
    } else {
        document.getElementById("modal_signup").style.display = "block";
    }
}

const ul = document.createElement("ul");
ul.className = "nav";



// create public feed and my own feed buttons
if (localStorage.getItem("token") != null) {
    const li_feed = document.createElement("li");
    ul.appendChild(li_feed);
    console.log("adas");
    li_feed.className = "nav-item";
    // create button public feed
    const button_public = document.createElement("button");
    button_public.setAttribute("type", "button");
    button_public.id = "button-public-feed";
    button_public.innerText = "Public Feed";
    button_public.addEventListener("click", route_public_feed);
    li_feed.appendChild(button_public);
    //create button my own feed
    const button_private = document.createElement("button");
    button_private.id = "button-private-feed";
    button_private.setAttribute("type", "button");
    button_private.innerText = "My Feed";
    button_private.addEventListener("click", route_private_feed);
    li_feed.appendChild(button_private);
}

function route_public_feed() {
    const wef = "";
}
function route_private_feed() {
    const wef = "";
}

const li1 = document.createElement("li");
li1.className = "nav-item";
ul.appendChild(li1);

// create menu drop down for subseddit choices
const li_menu = document.createElement("li");
li_menu.className = "nav_item";
li_menu.id = "li_menu";
const menu_form = document.createElement("form");
menu_form.id = "menu_form"
const select = document.createElement("select");
select.setAttribute("name", "menu");
menu_form.appendChild(select);
const option1 = document.createElement("option");
option1.setAttribute("value", "sub1");
option1.innerText = "s/";
const option2 = document.createElement("option");
option2.setAttribute("value", "sub2");
option2.innerText = "s/";
select.appendChild(option1);
select.appendChild(option2);
ul.appendChild(li_menu);
// drop menu
li_menu.appendChild(menu_form);


const input = document.createElement("input");
input.id = "search";
const input_attr = document.createAttribute("data-id-search");
input.setAttributeNode(input_attr);
input.placeholder = "Search Seddit"
input.type = "search"
// search
li1.appendChild(input);


if (localStorage.getItem("token") == null) {
    const li2 = document.createElement("li");
    li2.className = "nav-item";
    const button1 = document.createElement("button");
    button1.className = "button button-primary";
    button1.id = "button-id-login";
    const button1_attr = document.createAttribute("data-id-login");
    button1.setAttributeNode(button1_attr);
    button1.innerText = "Log In";
    button1.addEventListener("click", openForm);
    // login 
    li2.appendChild(button1);
    ul.appendChild(li2);

    const li3 = document.createElement("li");
    li3.className = "nav-item";
    const button2 = document.createElement("button");
    button2.className = "button button-secondary";
    button2.id = "button-id-signup";
    const button2_attr = document.createAttribute("data-id-signup");
    button2.setAttributeNode(button2_attr);
    button2.innerText = "Sign Up";
    button2.addEventListener("click", openForm);
    // signup
    li3.appendChild(button2);
    ul.appendChild(li3);
}



// if the user is logged in
// show the users profile
// username, number of posts, number of upvotes across all posts
console.log(localStorage.getItem("token"));
if (localStorage.getItem("token") != null) {
    const li_profile = document.createElement("li");
    li_profile.className = "nav-item";
    li_profile.id = "li_profile";
    const profile_button = document.createElement("button");

    const options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Token: " + localStorage.getItem('token')
        }
    }

    const URL = `${base_URL}/user/`;
    fetch(URL, options)
        .then(response => {
            if (response.status == '200') {
                //console.log(id);
                return response.json();
            } else {
                throw new Error(response.status);
            }
        })
        .then(resp => {
            console.log("resp is", resp);
            profile_button.innerText = `@${resp.username}`;
            profile_button.id = "profile_button";
            const profile_modal = create_profile_modal(resp.name, resp.posts, resp.followed_num, resp.following);
            profile_button.addEventListener('click', () => {
                profile_modal.style.display = "block";
            });
            li_profile.appendChild(profile_button);
            li_profile.appendChild(profile_modal);
            ul.appendChild(li_profile);

        })
        .catch(error => {
            console.log(error.message);
        })
}

function create_profile_modal(name, posts, followed_num, following) {
    const modal_profile = document.createElement("div");
    modal_profile.className = "modal";
    modal_profile.id = "modal_profile";
    modal_profile.style.display = "none";

    // closing icon
    /*<i class="material-icons">
        close
    </i>*/
    const close_icon = document.createElement("i");
    close_icon.classList.add("material-icons");
    close_icon.classList.add("close_modal");
    close_icon.innerText = "close"
    close_icon.addEventListener("click", () => {
        modal_profile.style.display = "none";
    });
    modal_profile.appendChild(close_icon);

    const div_modal_content = document.createElement("div");
    div_modal_content.className = "modal-content";
    div_modal_content.id = "modal-profile-content";
    //console.log("create_modal");
    modal_profile.appendChild(div_modal_content);

    const img = document.createElement("img");
    img.id = "profile_img";
    img.setAttribute("src", "https://source.unsplash.com/collection/1859562/100x100");
    div_modal_content.appendChild(img);
    //name 
    const name_header = document.createElement("h1");
    name_header.id = "name_header";
    name_header.innerText = name;
    div_modal_content.appendChild(name_header);
    //num_followed
    const followed_num_p = document.createElement("p");
    followed_num_p.id = "followed_num_p";
    followed_num_p.innerText = `${followed_num} following`;
    div_modal_content.appendChild(followed_num_p);
    //num_following
    const following_p = document.createElement("p");
    following_p.id = "following_p";
    following_p.innerText = `${following.length} followers`;
    div_modal_content.appendChild(following_p);
    //num_posts
    const num_posts = document.createElement("p");
    num_posts.id = "num_posts";
    num_posts.innerText = `Number of posts: ${posts.length}`;
    div_modal_content.appendChild(num_posts);
    //update profile
    const update_profile_button = document.createElement("button");
    update_profile_button.setAttribute("type", "button");
    update_profile_button.innerText = "Update Profile";
    update_profile_button.addEventListener('click', update_profile);
    div_modal_content.appendChild(update_profile_button);

    const logout = document.createElement("button");
    logout.setAttribute("type", "button");
    logout.innerText = "Log Out";
    logout.addEventListener('click', () => {
        localStorage.removeItem("token");
        modal_profile.style.display = "none";
        window.location.reload()
    });
    div_modal_content.appendChild(logout);


    return modal_profile
}

function update_profile(e) {
    e.stopPropagation();
    document.getElementById("modal_profile").style.display = "none";

    const modal_update_profile = document.createElement("div");
    modal_update_profile.className = "modal";
    modal_update_profile.id = "modal_update_profile";
    modal_update_profile.style.display = "block";
    // closing icon
    const close_icon = document.createElement("i");
    close_icon.classList.add("material-icons");
    close_icon.classList.add("close_modal");
    close_icon.innerText = "close"
    close_icon.addEventListener("click", () => {
        modal_update_profile.style.display = "none";
    });
    modal_update_profile.appendChild(close_icon);

    const div_modal_content = document.createElement("div");
    div_modal_content.className = "modal-content";
    div_modal_content.id = "modal-profile-update-content";
    //console.log("create_modal");
    modal_update_profile.appendChild(div_modal_content);

    const form = document.createElement("form");
    form.setAttribute("name", "profile");

    const h1 = document.createElement("h1");
    h1.innerText = "Account settings";
    form.appendChild(h1);

    const name_change = document.createElement("input");
    name_change.setAttribute('type', "text");
    name_change.setAttribute('name', "name");
    name_change.setAttribute("placeholder", "Change name");
    form.appendChild(name_change);

    const email_change = document.createElement("input");
    email_change.setAttribute('type', "text");
    email_change.setAttribute('name', "email");
    email_change.setAttribute("placeholder", "Change email");
    form.appendChild(email_change);

    const password_change = document.createElement("input");
    password_change.setAttribute('type', "text");
    password_change.setAttribute('name', "password");
    password_change.setAttribute("placeholder", "Change password");
    form.appendChild(password_change);

    const save_button = document.createElement("button");
    save_button.setAttribute("type", "button");
    save_button.innerText = "Save";
    form.appendChild(save_button);

    div_modal_content.appendChild(form);
    document.getElementById("li_profile").appendChild(modal_update_profile);

}

export default ul;