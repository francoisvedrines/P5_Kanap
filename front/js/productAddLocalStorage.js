export {addToCart}


//fonction stockage localstorage
function addToCart(productToCart) {
  //création variables pour le produit ajouté
  const idProduct = productToCart.id;
  const nameProduct = productToCart.name;
  const colorProduct = productToCart.color;
  const quantityProduct = productToCart.quantity;
  //récurépation local storage en objet JS
  let tabCart =JSON.parse(localStorage.getItem("cart"))
  
  if (tabCart != null)  {
    // trouve dans objet si id et couleur similaires
    const findProduct= tabCart.find((el) => el.id === idProduct && el.color === colorProduct)
    if (findProduct) {
      //addition de l'ancienne quantité avec la nouvelle
      let newQuantite = quantityProduct + findProduct.quantity;
      // remplacement de la quantité dans l'objet
      findProduct.quantity = newQuantite;
      alert(`L'ajout de ${quantityProduct} ${nameProduct} supplémentaire(s) à été pris en compte`);
      //ecriture dans le local storage
      localStorage.setItem("cart", JSON.stringify(tabCart));
    }else {
      //insere le produit dans le local storage
        tabCart.push(productToCart);
        localStorage.setItem("cart", JSON.stringify(tabCart));
        alert(`L'ajout de ${quantityProduct} ${nameProduct} a été pris en compte`);
    }
  }else{
    //sinon creation d'un tableau vide et on injecte l'objet
    tabCart = []
    tabCart.push(productToCart);
    localStorage.setItem("cart", JSON.stringify(tabCart));
    alert(`L'ajout de ${quantityProduct} ${nameProduct} a été pris en compte`);
  }
}
   
   