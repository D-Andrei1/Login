function load_products(){
    fetch("/website/php/api/get_menu")
        .then(response => response.json())
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
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
}

load_products()