//************************************** */
//********* page confirmation ********** */
//************************************** */

const orderId = getOrderId()
displayOrderId(orderId)

//fonction de récupération de l'orderId dans l'url
function getOrderId() {
    const urlSearchParams = new URLSearchParams(document.location.search)
    return urlSearchParams.get("orderId")
}

// fonction affiche de l'orderId sur la page
function displayOrderId(orderId) {
    const orderElement = document.getElementById("orderId");
    orderElement.textContent = orderId
    clearlocalStorage()
}

// fonction de nettoyage du localstorage 
function clearlocalStorage() {
    localStorage.clear()
} 