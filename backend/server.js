// backend/server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Sample widget configuration data
const widgets = {
  "similar-products": {
    "type": "similar-products",
    "title": "Similar Products",
    "config": {
      "size": "large",
      "numItems": 5,
      "style": {
        "backgroundColor": "#fff",
        "border": "1px solid #e0e0e0",
        "padding": "10px"
      }
    },
    "apiEndpoint": "https://www.myntra.com/gateway/product/31602544/size/recommendation"
  },
  "customers-also-liked": {
    "type": "customers-also-liked",
    "title": "Customers Also Liked",
    "config": {
      "size": "medium",
      "numItems": 5,
      "style": {
        "backgroundColor": "#f9f9f9",
        "border": "1px solid #ccc",
        "padding": "8px"
      }
    },
    "apiEndpoint": "https://www.myntra.com/gateway/product/31602544/size/recommendation"
  }
};

// Proxy route for Myntra API (to avoid CORS issues)
app.get('/api/myntra/:productId', async (req, res) => {
  const productId = req.params.productId;
  const url = `https://www.myntra.com/gateway/v2/product//${productId}/related`;
  

  try {
    const response = await axios.get(url);
    res.json(response.data); // Send back the response from Myntra
  } catch (error) {
    console.error("Error fetching from Myntra API", error);
    res.status(500).send("Error fetching data from Myntra API");
  }
});

// Endpoint to get widget configurations
app.get('/api/widget/:type', (req, res) => {
  const widgetType = req.params.type;
  if (widgets[widgetType]) {
    res.json(widgets[widgetType]);
  } else {
    res.status(404).send('Widget not found');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
