function loadLoginLogo() {
    fetch("/website/php/api/check_session")
        .then(response => response.json())
        .then(data => {
            const loginArea = document.getElementById("login_area");

            if (data.logged_in) {
                // User IS logged in
                loginArea.innerHTML = `
                    <a href="/website/html/user_menu.html">
                        <img src="/website/html/images/user.png" alt="User">
                    </a>
                `;
            } else {
                // User is NOT logged in
                loginArea.innerHTML = `
                    <a class="header_login_button" href="/website/html/login.html">Login</a>
                `;
            }
        })
        .catch(error => {
            console.error("Error checking session:", error);
        });
}
