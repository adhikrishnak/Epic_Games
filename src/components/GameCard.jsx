import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <img src={product.image} alt={product.name} />
      <h4>{product.name}</h4>
      <p className="price">₹{product.price.toLocaleString()}</p>
    </div>
  );
}
