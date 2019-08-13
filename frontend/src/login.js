const base_URL = 'http://localhost:5000';

function closeForm(e) {
    if (e.target.id === "btn_cancel_login") {
        document.getElementById("modal_login").style.display = "none";
    } else {
        document.getElementById("modal_signup").style.display = "none";
    }
}


const div_modal = document.createElement("div");
div_modal.className = "modal";
div_modal.id = "modal_login";

const div_modal_content = document.createElement("div");
div_modal_content.className = "modal-content";
div_modal_content.id = "modal-content";
div_modal.appendChild(div_modal_content);


const form = document.createElement("form");
form.id = "login_form";
form.setAttribute("name", "login");
div_modal_content.appendChild(form);

const h1 = document.createElement("h1");
h1.innerText = "Login";
form.appendChild(h1);

const username = document.createElement("input");
username.id = "username";
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
button_login.setAttribute("type", "button");
button_login.innerText = "Login";
form.appendChild(button_login);

const button_cancel = document.createElement("button");
button_cancel.className = "btn_cancel";
button_cancel.id = "btn_cancel_login";

button_cancel.setAttribute("type", "button");
button_cancel.addEventListener('click', closeForm);
button_cancel.innerText = "Cancel";
form.appendChild(button_cancel);


const URL = 'http://localhost:5000';
button_login.addEventListener('click', (event) => {
    localStorage.setItem("myFeed", "true");
    const username = form.elements.username.value;
    const password = form.elements.password.value;
    // fetch
    const login_url = `${URL}/auth/login`;
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "username": `${username}`,
            "password": `${password}`
        })
    }

    fetch(login_url, options)
        .then(response => {
            // ok
            if (response.status == '200') {
                //throw new Error();
                return response.json();
            } else {
                throw new Error(response.status);
            }

        })
        .then(resp => {
            console.log(resp); // json object
            localStorage.setItem('token', resp.token); // save the token
            document.getElementById("modal_login").style.display = "none";
            // once signed up => remove login and signup buttons, show the users info instead
            document.getElementById("button-id-login").style.display = "none";
            document.getElementById("button-id-signup").style.display = "none";
            window.location.reload();

        })
        .catch(error => {
            // missing unam/pass
            const error_exist = document.getElementById("login_error");
            // if the error message does not exist
            if (error_exist != null) {
                form.removeChild(error_exist);
            }
            const login_error = document.createElement("p");
            login_error.id = "login_error";
            let username_field = document.getElementById("username");
            username_field.form.insertBefore(login_error, username_field);
            if (error.message == '400') {
                login_error.innerText = "Please, provide both Username and Password";

                // 403 -> invalid uname/password
            } else {
                login_error.innerText = "Invalid Username/Password";
            }
        })
});


export default div_modal;



