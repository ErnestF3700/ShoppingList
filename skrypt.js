const shoppingList = [];

function addProduct() {
    const productInput = document.getElementById('productInput');
    const userInput = document.getElementById('userInput');
    const priceInput =document.getElementById('priceInput');
    const product = productInput.value.trim();
    const user = userInput.value.trim();
    const price = parseFloat(priceInput.value);

    if (product && user && !isNaN(price) && price >= 0) {
        const now = new Date();
        const formattedDate = now.toLocaleString();
        shoppingList.push({
            product,
            user,
            price,
            date: formattedDate
        });
        alert(`${product} dodano do listy przez ${user} (cena${price.toFixed(2)} zł)`);
        productInput.value = '';
        priceInput.value = '';
        showList();
    } else {
        alert("Podaj nazwę produktu, swoje imię i cenę.");
    }
    
}

function removeProductByindex(index){
    const removed = shoppingList.splice(index, 1)[0];
    alert(`${removed.product} usunięto z listy (dodane przez ${removed.user})`);
    showList();
}
   

function showList(){
    const list = document.getElementById('shoppingList');
    const totalPriceDisplay = document.getElementById('totalPrice');
    list.innerHTML='';

    let total = 0;

    if(shoppingList.length === 0){
        const li = document.createElement('li');
        li.textContent = 'Lista zakupów jest pusta';
        list.appendChild(li);
        totalPriceDisplay.textContent = 'Suma: 0.00zł';
    } else{
      shoppingList.forEach((item, index) => {
            const li = document.createElement('li');
           li.textContent = `${index + 1}. ${item.product} (dodane przez ${item.user}, ${item.date})`;
           list.appendChild(li);

           const removeBtn = document.createElement('button');
            removeBtn.textContent='Usuń';
            removeBtn.style.marginLeft = '10px';
            removeBtn.onclick =() => removeProductByindex(index);

            li.appendChild(removeBtn);
            list.appendChild(li);
           total +=item.price;
         });

         totalPriceDisplay.textContent= `Suma: ${total.toFixed(2)}zł`;
    }
}
