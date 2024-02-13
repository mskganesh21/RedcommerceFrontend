import { useRef, useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PWD_REGEX, EMAIL_REGEX } from "../../../utils/Regex/index";
import AuthContext from "../../../context/AuthContext";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const from = location.state?.from?.pathname || "/";
  const from = "/";
  const emailRef = useRef();
  const { setAuth } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
  }, [pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v2 = PWD_REGEX.test(pwd);
    const v3 = EMAIL_REGEX.test(email);
    if (!v2 || !v3) {
      toast.error("Invalid Entry");
      return;
    }

    try {
      const response = await axios.post(
        "/api/user/login",
        { email: email, password: pwd },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response?.status === 200) {
        console.log(response);
        toast.success(response?.data?.data);
        const accessToken = response?.data?.accessToken;
        setAuth({ accessToken });
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 5000);
        setEmail("");
        setPwd("");
      }
      if(!response){
        toast.error("Request not sent to the backend")
      }
    } catch (error) {
      toast.error(error.response?.data?.data);
      if(error){
        toast.error(error?.response?.statusText);
        console.log(error, "aa");
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <section className="log1">
        <h1>Login</h1>
        <form className="log2" onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            ref={emailRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            aria-invalid={validEmail ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
          />
          <p
            id="uidnote"
            className={
              emailFocus && email && !validEmail ? "instructions" : "offscreen"
            }
          >
            min 6 characters.
            <br />
            Should contain an @ symbol
            <br />
            Only gmail/yahoo email allowed
          </p>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
          />
          <p
            id="pwdnote"
            className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
          >
            8 to 24 characters.
            <br />
            Must include uppercase and lowercase letters, a number and a special
            character.
            <br />
            Allowed special characters:{" "}
            <span aria-label="exclamation mark">!</span>{" "}
            <span aria-label="at symbol">@</span>{" "}
            <span aria-label="hashtag">#</span>{" "}
            <span aria-label="dollar sign">$</span>{" "}
            <span aria-label="percent">%</span>
          </p>
          <button disabled={!validPwd || !validEmail ? true : false}>
            Login
          </button>
        </form>
        <p>
          Not have a registerd email with us?
          <br />
          <span className="line">
            <Link to="/register">Register</Link>
          </span>
        </p>
      </section>
    </>
  );
};

export default Login;
