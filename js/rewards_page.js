function check_session() {
    const description = document.getElementById("rewards_description")

    fetch("/website/php/api/check_session")
        .then(response => response.json())
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
check_session()

function points() {
    const points = document.getElementById("points");

    fetch("/website/php/api/check_point_balance")
        .then(response => response.json())
        .then(data => {
            point_balance = `You have ${data.points_balance} points`
            points.textContent = point_balance
        })
}