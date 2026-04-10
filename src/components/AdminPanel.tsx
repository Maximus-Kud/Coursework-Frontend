import { useState } from "react";
import { adminAddProduct, adminChangeAccountBalance, adminChangeOrderStatus, adminGetOrdersInShoppingCart, adminGetOrdersPurchased, adminGetUsers, marketplaceGetAvailableProducts } from "../services/api";
import type { ProductType } from "../types/ProductType";
import AdminProduct from "./products/AdminProduct";
import Product from "./products/Product";
import parseError from "../services/helper";

type Props = {
  adminPanelIsOpen: boolean,

  adminPanelOpen: () => void,
  adminPanelClose: () => void,

  products: ProductType[],

  error: string,
  setError: (newError: string) => void,

  onProductUpdated: () => void,
}



function AdminPanel(props: Props) {
  const [newName, setNewName] = useState<string>("")
  const [newPrice, setNewPrice] = useState<number>();
  const [newInStock, setNewInStock] = useState<number>();

  const [users, setUsers] = useState<any[]>([]);
  const [ordersInShoppingCart, setOrdersInShoppingCart] = useState<any[]>([]);
  const [ordersPurchased, setOrdersPurchased] = useState<any[]>([]);

  const [orderId, setOrderId] = useState<number | string>("");
  const [orderStatus, setOrderStatus] = useState<string>("");

  const [accountId, setAccountId] = useState<number | string>("");
  const [accountBalance, setAccountBalance] = useState<number | string>("");

  const [addProductWindowIsOpen, setAddProductWindowIsOpen] = useState(false);
  const [getUsersWindowIsOpen, setGetUsersWindowIsOpen] = useState(false);
  const [getOrdersInShoppingCartWindowIsOpen, setGetOrdersInShoppingCartWindowIsOpen] = useState(false);
  const [getOrdersPurchasedWindowIsOpen, setGetOrdersPurchasedWindowIsOpen] = useState(false);
  const [changeOrderStatusWindowIsOpen, setChangeOrderStatusWindowIsOpen] = useState(false);
  const [changeAccountBalanceWindowIsOpen, setChangeAccountBalanceWindowIsOpen] = useState(false);



  const handleAddProduct = async () => {
    try {
      if (!newName || newPrice === undefined || newInStock === undefined) return;

      await adminAddProduct(newName, newPrice, newInStock);
      props.onProductUpdated();

      handleCancel(setAddProductWindowIsOpen);
    }
    catch (e) {
      props.setError(parseError(e));
    }
  };

  const handleCancel = (state: (close: boolean) => void) => {
    setNewName("");
    setNewPrice(undefined);
    setNewInStock(undefined);

    state(false);
  };

  const handleGetUsers = async () => {
    try {
      const usersData = await adminGetUsers();
      setUsers(usersData);
      setGetUsersWindowIsOpen(true);
    }
    catch (e) {
      props.setError(parseError(e))
    }
  };

  const handleGetOrdersInShoppingCart = async () => {
    try {
      const orders = await adminGetOrdersInShoppingCart();
      setOrdersInShoppingCart(orders);
      setGetOrdersInShoppingCartWindowIsOpen(true);
    }
    catch (e) {
      props.setError(parseError(e))
    }
  };

  const handleGetOrdersPurchased = async () => {
    try {
      const orders = await adminGetOrdersPurchased();
      setOrdersPurchased(orders);
      setGetOrdersPurchasedWindowIsOpen(true);
    }
    catch (e) {
      props.setError(parseError(e))
    }
  };

  const handleChangeOrderStatus = async () => {
    try {
      if (!orderId || !orderStatus) return;
      await adminChangeOrderStatus(Number(orderId), orderStatus);
      
      setChangeOrderStatusWindowIsOpen(false);
      setOrderId("");
      setOrderStatus("");
    }
    catch (e) {
      props.setError(parseError(e))
    }
  };

  const handleChangeAccountBalance = async () => {
    try {
      if (!accountId || accountBalance === "") return;
      await adminChangeAccountBalance(Number(accountId), Number(accountBalance));
      
      setChangeAccountBalanceWindowIsOpen(false);
      setAccountId("");
      setAccountBalance("");
    }
    catch (e) {
      props.setError(parseError(e))
    }
  };



  return (
    <div id="admin-panel">
      <div id="options-buttons">
        <button id="add-new-product" onClick={() => setAddProductWindowIsOpen(true)}>Add</button>
        <button className="option-button" onClick={handleGetUsers}>Get Users</button>
        <button className="option-button" onClick={handleGetOrdersInShoppingCart}>Get Orders In Shopping Cart</button>
        <button className="option-button" onClick={handleGetOrdersPurchased}>Get Orders Purchased</button>
        
        <button className="option-button" onClick={() => setChangeOrderStatusWindowIsOpen(true)}>Change Order Status</button>
        <button className="option-button" onClick={() => setChangeAccountBalanceWindowIsOpen(true)}>Change Account Balance</button>
      </div>

      {addProductWindowIsOpen && (
        <div className="type">
          <div className="title">Add New Product</div>
          <input type="text" placeholder="Name" value={newName} onChange={(e) => setNewName(e.target.value)}></input>
          <input type="number" placeholder="Price" value={newPrice} onChange={(e) => setNewPrice(e.target.value ? Number(e.target.value) : undefined)}></input>
          <input type="number" placeholder="In Stock" value={newInStock} onChange={(e) => setNewInStock(Number(e.target.value))} ></input>
          <button onClick={() => handleCancel(setAddProductWindowIsOpen)}>Cancel</button>
          <button className="save-button" onClick={handleAddProduct}>Add</button>
        </div>
      )}

      {getUsersWindowIsOpen && (
        <div className="type">
          <div className="title">Users</div>
          <div>{users.length > 0 ? users.map(user => (
            <div key={user.id}>{user.name}</div>
          )) : "No users found."}</div>
          <button onClick={() => setGetUsersWindowIsOpen(false)}>Close</button>
        </div>
      )}

      {getOrdersInShoppingCartWindowIsOpen && (
        <div className="type">
          <div className="title">Orders in Shopping Cart</div>
          <div>{ordersInShoppingCart.length > 0 ? ordersInShoppingCart.map(order => (
            <div key={order.id}>Order #{order.id}</div>
          )) : "No orders in shopping cart."}</div>
          <button onClick={() => setGetOrdersInShoppingCartWindowIsOpen(false)}>Close</button>
        </div>
      )}

      {getOrdersPurchasedWindowIsOpen && (
        <div className="type">
          <div className="title">Orders Purchased</div>
          <div>{ordersPurchased.length > 0 ? ordersPurchased.map(order => (
            <div key={order.id}>Order #{order.id}</div>
          )) : "No purchased orders."}</div>
          <button onClick={() => setGetOrdersPurchasedWindowIsOpen(false)}>Close</button>
        </div>
      )}

      {changeOrderStatusWindowIsOpen && (
        <div className="type">
          <div className="title">Change Order Status</div>
          <input type="number" placeholder="Order ID" value={orderId} onChange={(e) => setOrderId(e.target.value ? Number(e.target.value) : "")}></input>
          <input type="text" placeholder="New Status" value={orderStatus} onChange={(e) => setOrderStatus(e.target.value)}></input>
          <button onClick={() => setChangeOrderStatusWindowIsOpen(false)}>Cancel</button>
          <button className="save-button" onClick={handleChangeOrderStatus}>Save</button>
        </div>
      )}

      {changeAccountBalanceWindowIsOpen && (
        <div className="type">
          <div className="title">Change Account Balance</div>
          <input type="number" placeholder="Account ID" value={accountId} onChange={(e) => setAccountId(e.target.value ? Number(e.target.value) : "")}></input>
          <input type="number" placeholder="New Balance" value={accountBalance} onChange={(e) => setAccountBalance(e.target.value ? Number(e.target.value) : "")}></input>
          <button onClick={() => setChangeAccountBalanceWindowIsOpen(false)}>Cancel</button>
          <button className="save-button" onClick={handleChangeAccountBalance}>Save</button>
        </div>
      )}


      <div id="product-section">
        {props.products.length > 0 ? (props.products.map((p) => (
          <AdminProduct
            key={p.id}
            product={p}

            onProductUpdated={props.onProductUpdated}

            error={props.error}
            setError={props.setError}
          />
        ))) : <div>No products</div>}
      </div>

      <svg className='close-button' onClick={props.adminPanelClose} width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.293 5.293a1 1 0 0 1 1.414 0L12 10.586l5.293-5.293a1 1 0 1 1 1.414 1.414L13.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L10.586 12 5.293 6.707a1 1 0 0 1 0-1.414z" fill="#0D0D0D"/></svg>
    </div>
  )
}

export default AdminPanel;