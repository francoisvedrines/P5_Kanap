import { addToCart } from "./productAddLocalStorage.js";

//récupération de l'url
const urlSearchParams = new URLSearchParams(document.location.search)
//extraction de l'id contenu dans l'url
const urlId = urlSearchParams.get("id")

fetchDataProduct()


function fetchDataProduct(){
//requête serveur get avec l'url personnalisée contenant l'id du produit choisi 
  fetch(`http://localhost:3000/api/products/${urlId}`)
  .then((response) => response.json())
  .then((data) => handleData(data))
  .catch(() => {
    alert("Catalogue actuellement inaccessible, merci de revenir plus tard.")
  });
}

//fonction création d'un tableau des données        
function handleData(data){ 
  const product= {
    altTxt:data.altTxt,
    colors:data.colors, 
    description: data.description, 
    imageUrl: data.imageUrl,
    name: data.name,
    price: data.price
  }
 selectColorList(product) 
}

function selectColorList(product){
  // créé un tableau des résultats couleur
  const optionColor = product.colors.map((color) => {
    //insére les données dans la liste html  
    return `<option value="${color}">${color} </option>`
  })
  // crée et renvoi en chaine de caractère les options de couleur
  const optionColorHtml = optionColor.join("")
  displayHtml(product, optionColorHtml)
}


  //structure html à afficher 
function displayHtml(product, optionColorHtml){
  const img = document.createElement("img")
  img.src = product.imageUrl
  img.alt = product.altTxt
  const divImg = document.querySelector(".item__img");
  divImg.appendChild(img);

  const divTitle = document.querySelector("#title")
  divTitle.textContent += product.name

  const spanPrice = document.querySelector("#price")
  spanPrice.textContent += product.price

  const pDescription = document.querySelector("#description")
  pDescription.textContent += product.description

  const optionValue = document.querySelector("#colors")
  optionValue.innerHTML += optionColorHtml
  changePageTitle(product)
  listenButtonAdd(product)
}
 
// changement du titre de la page Html
function changePageTitle(product){
  const newTitle = product.name
  document.querySelector("title").textContent = newTitle
}

function listenButtonAdd(product){
  // enregistrement des valeurs selectionnées au clic du bouton
  const button = document.querySelector("#addToCart")
  //évenement sur clic du bouton
  button.addEventListener("click", (e) => {
    e.preventDefault() //stop la propagation 
    //récuparation des valeurs au clic dans des variables
    const color = document.querySelector("#colors").value
    const quantity = document.querySelector("#quantity").value
    //si color n'est pas renseigné
    if (color == "") {
      alert("Veuillez selectionner une couleur")
    } else if(quantity < 1 || quantity >100){
      alert ("veuillez selectionner une quantité valide ou inferieur à 100")
    } else {
      // création d'un objet panier pour localstorage
      const productToCart = {
        id: urlId,
        name: product.name,
        color: color,
        quantity: Number(quantity),
      }
      // appel de la fonction ajout au localstorage
      addToCart(productToCart)
      location.href = "cart.html"
    }
  })
}

