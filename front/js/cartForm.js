//************************************** */
//********** partie formulaire ********* */
//********** de la page panier ********* */
//************************************** */


import { checkForm } from "./cartRegex.js";
export {listenBuntonOrder};



//ecoute du bouton pour activer fonction soumettre au clic
function listenBuntonOrder(cart) {
    const orderButton = document.querySelector("#order");
    orderButton.addEventListener("click", (e) => {
        e.preventDefault();
        captureForm(cart);
    });
}

// fonction soumettre
function captureForm(cart) {
    const form = document.querySelector(".cart__order__form");
        // creation d'un objet des objets contact et products pour envoi au serveur
    const contact = {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        address: form.address.value,
        city: form.city.value,
        email: form.email.value,
    }
    const ids = idInCart(cart)
    postOrder(contact, ids)
}

//récupération des id pour renvoi dans l'objet products
function idInCart(cart) {
    const ids = [];
    cart.forEach((product) => {
        const id = product.id;
        ids.push(id)
    })
    return ids
}

//envoi des donnés utilisateur et id du produit
function postOrder(contact, ids) {
    const dataUser = {
        contact: contact,
        products: ids,
    }
    const error = []
    checkForm(error)
    //conditions de validation du formulaire avant envoi
    if (error != "") {
        console.log(error);
        return alert("Erreur de saisie, veuillez vérifier le formulaire")
    } else {
        console.log("envoi serveur");
        //requête post au serveur
        fetch(`http://localhost:3000/api/products/order`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataUser),
        })
        .then((res) => res.json())
        .then((data) => getToken(data))
        .catch(() => {
            alert("Une erreur est survenue, merci de revenir plus tard.");
        })
    }
}

// fonction de récupération de l'orderId
function getToken(data) {
    location.href = "confirmation.html" + "?orderId=" + data.orderId
}

