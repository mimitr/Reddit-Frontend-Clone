const base_URL = 'http://localhost:5000';
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
const ul_feed = document.createElement("ul");
ul_feed.id = "feed";
const ul_attr = document.createAttribute("data-id-feed");
ul_feed.setAttributeNode(ul_attr);

const div_feed_header = document.createElement("div");
div_feed_header.className = "feed-header";
ul_feed.appendChild(div_feed_header);

// div private feed
const div_private_feed = document.createElement("div");
div_private_feed.id = "div_private_feed";
div_private_feed.style.display = "none";
ul_feed.appendChild(div_private_feed);

const h3_feed_title = document.createElement("h3");
h3_feed_title.className = "feed-title alt-text";
h3_feed_title.innerText = "Popular posts";

//if (localStorage.getItem("token") != null) {
console.log("token is", localStorage.getItem("token"));
const post_button = document.createElement("button");
post_button.id = "post_button";
post_button.className = "button button-secondary";
post_button.innerText = "Create Post";
post_button.addEventListener("click", () => {
    if (localStorage.getItem("token") != null) {
        modal_post.style.display = "block";
    }
});
//}

function create_post_modal() {
    const modal_post_div = document.createElement("div");
    modal_post_div.className = "modal";
    modal_post_div.id = "modal_post";
    modal_post_div.style.display = "none";

    const div_modal_content = document.createElement("div");
    div_modal_content.className = "modal-content";
    div_modal_content.id = "modal-post-content";
    modal_post_div.appendChild(div_modal_content);

    const form = document.createElement("form");
    form.id = "form_post";

    const title = document.createElement("input");
    const title_attr = document.createAttribute("required");
    title.setAttribute('name', "title");
    title.setAttributeNode(title_attr);
    title.setAttribute('type', "text");
    title.setAttribute("placeholder", "Enter title");
    form.appendChild(title);

    const subseddit = document.createElement("input");
    subseddit.setAttribute('name', "subseddit");
    subseddit.setAttribute('type', "text");
    subseddit.setAttribute("placeholder", "Enter subseddit");
    form.appendChild(subseddit);
    div_modal_content.appendChild(form);

    // create textarea
    const textarea = document.createElement("textarea");
    const textarea_attr = document.createAttribute("required");
    textarea.setAttributeNode(textarea_attr);
    textarea.setAttribute("placeholder", "Enter text");
    textarea.id = "textarea";
    textarea.setAttribute("rows", 15);
    textarea.setAttribute("cols", 97);
    div_modal_content.appendChild(textarea);

    // create upload image area
    const image_form = document.createElement("form");
    const image_input = document.createElement("input");
    image_input.setAttribute("type", "file");
    image_input.id = "image_input";
    image_form.appendChild(image_input);
    div_modal_content.appendChild(image_form);

    // create post button
    const post = document.createElement("button");
    post.setAttribute("type", "button");
    div_modal_content.appendChild(post);
    post.innerText = "Post";
    post.className = "button";
    post.addEventListener('click', submit_post)

    const close_button = document.createElement("button");
    close_button.setAttribute("type", "button");
    close_button.innerText = "Close";
    div_modal_content.appendChild(close_button);
    close_button.addEventListener("click", () => modal_post_div.style.display = "none");


    return modal_post_div
}

function submit_post(e) {
    let img_base64_promise = encodeImageFileAsURL();
    //console.log("updaaate", e.target.innerText);
    const URL = `${base_URL}/post/`;
    // if photo exists
    if (img_base64_promise) {
        img_base64_promise.then(response => {
            const img_base64 = response.split(',')[1];

            const new_post_data = {
                "title": `${document.getElementById("form_post").elements.title.value}`,
                "text": `${document.getElementById("textarea").value}`,
                "subseddit": `${document.getElementById("form_post").elements.subseddit.value}`,
                "image": `${img_base64}`
            }
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getToken()
                },
                body: JSON.stringify(new_post_data)
            };
            //console.log(options.body);
            fetch(URL, options)
                .then(response => {
                    if (response.status == '200') {
                        return response.json();
                        // 403
                    } else {
                        throw new Error(response.status);
                    }
                })
                .then(resp => {
                    console.log("resp is", resp);
                    window.location.reload();
                })
                .catch(error => {
                    console.log(error.message);
                    alert("Please, provide the title, text, and correct format of image (optional)");
                })
        });
    } else {
        const new_post_data = {
            "title": `${document.getElementById("form_post").elements.title.value}`,
            "text": `${document.getElementById("textarea").value}`,
            "subseddit": `${document.getElementById("form_post").elements.subseddit.value}`
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getToken()
            },
            body: JSON.stringify(new_post_data)
        };

        fetch(URL, options)
            .then(response => {
                if (response.status == '200') {
                    return response.json();
                    // 403
                } else {
                    throw new Error(response.status);
                }
            })
            .then(resp => {
                console.log("resp is", resp);
                window.location.reload();
            })
            .catch(error => {
                console.log(error.message);
                alert("Please, provide the title, text, and correct format of image (optional)");
            })
    }
}

function encodeImageFileAsURL() {
    let srcData = 0;
    //const promise = new Promise((resolve, reject)=>{
    //})
    let filesSelected = document.getElementById("image_input").files;
    console.log(filesSelected);
    if (filesSelected.length > 0) {
        const promise = new Promise((resolve, reject) => {
            let fileToLoad = filesSelected[0];

            let fileReader = new FileReader();

            fileReader.onloadend = () => resolve(fileReader.result)
            fileReader.onerror = reject;
            fileReader.readAsDataURL(fileToLoad);
        });
        return promise;

    } else {
        return false;
    }
}


div_feed_header.appendChild(h3_feed_title);
// div public feed
const div_public_feed = document.createElement("div");
div_public_feed.id = "div_public_feed";
div_public_feed.style.display = "none";
ul_feed.appendChild(div_public_feed);



if (localStorage.getItem("token") != null) {
    //const button_post = document.getElementById("post_button");
    //console.log(button_post);
    div_feed_header.appendChild(post_button);
    div_feed_header.appendChild(create_post_modal());
}


// upvote f-n
function upvote_func(e) {
    e.stopPropagation();
    console.log(e.target.post_id);
    if (e.target.upvoted == null) {
        e.target.upvoted = 1;
        e.target.downvoted = null;
        // fetch 
        const options = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": getToken()
            }
        }

        const URL = `${base_URL}/post/vote?id=${e.target.post_id}`;
        fetch(URL, options)
            .then(response => {
                if (response.status == '200') {
                    return response.json();
                    // 403
                } else {
                    throw new Error(response.status);
                }
            })
            .then(resp => {
                console.log("vote is", resp);
                console.log(typeof e.target.nextSibling.nextSibling.nextSibling.innerText);
                e.target.nextSibling.nextSibling.nextSibling.innerText = parseInt(e.target.nextSibling.nextSibling.nextSibling.innerText) + 1;
            })
            .catch(error => {
                console.log(error.message);
            })
    }

}

function downvote_func(e) {
    e.stopPropagation();
    console.log(e.target.post_id);
    if (e.target.downvoted == null) {
        e.target.downvoted = 1;
        e.target.upvoted = null;
        const options = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": getToken()
            }
        }

        const URL = `${base_URL}/post/vote?id=${e.target.post_id}`;
        fetch(URL, options)
            .then(response => {
                if (response.status == '200') {
                    return response.json();
                } else {
                    throw new Error(response.status);
                }
            })
            //sucess
            .then(resp => {
                console.log("vote is", resp);
                // decrement 
                e.target.nextSibling.nextSibling.innerText = parseInt(e.target.nextSibling.nextSibling.innerText) - 1;
            })
            .catch(error => {
                console.log(error.message);
            })
    }

}

function create_post(title, text, author, subseddit, comments, upvotes, image, id) {
    // creating posts
    const li_post = document.createElement("li");
    li_post.className = "post";
    const li_post_attr = document.createAttribute("data-id-post");
    li_post.setAttributeNode(li_post_attr);

    // voting section
    const div_vote = document.createElement("div");
    div_vote.className = "vote";
    const div_vote_attr = document.createAttribute("data-id-upvotes");
    div_vote.setAttributeNode(div_vote_attr);


    // subsedit the post belongs to
    const subseddit_post = document.createElement("p");
    subseddit_post.className = "subseddit_post";
    subseddit_post.innerText = "s/" + subseddit;

    //  vote up icon 
    const vote_up = document.createElement("i");
    vote_up.classList.add("vote_up");
    vote_up.classList.add("material-icons");
    vote_up.classList.add("icon_vote");
    vote_up.innerText = "arrow_upward";
    vote_up.post_id = id;
    vote_up.addEventListener('click', upvote_func);
    div_vote.appendChild(vote_up);

    // vote icon down
    const vote_down = document.createElement("i");
    vote_down.classList.add("vote_down");
    vote_down.classList.add("material-icons");
    vote_down.classList.add("icon_vote");
    vote_down.innerText = "arrow_downward";
    vote_down.post_id = id;
    vote_down.addEventListener('click', downvote_func)
    div_vote.appendChild(vote_down);

    if (localStorage.getItem("token") != null) {
        const upvote_modal = create_upvote_modal(upvotes);
        div_vote.appendChild(upvote_modal);
    }

    // amount of upvotes
    const num_upvotes = document.createElement("p");
    num_upvotes.className = "num_upvotes";
    num_upvotes.innerText = upvotes.length;
    div_vote.appendChild(num_upvotes);

    if (localStorage.getItem("token") != null) {
        num_upvotes.addEventListener("click", (e) => {
            console.log("upvote modalll");
            e.target.previousSibling.style.display = "block";
            e.stopPropagation();
        });
    }

    // div content box
    const div_content = document.createElement("div");
    div_content.className = "content";

    // posts title
    const h4_post_title = document.createElement("h4");
    const h4_post_title_attr = document.createAttribute("data-id-title");
    h4_post_title.setAttributeNode(h4_post_title_attr);
    h4_post_title.className = "post-title alt-text";
    h4_post_title.innerText = title;

    // posts text
    const p_post_text = document.createElement("p");
    const p_post_text_attr = document.createAttribute("data-id-text");
    p_post_text.setAttributeNode(p_post_text_attr);
    p_post_text.className = "post-text";
    p_post_text.innerText = text;

    // create div_comments
    const div_comments = document.createElement("div");
    div_comments.className = "comments";


    // posts author 
    const p_author = document.createElement("button");
    p_author.setAttribute("type", "button");
    p_author.className = "post-author";
    const p_author_attr = document.createAttribute("data-id-author");
    p_author.setAttributeNode(p_author_attr);
    p_author.innerText = "u/" + author;
    p_author.addEventListener('click', open_modal_follow);

    div_comments.appendChild(p_author);
    const modal_follow = follow_modal(author);

    // create delete post button only for the posts created by the user himself
    if (author = localStorage.getItem("username") == author) {
        const update_button = document.createElement("button");
        update_button.innerText = "Update post";
        update_button.className = "update_button";
        update_button.setAttribute("type", "button");
        update_button.post_id = id;
        div_comments.appendChild(update_button);
        update_button.appendChild(update_post_modal(id));
        update_button.addEventListener("click", open_update_post_modal);

        const delete_button = document.createElement("button");
        delete_button.innerText = "Delete post";
        delete_button.className = "delete_button";
        delete_button.setAttribute("type", "button");
        delete_button.post_id = id;
        delete_button.addEventListener("click", delete_post);
        div_comments.appendChild(delete_button);
    }

    // num of comments
    const comments_amount = document.createElement("button");
    comments_amount.setAttribute("type", "button");
    comments_amount.className = "comments_amount";
    comments_amount.id = "comments_amount";
    comments_amount.innerText = "View all other " + comments.length + " comments";
    //comments_amount.appendChild(icon_button);
    if (localStorage.getItem("token") != null) {
        comments_amount.addEventListener("click", (show_comments));
    }
    div_comments.appendChild(comments_amount);
    comments_amount.appendChild(create_comment_modal(id, comments));
    div_comments.appendChild(comments_amount);


    // a box to write comments
    const textarea = document.createElement("textarea");
    textarea.className = "textarea_comments";
    const textarea_attr = document.createAttribute("required");
    textarea.setAttribute("placeholder", "Hmmm, what do you think?");
    textarea.setAttributeNode(textarea_attr);
    textarea.setAttribute("rows", 2);
    textarea.setAttribute("cols", 55);
    //div_comment_area.appendChild(textarea);

    // submit comment
    const submit_comment = document.createElement("button");
    submit_comment.setAttribute("type", "submit");
    submit_comment.className = "submit_comment";
    submit_comment.post_id = id;
    submit_comment.innerText = "Comment";
    submit_comment.addEventListener('click', post_comment);

    //div_posts.appendChild(li_post);
    li_post.appendChild(div_vote);
    li_post.appendChild(div_content);
    li_post.appendChild(div_comments);
    li_post.appendChild(modal_follow);
    li_post.appendChild(modal_follow);

    // div_content.appendChild(p_author);
    div_content.appendChild(subseddit_post);


    div_content.appendChild(h4_post_title);
    div_content.appendChild(p_post_text);

    // post image
    if (image != null) {
        const img = document.createElement("img");
        img.className = "post_image";
        img.src = 'data:image/jpeg;base64,' + `${image}`;
        div_content.appendChild(img);
    }
    div_content.appendChild(textarea);
    div_content.appendChild(submit_comment);

    //div_comments.appendChild(follow_button);
    // div_comments.appendChild(subseddit_post);
    return li_post
}

function open_update_post_modal(e) {
    e.target.childNodes[1].style.display = "block";
}

function update_post_modal(post_id) {
    const modal_update_div = document.createElement("div");
    modal_update_div.className = "modal";
    modal_update_div.id = "modal_update";
    modal_update_div.style.display = "none";

    const div_modal_content = document.createElement("div");
    div_modal_content.className = "modal-content";
    div_modal_content.id = "modal_update-content";
    modal_update_div.appendChild(div_modal_content);

    const form = document.createElement("form");
    form.id = "form_update";

    const title = document.createElement("input");
    const title_attr = document.createAttribute("required");
    title.setAttribute('name', "title");
    title.setAttributeNode(title_attr);
    title.setAttribute('type', "text");
    title.setAttribute("placeholder", "Edit title");
    form.appendChild(title);

    const subseddit = document.createElement("input");
    subseddit.setAttribute('name', "subseddit");
    subseddit.setAttribute('type', "text");
    subseddit.setAttribute("placeholder", "Edit subseddit");
    form.appendChild(subseddit);

    // create textarea
    const textarea = document.createElement("textarea");
    const textarea_attr = document.createAttribute("required");
    textarea.setAttributeNode(textarea_attr);
    textarea.setAttribute("placeholder", "Edit text");
    textarea.setAttribute("name", "textarea");
    textarea.setAttribute("rows", 15);
    textarea.setAttribute("cols", 97);
    form.appendChild(textarea);
    div_modal_content.appendChild(form);

    // create upload image area
    const image_form = document.createElement("form");
    const image_input = document.createElement("input");
    image_input.setAttribute("type", "file");
    image_input.setAttribute("name", "image_input");
    image_form.appendChild(image_input);
    div_modal_content.appendChild(image_form);

    // create post button
    const post = document.createElement("button");
    post.setAttribute("type", "button");
    div_modal_content.appendChild(post);
    post.innerText = "Save";
    post.className = "button";
    post.id = post_id;
    post.addEventListener('click', update_post)

    const close_button = document.createElement("button");
    close_button.setAttribute("type", "button");
    close_button.innerText = "Close";
    div_modal_content.appendChild(close_button);
    close_button.addEventListener("click", () => modal_update_div.style.display = "none");

    return modal_update_div
}

function update_post(e) {
    e.stopPropagation();
    let img_base64_promise = encodeImageFileAsURL();
    const URL = `${base_URL}/post/?id=${e.target.id}`;
    const form = document.getElementById("form_update");
    // if photo exists
    if (img_base64_promise) {
        img_base64_promise.then(response => {
            const img_base64 = response.split(',')[1];

            const new_post_data = {};
            if (form.elements.title.value != "") {
                new_post_data["title"] = `${form.elements.title.value}`;
            }
            if (form.elements.textarea.value != "") {
                new_post_data["text"] = `${form.elements.textarea.value}`;
            }
            if (form.elements.subseddit.value != "") {
                new_form_data["subseddit"] = `${form.elements.subseddit.value}`;
            }
            new_post_data["image"] = `${img_base64}`;
            /*const new_post_data = {
                "title": `${form.elements.title.value}`,
                "text": `${form.elements.textarea.value}`,
                "subseddit": `${form.elements.subseddit.value}`,
                "image": `${img_base64}`
            }*/
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getToken()
                },
                body: JSON.stringify(new_post_data)
            };
            //console.log(options.body);
            fetch(URL, options)
                .then(response => {
                    if (response.status == '200') {
                        return response.json();
                    } else {
                        throw new Error(response.status);
                    }
                })
                .then(resp => {
                    console.log("resp is", resp);
                    document.location.reload();
                })
                .catch(error => {
                    console.log(error.message);
                    alert("Please, provide the title, text, and correct format of image (optional)");
                })
        });
    } else {
        /*const new_post_data = {
            "title": `${form.elements.title.value}`,
            "text": `${form.elements.textarea.value}`,
            "subseddit": `${form.elements.subseddit.value}`,
        }*/
        const new_post_data = {};
        if (form.elements.title.value != "") {
            new_post_data["title"] = `${form.elements.title.value}`;
        }
        if (form.elements.textarea.value != "") {
            new_post_data["text"] = `${form.elements.textarea.value}`;
        }
        if (form.elements.subseddit.value != "") {
            new_form_data["subseddit"] = `${form.elements.subseddit.value}`;
        }
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getToken()
            },
            body: JSON.stringify(new_post_data)
        };
        console.log(options);
        console.log(form.elements.title.value);
        console.log(form.elements.textarea.value);
        console.log(form.elements.subseddit.value);
        fetch(URL, options)
            .then(response => {
                if (response.status == '200') {
                    return response.json();
                    // 403
                } else {
                    throw new Error(response.status);
                }
            })
            .then(resp => {
                console.log("resp is", resp);
                document.location.reload();
            })
            .catch(error => {
                console.log(error.message);
                alert("Please, provide the title, text, and correct format of image (optional)");
            })
    }
}


function delete_post(e) {
    e.stopPropagation();
    const post_id = e.target.post_id;

    const options = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Authorization": getToken()
        }
    }

    const URL = `${base_URL}/post/?id=${post_id}`;
    fetch(URL, options)
        .then(response => {
            if (response.status == '200') {
                return response.json();
            } else {
                throw new Error(response.status);
            }
        })
        //sucess
        .then(resp => {
            console.log(resp);
        })
        .catch(error => {
            console.log(error.message);
            //alert("You cannot follow yourself :O");
        })
    document.location.reload();
}

function open_modal_follow(e) {
    e.stopPropagation();
    console.log(e.target);
    e.target.parentNode.nextSibling.style.display = "block";
}

function follow_modal(author) {
    const modal_follow = document.createElement("div");
    modal_follow.className = "modal";
    modal_follow.id = "modal_follow ";
    modal_follow.style.display = "none";

    const div_modal_content = document.createElement("div");
    div_modal_content.className = "modal-content";
    div_modal_content.id = "modal-follow-content";
    modal_follow.appendChild(div_modal_content);

    //closing icon
    const close_icon = document.createElement("i");
    close_icon.classList.add("material-icons");
    close_icon.classList.add("close_modal");
    close_icon.innerText = "close"
    close_icon.addEventListener("click", follow_close_icon);
    modal_follow.appendChild(close_icon);

    // show user info
    const options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": getToken()
        }
    }
    const URL = `${base_URL}/user/?username=${author}`;
    fetch(URL, options)
        .then(response => {
            if (response.status == '200') {
                return response.json();
            } else {
                throw new Error(response.status);
            }
        })
        .then(resp => {
            console.log("resp is", resp);
            const name = document.createElement("h1");
            name.innerText = "Oops, you're stalking: " + resp.name;
            name.className = "author_name";
            div_modal_content.appendChild(name);

            const followers = document.createElement('h2');
            followers.innerText = `${resp.followed_num} followers`;
            followers.className = "h2_follow";
            div_modal_content.appendChild(followers);

            const following = document.createElement('h2');
            following.innerText = `${resp.following.length} following`;
            following.className = "h2_follow";
            div_modal_content.appendChild(following);

            const array_posts = resp.posts;
            array_posts.map(post => {
                const options = {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": getToken()
                    }
                }

                fetch(`${base_URL}/post/?id=${post}`, options)
                    .then(response => {
                        if (response.status == '200') {
                            return response.json();
                        } else {
                            throw new Error(response.status);
                        }
                    })
                    .then(post => {
                        console.log(post);
                        const div_post = document.createElement("div");
                        div_post.className = "users_own_posts";
                        div_modal_content.appendChild(div_post);

                        const subseddit = document.createElement("p");
                        subseddit.innerText = "s/" + post.meta.subseddit;
                        div_post.appendChild(subseddit);

                        const title = document.createElement("h3");
                        title.innerText = post.title;
                        div_post.appendChild(title);

                        const text = document.createElement("p");
                        text.innerText = post.text;
                        div_post.appendChild(text);

                        if (post.image != null) {
                            const img = document.createElement("img");
                            img.className = "post_user_image";
                            img.src = 'data:image/jpeg;base64,' + `${post.image}`;
                            div_post.appendChild(img);
                        }

                        const br = document.createElement("br");
                        div_post.appendChild(br);

                        const date = document.createElement("p");
                        date.innerText = convert(post.meta.published);
                        div_post.appendChild(date);
                    })
            })
        })
        .catch(error => {
            console.log(error.message);
        })

    // follow button (except for the user himself)
    if (localStorage.getItem("username") != author) {
        const follow_button = document.createElement("button");
        follow_button.setAttribute("type", "button");
        follow_button.className = "follow_button";
        follow_button.innerText = "Follow";
        follow_button.author_username = author;
        follow_button.addEventListener('click', follow_func);

        // unfollow button (except for the user himself)
        const unfollow_button = document.createElement("button");
        unfollow_button.setAttribute("type", "button");
        unfollow_button.className = "unfollow_button";
        unfollow_button.innerText = "Unfollow";
        unfollow_button.author_username = author;
        unfollow_button.addEventListener('click', unfollow_func)

        div_modal_content.appendChild(follow_button);
        div_modal_content.appendChild(unfollow_button);
    }

    return modal_follow
}


function follow_close_icon(e) {
    e.target.parentNode.style.display = "none";
}

function unfollow_func(e) {
    e.stopPropagation();
    console.log(e.target.author_username);

    if (localStorage.getItem("token") != null) {
        const options = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": getToken()
            }
        }

        const URL = `${base_URL}/user/unfollow?username=${e.target.author_username}`;
        fetch(URL, options)
            .then(response => {
                if (response.status == '200') {
                    return response.json();
                } else {
                    throw new Error(response.status);
                }
            })
            //sucess
            .then(resp => {
                console.log(resp);
            })
            .catch(error => {
                console.log(error.message);
                //alert("You cannot follow yourself :O");
            })
    }
}

function follow_func(e) {
    e.stopPropagation();
    console.log(e.target.author_username);

    if (localStorage.getItem("token") != null) {
        const options = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": getToken()
            }
        }

        const URL = `${base_URL}/user/follow?username=${e.target.author_username}`;
        fetch(URL, options)
            .then(response => {
                if (response.status == '200') {
                    return response.json();
                } else {
                    throw new Error(response.status);
                }
            })
            //sucess
            .then(resp => {
                console.log(resp);
            })
            .catch(error => {
                console.log(error.message);
                alert("You cannot follow yourself :O");
            })
    }

}

function getToken() {
    const token = localStorage.getItem('token');

    // if token is in local storage
    if (token != null) {
        return `Token: ${token}`
    }
    return undefined
}

function create_comment_modal(id, comments) {
    const modal_comment = document.createElement("div");
    modal_comment.className = "modal";
    modal_comment.id = "modal_comment";
    modal_comment.style.display = "none";

    // closing icon
    const close_icon = document.createElement("i");
    close_icon.classList.add("material-icons");
    close_icon.classList.add("close_modal");
    close_icon.innerText = "close"
    close_icon.addEventListener("click", () => modal_comment.style.display = "none");
    modal_comment.appendChild(close_icon);

    const div_modal_content = document.createElement("div");
    div_modal_content.className = "modal-content";
    div_modal_content.id = "modal-comments-content";
    //console.log("create_modal");
    modal_comment.appendChild(div_modal_content);

    const h1 = document.createElement("h1");
    h1.innerText = "Hmmm, and what do you think?";
    h1.id = "comment_header";
    div_modal_content.appendChild(h1);

    comments.map(comment => {
        //console.log(comment);
        let div_comment = document.createElement("div");
        div_comment.className = "div_each_comment";
        div_modal_content.appendChild(div_comment);

        let author = document.createElement("h3");
        author.innerText = comment.author;

        div_comment.appendChild(author);
        let comment_text = document.createElement("p");
        comment_text.innerText = comment.comment;
        div_comment.appendChild(comment_text);

        let comment_date = document.createElement("p");
        comment_date.innerText = convert(comment.published);
        div_comment.appendChild(comment_date);
    });
    return modal_comment
}

function post_comment(e) {
    e.stopPropagation();
    const comment = e.target.previousSibling.value;
    //console.log(e.target.post_id);
    const new_post_data = {
        "comment": comment,
    }
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getToken()
        },
        body: JSON.stringify(new_post_data)
    };

    //console.log(options.body);
    fetch(`${base_URL}/post/comment?id=${e.target.post_id}`, options)
        .then(response => {
            if (response.status == '200') {
                return response.json();
            } else {
                throw new Error(response.status);
            }
        })
        .then(resp => {
            console.log("resp is", resp);
        })
        .catch(error => {
            console.log(error.message);
            //alert("Enter the comment");
        })

    const div_comment = document.createElement("div");
    div_comment.className = "div_each_comment";
    document.getElementById("modal-comments-content").appendChild(div_comment);
    console.log("hello");
    let author = document.createElement("h3");
    author.innerText = localStorage.getItem("username");
    div_comment.appendChild(author);

    let comment_text = document.createElement("p");
    comment_text.innerText = comment;
    div_comment.appendChild(comment_text);

    const today = Date.now();
    let comment_date = document.createElement("p");
    comment_date.innerText = convert(today);
    div_comment.appendChild(comment_date);
    document.location.reload();

}

function convert(unixtimestamp) {
    // Months array
    const months_arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    // Convert timestamp to milliseconds
    const date = new Date(unixtimestamp * 1000);
    // Year
    const year = date.getFullYear();
    // Month
    const month = months_arr[date.getMonth()];
    // Day
    const day = date.getDate();
    // Hours
    const hours = date.getHours();
    // Minutes
    const minutes = "0" + date.getMinutes();
    // Seconds
    const seconds = "0" + date.getSeconds();
    // Display date time in MM-dd-yyyy h:m:s format
    const convdataTime = month + '-' + day + '-' + year + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return convdataTime
}

function upvote_close_icon(e) {
    e.target.parentNode.style.display = "none";
    e.stopPropagation();
}

function create_upvote_modal(upvotes) {
    const modal_upvotes = document.createElement("div");
    modal_upvotes.className = "modal";
    modal_upvotes.id = "modal_upvotes";
    modal_upvotes.style.display = "none";

    const div_modal_content = document.createElement("div");
    div_modal_content.className = "modal-content";
    div_modal_content.id = "modal-upvotes-content";
    modal_upvotes.appendChild(div_modal_content);

    //closing icon
    const close_icon = document.createElement("i");
    close_icon.classList.add("material-icons");
    close_icon.classList.add("close_modal");
    close_icon.innerText = "close"
    close_icon.addEventListener("click", upvote_close_icon);
    modal_upvotes.appendChild(close_icon);

    const options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": getToken()
        }
    }
    upvotes.map(id => {
        //console.log(id);
        const URL = `${base_URL}/user/?id=${id}`;
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
                //console.log("resp is", resp);
                const upvoter = document.createElement("p");
                upvoter.innerText = resp.username;
                div_modal_content.appendChild(upvoter);
            })
            .catch(error => {
                console.log(error.message);
            })
    })
    return modal_upvotes
}

function show_comments(e) {
    e.stopPropagation();
    console.log(e.target.childNodes);
    const div_modal = e.target.childNodes[1];
    div_modal.style.display = "block";
}

function close_upvotes() {
    console.log("close_upvtes");
}

//function init() {
function get_public_feed() {
    //window.location.reload();
    const div_posts = document.getElementById("div_posts");
    if (div_posts != undefined && feed != undefined) {
        div_posts.document.getElementById("feed").removeChild(div_posts);
    }
    // get public feed
    fetch(`${base_URL}/post/public`)
        .then(resp => resp.json())
        .then(r => {
            console.log(r);
            console.log("public is", r);
            r.posts.map(post => {
                const li_post = create_post(post.title, post.text, post.meta.author, post.meta.subseddit, post.comments, post.meta.upvotes, post.image, post.id);
                div_public_feed.appendChild(li_post);
            });
        });
}

function get_private_feed() {
    // get user feed
    document.getElementById("")
    const URL = `${base_URL}/user/feed`;
    const options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": getToken()
        }
    }
    fetch(URL, options)
        .then(response => {
            if (response.status == '200') {
                return response.json();
            } else {
                throw new Error(response.status);
            }
        })
        .then(r => {
            console.log("resp is", r);
            r.posts.map(post => {
                const li_post = create_post(post.title, post.text, post.meta.author, post.meta.subseddit, post.comments, post.meta.upvotes, post.image, post.id);
                div_private_feed.appendChild(li_post);
            })
        })
        .catch(error => {
            console.log(error.message);
        })
}

function init() {
    get_private_feed()
    get_public_feed();

    // div contains all posts
    if (localStorage.getItem("token") != null) {
        document.getElementById("div_private_feed").style.display = "block";
        document.getElementById("div_public_feed").style.display = "none";
        console.log("public clicked");
    } else {
        document.getElementById("div_public_feed").style.display = "block";
        document.getElementById("div_private_feed").style.display = "none";
        console.log("private clicked");
    }


}
window.addEventListener('load', init);
export default ul_feed;