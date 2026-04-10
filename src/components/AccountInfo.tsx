import { useEffect, useState } from 'react';
import { marketplaceGetAccountInfo } from '../services/api';
import '../css/ShoppingCart.css';

type AccountData = {
  id: number | string
  username: string;
  email: string;
  balance: number;
  role: string
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function AccountInfo({ isOpen, onClose }: Props) {
  const [account, setAccount] = useState<AccountData | null>(null);

  useEffect(() => {
    if (isOpen) {
      marketplaceGetAccountInfo()
        .then(data => {
          setAccount(data);
        })
        .catch(err => {
          console.error("Error: " + err);
        });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div id="account-info">
      <div id="title">Account Profile</div>

      <div id="product-section" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
        {account ? (
          <div className="account-details">
            <div><span className='key'>ID:</span> {account.id}</div>
            <div><span className='key'>Username:</span> {account.username}</div>
            <div><span className='key'>Email:</span> {account.email}</div>
            <div><span className='key'>Balance:</span> <span style={{ color: '#2ecc71', fontWeight: 'bold' }}>{account.balance} $</span></div>
            <div><span className='key'>Role:</span> {account.role}</div>
          </div>
        ) : (<div>Error loading data.</div>
        )}
      </div>

      <svg className='close-button' onClick={onClose} width="30px" height="30px" viewBox="0 0 24 24" fill="none" style={{ position: 'absolute', top: '20px', right: '20px', cursor: 'pointer' }}>
        <path d="M5.293 5.293a1 1 0 0 1 1.414 0L12 10.586l5.293-5.293a1 1 0 1 1 1.414 1.414L13.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L10.586 12 5.293 6.707a1 1 0 0 1 0-1.414z" fill="#0D0D0D"/>
      </svg>
    </div>
  );
}

export default AccountInfo;