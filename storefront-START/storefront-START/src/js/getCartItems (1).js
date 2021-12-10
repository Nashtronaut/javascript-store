
function getCartItems(cartItems=[]){
 
        // unique prodoucts
         const ids = cartItems.map(item=>item.id)
   
        //   new Set() conver the set to an array
        const keys =  [ ...new Set(ids)  ]
        
        // [{id, quanity}]
        const checkoutItems = keys.reduce((checkout, key)=>{
          
          const items = cartItems.filter(product=> product.id === key)

           //this is the quantity total in the items array
           let sum=0;
           items.forEach(item=>{
               sum += item.quantity
           })
          
            checkout.push({id:key, quantity:sum})
            return checkout
          
  
        }, [])
   
       
  
     

    return checkoutItems
}

export {getCartItems}