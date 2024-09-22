let productPrice: number = 20990;
let quantity: number = 1;

function decreaseQuantity(): void {
    const qtyInput = document.getElementById('quantity') as HTMLInputElement;
    quantity = parseInt(qtyInput.value);
    if (quantity > 1) {
        quantity--;
        qtyInput.value = quantity.toString();
        updatePrices();
    }
}

function increaseQuantity(): void {
    const qtyInput = document.getElementById('quantity') as HTMLInputElement;
    quantity = parseInt(qtyInput.value);
    quantity++;
    qtyInput.value = quantity.toString();
    updatePrices();
}

function updatePrices(): void {
    const priceElement = document.getElementById('price');
    const summaryPriceElement = document.getElementById('summaryPrice');
    const subtotalPriceElement = document.getElementById('subtotalPrice');

    const totalPrice = productPrice * quantity;
    priceElement!.innerText = `Rs. ${totalPrice}`;
    summaryPriceElement!.innerText = `Rs. ${totalPrice}`;
    subtotalPriceElement!.innerText = `Rs. ${totalPrice}`;
}

function removeItem(): void {
    alert("Item removed from cart");
  // Implement removal logic
}

function toggleDiscountCode(): void {
    const discountSection = document.getElementById('discountCodeSection');
    if (discountSection!.classList.contains('hidden')) {
        discountSection!.classList.remove('hidden');
    } else {
        discountSection!.classList.add('hidden');
    }
}

function applyDiscount(): void {
    const discountCode = (document.getElementById('discountCode') as HTMLInputElement).value;
    alert(`Discount code ${discountCode} applied!`);
  // Implement discount logic
}
