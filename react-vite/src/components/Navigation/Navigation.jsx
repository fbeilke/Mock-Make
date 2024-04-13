import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { BiSearchAlt2 } from "react-icons/bi"
import { BsCart } from "react-icons/bs";
import logo from '../../../images/logo.png'

function Navigation(isLoaded) {
  const [showCategories, setShowCategories] = useState(false);
  const categoriesRef = useRef();
  const user = useSelector(state => state.session.user)

  const toggleCategories = (e) => {
    e.stopPropagation();
    setShowCategories(!showCategories);
  };
  useEffect(() => {
    if (!showCategories) return;
    const closeCategoriesMenu = (e) => {
      if (categoriesRef.current && !categoriesRef.current.contains(e.target)) {
        setShowCategories(false);
      }
    };
    document.addEventListener("click", closeCategoriesMenu);
    return () => document.removeEventListener("click", closeCategoriesMenu);
  }, [showCategories]);

  const currentUser = useSelector((state) => state.session.user);


//   return (
//     <div className='navbar-container'>
//       <ul className='nav-list'>
//         <li className="logo-item">
//           <NavLink to="/" className='logo-link'>
//            <img src="%PUBLIC_URL%/logo.png" alt="Logo" />
//           </NavLink>
//         </li>
//         <div className='search-wrapper'>
//           <input type="text" placeholder="Search.." className='search-input' onClick={() => alert('Feature coming soon')}/>
//           <button className='search-button' onClick={() => alert('Feature coming soon')}><BiSearchAlt2 /></button>
//         </div>
//         {user && (
//           <div className='user-info-container'>
//             {/* <p className='user-greet'> Hello, {user.first_name}</p> */}
//             {/* <NavLink to='' className='prev-order-link' onClick={() => alert('Feature coming soon')}>Previous Orders</NavLink> */}
//             <NavLink to='/carts' className='cart-link'>
//               <BsCart className="cart-icon"/> Cart
//             </NavLink>
//           </div>
//         )}
//         <li>
//           <ProfileButton />
//         </li>
//       </ul>
//       <div className='categories-bar'>
//         <div className='dropdown'>
//           <button onClick={toggleCategories} className='dropbtn'>Categories</button>
//           {showCategories && (
//             <div className='dropdown-content' ref={categoriesRef}>
//               <NavLink to='/products/categories/HomeGoods'>Home Goods</NavLink>
//               <NavLink to='/products/categories/ToysGames'>Toys & Games</NavLink>
//               <NavLink to='/products/categories/ArtCollectibles'>Art & Collectibles</NavLink>
//               <NavLink to='/products/categories/CraftSuppliesTools'>Craft Supplies & Tools</NavLink>
//               <NavLink to='/products/categories/Gifts'>Gifts</NavLink>
//             </div>
//           )}
//           </div>

//     </div>
//   </div>
//  )
return (
  <div className='navbar-container'>
    <ul className='nav-list'>
      <li className="logo-item">
      <NavLink to="/" className='logo-link'>
        <img src={logo} alt="Logo" />
      </NavLink>
      <h1 className="MockMakeTitle">Mock Make</h1>

      </li>
      <li className='dropdown'>
        <button onClick={toggleCategories} className='dropbtn'>Categories</button>
        {showCategories && (
          <div className='dropdown-content' ref={categoriesRef}>
            <NavLink to='/products/categories/HomeGoods'>Home Goods</NavLink>
            <NavLink to='/products/categories/ToysGames'>Toys & Games</NavLink>
            <NavLink to='/products/categories/ArtCollectibles'>Art & Collectibles</NavLink>
            <NavLink to='/products/categories/CraftSuppliesTools'>Craft Supplies & Tools</NavLink>
            <NavLink to='/products/categories/Gifts'>Gifts</NavLink>
          </div>
        )}
      </li>
      <li className='search-wrapper'>
        <input type="text" placeholder="Search.." className='search-input'/>
        <button className='search-button'><BiSearchAlt2 /></button>
      </li>
      {user && (
        <li className='cart-item'>
          <NavLink to='/carts' className='cart-link'>
            <BsCart className="cart-icon"/> Cart
          </NavLink>
        </li>
      )}
    </ul>
    <div className='ProfileLinkArea'>
          {isLoaded && (
            <ProfileButton user={currentUser} />
          )}
    </div>
  </div>
);
}



export default Navigation;
