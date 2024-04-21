import { useEffect, useRef, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsCart } from "react-icons/bs";
import { FcHome } from "react-icons/fc";
import { GiCrafting, GiPaperBoat } from "react-icons/gi";
import { LiaGiftsSolid } from "react-icons/lia";
import { FaBars } from 'react-icons/fa6';
import { MdToys } from "react-icons/md";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartProvider";
import "./Navigation.css";
import ProfileButton from "./ProfileButton";
import Logo from './Logo';

function Navigation({ isLoaded }) {
  const navigate = useNavigate();
  const user = useSelector(state => state.session.user)
  const [showCategories, setShowCategories] = useState(false);
  const [search, setSearch] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);
  const { isOpen, setIsOpen } = useCart();
  const categoriesRef = useRef();
  const searchInput = useRef();


  const toggleCategories = (e) => {
    e.stopPropagation(); // This stops the click from propagating to the document
    setShowCategories(prevShowCategories => !prevShowCategories);
  };

  const handleSearch = (e) => {
    console.log(search)
    e.preventDefault();
    const query = search.split(' ').join('+');
    navigate(`/products/?name=${query}`);
  }


  useEffect(() => {
    // Function to close the dropdown if the clicked area is outside the dropdown
    const closeCategoriesMenu = (e) => {
      if (categoriesRef.current && !categoriesRef.current.contains(e.target)) {
        setShowCategories(false);
      }
    };

    // Add click listener only when dropdown is shown
    if (showCategories) {
      document.addEventListener('click', closeCategoriesMenu);
    }

    // Cleanup function to remove the click listener
    return () => {
      document.removeEventListener('click', closeCategoriesMenu);
    };
  }, [showCategories])

  const currentUser = useSelector((state) => state.session.user);
  
  const focusSearch = (e) => {
    e.preventDefault();
    searchInput.current.focus();
  }

return (
  <div className='navbar-container'>
    <h1 className="mock-make-title">Mock Make</h1>
    <ul className='nav-list'>
      <li className="logo-item">
      <NavLink to="/" className='logo-link'>
        <Logo size={80} />
      </NavLink>

      </li>
      <li className='dropdown'>
        <div className="category-btn-wrapper">
          <FaBars className="menu-icon" />
          <button onClick={toggleCategories} className='dropbtn'>Categories</button>
        </div>
        {showCategories && (
          <div className={`dropdown-content ${showCategories ? 'show' : ''}`} ref={categoriesRef}>
          {/* ... links ... */}
            <NavLink to='/products/categories/HomeGoods'><FcHome className='home-icons'/>Home Goods</NavLink>
            <NavLink to='/products/categories/ToysGames'><MdToys className='toy-icons'/>Toys & Games</NavLink>
            <NavLink to='/products/categories/ArtCollectibles'><GiPaperBoat className='art-icons'/>Art & Collectibles</NavLink>
            <NavLink to='/products/categories/CraftSuppliesTools'><GiCrafting className='craft-icons'/>Craft Supplies & Tools</NavLink>
            <NavLink to='/products/categories/Gifts'><LiaGiftsSolid className='gift-icons' />Gifts</NavLink>
          </div>
        )}
      </li>
      <li className='search-wrapper'>
        <form className='search-form' onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Search.." 
            className='search-input' 
            onFocus={() => setSearchFocus(true)} 
            onBlur={() => setSearchFocus(false)}
            value={search} 
            onChange={e => setSearch(e.target.value)}
            ref={searchInput}
          />
          {/* Keep this input display none for search on [enter/return] button press */}
          <input type="submit" style={{display:"none"}}/>
          <button 
            className={'search-button' + (searchFocus ? '  search-focus' : '')}
            onClick={focusSearch}
          >
            <BiSearchAlt2 size={18}/>
          </button>
        </form>
      </li>
      {user && (
        <li className='cart-item'>
          <BsCart className="cart-icon" size={24} onClick={() => setIsOpen(!isOpen)}/>
        </li>
      )}
      <li className="profile-wrapper">
        {isLoaded && (
          <ProfileButton user={currentUser} />
        )}
      </li>
    </ul>
  </div>
);
}



export default Navigation;
