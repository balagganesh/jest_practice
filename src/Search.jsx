import React, { useState, useEffect } from 'react';

const Search = () => {
  const [products, setProducts] = useState([]); // Store fetched products
  const [searchTerm, setSearchTerm] = useState(''); // Store search input
  const [filteredProducts, setFilteredProducts] = useState([]); // Store filtered products

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        setProducts(data.products); // Store fetched data (access data.products)
        setFilteredProducts(data.products); // Initialize filtered data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Filter products based on search term
  useEffect(() => {
    const results = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) // Use 'title' instead of 'name'
    );
    setFilteredProducts(results); // Update filtered products
  }, [searchTerm, products]);

  return (
    <div>
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Display Filtered Products */}
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>{product.title}</li> 
        ))}
      </ul>
    </div>
  );
};

export default Search;