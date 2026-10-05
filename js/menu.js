function load_products(){
    fetch("/website/php/api/get_menu")
        .then(response => {
            check_error(response)
            return response.json()
        })
        .then(data => {
            const menu = document.getElementById("menu-grid")
            const products = data.items

            products.forEach(item => {
                const card = document.createElement("div");
                card.classList.add("menu-item")

                card.innerHTML = `
                    <img src="${item.image_url}" class="menu_images">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <p>£${item.price}</p>
                    <button class="add-button" id="add_basket_btn">Add to basket</button>
                `;

                const button = card.querySelector(".add-button")

                button.addEventListener("click", () => {
                    add_to_basket(item)
                })

                menu.appendChild(card)

                search()
            });
        })
    }

function add_to_basket(item){
    console.log(item.product_id)

    fetch('/website/php/api/add_to_basket', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'product_id=' + encodeURIComponent(item.product_id) +
        '&quantity=' + encodeURIComponent('1')
        .then(response => {
            check_error(response)
            return response.json()
        })
    })
}

function search(){
    search_bar = document.getElementById("menu_search")
    items = document.querySelectorAll(".menu-item")

    search_bar.addEventListener("input",() => {
        const query = search_bar.value.toLowerCase()

        items.forEach(item => {
            const text = item.textContent.toLowerCase();

            if (text.includes(query)) {
                item.style.display = "";
            } else {
                item.style.display = "none";
            }
        })
    })
}

load_products()
