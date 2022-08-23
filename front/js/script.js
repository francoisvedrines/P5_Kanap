//variable = section #items dans la page html
const sectionItems = document.getElementById("items");

getData();

//La fonction qui va récupérer les données de l'API via requête get
async function getData () {
  fetch("http://localhost:3000/api/products")
    // récupération des données de l'API dans un fichier.json
    .then((response) => response.json())
    //  données mises dans une variable value et ajout en paramètre à la fonction displayItems
    .then((value) => displayItems(value))
    //si erreur du serveur, affiche un message d'erreur
    .catch(() => {
      alert("Catalogue actuellement inaccessible, merci de revenir plus tard.")
    });
};

//fonction d'affichage des element html
function displayItems(value) {
  let displayHtml = "";
  //boucle pour chaque article de la récupation de donnée
  for (let product of value) {
    // variable contenant le code HTML dynamique à afficher
    displayHtml +=
      (`<a href="./product.html?id=${product._id}">
    <article><img src="${product.imageUrl}" alt="${product.altTxt}"/>
    <h3 class='productName'>${product.name}</h3>
    <p class='productDescription'>${product.description}</p>
    </article></a>`);
  };
  // affichage dans la section items
  sectionItems.insertAdjacentHTML("afterbegin", displayHtml);
};
