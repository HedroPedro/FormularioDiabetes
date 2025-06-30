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

let slide = 0
const carrouselDiv = document.getElementById("carrossel")
const cinturaDiv = document.getElementById("cintura")
const idadeInput = document.getElementById("idade")
const radioSex = document.getElementsByName("sexo")
const btnIMC = document.getElementById("IMC")
const btnCalcular = document.getElementById("calculate")
const radioAttFisica = document.getElementsByName("att_fisica")
const radioVeg = document.getElementsByName("veg")
const radioCarn = document.getElementsByName("carn")
const radioGlic = document.getElementsByName("glic")
const radioPres = document.getElementsByName("pres")
const radioPFam = document.getElementsByName("p_fam")
const radioSFam = document.getElementsByName("s_fam")
const btnBef = document.getElementById("bef")
const btnNext = document.getElementById("next")
const btnGoBack= document.getElementById("go_back")

function buildMessage(prob, risco) {
    const div = document.getElementById("resultado")
    div.className = "show"
    div.innerHTML = `<h2>${prob}</h2><span>${risco}</span>${div.innerHTML}`
}

function setCintura(elem, array) {
    const btnsCint = document.getElementsByClassName("cint")
    cinturaDiv.className = "show"

    for (let i = 0; i < btnsCint.length; i++) {
        const btn = btnsCint[i]
        btn.textContent = array.shift()
        btn.addEventListener("click", () => score["cintura"] = i === 0 ? 0 : i + 2)
    }

    elem.parentElement.getElementsByClassName("error")[0].className = "error"
}

const setErrorMessage = (el) => {
    return function() {
        for(const node of el.childNodes) {
            if (node.className === "error")
                node.className = node.className + " show"
        }
    }
}

const checkInfoPerson = () => {
    let checked = false
    const errorMessages = []

    if (idadeInput.value == 0 || !idadeInput.value) errorMessages.push(setErrorMessage(idadeInput.parentElement))

    for (const radio of radioSex.values())
        if (checked = radio.checked) break

    if (!checked)
        errorMessages.push(setErrorMessage(radioSex.item(0).parentElement))

    if (score["cintura"] === 0) errorMessages.push(setErrorMessage(cinturaDiv))

    return [(!idadeInput.value || idadeInput.value === 0 || !checked || score["cintura"] === 0), errorMessages]
}

const checkOtherData = () => {
    return false
}

const checkHabits = () => {
    return false
}

const checkHealthCons = () => {
    return false
}

const checkGen = () => {
    return false
}


const checkFunctions = [checkInfoPerson, checkOtherData, checkHabits, checkHealthCons, checkGen]

idadeInput.addEventListener("input", (ev) => {
    const idade = ev.target.value
    ev.target.parentElement.getElementsByClassName("error")[0].className = "error"

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

radioSex[0].addEventListener("click", (ev) => setCintura(ev.target, ["Menos que 94 cm","Entre 94 e 102 cm", "Mais que 102 cm"]))
radioSex[1].addEventListener("click", (ev) => setCintura(ev.target, ["Menos que 80 cm","Entre 80 e 88 cm", "Mais que 88 cm"]))
btnIMC.addEventListener("click", () => {
    const alturaInput = document.getElementById("alt")
    const pesoInput = document.getElementById("peso")

    const altura = alturaInput.value/100
    const peso = pesoInput.value

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
})


btnNext.addEventListener("click", () => {
    const bef = slide
    const results = checkFunctions[slide]()

    if (results[0]) {
        for(const func of results[1]) {
            func()
        }
        return
    }

    slide = Math.min(slide+1, 4)


    if (slide !== 0) btnBef.className = "show"
    if (slide === 4) {
        btnNext.className = ""
        btnCalcular.className = "show"
    }

    const childNodes = carrouselDiv.children
    childNodes[bef].hidden = true
    childNodes[slide].hidden = false
})

btnBef.addEventListener("click", () => {
    const bef = slide
    slide = Math.max(0, slide-1)
    const childNodes = carrouselDiv.children

    if (slide === 0) btnBef.className = ""
    if (slide !== 4) {
        btnNext.className = "show"
        btnCalcular.className = ""
    }

    childNodes[bef].hidden = true
    childNodes[slide].hidden = false
})

btnCalcular.addEventListener("click", () => {
    let soma = 0
    for (const key in score) {
        soma += score[key]
    }

    if(soma < 7) {
        buildMessage("Risco Baixo", "Probabilidade 1 em 100")
        return  
    }

    if(soma < 12) {
        buildMessage("Risco Pouco elevado", "Probabilidade 1 em 25")
        return
    }


    if (soma < 15) {
        buildMessage("Risco Moderado", "Probabilidde 1 em 6")
        return
    }

    if(soma < 21) {
        buildMessage("Risco Alto", "Probabilidade 1 em 3")
        return
    }

    buildMessage("Risco muito alto", "Probabilidade 1 em 2")
})

btnGoBack.addEventListener("click", () => {
    for(const form of document.forms) {
        form.reset()
    }
    
    btnNext.className = "show"
    btnCalcular.className = ""
    btnBef.className = ""
    const childNodes = carrouselDiv.children
    childNodes[slide].hidden = true
    childNodes[0].hidden = false
    slide = 0
})

radioAttFisica.forEach((elem, key) => {
    elem.addEventListener("click", () => {
        score["att_fisica"] = key<<1

        elem.parentElement.getElementsByClassName("error")[0].className = "error"
    })
})

radioVeg.forEach((elem, key) => {
    elem.addEventListener("click", () => {
        score["veg"] = key
         elem.parentElement.getElementsByClassName("error")[0].className = "error"
    })
})

radioCarn.forEach((elem, key) => {
    elem.addEventListener("click", () => {
        score["carne"] = key
        elem.parentElement.getElementsByClassName("error")[0].className = "error"
    })
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