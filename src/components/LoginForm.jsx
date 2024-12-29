function LoginForm() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  console.log(useAuth());

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (credentials.username && credentials.password) {
      postLogin(credentials.username, credentials.password)
        .then((response) => {
          console.log("API Response:", response);
          const { token, first_name } = response;

          if (!first_name) {
            console.error("API did not return first_name. Response:", response);
            setError("Login failed: Missing first name.");
            return;
          }

          const user = { firstName: first_name };
          localStorage.setItem("authToken", token);
          localStorage.setItem("user", JSON.stringify(user));
          setAuth({ token, user });

          navigate("/landing");
        })
        .catch((error) => {
          console.error("Login failed:", error);
          setError("Login failed. Please check your credentials.");
        });
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="form-container">
        <div className="form-container__text">
          <h1>Welcome to Champs Fund</h1>
          <p>
            Your help can go a long way—every contribution brings us closer to
            building a brighter future for these children. Together, we can make
            a difference.
          </p>
        </div>
        <form className="login-page">
          {error && <p className="error">{error}</p>}
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              placeholder="Enter username"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>
          <button type="submit" onClick={handleSubmit}>
            Login
          </button>
          <small className="form-box__addon u-auto-format-text">
            Forget Password? <a href="#0">Reset here</a>
          </small>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
