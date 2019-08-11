const base_URL = 'http://localhost:5000';


const ul_feed = document.createElement("ul");
ul_feed.id = "feed";
const ul_attr = document.createAttribute("data-id-feed");
ul_feed.setAttributeNode(ul_attr);

const div_feed_header = document.createElement("div");
div_feed_header.className = "feed-header";

const h3_feed_title = document.createElement("h3");
h3_feed_title.className = "feed-title alt-text";
h3_feed_title.innerText = "Popular posts";

//if (localStorage.getItem("token") != null) {
console.log("token is", localStorage.getItem("token"));
const post_button = document.createElement("button");
post_button.id = "post_button";
post_button.className = "button button-secondary";
post_button.innerText = "Post";
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
    //console.log("create_modal");
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
    close_button.innerText = "Close";
    div_modal_content.appendChild(close_button);
    close_button.addEventListener("click", () => modal_post_div.style.display = "none");


    return modal_post_div
}

function submit_post(e) {
    let img_base64_promise = encodeImageFileAsURL();
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

//let img_base64_promise = encodeImageFileAsURL();
/*if(img_base64_promise) {
    img_base64_promise.then(response=>{
        const img_base64 = response.split(',')[1];
 
        const new_post_url = ${url}/post/;
        const new_post_data = {
            "title": ${input_title},
            "text": ${input_text},
            "subseddit": ${input_subseddit},
            "image": ${img_base64}
        }
        const new_post_options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Token: getToken()
            },
            body: JSON.stringify(new_post_data)
        };
*/

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

ul_feed.appendChild(div_feed_header);
div_feed_header.appendChild(h3_feed_title);

//if (localStorage.getItem("token") != null) {
//const button_post = document.getElementById("post_button");
//console.log(button_post);
div_feed_header.appendChild(post_button);
div_feed_header.appendChild(create_post_modal());
//}


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

    /*<i class="material-icons">
        arrow_upward
    </i>*/
    // vote icon up
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

    const comments_amount = document.createElement("button");
    comments_amount.setAttribute("type", "button");

    comments_amount.className = "comments_amount";
    comments_amount.id = "comments_amount";
    comments_amount.innerText = comments.length + " Comments";
    //comments_amount.appendChild(icon_button);
    if (localStorage.getItem("token") != null) {
        comments_amount.addEventListener("click", (show_comments));
    }
    div_comments.appendChild(comments_amount);
    comments_amount.appendChild(create_comment_modal(comments));

    // posts author
    const p_author = document.createElement("p");
    p_author.className = "post-author";
    const p_author_attr = document.createAttribute("data-id-author");
    p_author.setAttributeNode(p_author_attr);
    p_author.innerText = "u/" + author;


    ul_feed.appendChild(li_post);
    li_post.appendChild(div_vote);
    li_post.appendChild(div_content);
    li_post.appendChild(div_comments);
    div_content.appendChild(p_author);
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

    div_comments.appendChild(comments_amount);

}

function getToken() {
    const token = localStorage.getItem('token');

    // if token is in local storage
    if (token != null) {
        return `Token: ${token}`
    }
    return undefined
}

function create_comment_modal(comments) {
    const modal_comment = document.createElement("div");
    modal_comment.className = "modal";
    modal_comment.id = "modal_comment";
    modal_comment.style.display = "none";

    // closing icon
    /*<i class="material-icons">
        close
    </i>*/
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
    close_icon.addEventListener("click", (e) => {
        modal_upvotes.style.display = "none";
        e.stopPropagation();
    });
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

    //div_feed_header.appendChild(modal_upvotes);
    return modal_upvotes
}

function show_upvotes(e) {
    const modal_upvotes = document.createElement("div");
    modal_upvotes.className = "modal_upvote";
    console.log("upvote num clickedd");


}

function show_comments(e) {
    console.log(e.target.childNodes);
    const div_modal = e.target.childNodes[1];
    div_modal.style.display = "block";
    e.stopPropagation()
}

function close_upvotes() {
    console.log("close_upvtes");
}

function init() {
    // get public feed
    fetch(`${base_URL}/post/public`)
        .then(resp => resp.json())
        .then(r => {
            //console.log(r);
            r.posts.map(post => {
                create_post(post.title, post.text, post.meta.author, post.meta.subseddit, post.comments, post.meta.upvotes, post.image, post.id);
            });
        });

    // get user feed
    // img.src = 'data:image/jpeg;base64,'+${string}`;
    // if logged in 
    /*if (getToken() != null) {
        const URL = `${base_URL}/user/feed`;
    } else {
        const URL = `${base_URL}/post/public`;
    }*/
    // console.log("token is", token);
    /*console.log(getToken());
    const options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": getToken()
        }
    }
    const URL = `${base_URL}/user/feed`;
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
        })
        .catch(error => {
            console.log(error.message);
        })*/
}
window.addEventListener('load', init);
export default ul_feed;