fetch("/website/html/header.html")
    .then(response => {
        check_error(response)
        return response.text()
    })
    .then(html => {
        document.getElementById("header").innerHTML = html;
        loadLoginLogo()
    });