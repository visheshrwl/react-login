import React, { useState } from "react";
import {Link, useNavigate} from 'react-router-dom'
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth"

import {auth} from "../../firebase";
import InputControl from "../InputControl/InputControl"

import styles from './Signup.module.css'

function Signup() {

    const navigate = useNavigate();

    const [values, setValues] = useState({
        name: "",
        email: "",
        pass: "",
    });

    const [errormsg, setErrormsg] = useState("");
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

    const handleSubmission = () => {
        if(!values.name || !values.email || !values.pass){
            setErrormsg("Fill all fields");
            return;
        }
        setErrormsg("");

        setSubmitButtonDisabled(true);

        createUserWithEmailAndPassword(auth, values.email, values.pass)
        .then(async(res)=> {
            setSubmitButtonDisabled(false);
            const user = res.user;
            await updateProfile(user, 
                {displayName: values.name,
            });
            navigate("/");
        })
        .catch((err) =>
        {
            setSubmitButtonDisabled(false);
            setErrormsg(err.message); 
        } 
        );
    }


    return (
        <div className={styles.container}>
            <div className={styles.innerBox}>
                <h1 className={styles.heading}>
                    Sign-Up </h1>

                    <InputControl 
                    label="Name" 
                    placeholder="Enter your Name here" 
                    onChange={(event) =>
                        setValues((prev) => ({...prev, name: event.target.value}))
                        }
                    />

                    <InputControl 
                    label="Email" 
                    placeholder="Enter your Email here" 
                    onChange={(event) =>
                        setValues((prev) => ({...prev, email: event.target.value}))}
                    />

                    <InputControl 
                    label="Password" 
                    placeholder="Enter your Password Here" 
                    onChange={(event) =>
                        setValues((prev) => ({...prev, pass: event.target.value}))} />

                    <div className={styles.footer}>
                        <p className={styles.error}>{errormsg}</p>
                        <button onClick={handleSubmission} disabled={submitButtonDisabled}> Sign Up </button>
                            <p>Already have an account? {" "} 
                                <span>
                                    <Link to="/login"> Login </Link>
                                </span>
                            </p>
                    </div>
            </div>
        </div>
    )
}

export default Signup;