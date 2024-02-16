import React, { useState, useEffect } from "react";
import "./productdetails.css";
import axios from "axios";

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products/1");
        setData(response.data);
        console.log(response, "ss");
        setSelectedImage(response.data.images[0]);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect will run once when the component mounts

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          {data.images.map((image) => (
            <img
              key={image}
              src={image}
              alt=""
              onClick={() => setSelectedImage(image)}
              onMouseEnter={() => setSelectedImage(image)}
            />
          ))}
        </div>
        <div className="productdisplay-img">
          <img
            className="productdisplay-main-img"
            onMouseEnter={() => setZoomLevel(zoomLevel + 0.1)}
            onMouseLeave={() => setZoomLevel(1)}
            src={selectedImage}
            alt=""
            style={{
              transform: `scale(${zoomLevel})`,
              cursor: "pointer",
            }}
          />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{data.brand}</h1>
        <h2>{data.title}</h2>
        <div className="productdisplay-right-star">
          <p>({data.rating})</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            -{data.discountPercentage}%
          </div>
          <div className="productdisplay-right-price-new">${data.price}</div>
        </div>
        <div className="productdisplay-right-description">
          {data.description}
        </div>
        <button onClick={() => addToCart(data.id)}>ADD TO CART</button>
        <p className="productdisplay-right-category">
          <span>Category :</span>
          {data.category}
        </p>
        <p className="productdisplay-right-category">
          <span>Tags :</span>
          Modern, Latest
        </p>
      </div>
    </div>
  );
}
