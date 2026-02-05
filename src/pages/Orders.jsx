export default function Orders() {
  return (
    <div className="orders-page">
      <h2>My Orders</h2>

      <div className="order-card">
        <h4>Order #QC12345</h4>
        <p>Status: Delivered</p>
        <p>Total: ₹79,900</p>
      </div>

      <div className="order-card">
        <h4>Order #QC12346</h4>
        <p>Status: In Transit</p>
        <p>Total: ₹1,14,900</p>
      </div>
    </div>
  );
}
