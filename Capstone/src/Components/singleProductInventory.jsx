import React from 'react';

function ProductDetail({ product }) {
  return (
    <div>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <img src={product.image} alt={product.title} />
      {}
    </div>
  );
}

export default ProductDetail;
