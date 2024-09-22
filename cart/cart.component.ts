import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

public productPrice: number = 20990;
public quantity: number = 1;
public total = 0;
public unitPrice =0;
public discount:number = 0; 
public discountTotal = 0;


public increment():void{
  this.quantity++;
}
public decrement():void{
  this.quantity--;
}




public removeItem(): void {
    alert("Item removed from cart");
  // Implement removal logic
}

public getTotalButtonClick():void{
  this.total = this.productPrice * this.quantity;
}


public applyDiscount(): void {
  this.discountTotal = this.total- this.productPrice * this.discount / 100;
   // alert(`Discount code applied!`);
  // Implement discount logic
}

public checkout(): void{
  alert(`Order Place Sucessfully`);
  
}
}
