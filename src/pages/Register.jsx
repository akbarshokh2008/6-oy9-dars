import React, { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// IMG
import Logo from "../img/logo.png";
import User from "../img/username.svg";
import Email from "../img/email.svg";
import Password from "../img/password.svg";
import Close from "../img/close.svg";
import Openeye from "../img/openeye.svg";

const RegisterPage = () => {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const naviget = useNavigate();

  const [errorUser, setErrorUser] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [butLoad, setButLoad] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const backgroundImageUrl =
    "https://i.pinimg.com/originals/45/5b/d7/455bd70dd09e9711043c35d93758f67b.jpg";

  function validatePassword(password) {
    if (password.length > 6) {
      return true;
    } else {
      return false;
    }
  }
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  function validate() {
    // USERNAME
    if (usernameRef.current.value.length < 3) {
      setErrorUser("username xato 3 ta sozdan koproq yozing");
      console.log(usernameRef);
      usernameRef.current.focus();
      usernameRef.current.style.outlineColor = "red";
      return false;
    } else {
      usernameRef.current.style.outlineColor = "black";
      setErrorUser("");
    }
    // EMAIL
    if (!validateEmail(emailRef.current.value)) {
      setErrorEmail("email xato");
      emailRef.current.focus();
      emailRef.current.style.outlineColor = "red";
    } else {
      setErrorEmail("");
      emailRef.current.style.outlineColor = "black";
    }
    // PASSWORD
    if (!validatePassword(passwordRef.current.value)) {
      setErrorPassword("password xato");
      passwordRef.current.focus();
      passwordRef.current.style.outlineColor = "red";
    } else {
      setErrorPassword("");
      passwordRef.current.style.outlineColor = "black";
    }

    return true;
  }
  function handleRegister(e) {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) {
      return;
    }
    const user = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    setButLoad(true);
    fetch("https://auth-rg69.onrender.com/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "User registered successfully!") {
          usernameRef.current.value = "";
          emailRef.current.value = "";
          passwordRef.current.value = "";
          naviget("/login");
        } else if (
          data.message === "Failed! Username is already in use!" ||
          data.message === "Failed! Email is already in use!"
        ) {
          alert(data.message);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setButLoad(false);
      });
  }
  function togglePassword() {
    setShowPassword(!showPassword);
  }
  return (
    <div
      className="bg-register min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-inherit backdrop-blur-sm border-2 border-gray-500 p-8 rounded-lg shadow-md max-w-md w-full">
        <img src={Logo} width={250} alt="" className="mx-auto" />
        <div className="ruyxat flex gap-4 text-white mb-10 ">
          <NavLink
            to="/register"
            className="pb-1"
            style={{ borderBottom: "2px solid white" }}
          >
            Register
          </NavLink>
          <NavLink to="/login">Login</NavLink>
        </div>
        <form className="">
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-white font-medium mb-2"
            >
              Username{" "}
              {errorUser && (
                <p className="text-red-700 mb-[-5px]">{errorUser}</p>
              )}
            </label>

            <div className="flex border border-gray-300 text-white rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 pl-2 gap-2">
              <img src={User} alt="" width={20} />
              <input
                ref={usernameRef}
                type="text"
                id="username"
                className="border-none outline-none  bg-inherit p-3 w-full "
                placeholder="Enter username..."
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-white font-medium mb-2"
            >
              Email{" "}
              {errorEmail && (
                <p className="text-red-700 mb-[-5px]">{errorEmail}</p>
              )}
            </label>
            <div className="flex border border-gray-300 text-white rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 pl-2 gap-1.5">
              <img src={Email} alt="" width={25} />
              <input
                ref={emailRef}
                type="text"
                id="email"
                className="border-none outline-none  bg-inherit p-3 w-full "
                placeholder="Enter email..."
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-white font-medium mb-2"
            >
              Password{" "}
              {errorPassword && (
                <p className="text-red-700 mb-[-5px]">{errorPassword}</p>
              )}
            </label>
            <div className="flex border border-gray-300 text-white rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 pl-2 gap-1.5">
              <img src={Password} alt="" width={25} />
              <input
                ref={passwordRef}
                type={showPassword ? "text" : "password"}
                id="password"
                className="border-none outline-none   bg-inherit p-3 w-full "
                placeholder="Enter password..."
              />
              <button
                type="button"
                className="mr-2 cursor-pointer"
                onClick={togglePassword}
              >
                {showPassword ? (
                  <img src={Openeye} alt="" width={30} />
                ) : (
                  <img src={Close} alt="" width={30} />
                )}
              </button>
            </div>
          </div>
          <button
            disabled={butLoad}
            onClick={handleRegister}
            type="submit"
            className="bg-inherit border-white border-2 hover:backdrop-blur-xl text-white font-bold py-2 px-4 rounded-lg w-full "
          >
            {butLoad ? "Loading" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
