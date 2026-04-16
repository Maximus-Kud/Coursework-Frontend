import type { ProductType } from '../../types/ProductType'





type Props = {
  product: ProductType;
  addToCart: (product: ProductType) => void
};





function Product(props: Props) {
  return (
    <div className='product'>
      <img src={props.product.image}></img>
      <div className='product-name'>{props.product.name}</div>
      <div className='product-price'>{props.product.price} $</div>
      <div className='product-stock'>In Stock: {props.product.inStock}</div>
      <button className='buy-button' onClick={() => props.addToCart(props.product)}>To Shopping Cart</button>
    </div>
  )
}


export default Product;