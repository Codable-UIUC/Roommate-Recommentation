import Head from "next/head";
import styles from "../styles/Home.module.css";
import ParticlesWrapper from "../components/ParticlesWrapper";
import NavBar from "../components/NavBar";
import RadioGroup from "../components/RadioGroup";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { fetchData, parseCookie } from "../library/cookie";


let FRONT_URL = process.env.NEXT_PUBLIC_FRONT_URL;

export default function Home() {
  const router = useRouter()
  const [id, setId] = useState("")


  useEffect(()=> {
    if (document.cookie) {
      const token = parseCookie(document.cookie).token
      if (token) {
        fetchData(token).then(res => {
          //setId(res)
          router.push(`/user/${res}`)
        })
      }
    }
  },[])

  return (
    <div className={styles.container}>
      <Head>
        <title>Roomie</title>
        <meta name="description" content="yay" />
        <link rel="icon" href="/house1.ico" type="image/x-icon" />
      </Head>
      <main className={styles.main}>
        <NavBar />
        <h1>홈페이지 입니다.</h1>
        {id ? <Link href = {`/user/${id}`}>
        <button>결과 보러가기</button>
        </Link> : null} 
        <Link href="/signin">
          <button>Sign In</button>
        </Link>
        <Link href="/signup">
          <button>Sign Up</button>
        </Link>
      </main>
    </div>
  );
}
