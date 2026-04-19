import { marketplaceOrder } from '../services/api';
import type { NotificationType } from '../types/Notification';
import type { ProductType } from '../types/ProductType';
import ShoppingCartProduct from './products/ShoppingCartProduct';





type Props = {
  products: ProductType[],
  clearCart: () => void,

  onOrderSuccess?: () => void,
  
  shoppingCartIsOpen: boolean,

  shoppingCartOpen: () => void,
  shoppingCartClose: () => void,

  showToastNotification: (newMessage: string, type?: NotificationType) => void,
  showModalNotification: (newMessage: string, type?: NotificationType) => void,
}





function ShoppingCart(props: Props) {
  const totalPrice = props.products.reduce((sum, product) => {
    return sum + product.price;
  }, 0);

  const handlePay = async () => {
    if (props.products.length === 0) return;

    try {
      const productIds = props.products.map(p => p.id);
      const response = await marketplaceOrder(productIds);
      
      props.showToastNotification(`Order #${response.orderId} placed successfully!`, 'success');
      
      props.clearCart();
      if (props.onOrderSuccess) props.onOrderSuccess();
      props.shoppingCartClose();
    }
    catch (error) {
      props.showModalNotification('Failed to place order', 'error');
    }
  };


  return (
    <div className="modal-overlay">
      <div id="shopping-cart">
        <div id='title'>Shopping Cart</div>

        <div id="product-section">
          {props.products.length > 0 ? (props.products.map((p, index) => (
            <ShoppingCartProduct
              key={`${p.id}-${index}`}
              product={p}
            />
          ))) : <div>No products</div>}
        </div>

        {props.products.length > 0 && (
          <>
            <div id="total-price">Total: {totalPrice} $</div>

            <button id='pay-button' onClick={handlePay} disabled={props.products.length === 0}>Pay</button>
          </>
        )}


        <svg className='close-button' onClick={props.shoppingCartClose} width="800px" height="800px" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5.293 5.293a1 1 0 0 1 1.414 0L12 10.586l5.293-5.293a1 1 0 1 1 1.414 1.414L13.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L10.586 12 5.293 6.707a1 1 0 0 1 0-1.414z" /></svg>
      </div>
    </div>
  )
}


export default ShoppingCart;