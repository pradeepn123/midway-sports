<script>
	export let shopifyData;
	const { reviewCount = 0 } = shopifyData || {};
	var starRating = `
     <svg role="presentation" fill="none" focusable="false" width="15" height="15" class="product-rating__star-svg" viewBox="0 0 15 15">
        <path d="M7.5 0L9.58587 5.2731L15 5.72949L10.875 9.44483L12.1353 15L7.5 12.0231L2.86475 15L4.125 9.44483L0 5.72949L5.41414 5.2731L7.5 0Z" fill="#FFCF2A"></path>
      </svg>
      `;
</script>

{#if reviewCount}
	<div class="product-rating">
		<div class="product-rating__wrapper">
			<span class="product-rating__star-icon">{@html starRating}</span>
			<p class="product-rating__review-count">
				{reviewCount}
				{`review${reviewCount > 1 ? "s" : ""}`}
			</p>
		</div>
	</div>
{/if}
