import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetProductQuery } from '../redux/api';

function ProductDetail() {
  const { productId } = useParams();
  const { data: product, isLoading, isError } = useGetProductQuery(productId);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching product details</div>;

  return (
    <div>
      <Link to="/inventory">
        <button>Go Back to Inventory</button>
      </Link>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <img src={product.image} alt={product.title} />
    </div>
  );
}

export default ProductDetail;
