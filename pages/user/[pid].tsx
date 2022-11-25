import Head from "next/head";
import styles from "../../styles/Home.module.css";
import ParticlesWrapper from "../../components/ParticlesWrapper";
import NavBar from "../../components/NavBar";
import RadioGroup from "../../components/RadioGroup";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router'
import SignoutButton from "../../components/SignoutButton"
import {findMatchUsers} from "../../library/mongodb"


let FRONT_URL = "http://localhost:3000";

if (typeof window !== "undefined") {
  FRONT_URL = window.location.origin;
}

//const FRONT_URL = "http://localhost:3000/api/hello"
// const FRONT_URL = "https://pet-finder-zeta.vercel.app//api/hello"

export async function getServerSideProps({req , res} : any) {
  const url : string = req.url;
  console.log(url)
  const id = url.split('/')[2]

  const result :any = await findMatchUsers(id);

  const contents = result.map((elem : any) => {
    return {id : elem._id.toString(), content: elem.content}
  })
  
  
  return {
    props: {contents}, // will be passed to the page component as props
  }
}


export default function ID({contents} : any) {
  const router = useRouter();
  const {pid}: any = router.query
  const [match, setMatch] = useState([])


  const map = ()=> {
    const yo = contents.map((e : any)=> {
      return (
        <div>
          <h1>{e.id}</h1>
          <h1>{e.content}</h1>
        </div>
      )
    })

    return yo
  }

  async function handleClickMatch () {
    
    //console.log(result)
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
        <h1>{pid}</h1>



        <button onClick= {handleClickMatch}>결과 보러가기</button>

        {map()}

        <Link href="/information">
          <button>내용을 입력해주세요</button>
        </Link>

        <SignoutButton/>
        
      </main>
    </div>
  );
}
