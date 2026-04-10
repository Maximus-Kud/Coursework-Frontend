import React, { useEffect, useState } from "react";
import { authenticationLogin, authenticationRegister } from "../services/api";
import parseError from "../services/helper";
import ShoppingCart from "./ShoppingCart";
import type { ProductType } from "../types/ProductType";

type Props = {
  setActiveTheme: (newTheme: string) => void,

  cartProducts: ProductType[],
  setCartProducts: React.Dispatch<React.SetStateAction<ProductType[]>>,

  error: string,
  setError: (newError: string) => void,

  isLoggedIn: boolean,
  setIsLoggedIn: (loggedIn: boolean) => void,

  username: string,
  setUsername: (newUsername: string) => void,
  
  email: string,
  setEmail: (newEmail: string) => void,

  password: string,
  setPassword: (newPassword: string) => void,

  loginWindowIsOpen: boolean,
  registerWindowIsOpen: boolean,
  settingsWindowIsOpen: boolean,

  loginOpen: () => void,
  registerOpen: () => void,
  settingsOpen: () => void,
  adminPanelOpen: () => void,

  loginClose: () => void,
  registerClose: () => void,
  settingsClose: () => void,
}



function TopMenu(props: Props) {
  const [accountWindowIsOpen, setAccountWindowIsOpen] = useState(false);
  const [currentSettingsSection, setCurrentSettingsSection] = useState('');

  const [shoppingCartIsOpen, setShoppingCartIsOpen] = useState(false);


  const handleRegister = async () => {
    try {
      const result = await authenticationRegister({
        username: props.username,
        email: props.email,
        password: props.password,
      });

      console.log(result);
      props.registerClose();
      props.setError("");
    }
    catch (e: any) {
      props.setError(parseError(e));
    }
  };

  const handleLogin = async () => {
    try {
      const result = await authenticationLogin({
        username: props.username,
        email: props.email,
        password: props.password,
      });

      console.log(result);
      props.loginClose();
      props.setIsLoggedIn(true);
      props.setError("");
    }
    catch (e: any) {
      props.setError(parseError(e));
    }
  }

  const handleLogOut = async () => {
    try {
      props.setEmail("");
      props.setIsLoggedIn(false);
      props.setError("");

      props.loginClose();
      props.registerClose();
      props.settingsClose();
    }
    catch (e: any) {
      props.setError(parseError(e));
    }
  }


  return (
    <div id='top-menu'>
      <div id='catalog'>
        <svg viewBox="0 0 32 32" fill="#1a1a1a" className="icon-component MainMenu_icon__s2UM2" plerdy-tracking-id="50176636401">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M3 9a1 1 0 0 1 1-1h24a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1Zm0 7a1 1 0 0 1 1-1h24a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1Zm1 6a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2H4Z"></path>
        </svg>

        <div>Catalog</div>
      </div>

      <div id='search'>
        <input type='text' placeholder='Search...' id='search-input'></input>
      </div>

      <div id='account' onClick={() => setAccountWindowIsOpen(prev => !prev)}>
        <svg viewBox="0 0 24 24" fill="#1a1a1a" className="icon-component HeaderActionButton_icon__LvO6T" plerdy-tracking-id="91984000901">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M9 7.5C9 5.84315 10.3431 4.5 12 4.5C12.7956 4.5 13.5587 4.81607 14.1213 5.37868C14.6839 5.94129 15 6.70435 15 7.5C15 9.15685 13.6569 10.5 12 10.5C10.3431 10.5 9 9.15685 9 7.5ZM12 3C9.51472 3 7.5 5.01472 7.5 7.5C7.5 9.98528 9.51472 12 12 12C14.4853 12 16.5 9.98528 16.5 7.5C16.5 6.30653 16.0259 5.16193 15.182 4.31802C14.3381 3.47411 13.1935 3 12 3ZM9.2132 13.5C9.19997 13.5 9.18674 13.5003 9.17354 13.501C7.23043 13.6039 5.53969 14.8631 4.77431 16.7062C4.24308 17.8382 4.52994 18.9573 5.2251 19.7493C5.90426 20.5232 6.9728 21 8.09835 21H15.9011C17.0271 21 18.096 20.5233 18.7752 19.7493C19.4705 18.9571 19.757 17.8379 19.2251 16.706C18.4597 14.8631 16.769 13.6039 14.826 13.501C14.8127 13.5003 14.7995 13.5 14.7863 13.5H9.2132ZM6.15399 17.2951C6.70851 15.9459 7.91058 15.0776 9.23405 15H14.7654C16.0889 15.0776 17.291 15.9459 17.8455 17.2951C17.8508 17.3081 17.8565 17.3209 17.8626 17.3336C18.1146 17.8606 18.0049 18.353 17.6479 18.7599C17.2708 19.1895 16.6224 19.5 15.9011 19.5H8.09835C7.37782 19.5 6.72966 19.1896 6.35248 18.7599C5.99525 18.3529 5.88542 17.8602 6.13709 17.3332C6.14307 17.3207 6.14871 17.308 6.15399 17.2951Z" fill="#1a1a1a"></path>
        </svg>

        {accountWindowIsOpen &&
          <div id='account-window'>
            {props.isLoggedIn ? <div id='account-email'>{props.email}</div> : <div id='login-button' onClick={props.loginOpen}>Login</div>}

            {props.isLoggedIn && props.email === "admin@email.com" && (
              <div id="admin-panel-button" onClick={props.adminPanelOpen}>Admin Panel</div>
            )}

            {props.isLoggedIn && (
              <div id="shopping-cart-button" onClick={() => setShoppingCartIsOpen((prev) => !prev)}>Shopping Cart ({props.cartProducts.length})</div>
            )}

            <div id='profile-button'>Profile</div>
            <div id='settings-button' onClick={props.settingsOpen}>Settings</div>

            {props.isLoggedIn && <div id='log-out-button' onClick={handleLogOut}>Log out</div>}
          </div>
        }
      </div>

      {shoppingCartIsOpen && (
        <ShoppingCart
          products={props.cartProducts}
          clearCart={() => props.setCartProducts([])}

          shoppingCartIsOpen={shoppingCartIsOpen}
          shoppingCartOpen={() => setShoppingCartIsOpen(true)}
          shoppingCartClose={() => setShoppingCartIsOpen(false)}
        />
      )}


      {props.loginWindowIsOpen && (
        <div className='login-window'>
          <div style={{fontFamily: 'Google-Sans-Bold', fontSize: '30px'}}>Login</div>
          
          <div className='login-inputs'>
            <input type='text' placeholder='Username' value={props.username} onChange={(e) => {props.setUsername(e.target.value); props.setError("")}}></input>
            <input type='text' placeholder='Email' value={props.email} onChange={(e) => {props.setEmail(e.target.value); props.setError("")}}></input>
            <input type='password' placeholder='Password' value={props.password} onChange={(e) => {props.setPassword(e.target.value); props.setError("")}}></input>
          </div>

          <button className="login-button-big" onClick={handleLogin}>Login</button>

          <div className="dont-have-account">Don't have an account? <span className='register-link' onClick={props.registerOpen}>Register</span></div>

          {props.error && (
            <div className="error-message">❌ {props.error}</div>
          )}

          <svg className='close-button' onClick={props.loginClose} width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.293 5.293a1 1 0 0 1 1.414 0L12 10.586l5.293-5.293a1 1 0 1 1 1.414 1.414L13.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L10.586 12 5.293 6.707a1 1 0 0 1 0-1.414z" fill="#0D0D0D"/></svg>
        </div>
      )}

      {props.registerWindowIsOpen && (
        <div className='login-window'>
          <div style={{fontFamily: 'Google-Sans-Bold', fontSize: '30px'}}>Registration</div>
          
          <div className='login-inputs'>
            <input type='text' placeholder='Username' value={props.username} onChange={(e) => {props.setUsername(e.target.value); props.setError("")}}></input>
            <input type='text' placeholder='Email' value={props.email} onChange={(e) => {props.setEmail(e.target.value); props.setError("")}}></input>
            <input type='password' placeholder='Password' value={props.password} onChange={(e) => {props.setPassword(e.target.value); props.setError("")}}></input>
          </div>

          <button className="login-button-big" onClick={handleRegister}>Register</button>

          <div className="have-account">Already have an account? <span className='login-link' onClick={props.loginOpen}>Login</span></div>

          {props.error && (
            <div className="error-message">❌ {props.error}</div>
          )}

          <svg className='close-button' onClick={props.registerClose} width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.293 5.293a1 1 0 0 1 1.414 0L12 10.586l5.293-5.293a1 1 0 1 1 1.414 1.414L13.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L10.586 12 5.293 6.707a1 1 0 0 1 0-1.414z" fill="#0D0D0D"/></svg>
        </div>
      )}


      {props.settingsWindowIsOpen && (
        <div id='settings-page'>
          <div id='settings-possibilities'>
            <div id='option-theme' onClick={() => setCurrentSettingsSection('Theme')}>Theme</div>
          </div>

          <div id='settings-sections'>
            {currentSettingsSection === 'Theme' ? (
              <div id='possible-themes'>
                <div className='theme-option' onClick={() => props.setActiveTheme('Light')}>
                  <svg className='theme-icon' width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 1C11 0.447715 11.4477 0 12 0C12.5523 0 13 0.447715 13 1V3C13 3.55228 12.5523 4 12 4C11.4477 4 11 3.55228 11 3V1Z" fill="#ffffff" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12ZM8.06167 12C8.06167 14.1751 9.82492 15.9383 12 15.9383C14.1751 15.9383 15.9383 14.1751 15.9383 12C15.9383 9.82492 14.1751 8.06167 12 8.06167C9.82492 8.06167 8.06167 9.82492 8.06167 12Z" fill="#ffffff" />
                    <path d="M20.4853 3.51472C20.0947 3.12419 19.4616 3.12419 19.0711 3.51472L17.6568 4.92893C17.2663 5.31946 17.2663 5.95262 17.6568 6.34315C18.0474 6.73367 18.6805 6.73367 19.0711 6.34315L20.4853 4.92893C20.8758 4.53841 20.8758 3.90524 20.4853 3.51472Z" fill="#ffffff" />
                    <path d="M1 13C0.447715 13 0 12.5523 0 12C0 11.4477 0.447715 11 1 11H3C3.55228 11 4 11.4477 4 12C4 12.5523 3.55228 13 3 13H1Z" fill="#ffffff" />
                    <path d="M3.51472 3.51472C3.1242 3.90524 3.1242 4.53841 3.51472 4.92893L4.92894 6.34315C5.31946 6.73367 5.95263 6.73367 6.34315 6.34315C6.73368 5.95262 6.73368 5.31946 6.34315 4.92893L4.92894 3.51472C4.53841 3.12419 3.90525 3.12419 3.51472 3.51472Z" fill="#ffffff" />
                    <path d="M11 21C11 20.4477 11.4477 20 12 20C12.5523 20 13 20.4477 13 21V23C13 23.5523 12.5523 24 12 24C11.4477 24 11 23.5523 11 23V21Z" fill="#ffffff" />
                    <path d="M6.34315 17.6569C5.95263 17.2663 5.31946 17.2663 4.92894 17.6569L3.51473 19.0711C3.1242 19.4616 3.1242 20.0948 3.51473 20.4853C3.90525 20.8758 4.53842 20.8758 4.92894 20.4853L6.34315 19.0711C6.73368 18.6805 6.73368 18.0474 6.34315 17.6569Z" fill="#ffffff" />
                    <path d="M21 13C20.4477 13 20 12.5523 20 12C20 11.4477 20.4477 11 21 11H23C23.5523 11 24 11.4477 24 12C24 12.5523 23.5523 13 23 13H21Z" fill="#ffffff" />
                    <path d="M17.6568 17.6569C17.2663 18.0474 17.2663 18.6805 17.6568 19.0711L19.0711 20.4853C19.4616 20.8758 20.0947 20.8758 20.4853 20.4853C20.8758 20.0948 20.8758 19.4616 20.4853 19.0711L19.0711 17.6569C18.6805 17.2663 18.0474 17.2663 17.6568 17.6569Z" fill="#ffffff" />
                  </svg>
                  <div className='theme-option-text'>Light</div>
                </div>

                <div className='theme-option' onClick={() => props.setActiveTheme('Dark')}>
                  <svg className='theme-icon' width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.39703 11.6315C3.39703 16.602 7.42647 20.6315 12.397 20.6315C15.6858 20.6315 18.5656 18.8664 20.1358 16.23C16.7285 17.3289 12.6922 16.7548 9.98282 14.0455C7.25201 11.3146 6.72603 7.28415 7.86703 3.89293C5.20697 5.47927 3.39703 8.38932 3.39703 11.6315ZM21.187 13.5851C22.0125 13.1021 23.255 13.6488 23 14.5706C21.7144 19.2187 17.4543 22.6315 12.397 22.6315C6.3219 22.6315 1.39703 17.7066 1.39703 11.6315C1.39703 6.58874 4.93533 2.25845 9.61528 0.999986C10.5393 0.751502 11.0645 1.99378 10.5641 2.80935C8.70026 5.84656 8.83194 10.0661 11.397 12.6312C13.9319 15.1662 18.1365 15.3702 21.187 13.5851Z" fill="#ffffff" />
                  </svg>
                  <div className='theme-option-text'>Dark</div>
                </div>
              </div>
                ) : <div style={{fontFamily: 'Google-Sans-Bold', fontSize: '25px'}}>Choose a section</div>}
          </div>

          <svg className='close-button' onClick={props.settingsClose} width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.293 5.293a1 1 0 0 1 1.414 0L12 10.586l5.293-5.293a1 1 0 1 1 1.414 1.414L13.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L10.586 12 5.293 6.707a1 1 0 0 1 0-1.414z" fill="#ffffff"/></svg>
        </div>
      )}
    </div>
  )
}

export default TopMenu;