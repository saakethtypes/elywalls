import React, { useContext, useState } from 'react'
import { store } from "react-notifications-component";
import { GlobalContext } from "../context/GlobalState";

export const RegisterUser = () => {
    const [Fn, setFn] = useState("");
    const [Pass, setPass] = useState("");
    const [cPass, setcPass] = useState("");
    const [Username, setUsername] = useState("");
    const [Email,setEmail] = useState("");
    const [Phone,setPhone] = useState("");
    //TODO mention this is delivery address
    //can be asked in checkout page 
  //   const [AFlat,setAFlat] = useState("");
  //   const [Aapt,setAapt] = useState("");
  //   const [Alocality,setAlocality] = useState("");
    
  
    const { registerUser } = useContext(GlobalContext);
  
    const register_U = e => {
      e.preventDefault();
      let firstname = Fn;
      firstname = firstname.charAt(0).toUpperCase() + firstname.slice(1);
      let user_info = {
        firstname: firstname,
        username: Username,
        password: Pass,
        phone: Phone,
        email:Email
      };
  
      if (Fn.length > 2 && Pass.length > 3 && Username.length > 3
          && Pass == cPass) {
        registerUser(user_info);
        setUsername("");
        setFn("");
        setPass("");
        setEmail("");
        setPhone("");
        setcPass("");
      } else {
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
          <div>
              <h1>Register User</h1>
              <form onSubmit={register_U}>
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
                      <button type="submit">
                        Submit
                      </button>
                    </form>
          </div>
      )
}
