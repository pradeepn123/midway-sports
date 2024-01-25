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
})

xs.updateCartCount = (params) => {
    document.querySelector("cart-drawer")._onCartRefresh().then(() => {
        document.querySelector("[data-no-instant]").click()
    })
  }
