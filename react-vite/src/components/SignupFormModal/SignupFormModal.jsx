import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import { FaXmark } from 'react-icons/fa6';
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      validationErrors.email = "Invalid email address format.";
    }

    if (!username) {
      validationErrors.username = "Username cannot be empty.";
    } else if (username.length < 4 || username.length > 20) {
      validationErrors.username = "Username must be between 4 and 20 characters.";
    }

    if (!firstName) {
      validationErrors.first_name = "First name cannot be empty.";
    }

    if (!lastName) {
      validationErrors.last_name = "Last name cannot be empty.";
    }

    if (password.length <= 5) {
      validationErrors.password = "Password must be more than 5 characters.";
    } else if (password !== confirmPassword) {
      validationErrors.confirmPassword = "Confirm Password field must be the same as the Password field.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        first_name: firstName,
        last_name: lastName,
        password,
      })
    );

  if (serverResponse) {
    setErrors(serverResponse);
  } else {
    closeModal();
  }
};
return (
    <div className="signup-modal">
      <h1>Sign Up</h1>
      <FaXmark className="modal-close" onClick={closeModal} size={30}/>
      {errors.server && <p className='error'>{errors.server}</p>}
      {/* {Object.values(errors).map((error, idx) => (
        <p key={idx} className='error'>{error}</p>
      ))} */}
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        {errors.email && <p className='error'>{errors.email}</p>}
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        {errors.username && <p className='error'>{errors.username}</p>}
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        {errors.first_name && <p className='error'>{errors.first_name}</p>}
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        {errors.last_name && <p className='error'>{errors.last_name}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {errors.password && <p className='error'>{errors.password}</p>}
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        {errors.confirmPassword && <p className='error'>{errors.confirmPassword}</p>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
