const form = document.getElementById('login_form')

form.addEventListener("submit", async (event) =>{
    event.preventDefault()

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    answer = document.getElementById("answer");

    if((email.trim().length === 0) || (password.trim().length === 0)) {
        answer.textContent = "Empty field"
    } else{
        if(validateEmail(email)) {
            fetch('/website/php/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: 'email=' + encodeURIComponent(email) + '&password=' + encodeURIComponent(password)
            })
            .then(res => res.json())
            .then(response => {
                console.log(response)

                if (response.success && response.role === 'user'){
                    window.location.href = '../html/user_menu.html';
                } else if (response.success && response.role === 'admin'){
                    window.location.href = '../html/admin_menu.html';
                } 
                else {
                    answer.textContent = response.error
                }
            });
        } else{
            answer.textContent = "Invalid email"
        }
    }
});
