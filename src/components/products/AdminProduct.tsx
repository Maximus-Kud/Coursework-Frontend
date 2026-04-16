import { useState } from "react";
import type { ProductType } from "../../types/ProductType";
import { adminDeleteProduct, adminUpdateProduct } from "../../services/api";
import parseError from "../../services/helper";





type Props = {
  product: ProductType;
  onProductUpdated?: () => void,

  showToastNotification: (newNotification: string) => void,
};





function AdminProduct(props: Props) {
  const [isEditWindowOpen, setIsEditWindowOpen] = useState(false);
  const [editType, setEditType] = useState<"update" | "delete" | null>(null);

  const [name, setName] = useState(props.product.name);
  const [price, setPrice] = useState(props.product.price);
  const [inStock, setInStock] = useState(props.product.inStock);
  const [isAvailable, setIsAvailable] = useState(props.product.isAvailable);

  const openWindow = (type: "update" | "delete") => {
    setEditType(type);
    setIsEditWindowOpen(true);
  };

  const closeWindow = () => {
    setIsEditWindowOpen(false);
    setEditType(null);
  };


  const handleUpdate = async () => {
    try {
      await adminUpdateProduct(name, price, inStock, isAvailable, props.product.id);
      if (props.onProductUpdated) props.onProductUpdated();
      closeWindow();

      props.showToastNotification(`Successfully updated product #${props.product.id}`)
    }
    catch (e: any) {
      props.showToastNotification(parseError(e));
    }
  };

  const handleDelete = async () => {
    try {
      await adminDeleteProduct(props.product.id);
      if (props.onProductUpdated) props.onProductUpdated();
      closeWindow();

      props.showToastNotification(`Deleted product #${props.product.id} successfully`);
    }
    catch (e) {
      props.showToastNotification(parseError(e));
    }
  };


  
  return (
    <div className="admin-product">
      <div className="admin-product-info">
        <img></img>
        <div className="admin-product-name">{props.product.name}</div>
        <div className='admin-product-price'>{props.product.price} $</div>
        <div className='admin-product-stock'>In Stock: {props.product.inStock}</div>
        <div className='admin-is-available'>Is Available: {props.product.isAvailable}</div>
      </div>

      <div className="admin-product-actions">
        <button className="update-button" onClick={() => openWindow('update')}>Update Product</button>
        <button className="delete-button" onClick={() => openWindow('delete')}>Delete Product</button>
      </div>


      {isEditWindowOpen && editType === "update" && (
        <div className="type">
          <div className="title">Update Product</div>
          <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)}></input>
          <input type="number" placeholder="Price" value={price} onChange={e => setPrice(Number(e.target.value))}></input>
          <input type="number" placeholder="In Stock" value={inStock} onChange={e => setInStock(Number(e.target.value))} ></input>
          <label>
            Available:
            <input type="checkbox" checked={isAvailable} onChange={e => setIsAvailable(e.target.checked)}></input>
          </label>
          <button onClick={closeWindow}>Cancel</button>
          <button className="save-button" onClick={handleUpdate}>Save</button>
        </div>
      )}

      {isEditWindowOpen && editType === "delete" && (
        <div className="type">
          <div>Delete Product</div>
          <div>Are you sure you want to delete "{props.product.name}"?</div>
          <button onClick={closeWindow}>Cancel</button>
          <button className="delete" onClick={handleDelete}>Yes, Delete</button>
        </div>
      )}
    </div>
  )
}


export default AdminProduct;