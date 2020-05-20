import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { store } from "react-notifications-component";
import { GlobalContext } from "../context/GlobalState";

import cn from './ArtistRegister.module.scss';

export const RegisterArtist = () => {
  const [Fn, setFn] = useState("");
  const [Pass, setPass] = useState("");
  const [cPass, setcPass] = useState("");
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Submitted, setSubmitted] = useState(false);

  //TODO mention this is delivery address
  //can be asked in checkout page 
  //   const [AFlat,setAFlat] = useState("");
  //   const [Aapt,setAapt] = useState("");
  //   const [Alocality,setAlocality] = useState("");


  const { registerArtist } = useContext(GlobalContext);

  const register_A = e => {
    e.preventDefault();
    let firstname = Fn;
    firstname = firstname.charAt(0).toUpperCase() + firstname.slice(1);
    let artist_info = {
      name: firstname,
      username: Username,
      password: Pass,
      phone: Phone,
      email: Email
    };

    if (Fn.length > 2 && Pass.length > 3 && Username.length > 3
      && Pass == cPass) {
      registerArtist(artist_info);
      setUsername("");
      setFn("");
      setPass("");
      setEmail("");
      setPhone("");
      setcPass("");
      setSubmitted(true);
    } else {
      console.log("sss object");
      store.addNotification({
        title: "Shorty",
        message: "Username and Password are way too short",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 1000
        }
      });
    }
  };

  return (
    <div className="page-container">
      <h1 className="title">Register Artist</h1>

      <p className="page-information">Register as an Artist to sell your work. Looking to buy instead? <Link to="/register">Click here</Link>.</p>

      <div className={cn.artistRegFormContainer}>
        <form className={cn.artistRegForm} onSubmit={register_A}>
          <div>
            <input
              value={Fn}
              type="text"
              placeholder="Name"
              onChange={e => setFn(e.target.value)}
            ></input>
          </div>
          <div>
            <input
              value={Username}
              placeholder="Set Username"
              onChange={e => setUsername(e.target.value)}
              type="text"
            ></input>
          </div>
          <div>
            <input
              value={Pass}
              placeholder="Set Password"
              onChange={e => setPass(e.target.value)}
              type="password"
            ></input>
          </div>
          <div>
            <input
              value={cPass}
              placeholder="Confirm Password"
              onChange={e => setcPass(e.target.value)}
              type="password"
            ></input>
          </div>
          <div>
            <input
              value={Phone}
              placeholder="Set Phone"
              onChange={e => setPhone(e.target.value)}
              type="text"
            ></input>
          </div>
          <div>
            <input
              value={Email}
              placeholder="Set Email"
              onChange={e => setEmail(e.target.value)}
              type="text"
            ></input>
          </div>
          <button className="button-primary" type="submit">
            Register
          </button>
        </form>
      </div>
      {
        Submitted ? <div>Check your gmail to activate your account
                      <a href="https://gmail.com">Go to Gmail</a></div> : null
      }
    </div>
  );
};
