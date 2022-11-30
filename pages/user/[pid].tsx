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


const FRONT_URL = process.env.NEXT_PUBLIC_FRONT_URL;

export async function getServerSideProps({req , res, resolvedUrl} : any) {
  const url : string = resolvedUrl;
  
  const id = url.split('/')[2]

  console.log('PID exec & url id : ' + id)

  const result : any = await findMatchUsers(id);

  if (result == 'Error')
    return {
      props:{contents:[]}
    }

  if (result == 'no info') {
    return {
      props:{contents: []}
    }
  }

  const contents = result.map((elem : any) => {
    if (elem.content == undefined || elem == undefined)
      elem.content = "empty descripttion"
    return {id : elem._id.toString(), content: elem.content}
  })
  
  console.log(contents)
  
  return {
    props: {contents}, // will be passed to the page component as props
  }
}


export default function ID({contents} : any) {
  const router = useRouter();
  const {pid}: any = router.query
  
  

  const map = ()=> {
    const yo = contents.map((e : any, index : number)=> {
      return (
        <div key = {e.id} className = 'card'>
          <h1>{`${index + 1} 등`}</h1>

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

        <div>
        <h1>안녕하세요! {pid} 님</h1>
        <h2>당신과 가장 잘 어울리는 룸메이트는</h2>

        {contents.length == 0 ? <h2>아래 버튼을 클릭하여 정보를 입력해주세요</h2> : null}
        </div>

        {map()}

        <Link href="/information">
          <button>내 정보</button>
        </Link>

        <SignoutButton/>
        
      </main>
    </div>
  );
}
