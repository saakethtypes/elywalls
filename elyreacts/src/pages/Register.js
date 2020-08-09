import React, { useContext, useState } from "react";
import { store } from "react-notifications-component";
import { GlobalContext } from "../context/GlobalState";
import ImageUploader from "react-images-upload";
import { FormInput, FormRadioInput } from "../components/FormInput";
import LoadingIcon from "../components/LoadingIcon";

// @ts-ignore \n /*eslint-disable*/
 /*eslint-disable*/

import cn from "./styles/Register.module.scss";

const MAX_IMAGE_SIZE = 15242880;
/*eslint-disable*/

export const Register = ({ location }) => {
    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [igLink, setigLink] = useState("");
    const [accountType, setAccountType] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { registerUser } = useContext(GlobalContext);
    const { registerArtist } = useContext(GlobalContext);
    const [pictures, setPictures] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const handleImageUpload = (picture) => {
        setPictures(picture);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);


        if (
            fullname.length > 3 &&
            password.length > 3 &&
            username.length > 3 &&
            email.length > 5 &&
            password === passwordConfirmation &&
            phone
        ) {

            if (accountType === "buy") {
                console.dir({
                    name: fullname,
                    username,
                    password,
                    email,
                    phone,
                });

                registerUser({
                    name: fullname,
                    username,
                    password,
                    email,
                    phone,
                });
            } else if (accountType === "sell" && igLink &&
            pictures) {
                console.dir({
                    name: fullname,
                    username,
                    password,
                    email,
                    phone,
                    linkedIg: igLink,
                });

                registerArtist(
                    {
                        name: fullname,
                        username,
                        password,
                        email,
                        phone,
                        igLink,
                    },
                    pictures[0]
                );
            } else {
                store.addNotification({
                    title: "Fill out all fields",
                    message: "Make sure your passwords match and Profile pic is also required",
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                        duration: 5000,
                    },
                });
                
            }

            setFullname("");
            setUsername("");
            setPassword("");
            setPasswordConfirmation("");
            setEmail("");
            setPhone("");
            setigLink("")
            setIsSubmitted(true);

            // todo: redirect after login
        } else {
            console.log("Details verification failed");
            // Todo: Verify credentials better
            store.addNotification({
                title: "Fill out all fields",
                message: "Make sure everything is right.",
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 5000,
                },
            });
        }
        setIsLoading(false)
    };

    if (isLoading) return <LoadingIcon />;

    return (
        <div className='page-container'>
            <div className='page-header'>
                <h1 className='page-title'>Register</h1>
                <p className='page-preface'>Register with Elywalls to buy or sell prints.</p>
            </div>

            <div className={`form-container ${cn.registrationFormContainer}`}>
                {accountType == "sell" ? (
                    <>
                    <h2>Hello artist</h2>
                    <ImageUploader
                        withIcon={true}
                        onChange={handleImageUpload}
                        imgExtension={[".jpeg", ".jpg", ".png", ".gif"]}
                        maxFileSize={MAX_IMAGE_SIZE}
                        singleImage={true}
                        label='Accepted .jpeg | .jpg | .png'
                        buttonText='Choose A Display Picture'
                        withPreview={true}
                    /></>
                ) : null}
                
                <form onSubmit={handleFormSubmit} className={cn.registrationForm}>
                    
                    <FormRadioInput
                        name='accountType'
                        displayName="I'm here to .."
                        options={[
                            {
                                value: "buy",
                                isDefault: false,
                            },
                            {
                                value: "sell",
                                isDefault: false,
                            },
                        ]}
                        onChange={(e) => setAccountType(e.target.value)}
                    />
{accountType.length>2?<>
                    <FormInput
                        type='text'
                        name='name'
                        value={fullname}
                        autoComplete='name'
                        inputProps={{
                            required: true,
                            onChange: (e) => setFullname(e.target.value),
                        }}
                    />
                    <FormInput
                        type='text'
                        name='username'
                        value={username}
                        inputProps={{
                            required: true,
                            onChange: (e) => setUsername(e.target.value),
                        }}
                    />
                    <FormInput
                        type='text'
                        name='email'
                        value={email}
                        autoComplete='email'
                        inputProps={{
                            required: true,
                            onChange: (e) => setEmail(e.target.value),
                        }}
                    />
                    <FormInput
                        type='tel'
                        name='phone (+91)'
                        value={phone}
                        autoComplete='tel'
                        inputProps={{
                            inputMode: "tel",
                            onChange: (e) => setPhone(e.target.value),
                        }}
                    />
                    <FormInput
                        type='password'
                        name='password'
                        value={password}
                        autoComplete='password'
                        inputProps={{
                            required: true,
                            onChange: (e) => setPassword(e.target.value),
                        }}
                    />
                    <FormInput
                        type='password'
                        name='passwordConfirmation'
                        displayName='Confirm Password'
                        value={passwordConfirmation}
                        autoComplete='off'
                        inputProps={{
                            required: true,
                            onChange: (e) => setPasswordConfirmation(e.target.value),
                        }}
                    />
                    {accountType == "sell" ? (
                        <FormInput
                            name='Instagram Handle'
                            type='text'
                            value={igLink}
                            onChange={(e) => setigLink(e.target.value)}
                            autoComplete='off'
                        />
                    ) : null}
                    
                    <button className='button-primary' type='submit'>
                        Register
                    </button>
                    </>:null}
                </form>
            </div>
            {isSubmitted && (
                <p className='page-preface'>
                    Please check your email to activate your account.{" "}
                    <a href='https://gmail.com'>Open Email</a>
                </p>
            )}
        </div>
    );
};
