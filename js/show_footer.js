fetch("/website/html/footer.html")
    .then(response => response.text())
    .then(html => {
        document.getElementById("footer").innerHTML = html;
    })

console.log("lmfao gtof")