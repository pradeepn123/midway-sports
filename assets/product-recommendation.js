
async function initProductRecommendation(selector) {
  const productId = selector.dataset.productId;
  const response = await fetch(
    `https://rebuyengine.com/api/v1/products/recommended?shopify_product_ids=${productId}&limit=5&key=3c31af894205d709aacd3e8da2ed30b19782df83`,
    {
      method: 'GET',
    }
  );
  const data = await response.json();

  //get custom recommended products section
  const recommendedSection = await fetch(window.location.pathname+ '?section_id=custom-product-recommendation').then(res=>res.text())
  const recommendationDOM = new DOMParser().parseFromString(recommendedSection, 'text/html');
  const recomSectionEl = recommendationDOM.querySelector(".section-stack");
  const productListEl = recomSectionEl.querySelector("product-list");

  data.data.forEach((product) => {
    var compareAtPrice = product.variants[0].compare_at_price;
    var price = product.variants[0].price;
    var discount = "";
    var customClass = "";
    var discountCustomClass = "";
    if(compareAtPrice === null || compareAtPrice === 'null' ){
      compareAtPrice = '';
      customClass = 'sale-badge-api';
    }
    else{
      discount = parseFloat(compareAtPrice) - parseFloat(price);
      compareAtPrice = `$${product.variants[0].compare_at_price} USD`;
      discount = parseFloat(discount).toFixed(2);
      discount = `Save $${discount}`;
      discountCustomClass = 'sale-price-custom';
    }

    const productcard = `
       <product-card
         handle="${product.handle}"
         class="product-card product-card--blends product-card--show-secondary-media bg-custom text-custom"
         style="--background: 255 255 255; --text-color: 26 26 26; opacity: 1; transform: translateY(0px);">
         <div class="product-card__badge-list"><on-sale-badge discount-mode="saving" class="badge badge--on-sale ${customClass}">${discount}</on-sale-badge></div>
         <div class="product-card__figure">
           <a
             href="${product.link}"
             data-instant=""> <img
               src="${product.image.src}"
               alt="${product.image.alt}"
               width="1024"
               height="768"
               loading="eager"
               sizes="(max-width: 699px) 74vw, (max-width: 999px) 38vw, calc(min(100vw - 96px, 1800px) / 4 - (24px / 4 * 3))"
               class="product-card__image product-card__image--primary  aspect-square"
             ><img
               src="${product.images[1].src}"
               alt="${product.images[1].alt}"
               width="1024"
               height="768"
               loading="eager"
               class="product-card__image product-card__image--secondary object-fill"
               fetchpriority="low"
               sizes="(max-width: 699px) 74vw, (max-width: 999px) 38vw, calc(min(100vw - 96px, 1800px) / 4 - (24px / 4 * 3))"
           ></a>
         </div>
         <div class="product-card__info ">
           <a href="/collections/vendors?q=${product.vendor}" class="text-xs link-faded">${product.vendor}</a>
           <div class="v-stack gap-0.5 w-full ">
             <span class="product-card__title"><a href='${product.link}' class='bold'>${product.title}</a></span
             ><price-list class="price-list  "
               ><sale-price class="text-subdued ${discountCustomClass}"> <span class="sr-only">Sale price</span>$${product.variants[0].price} USD</sale-price>
               <compare-at-price class="text-subdued line-through">
                   <span class="sr-only">Regular price</span>${compareAtPrice}</compare-at-price>
               </price-list
             >
           </div>
         </div>
       </product-card>`;
       productListEl.insertAdjacentHTML("beforeend", productcard);
  });
  document.querySelectorAll(".shopify-section--product-recommendations .section-stack")[1].innerHTML = recomSectionEl.innerHTML;
}

document.addEventListener('DOMContentLoaded', () => {
  (async () => {
    const selector = document.querySelector('[data-product-recommendation]');
    if (!selector) return;
    await initProductRecommendation(selector);
  })()
});