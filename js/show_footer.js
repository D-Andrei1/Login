fetch("/website/html/footer.html")
    .then(response => {
        check_error(response)
        return response.text()
    })
    .then(html => {
        document.getElementById("footer").innerHTML = html;
})