/*
<figure className="store-item">
  <img src="assets/shoes/avory/1.jpg" alt="avery-shoe">
  <figcaption>
    <h4>Avery Shoe</h4>
    <p>price</p>
  </figcaption>
</figure>
*/

(function () {
    let store;
    fetch('./data/shoes.json')
        .then(res => res.json())
        .then(data => {
            store = [...data]
            
            const productElements = renderProducts(data);
            const products = addProductActions(productElements);
            const main = document.createElement('main');
            main.classList.add('flex-container')
            
            products.forEach(product=>{
                main.append(product)
            })
            
            document.querySelector('.store-front').appendChild(main)
        })
        .catch(error => console.log(error));

    function renderProducts(products) {
        return products.map((product) => {
            const {id, price, thumbnail, name} = {...product}

            const template = `<figure class="store-item" data-key="${id}">
                                <img src="assets/shoes/${name.toLowerCase()}/${thumbnail}" alt="${name}">
                                <figcaption>
                                  <h4>${name}</h4>
                                  <p>$${price / 100}</p>
                                </figcaption>
                              </figure>`;

            return document.createRange().createContextualFragment(template).children[0];
        })
    }
    
    function onRequestForInfo(e){
        const product = store.find(product=>{
            const key = Number(e.currentTarget.dataset.key);
            
            if (product.id === key){
                return product;
            }
        })
    }
    
    function addProductActions(products){
        return products.map(product => {
            product.addEventListener('click', onRequestForInfo);
            return product;
        });
    }
})()