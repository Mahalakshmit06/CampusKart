/* ==========================
CAMPUSKART FINAL ENGINE
========================== */



let cart =
JSON.parse(
localStorage.getItem("campuskartCart")
) || [];



let wishlist =
JSON.parse(
localStorage.getItem("campuskartWishlist")
) || [];





function saveCart(){

localStorage.setItem(
"campuskartCart",
JSON.stringify(cart)
);

updateCartCount();

}



function saveWishlist(){

localStorage.setItem(
"campuskartWishlist",
JSON.stringify(wishlist)
);

}





/* ----------------
CART
---------------- */

function addToCart(product){

if(!product)return;



const found=

cart.find(

p=>

p.name===product.name

);



if(found){

found.qty++;

}

else{

cart.push({

...product,

qty:1

});

}



saveCart();

showToast(
"Added to Cart 🛒"
);

}





function removeFromCart(index){

cart.splice(
index,
1
);

saveCart();

renderCart();

}





function changeQty(index,value){

cart[index].qty+=value;



if(
cart[index].qty<=0
){

removeFromCart(index);

return;

}



saveCart();

renderCart();

}





function updateCartCount(){

const count=

document.getElementById(
"cartCount"
);



if(!count)
return;



count.innerText=

cart.reduce(

(sum,item)=>

sum+item.qty,

0

);

}





/* ----------------
WISHLIST
---------------- */

function addToWishlist(product){

if(!product)
return;



const exists=

wishlist.some(

p=>

p.name===product.name

);



if(exists){

showToast(
"Already Added"
);

return;

}



wishlist.push(product);

saveWishlist();

showToast(
"Added to Wishlist ❤️"
);

}





function removeWishlist(index){

wishlist.splice(
index,
1
);

saveWishlist();

renderWishlist();

}





/* ----------------
RENDER CART
---------------- */

function renderCart(){

const area=

document.getElementById(
"cartItems"
);



const total=

document.getElementById(
"totalAmount"
);



if(!area)
return;



if(
cart.length===0
){

area.innerHTML=

`
<h2>

Cart Empty

</h2>
`;



if(total)
total.innerText=0;

return;

}



area.innerHTML="";



let final=0;



cart.forEach(

(item,index)=>{

final+=
item.price*
item.qty;



area.innerHTML+=

`

<div class="cart-item">

<img
src="${item.img}">



<div>

<h3>

${item.name}

</h3>



<p>

₹${item.price}

</p>



<div class="qty">

<button
onclick="
changeQty(
${index},
-1
)
">

−

</button>



<span>

${item.qty}

</span>



<button
onclick="
changeQty(
${index},
1
)
">

+

</button>

</div>

</div>



<button
class="secondary-btn"

onclick="
removeFromCart(
${index}
)
">

Remove

</button>

</div>

`;

}

);



if(total){

total.innerText=
final;

}

}





/* ----------------
RENDER WISHLIST
---------------- */

function renderWishlist(){

const area=

document.getElementById(
"wishlistItems"
);



if(!area)
return;



if(
wishlist.length===0
){

area.innerHTML=

`

<h2>

No products added

</h2>

`;

return;

}



area.innerHTML="";



wishlist.forEach(

(item,index)=>{

area.innerHTML+=

`

<div
class="product-card">

<img
src="${item.img}">



<h3>

${item.name}

</h3>



<p>

₹${item.price}

</p>



<div
class="product-actions">

<button
class="primary-btn"

onclick='moveToCart(${index})'>

Move To Cart

</button>



<button
class="secondary-btn"

onclick='removeWishlist(${index})'>

Remove

</button>

</div>

</div>

`;

}

);

}





function moveToCart(index){

addToCart(

wishlist[index]

);



wishlist.splice(
index,
1
);



saveWishlist();

renderWishlist();

}





/* ----------------
SEARCH
---------------- */

function openSearch(){

window.location.href=
"products.html";

}





/* ----------------
TOAST
---------------- */

function showToast(text){

const toast=

document.createElement(
"div"
);



toast.innerHTML=
text;



toast.style=`

position:fixed;
top:100px;
right:20px;

background:#a855f7;

color:white;

padding:15px;

border-radius:12px;

z-index:9999;

`;



document.body.appendChild(
toast
);



setTimeout(

()=>{

toast.remove();

},

1800

);

}





window.onload=()=>{

updateCartCount();

renderCart();

renderWishlist();

};