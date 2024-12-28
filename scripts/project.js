// YOUR NAME HERE

// === constants ===
const MAX_QTY = 9;
const productIdKey = "product";
const orderIdKey = "order";
const inputIdKey = "qte";

// === global variables  ===
// the total cost of selected products 
var total = 0;
//HAMZA
var filteredCatalog = catalog;  

var init = function () {
    createShop(filteredCatalog); // Affiche les produits filtrés dès le départ
    document.getElementById("filter").addEventListener('keyup', filter); // Écouteur pour la barre de recherche
}


window.addEventListener("load", init);

// usefull functions


var createShop = function (filteredProducts) {
    var shop = document.getElementById("boutique");
    shop.innerHTML = '';  // effacer tout produit qu'on voit sur l'écran avant d'afficher les résultats filtrés 
    for(var i = 0; i < filteredProducts.length; i++) {
        shop.appendChild(createProduct(filteredProducts[i], i));
    }
}
/*
* create the div.produit elment corresponding to the given product
* The created element receives the id "index-product" where index is replaced by param's value
* @param product (product object) = the product for which the element is created
* @param index (int) = the index of the product in catalog, used to set the id of the created element
*/
var createProduct = function (product, index) {
	// build the div element for product
	var block = document.createElement("div");
	block.className = "produit";
	// set the id for this product
	block.id = index + "-" + productIdKey;
	// build the h4 part of 'block'
	block.appendChild(createBlock("h4", product.name));
	
	// /!\ should add the figure of the product... does not work yet... /!\ 
	block.appendChild(createFigureBlock(product));

	// build and add the div.description part of 'block' 
	block.appendChild(createBlock("div", product.description, "description"));
	// build and add the div.price part of 'block'
	block.appendChild(createBlock("div", product.price, "prix"));
	// build and add control div block to product element
	block.appendChild(createOrderControlBlock(index));
	return block;
}


/* return a new element of tag 'tag' with content 'content' and class 'cssClass'
 * @param tag (string) = the type of the created element (example : "p")
 * @param content (string) = the html wontent of the created element (example : "bla bla")
 * @param cssClass (string) (optional) = the value of the 'class' attribute for the created element
 */
var createBlock = function (tag, content, cssClass) {
	var element = document.createElement(tag);
	if (cssClass != undefined) {
		element.className =  cssClass;
	}
	element.innerHTML = content;
	return element;
}

/*
* builds the control element (div.controle) for a product
* @param index = the index of the considered product
*
* TODO : add the event handling, 
*   /!\  in this version button and input do nothing  /!\  
*/
var createOrderControlBlock = function (index) {
	var control = document.createElement("div");
	control.className = "controle";

	// create input quantity element
	var input = document.createElement("input");
	input.id = index + '-' + inputIdKey;
	input.type = "number";
	input.step = "1";
	input.value = "0";
	input.min = "0";
	input.max = MAX_QTY.toString();
	// add input to control as its child
	control.appendChild(input);
	//HAMZA
	input.addEventListener("input", function () {
		// Contrôle des valeurs saisies
		var qty = input.value;
		if (isNaN(qty) || qty < 0 || qty > MAX_QTY) {
			input.value = "0";
		}
	
		// Activation/désactivation du bouton
		if (qty > 0) {
			button.style.opacity = "1";
			button.disabled = false;
		} else {
			button.style.opacity = "0.25";
			button.disabled = true;
		}
	});
	// create order button
	var button = document.createElement("button");
	button.className = 'commander';
	button.id = index + "-" + orderIdKey;
	// add control to control as its child
	control.appendChild(button);


//hamza
// Gestion du clic sur le bouton de mise en panier
// Gestion du clic sur le bouton de mise en panier
// Gestion du clic sur le bouton de mise en panier
button.addEventListener("click", function () {
    var qty = parseInt(input.value);
    if (qty > 0) {
        var panier = document.getElementById("panier");
		var panierItemsContainer = panier.querySelector(".achats"); // Add items inside this container
        var panierItem = document.getElementById(index + "-achat");

        // Si le produit est déjà dans le panier
        if (panierItem) {
            var currentQty = parseInt(panierItem.dataset.qty);
            var newQty = Math.min(currentQty + qty, MAX_QTY);
            panierItem.dataset.qty = newQty;
            panierItem.querySelector(".quantite").textContent = ` ${newQty}`;
        } else {
            // Ajouter un nouvel élément au panier
            var newItem = document.createElement("div");
            newItem.id = index + "-achat";
            newItem.className = "achat";
            newItem.dataset.qty = qty;

			
			

			

            newItem.innerHTML = `
			   
			    <span class="quantite"> ${qty}</span>
                <span class="name">${catalog[index].name}</span>
                
                <span class="prix">${(catalog[index].price * qty)} €</span>
                <button class="remove" style="
        
        cursor: pointer">🗑️</button>
            `;
        
        
        
			newItem.style.display = "flex";
            newItem.style.alignItems = "center";
            newItem.style.justifyContent = "space-between";
            newItem.style.marginBottom = "1px";
            newItem.style.backgroundColor = "#f9f9f9";
            panierItemsContainer.appendChild(newItem);

            // Gestion de suppression de l'article
            newItem.querySelector(".remove").addEventListener("click", function () {
                panierItemsContainer.removeChild(newItem);
                updateTotal();
            });
        }

        // Réinitialiser l'entrée quantité
        input.value = "0";
        button.style.opacity = "0.25";
        button.disabled = true;

        // Mise à jour du total
        updateTotal();
    }
});

// Fonction pour mettre à jour le montant total
var updateTotal = function () {
    var panierItems = document.querySelectorAll("#panier .achat");
    total = 0;

    panierItems.forEach(function (item) {
        var qty = parseInt(item.dataset.qty);
        var price = parseFloat(item.querySelector(".prix").textContent);
        total += qty * price;
    });

    document.getElementById("total").textContent = `Total : ${total.toFixed(2)} €`;
};

	// the built control div node is returned
	return control;
}



/*
* create and return the figure block for this product
* see the static version of the project to know what the <figure> should be
* @param product (product object) = the product for which the figure block is created
*
* TODO : write the correct code
*/
//Hamza
var createFigureBlock = function (product) {
	
	var figure =`<img src="${product.image}"/>`

	
	return createBlock("figure",figure,"")
}



//HAMZA
function filter() {
    var filterText = document.getElementById("filter").value.toLowerCase();
    
    // Filtrer les produits en fonction du texte de recherche
    filteredCatalog = catalog.filter(product => 
        product.name.toLowerCase().indexOf(filterText) !== -1 ||  // Filtrer par nom
        product.description.toLowerCase().indexOf(filterText) !== -1 // Filtrer par description
    );
    
    // Mettre à jour l'affichage des produits
    createShop(filteredCatalog);
}






