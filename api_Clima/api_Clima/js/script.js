const apiKey = "64ed82577ced7f69cb1687f0ce536131";

const cidadeInput = document.querySelector("#cidade-input");
const buscaBtn = document.querySelector("#busca");

const cidadeElement = document.querySelector("#cidade");
const tempElement = document.querySelector("#temperatura span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const umidadeElement = document.querySelector("#umidade span");
const ventoElement = document.querySelector("#vento span");

const weatherContainer = document.querySelector("#weather-data");

const errorMessageContainer = document.querySelector("#error-message");
const loader = document.querySelector("#loader");

// Função
const toggleLoader = () => {
    loader.classList.toggle("hide");
};

const getWeatherData = async (cidade) => {
    toggleLoader();

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    toggleLoader();

    return data;
};

// Tratamento de erro
const showErrorMessage = () => {
    errorMessageContainer.classList.remove("hide");
};

const hideInformation = () => {
    errorMessageContainer.classList.add("hide");
    weatherContainer.classList.add("hide"); 
};

const showWeatherData = async (cidade) => {
    hideInformation();

    const data = await getWeatherData(cidade);

    if (data.cod === "404") {
        showErrorMessage();
        return;
    }

    cidadeElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    );

    umidadeElement.innerText = `${data.main.humidity}%`;
    ventoElement.innerText = `${data.wind.speed}km/h`;

    weatherContainer.classList.remove("hide");
    buscaMundi.classList.remove("hide");
};

buscaBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const cidade = cidadeInput.value;

    showWeatherData(cidade);
});

cidadeInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        const cidade = e.target.value;

        showWeatherData(cidade);
    }
});

/* ==================================================================================== */
// Função para realizar a busca no Google Earth
function buscarMapaMundi() {
    var localizacao = cidadeInput.value;

    window.open('https://earth.google.com/web/search/' + localizacao); 
}



