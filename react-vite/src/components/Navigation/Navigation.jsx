import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { BiSearchAlt2 } from "react-icons/bi"
import { BsCart } from "react-icons/bs";
import logo from '../../../images/logo.png'
import { FcHome } from "react-icons/fc";
import { MdToys } from "react-icons/md";
import { GiPaperBoat } from "react-icons/gi";
import { GiCrafting } from "react-icons/gi";
import { LiaGiftsSolid } from "react-icons/lia";
import Cart from "../Cart";
import { useCart } from "../../context/CartProvider";
// import { IoHeart } from "react-icons/io5";

function Navigation(isLoaded) {
  const navigate = useNavigate();
  const user = useSelector(state => state.session.user)
  const [showCategories, setShowCategories] = useState(false);
  const [search, setSearch] = useState("");
  const { isOpen, setIsOpen } = useCart();
  const categoriesRef = useRef();


  const toggleCategories = (e) => {
    e.stopPropagation(); // This stops the click from propagating to the document
    setShowCategories(prevShowCategories => !prevShowCategories);
  };

  const handleSearch = (e) => {
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
          <input type="text" placeholder="Search.." className='search-input' value={search} onChange={e => setSearch(e.target.value)} onSubmit={() => console.log(search)}/>
          <button className='search-button'><BiSearchAlt2 /></button>
        </form>
      </li>
      {user && (
        <li className='cart-item'>
          <BsCart className="cart-icon" onClick={() => setIsOpen(!isOpen)}/>
        </li>


      )}
    </ul>
    <div className='ProfileLinkArea'>
          {isLoaded && (
            <ProfileButton user={currentUser} />
          )}
    </div>
    {isOpen && <Cart setIsOpen={setIsOpen}/>}  {/* Conditionally rendering the Cart component based on isCartOpen */}
  </div>
);
}



export default Navigation;
