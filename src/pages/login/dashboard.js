import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import logo from '../../logo.svg'
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useNavigate } from 'react-router-dom';

console.log(Cookies.get('access_token'));


const Dashboard = () => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(Cookies.get('access_token'));

  useEffect(() => {
    const storedAccessToken = Cookies.get('access_token');
    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    Cookies.remove('access_token');
    Cookies.remove('email');
    setAccessToken(null);
    navigate('/');
  };

  const handleDeleteAccount = () => {
    confirmAlert({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete your account?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              const userEmail = Cookies.get('email');
              const formData = new FormData();
              formData.append('email', userEmail);

              const response = await fetch('https://azul-app.com:8080/users', {
                method: 'DELETE',
                headers: {
                  'Authorization': `Bearer ${accessToken}`,
                },
                body: formData,
              });

              if (response.ok) {
                Cookies.remove('access_token');
                Cookies.remove('email');
                setAccessToken(null);
                navigate('/');
              } else {
                console.error('Failed to delete account:', response.statusText);
              }
            } catch (error) {
              console.error('Error during account deletion:', error);
            }
          },
        },
        {
          label: 'No',
        },
      ],
    });
  };


  return (
    <div className="container">
      <div className='image-block'>
        <img src={logo} className="App-logo" alt="logo" />
      </div>
      <p className='heading'>Delete Your Account</p>
      <div className="center-container">
        <button
          id="logout-button"
          className="styled-button"
          onClick={handleLogout}
        >
          Log out
        </button>
        <button
          id="delete-account-button"
          className="styled-button danger-button"
          onClick={handleDeleteAccount}

        >
          Delete Account
        </button>
      </div>
    </div >
  );
};


export default Dashboard;