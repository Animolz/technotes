import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { useLoginMutation } from "./authApiSlice";
import { setCredentials } from "./authSlice";

import usePersist from "../hooks/usePersist";

import AsyncRender from "../../components/AsyncRender";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [persist, setPersist] = usePersist();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, { data: token, isLoading, isSuccess, isError, error }] =
    useLoginMutation();

  useEffect(() => {
    if (isSuccess) {
    }
  }, [isSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setUsername("");
      setPassword("");
      navigate("/dash");
    } catch (err) {
      console.log(err);
    }
  };

  const handleUsernameChanged = (e) => setUsername(e.target.value);
  const handlePasswordChanged = (e) => setPassword(e.target.value);
  const handleToggle = (e) => setPersist((prev) => !prev);

  const content = (
    <>
      <section className="public">
        <header>
          <h1>Employee Login</h1>
        </header>
        <main className="login">
          <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              className="form__input"
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChanged}
              autoComplete="off"
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              className="form__input"
              type="text"
              id="password"
              value={password}
              onChange={handlePasswordChanged}
              autoComplete="off"
              required
            />
            <button className="form__submit-button">Sign in</button>
            <label htmlFor="persist">
              <input
                type="checkbox"
                className="form__checkbox"
                id="persist"
                onChange={handleToggle}
                checked={persist}
              />
              &nbsp; Trust This Device
            </label>
          </form>
          <AsyncRender isLoading={isLoading} isError={isError} error={error} />
        </main>
        <footer>
          <Link to="/">Back to Home</Link>
        </footer>
      </section>
    </>
  );

  return content;
};
export default Login;
