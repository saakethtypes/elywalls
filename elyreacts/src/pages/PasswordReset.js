import React, {useContext, useState, useEffect} from 'react';
import {GlobalContext} from '../context/GlobalState';
import {FormInput} from "../components/FormInput";
import LinkButton from '../components/LinkButton';
import { store } from "react-notifications-component";
export const PasswordReset = ({rid}) => {
/* eslint-disable*/
    const {resetPass} = useContext(GlobalContext);
    const [goahead, setgoahead] = useState(false);

    const resetpass = () => {
        if (password.length > 3 && password == confirmPass) {
            console.log('resetting password')
            resetPass(password, rid);
            setgoahead(true);
            setconfirmPass("")
            setpassword("")
        } else {
             store.addNotification({
                title: ` Passwords didnt match or too short`,
                message: `The password has to be more than 5 letters`,
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                  duration: 4000,
                  onScreen: true,
                },
              });
            console.log("password didnt match or too short");
        }
    };
    const [confirmPass, setconfirmPass] = useState("");
    const [password, setpassword] = useState("");

    useEffect(() => setgoahead(true));
    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Reset Password</h1>
                {goahead &&
                    <p>Reset your Elywalls account password</p>}
                {!goahead &&
                    <p>Your password has been reset</p>}
            </div>

            <div className="lower-content-container">
                {goahead &&
                    <div className="form-container">
                        <FormInput
                            name="Password"
                            type="password"
                            value={password}
                            onChange={e => setpassword(e.target.value)}
                            autoComplete="off" />
                        <FormInput
                            name="Confirm Password"
                            type="password"
                            value={confirmPass}
                            onChange={e => setconfirmPass(e.target.value)}
                            autoComplete="off" />
                        <button className="button-primary" onClick={resetpass}>Reset</button>
                    </div>}


                {goahead &&
                    <div className="form-container">
                        <LinkButton to="/login" className="button-primary">
                            Go to Login
                        </LinkButton>
                    </div>}
            </div>
        </div>
    );
};
