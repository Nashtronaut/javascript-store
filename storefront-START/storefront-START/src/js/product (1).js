(function(){
      //  REFRESH
   if(!localStorage.getItem('cart')){
      window.location.assign('index.html')
       console.log("redirect back to the storefront")
   }
  
   const cartItems = JSON.parse(localStorage.getItem('cart')) 
   document.querySelector('#cartCount').textContent = cartItems.length
   const product = JSON.parse(localStorage.getItem('product')) 
   const productItem = productDisplay(product, sizesFormatter)
  //  add the event listeners
  // add to cart, checkout
   addListeners();

   document.querySelector('main').append(productItem)
  

  /* 
      Product Page Render Function
  */
function productDisplay(product, formatter){
    const {name, price, long, sizes, id, productShots, meta} = product
    const {reviews, rating, views} = meta
    
    const template = `
    <section class="product">    
       
        
    <ul class="product-shots">
      <li><img src="assets/shoes/${name.toLowerCase()}/${productShots[0]}" alt="${name}"></li>
      <li><img src="assets/shoes/${name.toLowerCase()}/${productShots[1]}" alt="${name}"></li>
      <li><img src="assets/shoes/${name.toLowerCase()}/${productShots[2]}" alt="${name}"></li>
      <li><img src="assets/shoes/${name.toLowerCase()}/${productShots[3]}" alt="${name}"></li>
    </ul>

  <div class="product-details">

   

    <header>
      <h2 class="name">${name}</h2>
      <p class="price">$${price/100}</p>
    </header>

      ${formatter(sizes)}

    <ul class="quantity">
      <li>quantity</li>
    </ul>

    
    <ul class="controls">
      <li><button data-key=${id} class="add-to-cart">add to cart</button></li>
      <li><button data-key=${id} class="checkout">checkout</button></li>
    </ul>

     
    <div class="description">
    <h3>Description</h3>
    <p>
    ${long}</p>
   </div>

     
    <footer>
      <ul class="meta-data">
        <li class="rating">rating: <span>${rating}</span></li>
        <li class="views">view: <span>${views}</span></li>
        <li class="reviews">reviews: <span>${reviews}</span></li>
      </ul>
    </footer>
  </div>

</section> 
    `
 
    return document.createRange().createContextualFragment(template).children[0]
}
 /* 
   Add Listener Function
 */
function addListeners(){
  productItem.querySelector('.add-to-cart').addEventListener('click',onAddToCart)
  productItem.querySelector('.checkout').addEventListener('click',onCheckout)
}

 /* 
   Add Listener Function
 */
   function removeListeners(){
    productItem.querySelector('.add-to-cart').removeEventListener('click',onAddToCart)
    productItem.querySelector('.checkout').removeEventListener('click',onCheckout)
  }
//   Add to cart event handler
function onAddToCart(e){
    // update the cart coutn
    
    const cartObj = {
       id:e.currentTarget.dataset.key,
       quantity:1,
    }
    console.log(cartItems)
    cartItems.push(cartObj)
    document.querySelector('#cartCount').textContent = cartItems.length
    localStorage.setItem('cart', JSON.stringify(cartItems))

}

function onCheckout(e){
   removeListeners()
   window.location.assign('checkout.html')
}

//formaterer
function sizesFormatter (sizes){
  let markup = `<ul class="sizes">`
  sizes.forEach(size=>{
    markup += `<li class="size">${size}</li>`
  })
  markup += `</ul>`
  return markup
}
// IFFY CLOSE
}
)()