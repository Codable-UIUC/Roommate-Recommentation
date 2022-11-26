import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import ParticlesWrapper from "../components/ParticlesWrapper";
import { useState, useRef } from "react";
import NavBar from "../components/NavBar";
import RadioGroup from "../components/RadioGroup";

// export async function getStaticProps() {
//   return {
//     props: {}, // will be passed to the page component as props
//   }
// }

let FRONT_URL = "http://localhost:3000";

if (typeof window !== "undefined") {
  FRONT_URL = window.location.origin;
}

//const FRONT_URL = "http://localhost:3000/api/hello"
// const FRONT_URL = "https://pet-finder-zeta.vercel.app//api/hello"

export default function Test() {
  async function handleClick() {
    // setResult({loading:true,})
    await fetch(FRONT_URL + "/api/test", {
      method: "get",
    })
      .then(async (res) => {
        const result = await res.json();
        console.log("결과값: " + result.status);
        console.log("결과값: " + result.id);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <>
        <div className={styles.container}>
          <Head>
            <title>Roomie</title>
            <meta name="description" content="yay" />
            <link rel="icon" href="/house1.ico" type="image/x-icon" />
          </Head>
          <main>
            <NavBar />

            <button onClick={handleClick}> Send </button>

            <br />
          </main>
        </div>
    </>
  );
}