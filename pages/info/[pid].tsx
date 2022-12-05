


import Head from "next/head";
import styles from "../../styles/Home.module.css";
import ParticlesWrapper from "../../components/ParticlesWrapper";
import NavBar from "../../components/NavBar";
import RadioGroup from "../../components/RadioGroup";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { findUser, findDetail } from "../../library/mongodb";
import { AxiosResponse } from "axios";



let FRONT_URL = process.env.NEXT_PUBLIC_FRONT_URL;
const API = "api/user_info_id";


export default function Information() {
  const router = useRouter();
  const {pid}: any = router.query


  const [disable, setDisable] = useState<boolean>(true);
  const [info, setInfo] =useState<any>(undefined);
  const [loading, setLoading] = useState(true)
  

  useEffect(() => {
    var axios = require('axios');
    var config = {
        method: 'post',
        url: FRONT_URL + 'api/user_info_id',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : JSON.stringify({id:pid})
      };
    axios(config).then ((fetchResponse : AxiosResponse)=>{

    if (fetchResponse.status == 500) {
      console.log("Information SSG Page::initialize - internal error")
      return { userInfo: "no", detail: "no" };
    }

    if (fetchResponse.data.data == "no matching") {
      return { userInfo: "no", detail: "no" };
    }

    const { data, detail } = fetchResponse.data;
    setInfo({data, detail})
    setLoading(false)
    console.log(info)
    })
  }, []);


  async function handleClick() {
    router.back()
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

{loading ? <h2>로딩중..</h2> :
    <>
        <br />
        <label className={styles.question}>Name</label>
        <input
          type="text"
          placeholder="이름을 입력해주세요"
          disabled={disable}
          defaultValue={info?.data.name}
        />
        <br />

        <label className={styles.question}>Age</label>
        <RadioGroup
          stringArray={["18-20", "21-23", "24-26", "27 +"]}
          name={"age"}
          disabled={disable}
          default_idx={info?.data.age}
        />
        <br />

        <label className={styles.question}>MBTI</label>
        <RadioGroup
          stringArray={["E", "I", "not sure"]}
          name={"MBTI"}
          disabled={disable}
          default_idx={info?.data.MBTI}
        />
        <br />
        <label className={styles.question}>Major</label>
        <RadioGroup
          stringArray={["LAS", "BUSINESS", "ENGINEERING", "OTHER"]}
          name={"Major"}
          disabled={disable}
          default_idx={info?.data.major}
        />
        <br />
        <label className={styles.question}>Gender</label>
        <RadioGroup
          stringArray={["Male", "Female"]}
          name={"Gender"}
          disabled={disable}
          default_idx={info?.data.sex}
        />
        <br />
        <label className={styles.question}> Morning / Night Person</label>
        <RadioGroup
          stringArray={["Morning", "Night"]}
          name={"morning/night"}
          disabled={disable}
          default_idx={info?.data.m_n}
        />
        <br />
        <label className={styles?.question}>
          {" "}
          친구 데려오는 여부 일주일에 몇회..?
        </label>
        <input
          placeholder="# of invite"
          disabled={disable}
          defaultValue={info?.data.friend?.toString()}
        />

        <br />
        <label className={styles.question}> 좋아하는 음식 </label>
        <RadioGroup
          stringArray={["한식", "중식", "양식"]}
          name={"food"}
          disabled={disable}
          default_idx={info?.data.food}
        />
        <br />

        <label className={styles.question}> 학년 </label>
        <RadioGroup
          stringArray={["Freshman", "Sophomore", "Junior", "Senior", "Grad"]}
          name={"year"}
          disabled={disable}
          default_idx={info?.data.year}
        />
        <br />
        <label className={styles.question}> 종교 </label>
        <RadioGroup
          stringArray={["기독교", "천주교", "불교", "무교"]}
          name={"religion"}
          disabled={disable}
          default_idx={info?.data.food}
        />

        <label className={styles.question}>간단한 자기소개</label>
        <textarea
          rows={4}
          cols={50}
          placeholder="음식 취향, 알러지, 좋아하는 노래 등"
          disabled={disable}
          defaultValue={info?.detail.content}
        />
        </>
}

        <br />
        <button onClick={handleClick} >
          Back
        </button>
        

      </main>

      {/* <footer className={styles.footer}>
            <p> Powered by Codable UIUC</p>
          </footer> */}
    </div>
  );
}
