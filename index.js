

const ciudad = document.querySelector("#ciudad");
const temperatura = document.querySelector("#temperatura");
const tiempo = document.querySelector("#tiempo");
const body = document.querySelector("body");
const input = document.querySelector("input");
const boton = document.querySelector("#cambiar-boton");
const img = document.querySelector("#icono")

boton.addEventListener("click", () => {
    getTemp();
    render();
    input.value = ""
})


async function getTemp() {
    try {
        if (input.value == "") {
            var promise = await fetch('http://api.openweathermap.org/data/2.5/weather?q=barcelona&APPID=0f5be1a5e46d9f4a4d1190cd358eaf32')
        } else {
            var promise = await fetch('http://api.openweathermap.org/data/2.5/weather?q=' + input.value + '&APPID=0f5be1a5e46d9f4a4d1190cd358eaf32')
        }

        let response = await promise.json();
        let ciudad = response.name
        let temp = Math.round((response.main.temp) - 273.1);
        let weather = response.weather[0].main

        return {
            ciudad: ciudad,
            temp: temp,
            weather: weather
        }
    } catch (error) {
        alert("Error: " + error)
    }

}

async function getNewTemp() {
    let promise = await fetch('http://api.openweathermap.org/data/2.5/weather?q=madrid&APPID=0f5be1a5e46d9f4a4d1190cd358eaf32')
    let response = await promise.json();
    let ciudad = response.name
    let temp = Math.round((response.main.temp) - 273.1);
    let weather = response.weather[0].main

    return {
        ciudad: ciudad,
        temp: temp,
        weather: weather
    }
}

function render() {
    try {
        getTemp().then((variables) => {
            selectBackground(variables)
            selectWeatherIcon(variables)
            ciudad.innerText = variables.ciudad;
            temperatura.innerText = variables.temp + "º";
            const descripcion = document.querySelector(".descripcion")
            descripcion.innerText = variables.weather
        })
    } catch {
        alert("Error: No tienes conexión a internet")
    }

}

function selectBackground(variables) {
    if (variables.ciudad == "Barcelona") {
        body.className = ""
        body.classList.add('barcelona')
    } else if (variables.ciudad == "London") {
        body.className = ""
        body.classList.add('londres')
    } else if (variables.ciudad == "Sydney") {
        body.className = ""
        body.classList.add('sydney')
    } else if (variables.ciudad == "Madrid") {
        body.className = ""
        body.classList.add('madrid')
    } else if (variables.ciudad == "New York") {
        body.className = ""
        body.classList.add('newyork')
    } else if (variables.ciudad == "Rio") {
        body.className = ""
        body.classList.add('rio')
    } else if (variables.ciudad == 'Tokyo') {
        body.className = ""
        body.classList.add('tokyo')
    } else if (variables.ciudad == 'Paris') {
        body.className = ""
        body.classList.add('paris')
    }
    else {
        body.className = ""
        body.classList.add('random')
    }
}

function selectWeatherIcon(variables) {
    if (variables.weather == "Clouds") {
        img.src = "css/icons/cloudy.svg";
    } else if (variables.weather == "Rain") {
        img.src = "css/icons/rain.png"
    } else if (variables.weather == "Clear") {
        img.src = "css/icons/sunny.svg"
    }
    img.classList.add("icons")
    tiempo.appendChild(img)
    var parrafo = document.createElement("p");
    parrafo.classList.add("descripcion")
    tiempo.appendChild(parrafo)
}


render()
