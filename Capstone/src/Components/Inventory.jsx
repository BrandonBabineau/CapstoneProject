import React, { useState, useEffect } from 'react';

function Inventory({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
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

  const filterProducts = (query) => {
    const filtered = products.filter(product => {
      return product.title.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredProducts(filtered);
  };

  const handleCheckboxChange = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const handleAddToCart = () => {
    const selectedProductsDetails = products.filter(product => selectedProducts.includes(product.id));
    addToCart(selectedProductsDetails); // Pass selected products details to addToCart function
    setSelectedProducts([]);
  };

  return (
    <div>
      <h1>Inventory</h1>
      <button onClick={handleAddToCart} disabled={selectedProducts.length === 0}>Add to Cart</button>
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
      <button onClick={handleAddToCart} disabled={selectedProducts.length === 0}>Add to Cart</button>
    </div>
  );
}

export default Inventory;
