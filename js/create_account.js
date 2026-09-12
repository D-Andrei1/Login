const form = document.getElementById("register")

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirm_password = document.getElementById("confirm_password").value.trim();
    const first_name = document.getElementById("fname").value.trim();
    const last_name = document.getElementById("lname").value.trim();
    const username = document.getElementById("uname").value.trim();

    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const lletter = (password) => {
        return password.match(
            /[a-z]/
        )
    }

    const uletter = (password) => {
        return password.match(
            /[A-Z]/
        )
    }

    const digit = (password) => {
        return password.match(
            /\d/
        )
    }

    const specialchar = (password) => {
        return password.match(
            /[@.#$!%^&*.?]/
        )
    }

    function validatePassword(password) {
        if (password.length <= 8) {
            answer.textContent = "Password must be 8 digits";
            return false;
        }else if (password != confirm_password) {
            answer.textContent = "Passwords dont match";
            return false;
        }else if (!lletter(password)) {
            answer.textContent = "Password must include a lower case letter";
            return false;
        }else if (!uletter(password)) {
            answer.textContent = "Password must include a upper case letter";
            return false;
        }else if (!digit(password)) {
            answer.textContent = "Password must include a number";
            return false;
        }else if (!specialchar(password)) {
            answer.textContent = "Password must include a special character";
            return false;
        }
    };

    answer = document.getElementById("answer");

    if ((email.length === 0) || (password.length === 0) || (first_name.length === 0) || (last_name.length === 0) || (username.length === 0)) {
        answer.textContent = "Empty field";
    } else if (!validatePassword(password)){

    } else {
        if (validateEmail(email)) {

            fetch('/website/php/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: 'email=' + encodeURIComponent(email) +
                    '&password=' + encodeURIComponent(password) +
                    '&first_name=' + encodeURIComponent(first_name) +
                    '&last_name=' + encodeURIComponent(last_name) +
                    '&username=' + encodeURIComponent(username)
            })
            .then(res => res.json())
            .then(response => {
                console.log(response);

                if (response.success) {
                    answer.textContent = response.message;
                } else {
                    answer.textContent = response.error;
                }
            })
            .catch(error => {
                console.error(error);
                answer.textContent = "Something went wrong";
            });

        } else {
            answer.textContent = "Invalid email";
        }
    }
});

