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



function HomePage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [cartProducts, setCartProducts] = useState<ProductType[]>([]);

  const [activeTheme, setActiveTheme] = useState('Light');

  const [error, setError] = useState('');

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [loginWindowIsOpen, setLoginWindowIsOpen] = useState(false);
  const [registerWindowIsOpen, setRegisterWindowIsOpen] = useState(false);
  const [settingsWindowIsOpen, setSettingsWindowIsOpen] = useState(false);
  const [adminPanelIsOpen, setAdminPanelIsOpen] = useState(false);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  const openLogin = () => {
    setLoginWindowIsOpen(true);
    setRegisterWindowIsOpen(false);
    setSettingsWindowIsOpen(false);
    setAdminPanelIsOpen(false);

    setError("");
  };

  const openRegistration = () => {
    setRegisterWindowIsOpen(true);
    setLoginWindowIsOpen(false);
    setSettingsWindowIsOpen(false);
    setAdminPanelIsOpen(false);

    setError("");
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



  useEffect(() => {
    marketplaceGetAvailableProducts()
      .then((data) => {
        console.log("API result:", data);
        setProducts(data.products ?? data);
      })
      .catch((e) => {
        console.error("API error:", e);
        setError(parseError(e));
      });
  }, []);

  const handleProductUpdated = async () => {
    try {
      const data = await marketplaceGetAvailableProducts();
      setProducts(data.products ?? data);
    }
    catch (e: any) {
      setError(parseError(e));
    }
  };

  const handleAddToCart = (product: ProductType) => {
    setCartProducts((prevCart) => [...prevCart, product]);
  };



  return (
    <>
      <div id='banner'>
        <img src={samsungBanner}></img>
      </div>



      <header>
        <div>Online Marketplace</div>
      </header>





      <div id='main-page'>
        <TopMenu
          setActiveTheme={setActiveTheme}

          cartProducts={cartProducts}
          setCartProducts={setCartProducts}

          error={error}
          setError={setError}

          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}

          username={username}
          setUsername={setUsername}

          email={email}
          setEmail={setEmail}

          password={password}
          setPassword={setPassword}

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
            <img src={macbookNeo}></img>
            <img src={iphone17Pro}></img>
          </div>
        </div>

        <div id='products'>
          <div id='products-title'>Products</div>

          <div id='product-list'>
            {products.length > 0 ? (products.map((p) => (
              <Product key={p.id} product={p} addToCart={() => handleAddToCart(p)} />
              ))) : (<div>No products available</div>)}
          </div>
        </div>



        {adminPanelIsOpen && (
          <AdminPanel 
            adminPanelIsOpen={adminPanelIsOpen}

            adminPanelOpen={openAdminPanel}
            adminPanelClose={() => setAdminPanelIsOpen(false)}

            products={products}

            onProductUpdated={handleProductUpdated}

            error={error}
            setError={setError}
          />
        )}
      </div>
    </>
  )
}


export default HomePage