export default function AddProduct() {
  return (
    <div className="admin">
      <h2>Add Product</h2>
      <input placeholder="Product Name" />
      <input placeholder="Price" />
      <input placeholder="Image URL" />
      <textarea placeholder="Description" />
      <button>Add</button>
    </div>
  );
}
