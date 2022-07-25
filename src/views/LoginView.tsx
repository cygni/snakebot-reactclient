import { getToken } from "../api";
import { useState } from "react";
import { useAppDispatch } from "../context/hooks";
import { setLoggedIn } from "../context/slices/tournamentSlice";
import { useNavigate } from "react-router-dom";
import { BsFillExclamationCircleFill } from "react-icons/bs";

function LoginView() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, SetErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await getToken(username, password);

    if (response.success) {
      console.log("Login success");
      localStorage.setItem("token", response.data);
      dispatch(setLoggedIn(true));
      SetErrorMessage("");
      navigate("/");
    } else {
      SetErrorMessage(response.data);
    }

    setUserName("");
    setPassword("");
  }

  return (
    <>
      <section className="loginview">
        <article>
          <div className="logintext">
            <h1 className="loginH1">Log In</h1>
            <p>
              Log in with username and password to access additional functions.
            </p>
          </div>
          <div className="loginview">
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">Username</label>

              <input
                className={errorMessage ? "error" : ""}
                value={username}
                onChange={(event) => setUserName(event.target.value)}
                type="text"
                id="username"
                placeholder="your.name@cygni.se"
              />

              <label htmlFor="password">Password</label>

              <input
                className={errorMessage ? "error" : ""}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                id="password"
                type="password"
                placeholder="password"
              />
              <p className={errorMessage ? "error-text" : "hide"}>
                <span>
                  <BsFillExclamationCircleFill />
                </span>
                {errorMessage}
              </p>

              <input className="signInBtn" type="submit" value="Sign in" />
            </form>
          </div>
        </article>
      </section>
    </>
  );
}

export default LoginView;
