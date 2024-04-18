// import { useState, useEffect, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { FaUserCircle } from 'react-icons/fa';


// import OpenModalMenuItem from "./OpenModalMenuItem";
// import LoginFormModal from "../LoginFormModal";
// import SignupFormModal from "../SignupFormModal";
// import { NavLink,useNavigate } from "react-router-dom";
// import './ProfileButton.css';


// function ProfileButton() {
//   const dispatch = useDispatch();
//   const [showMenu, setShowMenu] = useState(false);
//   const user = useSelector((store) => store.session.user);
//   const ulRef = useRef();
//   const nav = useNavigate()

//   const toggleMenu = (e) => {
//     e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
//     setShowMenu(!showMenu);
//   };

//   useEffect(() => {
//     if (!showMenu) return;

//     const closeMenu = (e) => {
//       if (ulRef.current && !ulRef.current.contains(e.target)) {
//         setShowMenu(false);
//       }
//     };

//     document.addEventListener("click", closeMenu);

//     return () => document.removeEventListener("click", closeMenu);
//   }, [showMenu]);

//   const closeMenu = () => setShowMenu(false);

//   const logout = (e) => {
//     e.preventDefault();
//     dispatch(thunkLogout());
//     closeMenu();
//     nav('/')
//   };
//   return (
//     <>
//       <button onClick={toggleMenu} className='user-greeting-btn'>
//         <FaUserCircle />
//         <span className='welcome-message'>{user ? `Hello, ${user.first_name}` : 'Hello, sign in'}</span>
//       </button>
//       {showMenu && (
//         <ul className="dropdown-menu" ref={ulRef}>
//           {user ? (
//             <>
//               <li className="dropdown-item">{user.username}</li>
//               <li className="dropdown-item">{user.email}</li>
//               <NavLink to='/userReviews' className='reviews-nav-link'>My Reviews</NavLink>
//               <li>
//                 <button onClick={logout} className='logout-button'>Log Out</button>
//               </li>
//             </>
//           ) : (
//             <>
//               <OpenModalMenuItem
//                 itemText='Log In'
//                 onItemClick={() => setShowMenu(false)}
//                 modalComponent={<LoginFormModal />}
//               />
//               <OpenModalMenuItem
//                 itemText='Sign Up'
//                 onItemClick={() => setShowMenu(false)}
//                 modalComponent={<SignupFormModal />}
//               />
//             </>
//           )}
//         </ul>
//       )}
//     </>
//   );
// }

  // return (
  //   <>
  //     <button onClick={toggleMenu}>
  //       <FaUserCircle />
  //     </button>
  //     {showMenu && (
  //       <ul className={"profile-dropdown"} ref={ulRef}>
  //         {user ? (
  //           <>
  //             <li>{user.username}</li>
  //             <li>{user.email}</li>
  //             <li>
  //               <button onClick={logout}>Log Out</button>
  //             </li>
  //           </>
  //         ) : (
  //           <>
  //             <OpenModalMenuItem
  //               itemText="Log In"
  //               onItemClick={closeMenu}
  //               modalComponent={<LoginFormModal />}
  //             />
  //             <OpenModalMenuItem
  //               itemText="Sign Up"
  //               onItemClick={closeMenu}
  //               modalComponent={<SignupFormModal />}
  //             />
  //           </>
  //         )}
  //       </ul>
  //     )}
  //   </>
  // );
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


    // Function to handle user logout
    // const logout = () => {
    //     dispatch(sessionActions.logout());
    //     setShowMenu(false);
    //     nav('/'); // Navigate to home after logout
    // };


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
                      <hr/>
                      <div>
                        <NavLink to='/orders' className='pre-orders'>Orders</NavLink>
                      </div>
                      <div>
                        <NavLink to='/wishlist' className='wishlists'>Wish List</NavLink>
                      </div>
                      <div>
                        <NavLink to='/products/new' className='add-product'>Create New Listing</NavLink>
                      </div>
                      <div>
                        <NavLink to={`/products/users/${user.id}`}>Manage Your Listings</NavLink>
                      </div>

                      <li>
                        <button onClick={logout}>Log Out</button>
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
