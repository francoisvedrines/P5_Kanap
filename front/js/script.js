//variable = section html #items
const items = document.getElementById("items")


launchPage()

function launchPage(){
//condition si sessionstorage existe, récupération de data
if (sessionStorage.getItem("data") !== null) {
  const dataSession = JSON.parse(sessionStorage.getItem("data"));
  displayItems(dataSession)
  // sinon appel de la fonction getData
} 
else {
  getData();
}
}

//La fonction qui va récupérer les données de l'API
async function getData () {
  fetch("http://localhost:3000/api/products")
    // récupération des données de l'API dans response.json
    .then((response) => response.json())
    .then(function (value) {
      //stockage des données dans un json
      sessionStorage.setItem("data", JSON.stringify(value))
      // appel de la fonction d'affichage
      displayItems(value)
    })
}

//fonction d'affichage des element html
function displayItems(value) {
  let displayHtml = ""
  //boucle pour chaque article de la récupation de donnée
  for (let product of value) {
    //code HTML dynamique dans la section items
    displayHtml +=
      (`<a href="./product.html?id=${product._id}">
    <article><img src="${product.imageUrl}" alt="${product.altTxt}"/>
    <h3 class='productName'>${product.name}</h3>
    <p class='productDescription'>${product.description}</p>
    </article></a>`);
  }
  const sectionItem = document.getElementById("items")
  sectionItem.insertAdjacentHTML("afterbegin", displayHtml)
}
