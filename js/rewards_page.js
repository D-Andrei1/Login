function check_session() {
    const description = document.getElementById("rewards_description")

    fetch("/website/php/api/check_session")
        .then(response => {
            check_error(response)
            return response.json()
        })
        .then(data => {
            if (data.account_id != null) {
                points()
            } else{
                console.log("ok")
                description.innerHTML = `
                    <button id="rewards-btn" class=rewards-btn>
                        Sign up
                    </button>
                `;

                const register = document.getElementById("rewards-btn")

                register.addEventListener("click", () => {
                    console.log("ew")
                    fetch("/website/php/api/register_loyalty")
                })
            }
        })
}

let point_balance = 0

function points() {
    const points_display = document.getElementById("points");
    const next_reward = document.getElementById("next_reward")

    fetch("/website/php/api/check_point_balance")
        .then(response => response.json())
        .then(data => {
            point_balance = data.points_balance
            points_display.textContent = point_balance

            if (point_balance < 150) {
                next_reward.textContent = "Free Espresso at 150 points!"
            } else if (point_balance < 300) {
                next_reward.textContent = "Free Latte at 300 points!"
            } else if (point_balance < 500) {
                next_reward.textContent = "Free Iced Caramel Coffee at 500 points!"
            } else {
                next_reward.textContent = "Congrats you have reached max points!!"
            }
        })
}

function redeem_points() {
    const reward_1_btn = document.getElementById("reward_1")
    const reward_2_btn = document.getElementById("reward_2")
    const reward_3_btn = document.getElementById("reward_3")

    let product_id = 0
    let quantity = 1

    reward_1_btn.addEventListener("click", () => {
        product_id = 3

        if (point_balance >= 150) {
            add_to_basket(product_id, quantity)
            reduce_points(150)

            point_balance = point_balance - 150
            points()
        }
    })

    reward_2_btn.addEventListener("click", () => {
        product_id = 1

        if (point_balance >= 300) {
            add_to_basket(product_id, quantity)
            reduce_points(300)

            point_balance = point_balance - 300
            points()
        }
    })

    reward_3_btn.addEventListener("click", () => {
        product_id = 10

        if (point_balance >= 500) {
            add_to_basket(product_id, quantity)
            reduce_points(500)

            point_balance = point_balance - 500
            points()
        }
    })

    
}

function add_to_basket(product_id, quantity) {
    fetch('/website/php/api/add_to_basket', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'product_id=' + encodeURIComponent(product_id) +
        '&quantity=' + encodeURIComponent(`${quantity}`)
    })
    .then(response => {
        check_error(response)
        return response.json()
    })
    .then(data => {
        console.log(data)
    })
}

function reduce_points(point_reduction) {
    fetch('/website/php/api/subtract_points', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'point_reduction=' + encodeURIComponent(point_reduction)
    })
    .then(response => {
        check_error(response)
        return response.json()
    })
    .then(data => {
        console.log(data)
    })
}

check_session()
redeem_points()