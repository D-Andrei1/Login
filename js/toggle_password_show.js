const password = document.getElementById("password");
const password_toggle = document.getElementById("password_toggle");
const password_toggle_image = document.getElementById("password_toggle_img")

password_toggle.addEventListener("click", () => {
    if (password.type === "password") {
        password.type = "text";
        password_toggle_image.src = "/website/html/images/sun.png"
    } else {
        password.type = "password";
        password_toggle_image.src = "/website/html/images/covered_sun.png"
    }
})