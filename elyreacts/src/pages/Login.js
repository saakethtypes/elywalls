import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { FormInput } from "../components/FormInput";
import { Link } from "react-router-dom";
import LoadingIcon from "../components/LoadingIcon";
// @ts-ignore
import cn from "./styles/Login.module.scss";

export const Login = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { login, persistLog, forgotPass ,refreshToken,error} = useContext(GlobalContext);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        login(username, password, props);
        setIsLoading(false);
        setUsername("");
        setPassword("");
    };

    const [fp, setfp] = useState(false);
    const [Chkmail, setChkmail] = useState(false);
    const [Remail, setRemail] = useState("");
    const resetpass = (e) => {
        e.preventDefault();
        forgotPass(Remail);
        setRemail("");
        setChkmail(true);
    };
    const fpc = () => {
        setfp(!fp);
    };
    persistLog(props);

    if (isLoading) return <LoadingIcon />;
    
    return (
        <div className='page-container'>
            <div className='page-header'>
                <h1 className='page-title'>Sign In</h1>
                <p className='page-preface'>
                    Sign in to Admire and purchase products, or{" "}
                    <Link to='/register'>click here to register</Link>.
                </p>
            </div>
            {!fp && (
                <div className={`form-container`}>
                    <form onSubmit={handleFormSubmit}>
                        <FormInput
                            type='text'
                            name='Email / Username'
                            inputProps={{
                                required: true,
                                value: username,
                                onChange: (e) => setUsername(e.target.value),
                            }}
                        />

                        <FormInput
                            type='password'
                            name='password'
                            inputProps={{
                                required: true,
                                value: password,
                                onChange: (e) => setPassword(e.target.value),
                            }}
                        />
                        <button className='button-primary' type='submit'>
                            Login
                        </button>
                    </form>
                </div>
            )}

            <div className='form-container'>
                {!fp && (
                    <Link to='#' onClick={fpc}>
                        Forgot Password
                    </Link>
                )}
                {fp ? (
                    <form onSubmit={resetpass}>
                        <FormInput
                            type='text'
                            name='Email'
                            inputProps={{
                                required: true,
                                value: Remail,
                                onChange: (e) => setRemail(e.target.value),
                            }}
                        />

                        <button className='button-primary' type='submit'>
                            Submit
                        </button>
                    </form>
                ) : null}
                {Chkmail && (
                    <small>A link to reset your password has been sent to your email.</small>
                )}
                {fp && (
                    <Link to='#' className={cn.passwordResetGoBackLink} onClick={fpc}>
                        Go Back
                    </Link>
                )}
            </div>
        </div>
    );
};
