const container = document.querySelector(".container");
const inputBox = document.querySelector(".inputBox input");
const btn = document.querySelector(".inputBox button");
const temp = document.querySelector(".value p");
const locationData = document.querySelector(" #location");
const humidityData = document.querySelector(".humidity #value");
const windData = document.querySelector(".wind #value1");
const imgBox = document.querySelector(".imgBox img");
const detail = document.querySelector(".detail");
const notFound = document.querySelector(".notFound");

btn.addEventListener("click", (e) => {
  if (inputBox.value == "") {
    inputBox.innerHTML = "error";
  }
  callApi(inputBox.value);
});
async function callApi(city) {
  const apiKey = "893523311a6d5cf1c48fe2fa8e2b1b5a";
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const data = await fetch(api).then((res) => res.json());
  console.log(data);

  if (data.cod == "404" || data.message == "city not found") {
    console.log("Error");
    detail.style.display = "none";
    notFound.style.display = "block";
  } else {
    detail.style.display = "block";
    notFound.style.display = "none";
  }
  if (inputBox.value == "") {
    inputBox.classList.add("error");
    setTimeout(() => {
      inputBox.classList.remove("error");
    }, 1000);
    detail.style.display = "none";
    notFound.style.display = "none";
  }

  windData.innerHTML = `${data.wind.speed} km/h`;
  locationData.innerHTML = `${data.name}`;
  temp.innerHTML = `${Math.round(data.main.temp - 273.15)}°c`;
  humidityData.innerHTML = `${data.main.humidity}%`;

  switch (data.weather[0].main) {
    case "Clouds":
      imgBox.src = "cloud.png";
      break;
    case "Clear":
      imgBox.src = "clear.png";
      break;
    case "Rain":
      imgBox.src = "rain.png";
      break;
    case "Mist":
      imgBox.src = "mist.png";
      break;
    case "Snow":
      imgBox.src = "snow.png";
      break;
  }
}
