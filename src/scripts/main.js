const score = {
    "idade": -1,
    "cintura": -1,
    "imc": -1,
    "att_fisica": -1,
    "veg": -1,
    "carne": -1,
    "glic": -1,
    "pres": -1,
    "pFam": -1,
    "sFam": -1
}

let slide = 0
const spreadsheetId = "17FETyiGmSvzb4x_-YoRZfYfCpZYSYkpWLl8xw2JyzNM"
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
const btnGoBack= document.getElementById("goback")
const imcDiv = document.getElementById("imc-div")
const alturaInput = document.getElementById("alt")
const pesoInput = document.getElementById("peso")

function buildMessage(prob, risco) {
    const div = document.getElementById("resultado")
    div.className = "show"
    div.firstElementChild.innerHTML = prob
    div.children[1].innerHTML = risco
}

btnGoBack.addEventListener("click", () => location.reload())

function setCintura(array) {
    const btnsCint = document.getElementsByClassName("cint")

    for (let i = 0; i < btnsCint.length; i++) {
        const btn = btnsCint[i]
        btn.textContent = array[i]
        btn.addEventListener("click", () => {
            score["cintura"] = i === 0 ? 0 : i + 2
        })
    }

    removeErrorMessage(cinturaDiv)
    removeErrorMessage(document.getElementById("sexo"))
    cinturaDiv.className = "show"
}

function setErrorMessage(el) {
    el.getElementsByClassName("error")[0].className += " show"
}

function removeErrorMessage(el) {
    el.getElementsByClassName("error")[0].className = "error"
}

const checkInfoPerson = () => {
    let checked = false
    const isNotIdadeOkay = idadeInput.value == 0 || !idadeInput.value

    if (isNotIdadeOkay) setErrorMessage(idadeInput.parentElement)

    for (const radio of radioSex.values())
        if (checked = radio.checked) break

    if (!checked) setErrorMessage(radioSex.item(0).parentElement)

    if (score["cintura"] === -1 && "show" === cinturaDiv.className) setErrorMessage(cinturaDiv)

    return isNotIdadeOkay || !checked || score["cintura"] === -1
}

const checkOtherData = () => {
    const bool = isNotIMCOkay()
    
    if (!bool && score["imc"] === -1) btnIMC.click()
    
    return bool
}

function checkHabits () {
    const att = Array.from(radioAttFisica.values())
    .reduce((prev, cur) => prev ||= cur.checked, false)
    
    const eatVegs = Array.from(radioVeg.values())
    .reduce((prev, cur) => prev ||= cur.checked, false)
    
    const eatCarn = Array.from(radioCarn.values())
    .reduce((prev, cur) => prev ||= cur.checked, false)



    if(!att) setErrorMessage(radioAttFisica[0].parentElement)
    
    if(!eatVegs) setErrorMessage(radioVeg[0].parentElement)

    if(!eatCarn) setErrorMessage(radioCarn[0].parentElement)

    return !(att && eatVegs && eatCarn)
}

const checkHealthCons = () => {
    const glic = Array.from(radioGlic.values()).reduce((prev, cur) => prev ||= cur.checked, false)
    const pres = Array.from(radioPres.values()).reduce((prev, cur) => prev ||= cur.checked, false)

    if(!glic) setErrorMessage(radioGlic[0].parentElement)
    
    if(!pres) setErrorMessage(radioPres[0].parentElement)

    return !(glic && pres)
}

const checkGen = () => {
    const pFam = Array.from(radioPFam.values()).reduce((prev, cur) => prev ||= cur.checked, false)
    const sFam = Array.from(radioSFam.values()).reduce((prev, cur) => prev ||= cur.checked, false)

    if(!pFam) setErrorMessage(radioPFam[0].parentElement)

    if(!sFam) setErrorMessage(radioSFam[0].parentElement)

    return !(pFam && sFam)
}

idadeInput.addEventListener("input", (ev) => {
    const idade = ev.target.value
    removeErrorMessage(ev.target.parentElement)

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

function isNotIMCOkay() {
    let isNotOkay = !((alturaInput.value || alturaInput.value === '0')  && (pesoInput.value || pesoInput.value === '0'));
    
    if (!alturaInput.value) 
        setErrorMessage(alturaInput.parentElement)

    if (!pesoInput.value)
        setErrorMessage(pesoInput.parentElement)

    return isNotOkay
}

const checkFunctions = [checkInfoPerson, checkOtherData, checkHabits, checkHealthCons]

const cinturaObj = {
    0: ["Menos que 94 cm","Entre 94 e 101 cm", "Mais que 101 cm"],
    1: ["Menos que 80 cm","Entre 80 e 88 cm", "Mais que 88 cm"]}

radioSex.forEach((el, k) => {el.addEventListener("click", () => setCintura(cinturaObj[k]))})

alturaInput.addEventListener("input", (ev) => removeErrorMessage(ev.target.parentElement))

pesoInput.addEventListener("input", (ev) => removeErrorMessage(ev.target.parentElement))

btnIMC.addEventListener("click", () => {
    if(isNotIMCOkay()) return

    const altura = alturaInput.value/100
    const peso = pesoInput.value
    
    const imc = Math.round(peso/(altura*altura))
    imcDiv.lastElementChild.innerHTML = imc.toString()
    imcDiv.className = "show"

    if (imc < 25) {
        score.imc = 0
        return
    }

    if (imc < 30) {
        score.imc = 1
        return
    }

    score.imc = 3
})

function swap(children, toHide, toShow) {
    children[toHide].className = "hidden"
    children[toShow].className = ""
}

btnNext.addEventListener("click", () => {
    const bef = slide
    const results = checkFunctions[slide]()

    if (results) return

    slide = Math.min(slide+1, 4)

    if (slide !== 0) btnBef.className = "show"
    if (slide === 4) {
        btnNext.className = ""
        btnCalcular.className = "show"
    }

    swap(carrouselDiv.children, bef, slide)
})

btnBef.addEventListener("click", () => {
    const bef = slide
    slide = Math.max(0, slide-1)

    if (slide === 0) btnBef.className = ""
    if (slide !== 4) {
        btnNext.className = "show"
        btnCalcular.className = ""
    }

    swap(carrouselDiv.children, bef, slide)
})

btnCalcular.addEventListener("click", () => {
    let soma = 0

    if (checkGen()) return

    btnBef.classList = []
    btnCalcular.classList = [] 

    for (const key in score)
        soma += score[key]

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

radioAttFisica.forEach((elem, key) => {
    elem.addEventListener("click", () => {
        score["att_fisica"] = key<<1
        removeErrorMessage(elem.parentElement)
    })
})

radioVeg.forEach((elem, key) => {
    elem.addEventListener("click", () => {
        score["veg"] = key
        removeErrorMessage(elem.parentElement)
    })
})

radioCarn.forEach((elem, key) => {
    elem.addEventListener("click", () => {
        score["carne"] = key
        removeErrorMessage(elem.parentElement)
    })
})

radioGlic.forEach((elem, key) => {
    elem.addEventListener("click", () => {
        score["glic"] = key === 0 ? 5 : 0
        removeErrorMessage(elem.parentElement)
    })
})

radioPres.forEach((elem, key) => {
    elem.addEventListener("click", () => {
        score["pres"] = key === 0 ? 2 : 0
        removeErrorMessage(elem.parentElement)
    })
})

radioPFam.forEach((elem, key) => {
    elem.addEventListener("click", () => {
        score["pFam"] = key === 0 ? 5 : 0
        removeErrorMessage(elem.parentElement)
    })
})

radioSFam.forEach((elem, key) => {
    elem.addEventListener("click", () => {
        score["sFam"] = key === 0 ? 3 : 0
        removeErrorMessage(elem.parentElement)
    })
})

fetch("https://sheets.googleapis.com/v4/spreadsheets/17FETyiGmSvzb4x_-YoRZfYfCpZYSYkpWLl8xw2JyzNM")
    .then(res => res.json())
    .then(resp => console.log(resp))