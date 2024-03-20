import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetProductQuery } from '../redux/api';
import './CSS/inventory.css';

/// update add to cart to not see unless logged in 

function Inventory({ addToCart, token }) {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [sortBy, setSortBy] = useState('');

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
    addToCart(selectedProductsDetails);
    setSelectedProducts([]);
    window.alert('Item Added to Cart'); // Alert immediately after adding the item to the cart
  };
  

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    sortProducts(e.target.value);
  };

  const sortProducts = (sortBy) => {
    if (sortBy === 'lowToHigh') {
      const sortedProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
      setFilteredProducts(sortedProducts);
    } else if (sortBy === 'highToLow') {
      const sortedProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
      setFilteredProducts(sortedProducts);
    } else if (sortBy === 'category') {
      const sortedProducts = [...filteredProducts].sort((a, b) => a.category.localeCompare(b.category));
      setFilteredProducts(sortedProducts);
    } else if (sortBy === 'ascendingID') {
      const sortedProducts = [...filteredProducts].sort((a, b) => a.id - b.id);
      setFilteredProducts(sortedProducts);
    } else if (sortBy === 'descendingID') {
      const sortedProducts = [...filteredProducts].sort((a, b) => b.id - a.id);
      setFilteredProducts(sortedProducts);
    }
  };

  return (
    <div>
      <h1>Inventory</h1>
      {token && <button onClick={handleAddToCart} disabled={selectedProducts.length === 0}>Add to Cart</button>}
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <select value={sortBy} onChange={handleSortChange}>
        <option value="">Sort by</option>
        <option value="lowToHigh">Price: Low to High</option>
        <option value="highToLow">Price: High to Low</option>
        <option value="category">Category</option>
        <option value="ascendingID">ID: Ascending</option>
        <option value="descendingID">ID: Descending</option>
      </select>
      <div className="inventory-container">
        {filteredProducts.map(product => (
          <div className="product-card" key={product.id}>
            <input
              type="checkbox"
              id={`product_${product.id}`}
              checked={selectedProducts.includes(product.id)}
              onChange={() => handleCheckboxChange(product.id)}
            />
            <label htmlFor={`product_${product.id}`}>
              <h4>{product.id}</h4>
              <h3>{product.title}</h3>
              <p>${product.price.toFixed(2)}</p> {}
              <p>{product.category}</p>
              <img src={product.image} alt={product.title} />
            </label>
            <div className="view-details-button">
              <Link to={`/product/${product.id}`}>
                <button>View More Details</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      {token && <button onClick={handleAddToCart} disabled={selectedProducts.length === 0}>Add to Cart</button>}
    </div>
  );
}

export default Inventory;
