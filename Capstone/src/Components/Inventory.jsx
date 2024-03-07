import React, { useState, useEffect } from 'react';

function Inventory() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]); // State to track selected products

  useEffect(() => {
    // Function to fetch all products
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data); // Initialize filteredProducts with all products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []); 

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    filterProducts(e.target.value);
  };

  // Function to filter products based on search query
  const filterProducts = (query) => {
    const filtered = products.filter(product => {
      return product.title.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredProducts(filtered);
  };

  // Function to handle checkbox change
  const handleCheckboxChange = (productId) => {
    if (selectedProducts.includes(productId)) {
      // If the product is already selected, remove it
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      // If the product is not selected, add it
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  // Function to add selected products to cart
  const addToCart = () => {
    // Check if any products are selected
    if (selectedProducts.length > 0) {
      // Clear the selected products
      setSelectedProducts([]);
    }
  };

  return (
    <div>
      <h1>Inventory</h1>
      <input 
        type="text" 
        placeholder="Search products..." 
        value={searchQuery} 
        onChange={handleSearchChange} 
      />
      <ul>
        {filteredProducts.map(product => (
          <li key={product.id}>
            <input
              type="checkbox"
              id={`product_${product.id}`}
              checked={selectedProducts.includes(product.id)}
              onChange={() => handleCheckboxChange(product.id)}
            />
            <label htmlFor={`product_${product.id}`}>
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p>${product.price}</p>
            </label>
          </li>
        ))}
      </ul>
      <button onClick={addToCart} disabled={selectedProducts.length === 0}>Add Selected to Cart</button>
    </div>
  );
}

export default Inventory;