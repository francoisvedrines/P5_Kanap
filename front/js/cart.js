import { listenBuntonOrder } from "./cartForm.js";


//************************************** */
//********** partie panier ************* */
//************************************** */

const cartInLocalStorage = JSON.parse(localStorage.getItem("cart"));
// creation variable panier
let cart = undefined
launchPage();

//lancement des fonctions de la page si le panier est plein, sinon affichage d'un message "le panier est vide" et masquage du formulaire
async function launchPage() {
    if (cartInLocalStorage) {
        //variable panier à l'état de tableau
        cart = []
        //récupération données dans le local storage et sur l'API pour chargement dans le tableau
        await retrieveProducts(cartInLocalStorage, cart)
        listenBuntonOrder(cart)
    } else {
        //affichage panier vide sur la page
        const emptyCart = document.createElement("h2")
        document.querySelector("#cart__items").appendChild(emptyCart)
        emptyCart.textContent = "Le panier est vide."
        // marque le formulaire de saisie et le bouton commander
        const hideForm = document.querySelector(".cart__order")
        hideForm.setAttribute("style","display:none")
    }   
}


//récupération des donnés du localstorage pour insérer dans un tableau 
async function retrieveProducts(cartInLocalStorage, cart) {
    cartInLocalStorage.forEach((itemInLocalStorage) => {

        fetch(`http://localhost:3000/api/products/${itemInLocalStorage.id}`)
        .then((response) => response.json())
        .then((catalog) => {
            cart.push({...itemInLocalStorage, price : catalog.price})
            cart.sort((a,b)=> a.id.localeCompare(b.id)) // triage par id
            displayItems(itemInLocalStorage ,catalog)
            totalPriceAndQauntity(cart)
        })
    })
}

console.log(cart);

//affichage code html
function displayItems(itemInLocalStorage, catalog) { 
    const sectionItem = document.getElementById("cart__items")
    sectionItem.innerHTML +=
        `<article class="cart__item">
            <div class="cart__item__img">
                <img src="${catalog.imageUrl}" alt="${catalog.altTxt}">
            </div >
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${catalog.name}</h2>
                     <p>${itemInLocalStorage.color}</p>
                    <p>${catalog.price} €</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${itemInLocalStorage.quantity}" data-color="${itemInLocalStorage.color}" data-id="${itemInLocalStorage.id}">
                </div>
                <div class="cart__item__content__settings__delete">
                    <p class="deleteItem" data-id="${itemInLocalStorage.id}" data-color="${itemInLocalStorage.color}">Supprimer </p>
                </div>
            </div>
        </article > `

    changeQuantityProduct(cart , sectionItem)
    removeProduct(cart)

}


//changement de la quantité des articles
function changeQuantityProduct(cart,sectionItem) {
    const qtyInputs = sectionItem.querySelectorAll(".itemQuantity");
    qtyInputs.forEach((qtyInput) => {
        // ecoute au changement de l'input
        qtyInput.addEventListener("change", (e) => {
            const newQuantity = Number(e.target.value);
            console.log(newQuantity);
            updateCart(cartInLocalStorage, e.target.dataset.id, e.target.dataset.color, newQuantity)
            totalPriceAndQauntity(cart)
        })
    })
}

//bouton de supression article
function removeProduct(cart) {
    const rmvItems = document.querySelectorAll(".deleteItem");
    rmvItems.forEach((itemToRmv) => {
        itemToRmv.addEventListener("click", (e) => {
            e.preventDefault();
            const itemIdForDelete = e.target.dataset.id;
            const itemColorForDelete = e.target.dataset.color;
            const itemToDelete = cart.findIndex(
                (product) => product.id === itemIdForDelete && product.color === itemColorForDelete)
                cart.splice(itemToDelete, 1)
                e.target.closest(".cart__item").remove()
                alert("Article supprimé du panier.")
                localStorage.setItem("cart", JSON.stringify(cart))
                totalPriceAndQauntity(cart)
                if (cart.length === 0) {
                    localStorage.clear()
                    location.reload()
                }
            })
        })
}


//calcul du total des articles et du prix final
function totalPriceAndQauntity(cart) {
    let totalCartPrice = 0;
    let totalCartItems = 0;
    cart.forEach(item => {
        // liste la quantité du produit
        const numberItem = item.quantity;
        //effectue le total sur tout le panier
        totalCartItems = totalCartItems + numberItem;
        //calcul le prix total du panier
        const totalItemPrice = item.price * item.quantity;
        totalCartPrice += totalItemPrice;
    })
    displayTotalPriceAndQuantity(totalCartItems, totalCartPrice)
}

//affichage du résultat de totalPriceQuantity sur la page
function displayTotalPriceAndQuantity(totalCartItems, totalCartPrice) {
    document.getElementById('totalQuantity').textContent = totalCartItems;
    document.getElementById('totalPrice').textContent = totalCartPrice;
}

//mise à jour des données dans le localStorage
function updateCart(cartLocalStorage, id, color, newQuantity) {
    let product = cart.find(item => item.id === id && item.color === color)
    if( product){
        product.quantity=newQuantity
    }
    console.log(product);
    
    product = cartLocalStorage.find(item => item.id === id && item.color === color)
    if( product){
        product.quantity=newQuantity
    }
    
    return localStorage.setItem("cart", JSON.stringify(cartLocalStorage));
}