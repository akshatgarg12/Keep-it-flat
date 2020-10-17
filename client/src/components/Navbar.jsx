import React from 'react';


const Navbar = ({link, onClick}) => {
  return (
    <nav>
      <div className="nav-logo">Keep it Flat</div>
      <div className="nav-link" onClick={onClick}>
      {link}
      </div>
    </nav>
  );
}
 
export default Navbar;