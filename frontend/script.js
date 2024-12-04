<script>
    // Function to fetch the related products from Myntra API
    async function fetchRelatedProducts(productId) {
        const url = `https://www.myntra.com/gateway/v2/product/${productId}/related`;
        
        try {
            const response = await fetch(url);
            
            // Check if the response is successful (status 200)
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }

            // Parse the response as JSON
            const data = await response.json();

            // Check if the response contains related products
            if (data && data.related && data.related.length > 0) {
                const productGrid = document.getElementById('product-grid');
                productGrid.innerHTML = '';  // Clear the existing content

                // Loop through each related product and create the product cards
                data.related[0].products.forEach(product => {
                    const productCard = document.createElement('div');
                    productCard.classList.add('product-card');

                    // Insert product image with dimensions replaced
                    const productImage = document.createElement('img');
                    productImage.src = product.defaultImage.src
                        .replace('$height', '400')
                        .replace('$width', '400')
                        .replace('$qualityPercentage', '90');
                    productCard.appendChild(productImage);

                    // Insert product name
                    const productName = document.createElement('div');
                    productName.classList.add('product-name');
                    productName.textContent = product.name;
                    productCard.appendChild(productName);

                    // Insert product price with formatted price
                    const productPrice = document.createElement('div');
                    productPrice.classList.add('product-price');
                    const discountedPrice = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(product.price.discounted);
                    const mrpPrice = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(product.price.mrp);
                    productPrice.innerHTML = `${discountedPrice} <span class="original-price">${mrpPrice}</span>`;
                    productCard.appendChild(productPrice);

                    // Insert product link
                    const productLink = document.createElement('a');
                    productLink.href = product.landingPageUrl;
                    productLink.textContent = 'Buy Now';
                    productCard.appendChild(productLink);

                    // Append the product card to the product grid
                    productGrid.appendChild(productCard);
                });
            } else {
                console.warn('No related products found.');
            }
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    }

    // Fetch related products for a specific product (example: 31602544)
    fetchRelatedProducts('31602544');
</script>
