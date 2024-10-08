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

                <button class="remove-btn" data-name="${item.name}">
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

// function remove
cartItemsModal.addEventListener("click", function(event){
    if(event.target.classList.contains("remove-btn")){
        const nameVar = event.target.getAttribute("data-name")

        removeItem(nameVar)
    }
})

function removeItem(name){
    const index = listCart.findIndex(item => item.name === name) 

    if (index !== -1) {
    
        const item = listCart[index]

        if(item.qtd > 1){
            item.qtd -= 1
            updateCart()
            return
        }else{
            listCart.splice(index, 1)
            updateCart()
        }
    }
}

addressInputModal.addEventListener("input", function(event){
    let address = event.target.value

    if(address !== ""){
        addressWarnModal.classList.add("hidden")
        addressInputModal.classList.remove("border-red-600")
    }
})

// finalizar pedido
requestModal.addEventListener("click", function(event){
    
    const isOpen = checkOpen()
    if(!isOpen){
        Toastify({
            text: "Ops, serviço indisponível!",
            duration: 4000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
              background: "rgb(220 38 38)",
            },
        }).showToast();
        return
    }

    if(listCart.length === 0) return
    else if(addressInputModal.value === ""){
        addressWarnModal.classList.remove("hidden")
        addressInputModal.classList.add("border-red-600")
        return
    }

    const cartRequest = listCart.map((prod) => {
        return (
            `(${prod.name}, Qtd: ${prod.qtd}, Valor: ${prod.price}) | `
        )
    }).join("")

    const message = encodeURIComponent(cartRequest)
    const phone = "85996511130"

    window.open(`https://wa.me/${phone}?text=Meu pedido: ${message} - Meu endereço: ${addressInputModal.value}`, "_blank")

    listCart = []
    updateCart()
    addressInputModal.value = ""
    console.log(cartRequest)
})

function checkOpen(){
    const data = new Date()
    return data.getHours() <= 18 && data.getHours() < 22
}

const divDateOpen = document.getElementById("div-date-open")

if(checkOpen()) {
    divDateOpen.classList.remove("bg-red-600")
    divDateOpen.classList.add("bg-green-600")
}else{
    divDateOpen.classList.remove("bg-green-600")
    divDateOpen.classList.add("bg-red-600")
}