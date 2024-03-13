import svelteWrapper from "JsComponents/svelte-wrapper";
import ProductRating from "SvelteComponents/product-rating.svelte";

export default () => {
    svelteWrapper(ProductRating, 'product-rating', '#product-card-rating-data')
}