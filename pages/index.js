import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto">
      <div className="mb-4">
        <input type="text" placeholder="Search" className="border border-gray-400 rounded px-4 py-2" />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(product => (
          <div key={product.productName} className="border border-gray-300 rounded p-4">
            <h2 className="text-lg font-bold mb-2">{product.productName}</h2>
            <p>Price: ${product.price}</p>
            <p>Rating: {product.rating}</p>
            <p>Discount: {product.discount}%</p>
            <p>Availability: {product.availability}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-4">

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Previous</button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">Next</button>
      </div>
    </div>
  );
};

export default AllProducts;
