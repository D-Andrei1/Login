function check_session() {
    const description = document.getElementById("rewards_description")

    fetch("/website/php/api/check_session")
        .then(response => response.json())
        .then(data => {
            if (data.account_id != null) {
                console.log("ooo")
                
                description.innerHTML = `
                    <p id="points"></p>
                `
                points()
            } else{
                console.log("ok")
                description.innerHTML = `
                    <button id="rewards-btn">
                        Sign up
                    </button>
                `;
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
/*
const register_btn = document.getElementById("rewards-btn");
register_btn.addEventListener("click", () => {
    fetch("/website/php/api/register_loyalty")
        .then(response => response.json())
        .then(data => {
        console.log(data)}) */