const allCards = document.querySelectorAll('.shop-item-button');
const appendElement = document.querySelector('.cart-items');
const purchaseBTN = document.querySelector('.btn-purchase');
allCards.forEach(function(singleCard){
singleCard.addEventListener('click',ADDTOCART)
})
function ADDTOCART(event){
  // console.log('item clicked');
 event.preventDefault();
 const currentELement = event.target;
 const container = currentELement.parentElement.parentElement;
//  console.log(container);
const  cartItemName = container.querySelector('.shop-item-title').innerText;
const  cartItemImage =container.querySelector('.shop-item-image').src;
const  cartItemPrice =container.querySelector('.shop-item-price').innerText;
const  cartText =document.querySelectorAll('.cart-item-title');
let existsElement= false;
if(cartText.length > 0){
cartText.forEach(function(singleItem){
if(singleItem.innerText == cartItemName){
  existsElement =true;
}
})
};
if(existsElement){
  alert('This item is already exists');
  return;
}
appendElement.innerHTML += `
<div class="cart-row">
<div class="cart-item cart-column">
    <img class="cart-item-image" src="${cartItemImage}" width="100" height="100">
    <span class="cart-item-title">${cartItemName}</span>
</div>
<span class=" cart-column">$ <span class="cart-price-item-price">${cartItemPrice}</span></span>
<div class="cart-quantity cart-column">
    <input class="cart-quantity-input" type="number" value="1">
    <button class="btn btn-danger btn-remove" type="button">REMOVE</button>
</div>
</div> 
`

bindFunctionOfRemove();
updateCart();
InputFeild();
};
function bindFunctionOfRemove(){
  const removeButtons =document.querySelectorAll('.btn-remove');
  removeButtons.forEach(function(eachButton){
       eachButton.addEventListener('click',removeCart);
  })
} 
function removeCart(event){
event.preventDefault;
// alert('ok')
const currentELement = event.target;
if(confirm('Are you sure??')){
   currentELement.parentElement.parentElement.remove();
   updateCart();
}
}
function updateCart(){
  const cartPrice = document.querySelectorAll('.cart-price-item-price');
  let cartTotal = 0;
  cartPrice.forEach(function(eachPrice){
     const  mainParent = eachPrice.parentElement.parentElement;
     const quantityInput = mainParent.querySelector('.cart-quantity-input');
     cartTotal += parseFloat(eachPrice.innerHTML)*quantityInput.value;

  });
  const totalShoping = document.querySelector('.cart-total-price');
  totalShoping.innerHTML = `$  ${cartTotal.toFixed(2)}`

};
function InputFeild(){
  const allcartInput = document.querySelectorAll('.cart-quantity-input');
  allcartInput.forEach(function(singleInput){
singleInput.addEventListener('change',WhenQuantityZero);
  })

}
function WhenQuantityZero(event){
   const currentELement  = event.target;
   if(currentELement.value  <= 0){
    currentELement.value = 1;
   }
   updateCart();
}
purchaseBTN.addEventListener('click',function(event){
event.preventDefault();
// alert('purchase button clicked');
appendElement.innerHTML = '';
updateCart();
alert('Items added to the cart');
})