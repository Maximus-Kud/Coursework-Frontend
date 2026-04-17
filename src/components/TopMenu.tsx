import React, { useEffect, useState } from "react";
import { authenticationLogin, authenticationRegister } from "../services/api";
import parseError from "../services/helper";
import ShoppingCart from "./ShoppingCart";
import type { ProductType } from "../types/ProductType";

import AccountInfo from "./account/AccountInfo";
import AccountWindow from "./account/AccountWindow";

import '../css/TopMenu.css'
import '../css/Register&Login.css'

import SettingsWindow from "./SettingsWindow";
import RegisterWindow from "./authentication/RegisterWindow";
import LoginWindow from "./authentication/LoginWindow";
import type { AppNotification, NotificationType } from "../types/Notification";





type Props = {
  setActiveTheme: (newTheme: string) => void,

  cartProducts: ProductType[],
  setCartProducts: React.Dispatch<React.SetStateAction<ProductType[]>>,


  inlineNotification: AppNotification | null,
  
  showInlineNotification: (newMessage: string, type?: NotificationType) => void,
  showToastNotification: (newMessage: string, type?: NotificationType) => void,
  showModalNotification: (newMessage: string, type?: NotificationType) => void,

  clearAllNotifications: () => void,


  isLoggedIn: boolean,
  setIsLoggedIn: (loggedIn: boolean) => void,

  username: string,
  setUsername: (newUsername: string) => void,
  
  email: string,
  setEmail: (newEmail: string) => void,

  password: string,
  setPassword: (newPassword: string) => void,

  onProductUpdated: () => void;

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
  const [profileWindowIsOpen, setProfileWindowIsOpen] = useState(false);
  
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
      
      props.showInlineNotification('Registered successfully', 'success');
    }
    catch (e) {
      props.showInlineNotification(parseError(e), 'error');
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

      props.showToastNotification('Logged in successfully', 'success');
    }
    catch (e) {
      props.showInlineNotification(parseError(e), 'error');
    }
  }

  const handleLogOut = async () => {
    try {
      props.setUsername("");
      props.setEmail("");
      props.setPassword("")
      props.setIsLoggedIn(false);

      localStorage.removeItem("token");
      localStorage.removeItem("username");

      props.loginClose();
      props.registerClose();
      props.settingsClose();

      props.showToastNotification('Logged out', 'info');
    }
    catch (e) {
      props.showToastNotification(parseError(e), 'error');
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
        <input type='text' placeholder='Search...' id='search-input' />
      </div>

      <div id='account' onClick={() => setAccountWindowIsOpen(prev => !prev)}>
        <svg viewBox="0 0 24 24" fill="#1a1a1a" className="icon-component HeaderActionButton_icon__LvO6T" plerdy-tracking-id="91984000901">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M9 7.5C9 5.84315 10.3431 4.5 12 4.5C12.7956 4.5 13.5587 4.81607 14.1213 5.37868C14.6839 5.94129 15 6.70435 15 7.5C15 9.15685 13.6569 10.5 12 10.5C10.3431 10.5 9 9.15685 9 7.5ZM12 3C9.51472 3 7.5 5.01472 7.5 7.5C7.5 9.98528 9.51472 12 12 12C14.4853 12 16.5 9.98528 16.5 7.5C16.5 6.30653 16.0259 5.16193 15.182 4.31802C14.3381 3.47411 13.1935 3 12 3ZM9.2132 13.5C9.19997 13.5 9.18674 13.5003 9.17354 13.501C7.23043 13.6039 5.53969 14.8631 4.77431 16.7062C4.24308 17.8382 4.52994 18.9573 5.2251 19.7493C5.90426 20.5232 6.9728 21 8.09835 21H15.9011C17.0271 21 18.096 20.5233 18.7752 19.7493C19.4705 18.9571 19.757 17.8379 19.2251 16.706C18.4597 14.8631 16.769 13.6039 14.826 13.501C14.8127 13.5003 14.7995 13.5 14.7863 13.5H9.2132ZM6.15399 17.2951C6.70851 15.9459 7.91058 15.0776 9.23405 15H14.7654C16.0889 15.0776 17.291 15.9459 17.8455 17.2951C17.8508 17.3081 17.8565 17.3209 17.8626 17.3336C18.1146 17.8606 18.0049 18.353 17.6479 18.7599C17.2708 19.1895 16.6224 19.5 15.9011 19.5H8.09835C7.37782 19.5 6.72966 19.1896 6.35248 18.7599C5.99525 18.3529 5.88542 17.8602 6.13709 17.3332C6.14307 17.3207 6.14871 17.308 6.15399 17.2951Z" fill="#1a1a1a"></path>
        </svg>

        {accountWindowIsOpen &&
          <AccountWindow
            isLoggedIn={props.isLoggedIn}

            email={props.email}
            cartProducts={props.cartProducts}

            loginOpen={props.loginOpen}
            adminPanelOpen={props.adminPanelOpen}
            settingsOpen={props.settingsOpen}

            handleLogOut={handleLogOut}
            toggleCart={() => setShoppingCartIsOpen(prev => !prev)}
            openProfile={() => setProfileWindowIsOpen(true)}
          />
        }
      </div>

      {shoppingCartIsOpen && (
        <ShoppingCart
          products={props.cartProducts}
          clearCart={() => props.setCartProducts([])}

          onOrderSuccess={props.onProductUpdated}

          shoppingCartIsOpen={shoppingCartIsOpen}
          shoppingCartOpen={() => setShoppingCartIsOpen(true)}
          shoppingCartClose={() => setShoppingCartIsOpen(false)}

          showToastNotification={props.showToastNotification}
          showModalNotification={props.showModalNotification}
        />
      )}

      {profileWindowIsOpen && (
        <AccountInfo
          isOpen={profileWindowIsOpen}
          onClose={() => setProfileWindowIsOpen(false)}
        />
      )}


      {props.loginWindowIsOpen && (
        <LoginWindow
          username={props.username}
          setUsername={props.setUsername}

          email={props.email}
          setEmail={props.setEmail}

          password={props.password}
          setPassword={props.setPassword}

          inlineNotification={props.inlineNotification}
          clearAllNotifications={props.clearAllNotifications}

          handleLogin={handleLogin}

          openRegister={props.registerOpen}

          closeLogin={props.loginClose}
        />
      )}

      {props.registerWindowIsOpen && (
        <RegisterWindow
          username={props.username}
          setUsername={props.setUsername}

          email={props.email}
          setEmail={props.setEmail}

          password={props.password}
          setPassword={props.setPassword}

          inlineNotification={props.inlineNotification}
          clearAllNotifications={props.clearAllNotifications}

          handleRegister={handleRegister}

          openLogin={props.loginOpen}

          closeRegister={props.registerClose}
        />
      )}


      {props.settingsWindowIsOpen && (
        <SettingsWindow
          setActiveTheme={props.setActiveTheme}
          settingsClose={props.settingsClose}
        />
      )}
    </div>
  )
}


export default TopMenu;