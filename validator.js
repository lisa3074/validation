function validate() {
  let count = 0;

  all("[data-validate]").forEach(element => {
    const min = element.getAttribute("data-min");
    const max = element.getAttribute("data-max");
    let validated;

    switch (element.getAttribute("data-validate")) {
      case "str":
        let total_characters = element.value.length;
        total_characters < min || total_characters > max ? (validated = false) : (validated = true);
        break;
      case "int":
        validated = element.value >= min && element.value <= max;
        break;
      case "email":
        const email_regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        validated = email_regex.test(element.value.toLowerCase());
        break;
      case "password":
        const password_regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        validated = password_regex.test(element.value);
        break;
      case "password_match":
        const password = document.querySelector("#password").value;
        const password_match = document.querySelector("#password_match").value;
        validated = password == password_match && password_match != "";
        break;
    }
    if (validated === false) {
      element.classList.add("error");
    } else {
      element.classList.remove("error");
      count += 1;
      is_form_valid(count);
    }
  });
}
function is_form_valid(count) {
  console.log("check");
  if (count == 6) {
    create_user();
  }
}

function clear_error() {
  event.target.classList.remove("error");
  event.target.parentNode.querySelector("p").setAttribute("data-active", true);
}

function clear_active() {
  if (event.target.value == "") {
    event.target.parentNode.querySelector("p").setAttribute("data-active", false);
  } else {
    event.target.parentNode.querySelector("p").setAttribute("data-active", true);
  }
}

let users = [];
function create_user() {
  user.show(users);
}

let user = {
  first_name: one("#fname").value,
  last_name: one("#lname").value,
  phone: one("#phone").value,
  email: one("#email").value,
  password: one("#password").value,

  show: function (users) {
    users.push({
      id: Math.floor(Math.random() * 100000),
      first_name: one("#fname").value,
      last_name: one("#lname").value,
      phone: one("#phone").value,
      email: one("#email").value,
      password: one("#password").value,
    });
    console.log(users);
    one("#users").innerHTML = "";
    users.forEach(user => {
      const user_element = `
          <div class="user" data-id=${user.id}>
             <div class="user_info">
  
                 <span class="id">User id:${user.id}</span>
             
                 <span class="name">User: ${user.first_name} ${user.last_name}</span>
                 <span class="phone">Phone: ${user.phone}</span>
                 <span class="email">Email: ${user.email}</span>
                  <span class="password">Password: ${user.password}</span>
             </div>
             <button class="delete" onclick="user.delete(this)">Delete</button>
             
          </div>`;
      one("#users").insertAdjacentHTML("beforeend", user_element);
    });
  },
  delete: function (clicked_button) {
    //new array for the users that were not deleted
    let newUsers = [];
    //The id of the deleted user
    const chosen_id = clicked_button.parentNode.parentNode.querySelector(".user").getAttribute("data-id");
    console.log(chosen_id);
    clicked_button.parentNode.remove();
    //check which user has been deleted
    users.forEach(user => {
      if (chosen_id != user.id) {
        console.log(user.id);
        //push all the users that hasn't been deleted to the new array
        newUsers.push(user);
      }
    });
    //reset users
    users = [];
    //push all users from new array into old array
    newUsers.forEach(user => {
      users.push(user);
    });
    console.log(users);
  },
  reset: function () {
    event.preventDefault();
    one("form").reset();
  },
};

//library
function one(selector) {
  return document.querySelector(selector);
}
function all(selector) {
  return document.querySelectorAll(selector);
}
