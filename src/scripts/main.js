const score = {
    "idade": 0,
    "cintura": 0,
    "imc": 0,

}

const carrouselDiv = document.getElementById("carrossel")
const idadeInput = document.getElementById("idade")
const sexoForm = document.getElementById("sexo")
const btnIMC = document.getElementById("IMC")

function setCintura(array) {
    const btnsCint = document.getElementsByClassName("cint")
    for (let i = 0; i < btnsCint.length; i++) {
        btnsCint[i].textContent = array.shift()
        btnsCint[i].hidden = false
        btnsCint[i].addEventListener("click", () => {score["cintura"] = i === 0 ? 0 : i + 2})
    }
}

idadeInput.addEventListener("input", (el) => {
    const idade = el.target.value
    if (idade < 45) {
        score["idade"] = 0
        return
    }

    if (idade < 55) {
        score["idade"] = 2
        return
    }

    if (idade < 65) {
        score["idade"] = 3
        return
    }

    score["idade"] = 4
})

sexoForm.children[0].addEventListener("click", () => setCintura(["Menos que 94 cm","Entre 94 e 102 cm", "Mais que 102 cm"]))
sexoForm.children[1].addEventListener("click", () => setCintura(["Menos que 80 cm","Entre 80 e 88 cm", "Mais que 88 cm"]))
btnIMC.addEventListener("click", () => {
    const altura = document.getElementById("idade")
    const peso = document.getElementById("peso")

    
})