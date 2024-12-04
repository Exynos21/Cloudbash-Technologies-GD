// frontend/script.js

// Fetch widget configuration based on widget type
async function fetchWidgetConfig(widgetType) {
    try {
      const response = await fetch(`http://localhost:3000/api/widget/${widgetType}`);
      const config = await response.json();
      return config; // Return the widget configuration
    } catch (error) {
      console.error('Error fetching widget config:', error);
      return null;
    }
  }
  
  async function fetchProductRecommendations(productId) {
    try {
      const response = await fetch(`http://localhost:3000/api/myntra/${productId}`);
      const productData = await response.json();
      return productData;
    } catch (error) {
      console.error('Error fetching product data:', error);
      return null;
    }
  }
  
  function displayProductWidget(config, productData) {
    const widgetContainer = document.getElementById('widget-container');
    
    const widgetTitle = document.createElement('div');
    widgetTitle.classList.add('widget-title');
    widgetTitle.textContent = config.title;
    
    const widgetSettings = document.createElement('div');
    widgetSettings.classList.add('widget-settings');
    widgetSettings.innerHTML = `
      <div>Size: ${config.config.size}</div>
      <div>Items: ${config.config.numItems}</div>
    `;
    
    const widget = document.createElement('div');
    widget.classList.add('widget');
    widget.appendChild(widgetTitle);
    widget.appendChild(widgetSettings);
    
    // Display fetched product data
    const itemsContainer = document.createElement('div');
    productData.products.forEach(product => {
      const itemElement = document.createElement('div');
      itemElement.classList.add('widget-item');
      itemElement.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <div>${product.title}</div>
        <div>₹${product.price}</div>
      `;
      itemsContainer.appendChild(itemElement);
    });
    
    widget.appendChild(itemsContainer);
    widgetContainer.appendChild(widget);
  }
  
  async function init() {
    const widgetType = 'similar-products'; // Set this dynamically based on user's choice
    const widgetConfig = await fetchWidgetConfig(widgetType);
  
    if (widgetConfig) {
      const productId = 31602544; // Example product ID
      const productData = await fetchProductRecommendations(productId);
      
      if (productData) {
        displayProductWidget(widgetConfig, productData);
      } else {
        console.error('Failed to fetch product data');
      }
    } else {
      console.error('Widget configuration not found');
    }
  }
  
  document.addEventListener('DOMContentLoaded', init);
  
  // Handle customization form submission
  async function applyCustomization(event) {
    event.preventDefault();
  
    const numItems = document.getElementById('numItems').value;
    const bgColor = document.getElementById('bgColor').value;
  
    // Apply the customization to the widget config
    const widgetConfig = await fetchWidgetConfig('similar-products');
    widgetConfig.config.numItems = numItems;
    widgetConfig.config.style.backgroundColor = bgColor;
  
    const productId = 31602544; // Example product ID
    const productData = await fetchProductRecommendations(productId);
    
    if (productData) {
      displayProductWidget(widgetConfig, productData);
    } else {
      console.error('Failed to fetch product data');
    }
  }
  
  // Listen for form submission
  document.getElementById('widget-customization-form').addEventListener('submit', applyCustomization);
  