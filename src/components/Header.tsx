import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-black py-4">
      <div className="container mx-auto px-4">
        <img 
          src="/images/title.png" 
          alt="見つめあうと素直に口コミできない" 
          className="mx-auto h-12 md:h-16"
        />
      </div>
    </header>
  );
};

export default Header;