import React from 'react';

const XLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-4">
      <div className="container mx-auto px-4 text-center text-sm">
        <a
          href="https://twitter.com/mizunou"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-white hover:text-blue-300 transition-colors"
        >
          作った人の
          <XLogo className="mr-1" />
          
        </a>
        <p className="mt-2">&copy; 2024 見つめあうと素直に口コミできない. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;