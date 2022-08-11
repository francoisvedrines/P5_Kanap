export {addToCart}


//fonction stockage localstorage
function addToCart(productToCart) {
    //création variable pour le produit ajouté
    const idProduct = productToCart.id;
    const colorProduct = productToCart.color;
    const quantityProduct = productToCart.quantity;
  
    //si localStorage Vide 
    if (localStorage.getItem("cart") === null) {
      //creation d'un tableau 
      const tabCart = []
      alert(`L'ajout de ${quantityProduct} ${productToCart.name} a été pris en compte`);
      //insertion des données du produit ajouté
      //ajout dans local storage sous forme de valeur
      tabCart.push(productToCart);
      return localStorage.setItem("cart", JSON.stringify(tabCart));
      // sinon ajouter données de la variable cart
    } else {
      //récupération du contenu sous forme de tableau
      const tabCart = JSON.parse(localStorage.getItem("cart"));
      for (let cartProduct of tabCart) {
        //si l'id du produit est deja présent dans le panier et si la couleur du produit est identique
        if (idProduct === cartProduct.id && colorProduct === cartProduct.color) {
          //ajout de la nouvelle quantité à celle présente
          cartProduct.quantity += quantityProduct;
          alert(`L'ajout de ${quantityProduct} ${productToCart.name} supplémentaire(s) à été pris en compte`);
          //ajout au local storage
          return localStorage.setItem("cart", JSON.stringify(tabCart));
        }
      }
      for (let cartProduct of tabCart) {
        // si id deja present mais la couleur est differente
        if (idProduct === cartProduct.id && colorProduct != cartProduct.color) {
          //récupération du panier
          const tabCart = JSON.parse(localStorage.getItem("cart"))
          // ajout de l'objet
          tabCart.push(productToCart);
          // //ajout dans local storage sour forme de valeur
          alert(`L'ajout de ${quantityProduct} ${productToCart.name} a été pris en compte`);
          return localStorage.setItem("cart", JSON.stringify(tabCart));
        }
  
        else if (idProduct != cartProduct.id) {
          const tabCart = JSON.parse(localStorage.getItem("cart"))
          // ajout de l'objet
          tabCart.push(productToCart);
          // //ajout dans local storage sour forme de valeur
          alert(`L'ajout de ${quantityProduct} ${productToCart.name} a été pris en compte`);
          return localStorage.setItem("cart", JSON.stringify(tabCart));
        }
      }
    }
  }
  
  