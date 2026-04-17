import React, { useEffect, useState } from 'react'

import samsungBanner from '../assets/Banners/samsung-banner.avif'

import macbookNeo from '../assets/Banners/macbook-neo.avif'
import iphone17Pro from '../assets/Banners/iphone-17-pro.avif'
import type { ProductType } from '../types/ProductType'
import { marketplaceGetAvailableProducts } from '../services/api'
import Product from '../components/products/Product'
import TopMenu from '../components/TopMenu'
import AdminPanel from '../components/AdminPanel'
import parseError from '../services/helper'
import InlineNotification from '../components/notifications/InlineNotification'
import type { AppNotification, NotificationType } from '../types/Notification'
import ToastNotification from '../components/notifications/ToastNotification'
import ModalNotification from '../components/notifications/ModalNotification'





function HomePage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [cartProducts, setCartProducts] = useState<ProductType[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeTheme, setActiveTheme] = useState('Light');

  const [inlineNotification, setInlineNotification] = useState<AppNotification | null>(null);
  const [toastNotification, setToastNotification] = useState<AppNotification | null>(null);
  const [modalNotification, setModalNotification] = useState<AppNotification | null>(null);


  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const [loginWindowIsOpen, setLoginWindowIsOpen] = useState(false);
  const [registerWindowIsOpen, setRegisterWindowIsOpen] = useState(false);

  const [username, setUsername] = useState(localStorage.getItem("username") || '');
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [password, setPassword] = useState('');

  const [settingsWindowIsOpen, setSettingsWindowIsOpen] = useState(false);
  const [adminPanelIsOpen, setAdminPanelIsOpen] = useState(false);
  


  const openLogin = () => {
    setLoginWindowIsOpen(true);
    setRegisterWindowIsOpen(false);
    setSettingsWindowIsOpen(false);
    setAdminPanelIsOpen(false);

    setInlineNotification(null);
  };

  const openRegistration = () => {
    setRegisterWindowIsOpen(true);
    setLoginWindowIsOpen(false);
    setSettingsWindowIsOpen(false);
    setAdminPanelIsOpen(false);

    setInlineNotification(null);
  };

  const openSettings = () => {
    setRegisterWindowIsOpen(false);
    setLoginWindowIsOpen(false);
    setSettingsWindowIsOpen(true);
    setAdminPanelIsOpen(false);
  };

  const openAdminPanel = () => {
    setRegisterWindowIsOpen(false);
    setLoginWindowIsOpen(false);
    setSettingsWindowIsOpen(false);
    setAdminPanelIsOpen(true);
  }


  const showInlineNotification = (message: string, type: NotificationType = 'info') => {
    setInlineNotification({ message, type });

    setToastNotification(null);

    setModalNotification(null);
  };

  const showToastNotification = (message: string, type: NotificationType = 'info') => {
    setInlineNotification(null);

    setToastNotification({ message, type });

    setModalNotification(null);
  };

  const showModalNotification = (message: string, type: NotificationType = 'info') => {
    setInlineNotification(null);

    setToastNotification(null);

    setModalNotification({ message, type });
  };

  const clearAllNotifications = () => {
    setInlineNotification(null);

    setToastNotification(null);

    setModalNotification(null);
  }



  useEffect(() => {
    marketplaceGetAvailableProducts()
      .then((data) => {
        console.log("API result:", data);
        setProducts(data.products ?? data);
      })
      .catch((e) => {
        showModalNotification(parseError(e), 'error');
      });
  }, []);



  const handleProductUpdated = async () => {
    try {
      const data = await marketplaceGetAvailableProducts();
      setProducts(data.products ?? data);
    }
    catch (e) {
      showModalNotification(parseError(e), 'error');
    }
  };

  const handleAddToCart = (product: ProductType) => {
    setCartProducts(prev => [...prev, product]);
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartProducts));
  }, [cartProducts]);



  return (
    <>
      <div id='banner'>
        <img src={samsungBanner} />
      </div>



      <header>
        <div>Online Marketplace</div>
      </header>





      <div id='main-page'>
        <TopMenu
          setActiveTheme={setActiveTheme}

          cartProducts={cartProducts}
          setCartProducts={setCartProducts}


          inlineNotification={inlineNotification}
  
          showInlineNotification={showInlineNotification}
          showToastNotification={showToastNotification}
          showModalNotification={showModalNotification}

          clearAllNotifications={clearAllNotifications}


          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}

          username={username}
          setUsername={setUsername}

          email={email}
          setEmail={setEmail}

          password={password}
          setPassword={setPassword}

          onProductUpdated={handleProductUpdated}

          loginWindowIsOpen={loginWindowIsOpen}
          registerWindowIsOpen={registerWindowIsOpen}
          settingsWindowIsOpen={settingsWindowIsOpen}

          loginOpen={openLogin}
          registerOpen={openRegistration}
          settingsOpen={openSettings}
          adminPanelOpen={openAdminPanel}

          loginClose={() => setLoginWindowIsOpen(false)}
          registerClose={() => setRegisterWindowIsOpen(false)}
          settingsClose={() => setSettingsWindowIsOpen(false)}          
        />



        <div id='double-banner'>
          <div id='double-photos'>
            <img src={macbookNeo} />
            <img src={iphone17Pro} />
          </div>
        </div>

        <div id='products'>
          <div id='products-title'>Products</div>

          <div id='product-list'>
            {products.length > 0 ? (products.map((p) => (
              <Product key={p.id} product={p} addToCart={handleAddToCart} />
              ))) : (<div>No products available</div>)}
          </div>
        </div>



        {adminPanelIsOpen && (
          <AdminPanel 
            adminPanelIsOpen={adminPanelIsOpen}

            adminPanelOpen={openAdminPanel}
            adminPanelClose={() => setAdminPanelIsOpen(false)}

            products={products}


            showInlineNotification={showInlineNotification}
            showToastNotification={showToastNotification}
            showModalNotification={showModalNotification}

            clearAllNotifications={clearAllNotifications}


            onProductUpdated={handleProductUpdated}
          />
        )}



        {/* {inlineNotification && inlineNotificationIsVisible && ( */}
        {toastNotification && (
          <ToastNotification
            notification={toastNotification}
            closeAllNotifications={clearAllNotifications}
          />
        )}

        {modalNotification && (
          <ModalNotification
            notification={modalNotification}
            closeAllNotifications={clearAllNotifications}
          />
        )}
      </div>
    </>
  )
}


export default HomePage