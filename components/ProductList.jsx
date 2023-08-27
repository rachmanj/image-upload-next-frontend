"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:5000/products");
    setProducts(response.data);
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      getProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <Link href="/add" className="button is-success">
        Add Product
      </Link>

      <div className="columns is-multiline mt-2">
        {products.map((product) => (
          <div className="column is-one-quarter" key={product.id}>
            <div className="card">
              <div className="card-image">
                <figure className="image is-4by3">
                  <Image
                    src={product.url}
                    alt="Placeholder image"
                    width={300}
                    height={300}
                  />
                </figure>
              </div>
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-4">{product.name}</p>
                  </div>
                </div>
              </div>

              <footer className="card-footer">
                <Link href={`/edit/${product.id}`} className="card-footer-item">
                  Edit
                </Link>
                <a
                  className="card-footer-item"
                  onClick={() => deleteProduct(product.id)}
                >
                  Delete
                </a>
              </footer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
