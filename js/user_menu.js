fetch("/website/php/api/check_session",{
    credentials: "same-origin"
})
    .then(response => response.json())
    .then(data => {
        if (data.logged_in) {
            document.getElementById("welcome").textContent =
                "Welcome " + data.username;
        } else {
            window.location.href = "login.html";
        }
    })
    .catch(error => {
        console.error("Session check failed:", error);
    }); true