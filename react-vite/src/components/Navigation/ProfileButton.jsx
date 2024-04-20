import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import * as sessionActions from "../../redux/session";
// import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { useNavigate } from 'react-router-dom';
import './Profilebutton.css';
import { FaUserCircle } from 'react-icons/fa';
import OpenModalButton from '../OpenModalButton';
import { thunkLogout } from "../../redux/session";
import { NavLink } from 'react-router-dom';
function ProfileButton() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const nav = useNavigate();

    // Function to toggle the visibility of the dropdown menu
    const toggleMenu = (e) => {
        e.stopPropagation(); // Prevent the event from bubbling up to the document
        setShowMenu(prevShowMenu => !prevShowMenu);
    };

    // Effect for handling clicks outside of the component to close the dropdown
    useEffect(() => {


        // Add event listener for clicks
        document.addEventListener('click', closeMenu);
        return () => {
            document.removeEventListener('click', closeMenu);
        };
    }, []);
    const closeMenu = () => setShowMenu(false)
    const logout = (e) => {
      e.preventDefault();
      dispatch(thunkLogout());
      closeMenu();
      nav('/');
    }

    const ulClassName = `profile-dropdown${showMenu ? " show" : " hide"}`;




    return (
        <div className="profile-container">
            <button onClick={toggleMenu} className="profile-button">
                <FaUserCircle /> {/* Using React Icons correctly */}

            </button>
            {showMenu && (
                <ul className={ulClassName} ref={ulRef}>
                    {user ? (
                      <>
                      <li>Hello, {user.firstName} {user.lastName}</li>
                      <li>{user.email}</li>
                      <hr className='profile-button-divider'/>
                      <div className='profile-button-links-container'>
                        <p>
                          <NavLink to='/orders' className='profile-button-links pre-orders'>Orders</NavLink>
                        </p>
                        <p>
                          <NavLink to='/wishlist' className='profile-button-links wishlists'>Wish List</NavLink>
                        </p>
                        <p>
                          <NavLink to='/products/new' className='profile-button-links add-product'>Create New Listing</NavLink>
                        </p>
                        <p>
                          <NavLink to={`/products/users/${user.id}`} className='profile-button-links'>Manage Your Listings</NavLink>
                        </p>
                      </div>

                      <li>
                        <button onClick={logout} id='logout-button'>Log Out</button>
                      </li>
                    </>

                    ) : (
                      <>
                        <li>
                         <OpenModalButton buttonText="Log In" onItemClick={closeMenu} modalComponent={<LoginFormModal />} />
                        </li>
                        <li>
                          <OpenModalButton buttonText="Sign Up" onItemClick={closeMenu}  modalComponent={<SignupFormModal />} />
                       </li>
                     </>


                    )}
                </ul>
            )}
        </div>
    );
}

export default ProfileButton;
