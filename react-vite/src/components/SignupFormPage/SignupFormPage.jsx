import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { thunkSignup } from "../../redux/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitAttempted(true);
    let newErrors = {};

    // if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    //   newErrors.email = "Please enter a valid email address.";
    // }
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (password !== confirmPassword) {
    return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
    });
  }

  if (username.length < 4 || username.length > 20) {
    newErrors.username = "Username must be between 4 and 20 characters.";
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  const serverResponse = await dispatch(
    thunkSignup({
      email,
      username,
      password,
    })
  );

  if (serverResponse?.errors) {
    setErrors(serverResponse);
  } else {
    navigate("/");
  }
};

  return (
    <>
      <h1>Sign Up</h1>
      {Object.values(errors).map((error, idx) => (
        <p key={idx} className="error-message">{error}</p>
      ))}
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        {errors.username && <p>{errors.username}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <button type="submit" disabled={Object.keys(errors).length > 0}>Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormPage;
