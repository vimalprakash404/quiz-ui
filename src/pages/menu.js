// Menu.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleNavigation = (event) => {
      // Prevent going back
      event.preventDefault();
    };

    window.addEventListener('popstate', handleNavigation);

    return () => {
      window.removeEventListener('popstate', handleNavigation);
    };
  }, []);

  return (
    <div>
      <h1>Menu Page</h1>
      {/* Your menu content goes here */}
    </div>
  );
};

export default Menu;
