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
    console.log(elem)
    if (elem == undefined) {
      elem.content = "emty description"
      elem.name = "no name"
    } else if (elem.content == undefined)
      elem.content = "empty description" 
    else if (elem.name == undefined)
      elem.name = "no name"

    return {id : elem._id.toString(), content: elem.content, name : elem.name}
  })
  
  console.log(contents)
  
  return {
    props: {contents}, // will be passed to the page component as props
  }
}


export default function ID({contents} : any) {
  const router = useRouter();
  const {pid}: any = router.query
  
  const colors = ['#FFD700','#C0C0C0','#CD7F32']

  const map = ()=> {
    const yo = contents.map((e : any, index : number)=> {
      return (
        <div key = {e.id} className = 'card' onClick={handleClickMatch}>
          <h1><span style={{color:colors[index], fontSize:38 - 3*index}}>{`♛ ${index + 1} 등`}</span> {e.name}</h1>

           <h2>{e.content}</h2>
        </div>
      )
    })

    return yo
  }

  function handleClickMatch () {
    alert('준비중입니다')
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

        
        <h1>안녕하세요! {pid} 님</h1>
        <h2>당신과 가장 잘 어울리는 룸메이트는?</h2>

        {contents.length == 0 ? <h2>아직 내 정보를 입력하지 않았습니다. 아래 버튼을 클릭하여 정보를 입력해주세요</h2> : null}
        

        {map()}

        <Link href="/information">
          <button>{contents.length == 0 ? "내 정보 입력" : "내 정보 수정"}</button>
        </Link>

        <SignoutButton/>
        
      </main>
    </div>
  );
}
