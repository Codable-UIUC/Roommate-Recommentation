import Head from "next/head";
import styles from "../styles/Home.module.css";
import ParticlesWrapper from "../components/ParticlesWrapper";
import NavBar from "../components/NavBar";
import RadioGroup from "../components/RadioGroup";
import { ChangeEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

let FRONT_URL = "http://localhost:3000";

if (typeof window !== "undefined") {
  FRONT_URL = window.location.origin;
}

const API = "/api/signup"

//const FRONT_URL = "http://localhost:3000/api/hello"
// const FRONT_URL = "https://pet-finder-zeta.vercel.app//api/hello"

export default function SignUp() {
    const router = useRouter()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [error, setError] = useState("");

    async function handleClick () {
        console.log('signin handleClick()')
        const result = await fetch(FRONT_URL + API, {
            method: "post",
            body: JSON.stringify({email, password}),
          })
        
        const result_object = await result.json();

        if (result_object.data == 'success') {
            router.push('/')
        }
        
        setError(result_object.data);
    }

    function handleEmail (e : ChangeEvent<HTMLInputElement>) : void {
        setEmail(e.target.value)
    }

    function handlePassword (e: ChangeEvent<HTMLInputElement>) : void {
        setPassword(e.target.value)
    }

  return (
    <div className={styles.container}>
      <Head>
        <title>Roomie</title>
        <meta name="description" content="yay" />
        <link rel="icon" href="/house1.ico" type="image/x-icon" />
      </Head>
      <main className={styles.main}>
        <NavBar />
            <label>Email</label>
            <input type="email" onChange = {handleEmail} />
            <label>PW</label>
            <input type="password" onChange={handlePassword} />
            <button onClick={handleClick}>Submit</button>
            {error ? <h3>{error}</h3> : null }
      </main>
    </div>
  );
}
