import type { ProductType } from "../../types/ProductType";





type Props = {
  isLoggedIn: boolean,

  email: string,
  cartProducts: ProductType[],

  loginOpen: () => void,
  adminPanelOpen: () => void,
  settingsOpen: () => void,

  handleLogOut: () => void,
  toggleCart: () => void,
  openProfile: () => void,

  openLogs: () => void,
}





function AccountWindow (props: Props) {
  return (
    <div id='account-window'>
      {props.isLoggedIn ? <div id='account-email'>{props.email}</div> : <div id='login-button' onClick={props.loginOpen}>Login</div>}

      {props.isLoggedIn && props.email === "admin@email.com" && (
        <div id="admin-panel-button" onClick={props.adminPanelOpen}>Admin Panel</div>
      )}

      {props.isLoggedIn && props.email === "owner@email.com" && (
        <div id="logs-button" onClick={props.openLogs}>Logs</div>
      )}

      {props.isLoggedIn && (
        <div id="shopping-cart-button" onClick={props.toggleCart}>Shopping Cart ({props.cartProducts.length})</div>
      )}

      {props.isLoggedIn && (
        <div id='profile-button' onClick={props.openProfile}>Profile</div>
      )}

      <div id='settings-button' onClick={props.settingsOpen}>Settings</div>

      {props.isLoggedIn && <div id='log-out-button' onClick={props.handleLogOut}>Log out</div>}
    </div>
  )
}


export default AccountWindow;