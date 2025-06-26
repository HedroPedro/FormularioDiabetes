const score = {
    "idade": 0,
    "cintura": 0,
    "imc": 0,
    "att_fisica": 0,
    "veg": 0,
    "carne": 0,
    "glic": 0,
    "pres": 0,
    "pFam": 0,
    "sFam": 0
}

const carrouselDiv = document.getElementById("carrossel")
const idadeInput = document.getElementById("idade")
const sexoForm = document.getElementById("sexo")
const btnIMC = document.getElementById("IMC")
const btnCalcular = document.getElementById("calculate")
const radioAttFisica = document.getElementsByName("att_fisica")
const radioVeg = document.getElementsByName("veg")
const radioCarn = document.getElementsByName("carn")
const radioGlic = document.getElementsByName("glic")
const radioPres = document.getElementsByName("pres")
const radioPFam = document.getElementsByName("p_fam")
const radioSFam = document.getElementsByName("s_fam")

function setCintura(array) {
    const btnsCint = document.getElementsByClassName("cint")
    for (let i = 0; i < btnsCint.length; i++) {
        btnsCint[i].textContent = array.shift()
        btnsCint[i].hidden = false
        btnsCint[i].addEventListener("click", () => score["cintura"] = i === 0 ? 0 : i + 2)
    }
}

idadeInput.addEventListener("input", (el) => {
    const idade = el.target.value
    
    if (idade < 45) {
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
    const alturaInput = document.getElementById("alt")
    const pesoInput = document.getElementById("peso")

    const altura = alturaInput.value/100
    const peso = pesoInput.value

    console.log(altura, peso)

    const imc = Math.round(peso/(altura*altura))

    alert(`Seu IMC é ${imc}`)

    if (imc < 25) {
        return
    }

    if (imc < 31) {
        score.imc = 1
        return
    }

    score.imc = 3
    return
})

btnCalcular.addEventListener("click", () => {
    let soma = 0

    for (const key in score) {
        soma += score[key]
    }

    alert(`Valor total: ${soma}`)

    if(soma < 7) {
        alert("Risco Baixo. Probabilidade 1 em 100")
        return  
    }

    if(soma < 12) {
        alert("Risco Pouco elevado. Probabilidade 1 em 25")
        return
    }


    if (soma < 15) {
        alert("Risco Moderado. Probabilidde 1 em 6")
        return
    }

    if(soma < 21) {
        alert("Risco Alto. Probabilidade 1 em 3")
        return
    }

    alert("Risco muito alto. Probabilidade 1 em 2")
})

radioAttFisica.forEach((elem, key) => {
    elem.addEventListener("click", () => score["att_fisica"] = key<<1)
})

radioVeg.forEach((elem, key) => {
    elem.addEventListener("click", () => score["veg"] = key)
})

radioCarn.forEach((elem, key) => {
    elem.addEventListener("click", () => score["carne"] = key)
})

radioGlic.forEach((elem, key) => {
    elem.addEventListener("click", () => score["glic"] = key === 0 ? 5 : 0)
})

radioPres.forEach((elem, key) => {
    elem.addEventListener("click", () => score["pres"] = key === 0 ? 2 : 0)
})

radioPFam.forEach((elem, key) => {
    elem.addEventListener("click", () => score["pFam"] = key === 0 ? 5 : 0)
})

radioSFam.forEach((elem, key) => {
    elem.addEventListener("click", () => score["sFam"] = key === 0 ? 3 : 0)
})