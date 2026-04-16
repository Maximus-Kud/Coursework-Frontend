import { useState } from "react";
import { adminAddProduct, adminChangeAccountBalance, adminChangeOrderStatus, adminGetOrdersInShoppingCart, adminGetOrdersPurchased, adminGetUsers, marketplaceGetAvailableProducts } from "../services/api";
import type { ProductType } from "../types/ProductType";
import AdminProduct from "./products/AdminProduct";
import parseError from "../services/helper";
import type { OrderType } from "../types/OrderType";
import type { NotificationType } from "../types/Notification";

import '../css/AdminPanel.css'





type Props = {
  adminPanelIsOpen: boolean,

  adminPanelOpen: () => void,
  adminPanelClose: () => void,

  products: ProductType[],

  
  showInlineNotification: (newMessage: string, type?: NotificationType) => void,
  showToastNotification: (newMessage: string, type?: NotificationType) => void,
  showModalNotification: (newMessage: string, type?: NotificationType) => void,

  clearAllNotifications: () => void,


  onProductUpdated: () => void,
}

export type UserType = {
  id: number;
  userName: string;
  email?: string;
};

export type UsersListResponse = {
  admins: UserType[];
  customers: UserType[];
};





function AdminPanel(props: Props) {
  const [newName, setNewName] = useState<string>("");
  const [newPrice, setNewPrice] = useState<number>();
  const [newInStock, setNewInStock] = useState<number>();

  const [users, setUsers] = useState<UsersListResponse | null>(null);
  const [ordersInShoppingCart, setOrdersInShoppingCart] = useState<OrderType[]>([]);
  const [ordersPurchased, setOrdersPurchased] = useState<OrderType[]>([]);

  const [orderId, setOrderId] = useState<number | string>("");
  const [orderStatus, setOrderStatus] = useState<string>("");

  const [accountId, setAccountId] = useState<string>("");
  const [accountBalance, setAccountBalance] = useState<number | string>("");

  const [addProductWindowIsOpen, setAddProductWindowIsOpen] = useState(false);
  const [getUsersWindowIsOpen, setGetUsersWindowIsOpen] = useState(false);
  const [getOrdersInShoppingCartWindowIsOpen, setGetOrdersInShoppingCartWindowIsOpen] = useState(false);
  const [getOrdersPurchasedWindowIsOpen, setGetOrdersPurchasedWindowIsOpen] = useState(false);
  const [changeOrderStatusWindowIsOpen, setChangeOrderStatusWindowIsOpen] = useState(false);
  const [changeAccountBalanceWindowIsOpen, setChangeAccountBalanceWindowIsOpen] = useState(false);



  const handleCancel = (state: (close: boolean) => void) => {
    setNewName("");
    setNewPrice(undefined);
    setNewInStock(undefined);

    state(false);
  };



  const handleAddProduct = async () => {
    try {
      if (!newName || newPrice === undefined || newInStock === undefined) return;

      await adminAddProduct(newName, newPrice, newInStock);
      props.onProductUpdated();

      handleCancel(setAddProductWindowIsOpen);

      props.showToastNotification(`Added product ${newName} successfully`, 'success');
    }
    catch (e) {
      props.showModalNotification(parseError(e), 'error');
    }
  };


  const handleGetUsers = async () => {
    try {
      const usersData = await adminGetUsers();
      setUsers(usersData);
      setGetUsersWindowIsOpen(true);

      props.clearAllNotifications();
    }
    catch (e) {
      props.showModalNotification(parseError(e), 'error');
    }
  };


  const handleGetOrdersInShoppingCart = async () => {
    try {
      const orders = await adminGetOrdersInShoppingCart();
      setOrdersInShoppingCart(orders);
      setGetOrdersInShoppingCartWindowIsOpen(true);

      props.clearAllNotifications();
    }
    catch (e) {
      props.showModalNotification(parseError(e), 'error');
    }
  };


  const handleGetOrdersPurchased = async () => {
    try {
      const orders = await adminGetOrdersPurchased();
      setOrdersPurchased(orders);
      setGetOrdersPurchasedWindowIsOpen(true);

      props.clearAllNotifications();
    }
    catch (e) {
      props.showModalNotification(parseError(e), 'error');
    }
  };


  const handleChangeOrderStatus = async () => {
    try {
      if (!orderId || !orderStatus) return;
      await adminChangeOrderStatus(Number(orderId), orderStatus);
      
      setChangeOrderStatusWindowIsOpen(false);
      setOrderId("");
      setOrderStatus("");

      props.showToastNotification(`Successfully setted order ID: ${Number(orderId)} to ${orderStatus}`, 'success')
    }
    catch (e) {
      props.showModalNotification(parseError(e), 'error');
    }
  };


  const handleChangeAccountBalance = async () => {
    try {
      if (accountId === "" || accountBalance === "") return;

      await adminChangeAccountBalance(accountId, Number(accountBalance));
      
      setChangeAccountBalanceWindowIsOpen(false);
      setAccountId("");
      setAccountBalance("");

      props.showToastNotification(`Successfully changed account balance for ID: ${accountId} to ${Number(accountBalance)}`, 'success')
    }
    catch (e) {
      props.showModalNotification(parseError(e), 'error');
    }
  };


  const handleQuickChangeStatus = async (id: number, status: string) => {
    try {
      await adminChangeOrderStatus(id, status);
      
      await handleGetOrdersInShoppingCart();
      await handleGetOrdersPurchased();
      props.onProductUpdated();

      props.showToastNotification(`Order #${id} status changed to ${status}`, 'success');
    }
    catch (e) {
      props.showModalNotification(parseError(e), 'error');
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
        <div className="window">
          <div className="title">Add New Product</div>
          <input type="text" placeholder="Name" value={newName} onChange={e => setNewName(e.target.value)}></input>
          <input type="number" placeholder="Price" value={newPrice ?? ""} min={0} onChange={e => setNewPrice(e.target.value ? Number(e.target.value) : undefined)}></input>
          <input type="number" placeholder="In Stock" value={newInStock ?? ""} min={0} onChange={e => setNewInStock(Number(e.target.value))} ></input>
          <button onClick={() => handleCancel(setAddProductWindowIsOpen)}>Cancel</button>
          <button className="save-button" onClick={handleAddProduct}>Add</button>
        </div>
      )}


      {getUsersWindowIsOpen && users && (
        <div className="window">
          <div className="title">Users</div>
          <div>
            <>Admins:</>
            {users.admins?.map(u => <div key={u.id}>{u.userName} (ID: {u.id})</div>)}
            <br/>
            <>Customers:</>
            {users.customers?.map(u => <div key={u.id}>{u.userName} (ID: {u.id})</div>)}
          </div>
          <button onClick={() => setGetUsersWindowIsOpen(false)}>Close</button>
        </div>
      )}


      {getOrdersInShoppingCartWindowIsOpen && (
        <div className="window admin-orders-list">
          <div className="title">Orders in Shopping Cart</div>
          <div className="orders-container">
            {ordersInShoppingCart.length > 0 ? ordersInShoppingCart.map(order => (
              <div key={order.id} className="order-card">
                <div><span style={{fontFamily: 'Google-Sans-Medium'}}>Order ID:</span> {order.id}</div>
                <div><span style={{fontFamily: 'Google-Sans-Medium'}}>User ID:</span> {order.userId}</div>
                <div><span style={{fontFamily: 'Google-Sans-Medium'}}>Total:</span> {order.totalPrice} $</div>
                
                <div className="order-actions">
                  <button style={{marginBottom: '10px'}} className="approve-button" onClick={() => handleQuickChangeStatus(order.id, "Purchased")}>Approve (Purchase)</button>
                  <button className="cancel-button" onClick={() => handleQuickChangeStatus(order.id, "Cancelled")}>Cancel</button>
                </div>
              </div>
            )) : "No orders found."}
          </div>
          <button onClick={() => setGetOrdersInShoppingCartWindowIsOpen(false)}>Close</button>
        </div>
      )}


      {getOrdersPurchasedWindowIsOpen && (
        <div className="window">
          <div className="title">Orders Purchased</div>
          <div>{ordersPurchased.length > 0 ? ordersPurchased.map(order => (
            <div key={order.id}>Order #{order.id}</div>
          )) : "No purchased orders."}</div>
          <button onClick={() => setGetOrdersPurchasedWindowIsOpen(false)}>Close</button>
        </div>
      )}


      {changeOrderStatusWindowIsOpen && (
        <div className="window">
          <div className="title">Change Order Status</div>
          <input type="number" placeholder="Order ID" value={orderId} min={0} onChange={e => setOrderId(e.target.value ? Number(e.target.value) : "")}></input>
          <input type="text" placeholder="New Status" value={orderStatus} onChange={e => setOrderStatus(e.target.value)}></input>
          <button onClick={() => setChangeOrderStatusWindowIsOpen(false)}>Cancel</button>
          <button className="save-button" onClick={handleChangeOrderStatus}>Save</button>
        </div>
      )}


      {changeAccountBalanceWindowIsOpen && (
        <div className="window">
          <div className="title">Change Account Balance</div>
          <input type="number" placeholder="Account ID" value={accountId} onChange={e => setAccountId(e.target.value)}></input>
          <input type="number" placeholder="New Balance" value={accountBalance} min={0} onChange={e => setAccountBalance(e.target.value === "" ? "" : Number(e.target.value))}></input>
          <button onClick={() => setChangeAccountBalanceWindowIsOpen(false)}>Cancel</button>
          <button className="save-button" onClick={handleChangeAccountBalance}>Save</button>
        </div>
      )}


      <div id="product-section">
        {props.products.length > 0 ? (props.products.map(p => (
          <AdminProduct
            key={p.id}
            product={p}

            onProductUpdated={props.onProductUpdated}

            showToastNotification={props.showToastNotification}
          />
        ))) : <div>No products</div>}
      </div>

      <svg className='close-button' onClick={props.adminPanelClose} width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.293 5.293a1 1 0 0 1 1.414 0L12 10.586l5.293-5.293a1 1 0 1 1 1.414 1.414L13.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L10.586 12 5.293 6.707a1 1 0 0 1 0-1.414z" fill="#0D0D0D"/></svg>
    </div>
  )
}


export default AdminPanel;