import Head from 'next/head';
import React from 'react'
import styles from "../../styles/Login.module.css"
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub,faGoogle } from '@fortawesome/free-brands-svg-icons';


const LoginPage = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit=(data)=>{
    console.log(data.email,data.password)
    // createUserWithEmailAndPassword(data.email,data.password)
  }

  return (
    <div>
      <Head>
        <title>Next Login</title>
      </Head>
      <div className={styles.form}>
        <h3>LOGIN</h3>
        <div className={styles.social_icons}>
          <FontAwesomeIcon icon={faGoogle} onClick={()=>signIn("google",{callbackUrl:'http://localhost:3000/pcbuilder'})} />
          <FontAwesomeIcon icon={faGithub} onClick={()=>signIn("github",{callbackUrl:'http://localhost:3000/pcbuilder'})} />
        </div>
        <hr />
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="">Your Email</label>
          <input {...register("email", { required: true })} type="email" />
          <label htmlFor="">Your Password</label>
          <input {...register("password", { required: true })} type="password" />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage
