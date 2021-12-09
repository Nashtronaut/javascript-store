 (function(){
          // data dance
          let store;
        //   Create a cart in localstorage if one doesn't exist
          if(!localStorage.getItem('cart')){
              const temp = JSON.stringify([])
              localStorage.setItem('cart', temp)
           }

          updateCartCount()

          fetch('./data/shoes.json')
          .then(res=> res.json()) 
          .then(data=>{
              store = [...data]
              localStorage.setItem('store', JSON.stringify(store))
              const productElements = renderProducts( data)
              const products =  addProductActions(productElements)
            //   START TOMORROW BUGG FIX THE URL FOR THE IMAGE
              const main = document.createElement('main')
              products.forEach(product=>{
                   main.append(product)
              })

              document.querySelector('.page-header').after(main)

             
          })
          .catch(error=>console.log(error))

        function updateCartCount(){
           const cartItems =  JSON.parse(localStorage.getItem('cart'))
            
            document.querySelector('#cartCount').textContent = cartItems.length;
          
        }
         function renderProducts(products){
           const elements =   products.map((product) =>{
               const {id,price, thumbnail, name, short}  = product
    
               const template = `
                    <aside class="product" data-key=${id}>
                    <header class="name">
                    <h2>${name}</h2>
                    <p>$${price/100}</p>
                    </header>
                    
                    <div class="image">
                    
                        <img src="assets/shoes/${name.toLowerCase()}/${thumbnail}" alt="${name} shoes by jim hortons">
                    </div>
                
                         
                    </aside>
               `
                        return  document.createRange().createContextualFragment(template).children[0]
              })

               return elements
         }
         // click event handler for a product
         function onRequestForInfo(e){
             // store contains the product data
             // array.find() 
            const key = Number(e.currentTarget.dataset.key);
           const selected =  store.find(product=> product.id === key)          
            localStorage.setItem('product', JSON.stringify(selected))
            window.location.assign('product.html')
         }
         window.addEventListener('beforeunload',(e)=> e.preventDefault())

         function addProductActions(products){
             const elements = products.map(product=>{
                 product.addEventListener('click', onRequestForInfo)
                 return product
             })
               return elements
         }

      }
      )()