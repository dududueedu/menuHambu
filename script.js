const menu = document.getElementById("menu")
const cartBtnFooter = document.getElementById("cart-btn-footer")
const modalView = document.getElementById("modal-view")
const cartItemsModal = document.getElementById("cart-items-modal")
const ValueTotalModal = document.getElementById("cart-value-total")
const requestModal = document.getElementById("end-request-modal")
const closeModal = document.getElementById("close-modal")
const qtdItemsFooter = document.getElementById("cart-count")
const addressInputModal = document.getElementById("address")
const addressWarnModal = document.getElementById("address-warn")

let listCart = []

cartBtnFooter.addEventListener("click", function() {
    updateCart()
    modalView.style.display = "flex"
})

closeModal.addEventListener("click", function(){
    modalView.style.display = "none"
})

//close modal in click outside
modalView.addEventListener("click", function(event){
    if(event.target === modalView) modalView.style.display = "none"
})

menu.addEventListener("click", function(event){

    let parentBtn = event.target.closest(".add-to-cart-btn")

    if(parentBtn){
        const name = parentBtn.getAttribute("data-name")
        const price = parentBtn.getAttribute("data-price")

        addToCart(name, price)
    }
})

function addToCart (name, price) {
    //alert("nome: "+name+"\nvalor: "+price)

    const verifityItem = listCart.find(item => item.name == name)

    if(verifityItem){
        verifityItem.qtd += 1
    }else{
        listCart.push({
            name,
            price,
            qtd: 1
        })
    }

    updateCart()
}

//update cart
function updateCart (){
    cartItemsModal.innerHTML = "";
    let total = 0;

    listCart.forEach(item => {
        const cartElements = document.createElement("div");
        cartElements.classList.add("flex", "justify-between", "mt-4", "flex-col")

        cartElements.innerHTML = `
            <div class="flex items-center justify-between">
                <div>
                    <p class="font-medium">${item.name}</p>
                    <p>Qtd: ${item.qtd}</p>
                    <p class="font-medium mt-3">R$ ${item.price}</p>
                </div>

                <button>
                    Remover
                </button>
            </div>
            
        `
        total += item.qtd * item.price

        cartItemsModal.appendChild(cartElements)
    })
    ValueTotalModal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    qtdItemsFooter.innerHTML = listCart.length

}