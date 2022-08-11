import { addToCart } from "./productAddLocalStorage.js";

//récupération et extraction de l'id
const urlSearchParams = new URLSearchParams(document.location.search)
const urlId = urlSearchParams.get("id")

//récupérer les données de l'article dans l'API   
fetch(`http://localhost:3000/api/products/${urlId}`)
  // récupération des données de l'API dans response.json
  .then((response) => response.json())
  .then((product) => handleData(product))

//fonction gestion des données        
function handleData({ altTxt, colors, description, imageUrl, name, price }) {
  // créé un tableau des résultats couleur
  const optionColor = colors.map((color) => {
    //insére les données dans la liste html  
    return `<option value="${color}">${color} </option>`
  })
  // crée et renvoie en chaine de caractère les options de couleur
  const optionColorHtml = optionColor.join("")

  //structure html à afficher 

  const img = document.createElement("img")
  img.src = imageUrl
  img.alt = altTxt
  const divImg = document.querySelector(".item__img");
  divImg.appendChild(img);

  const divTitle = document.querySelector("#title")
  divTitle.textContent += name

  const spanPrice = document.querySelector("#price")
  spanPrice.textContent += price

  const pDescription = document.querySelector("#description")
  pDescription.textContent += description

  const optionValue = document.querySelector("#colors")
  optionValue.innerHTML += optionColorHtml

 

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
    } else {
      // création d'un objet panier pour localstorage
      const productToCart = {
        id: urlId,
        name: name,
        color: color,
        quantity: Number(quantity),
      }
      // appel de la fonction ajout au localstorage
      addToCart(productToCart)
      location.href = "cart.html"
    }
  })
}


