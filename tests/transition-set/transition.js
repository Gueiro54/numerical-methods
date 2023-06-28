const switchNR = document.querySelector("switchNR")
const switchNR = document.querySelector("#switchNR")
const switchMNR = document.querySelector("#switchMNR")

const NRScreen = document.querySelector("#matrix-nr")
const NRMScreen = document.querySelector("#matrix-raphson")

switchNR.addEventListener("Click", windowChangeNR)
switchMNR.addEventListener("Click", windowChangeMNR)

function windowChangeNR() {
    switchNR.style.visibility = "visible"
    switchMNR.style.visibility = "hidden"
}
function windowChangeMNR() {
    switchMNR.style.visibility = "visible"
    switchNR.style.visibility = "hidden"
}

