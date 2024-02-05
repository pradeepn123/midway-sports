document.addEventListener('DOMContentLoaded', () => {
    let imageSelector = document.querySelectorAll('.app-wrapper #store-contents .grid__image-ratio')
    imageSelector.forEach(ele => {
        ele.classList.add('grid__image-ratio--square')
        if (ele.dataset.bgset) {
            let images = ele.dataset.bgset.split(',');
            if(images.length >= 3){
                let image = images[2].trim();
                ele.style.backgroundImage = `url("${image}")`;
            }
        } 
    });
    document.querySelector("cart-drawer")._onCartRefresh()
    document.querySelector('.app-wrapper.xs-app-wrapper .page-width.xs-store-front').setAttribute('style', 'max-width: unset !important;')
})


xs.updateCartCount = (params) => {
    document.querySelector("cart-drawer")._onCartRefresh().then(() => {
        document.querySelector("[data-no-instant]").click()
        const cartCount = document.querySelector('#cart-drawer .cart-drawer__top cart-count').innerHTML
        document.querySelectorAll("cart-count").forEach((el) => {
            el.itemCount = cartCount
        })
    })
  }
