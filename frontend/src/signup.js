function closeForm(e) {
    if (e.target.id === "btn_cancel_login") {
        document.getElementById("modal_login").style.display = "none";
    } else {
        document.getElementById("modal_signup").style.display = "none";
    }
}



const div_modal = document.createElement("div");
div_modal.className = "modal";
div_modal.id = "modal_signup";

const div_modal_content = document.createElement("div");
div_modal_content.className = "modal-content";
div_modal_content.id = "modal-content";
div_modal.appendChild(div_modal_content);

const form = document.createElement("form");
form.id = "signup";
div_modal_content.appendChild(form);

const h1 = document.createElement("h1");
h1.innerText = "Sign Up";
form.appendChild(h1);
h1.addEventListener('click', () => window.location.reload());

const name = document.createElement("input");
name.setAttribute('type', "text");
name.setAttribute('name', "name");
name.id = "name";
name.setAttribute("placeholder", "Name");
form.appendChild(name);

const email = document.createElement("input");
email.setAttribute('type', "text");
email.setAttribute('name', "email");
email.setAttribute("placeholder", "Email");
form.appendChild(email);

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


const button_signup = document.createElement("button");
button_signup.className = "btn_login";
button_signup.id = "btn_login_signup";
button_signup.setAttribute("type", "button");
button_signup.innerText = "Sign Up";
form.appendChild(button_signup);

const button_cancel = document.createElement("button");
button_cancel.className = "btn_cancel";
button_cancel.id = "btn_cancel_signup";
button_cancel.setAttribute("type", "button");
button_cancel.addEventListener('click', closeForm);
button_cancel.innerText = "Cancel";
form.appendChild(button_cancel);

const URL = 'http://localhost:5000';
button_signup.addEventListener('click', (event) => {
    const name = form.elements.name.value;
    //  console.log(name);
    const email = form.elements.email.value;
    //  console.log(email);
    const username = form.elements.username.value;
    //  console.log(username);
    const password = form.elements.password.value;
    //  console.log(password);
    // fetch
    const login_url = `${URL}/auth/signup`;
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "username": `${username}`,
            "password": `${password}`,
            "email": `${email}`,
            "name": `${name}`
        })
    }

    fetch(login_url, options)
        .then(response => {
            if (response.status == '200') {
                return response.json();
                // 403
            } else {
                throw new Error(response.status);
            }
        })
        .then(resp => {
            // console.log(token); // json object
            localStorage.setItem('token', resp.token);
        })
        .catch(error => {
            // console.log(error.message);
            const error_exist = document.getElementById("signup_error");
            if (error_exist != null) {
                form.removeChild(error_exist);
            }

            const signup_error = document.createElement("p");
            signup_error.id = "signup_error";
            let name_field = document.getElementById("name");
            name_field.form.insertBefore(signup_error, name_field);
            // 400
            if (error.message == '400') {
                signup_error.innerText = "Please provide all details";
                // 409
            } else {
                signup_error.innerText = "Oops, the username is taken";
            }
        });
});


export default div_modal;



