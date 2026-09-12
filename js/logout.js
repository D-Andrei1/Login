const logout = document.getElementById("logout")
logout.addEventListener("click",func_logout)

function func_logout(){
    console.log("someshit")
    fetch("/website/php/api/logout", {
        method: "POST"
    })
    .then(response => response.json())
    .then(() => {
        window.location.href = "login.html";
    });
}
