import type { ProductType } from "../../types/ProductType";


type Props = {
  product: ProductType;
  onProductUpdated?: () => void,
};


function ShoppingCartProduct(props: Props) {  
  return (
    <div className="shopping-cart-product">
      <img></img>
      <div className="admin-product-name">{props.product.name}</div>
      <div className='admin-product-price'>{props.product.price} $</div>
      <div className='admin-product-stock'>In Stock: {props.product.inStock}</div>
      <div className='admin-is-available'>Is Available: {props.product.isAvailable}</div>
    </div>
  )
}

export default ShoppingCartProduct;