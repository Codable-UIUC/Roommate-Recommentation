import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import ParticlesWrapper from "../components/ParticlesWrapper";
import { useState, useRef } from "react";
import NavBar from "../components/NavBar";
import RadioGroup from "../components/RadioGroup";

let FRONT_URL = "http://localhost:3000";

if (typeof window !== "undefined") {
  FRONT_URL = window.location.origin;
}

//const FRONT_URL = "http://localhost:3000/api/hello"
// const FRONT_URL = "https://pet-finder-zeta.vercel.app//api/hello"

export default function Home() {
  const [data, setData]: [any, any] = useState(null);
  const [vaccinated, setIsVaccinated] = useState(null);
  const [sterilized, setIsSterilized] = useState(null);
  const [dewormed, setIsDewormed] = useState<null | number>(null);
  const [age, setAge] = useState<number>(0);
  const [gender, setGender] = useState(null);
  const [type, setType] = useState(null);
  const [health, setHealth] = useState(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function handleClick() {
    setLoading(true);
    const json = JSON.stringify({
      age,
      type,
      gender,
      vaccinated,
      sterilized,
      dewormed,
      health,
    });
    // setResult({loading:true,})
    await fetch(FRONT_URL + "/api/hello", {
      method: "post",
      body: json,
    })
      .then(async (res) => {
        const result = await res.json();
        console.log("결과값: " + result);
        setLoading(false);
        setResult(result);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <>
      <ParticlesWrapper>
        <div className={styles.container}>
          <Head>
            <title>Roomie</title>
            <meta name="description" content="yay" />
            <link rel="icon" href="/house.ico" type="image/x-icon" />
          </Head>

          <main className={styles.main}>
            <NavBar />

            <br />
            <label className={styles.question}>Name</label>
            <input
              type="text"
              onChange={(e) => {}}
              placeholder="이름을 입력해주세요"
            />
            <br />

            <label className={styles.question}>Age</label>
            <RadioGroup
              stringArray={["18-20", "21-23", "24-26", "27 +"]}
              setIndex={setIsVaccinated}
              name={"age"}
            />
            <br />

            <label className={styles.question}>MBTI</label>
            <RadioGroup
              stringArray={["E", "I", "not sure"]}
              setIndex={setIsVaccinated}
              name={"MBTI"}
            />
            <br />
            <label className={styles.question}>Major</label>
            <RadioGroup
              stringArray={["LAS", "BUSINESS", "ENGINEERING", "OTHER"]}
              setIndex={setIsSterilized}
              name={"Major"}
            />
            <br />
            <label className={styles.question}>Gender</label>
            <RadioGroup
              stringArray={["Male", "Female"]}
              setIndex={setIsDewormed}
              name={"Gender"}
            />
            <br />
            <label className={styles.question}> Morning / Night Person</label>
            <RadioGroup
              stringArray={["Morning", "Night"]}
              setIndex={setType}
              name={"morning/night"}
            />
            <br />
            <label className={styles.question}>
              {" "}
              친구 데려오는 여부 일주일에 몇회..?
            </label>
            <input
              type="number"
              onChange={(e) => {
                setAge(parseInt(e.target.value));
              }}
              placeholder="invite"
            />
            <br />
            <label className={styles.question}> 좋아하는 음식 </label>
            <RadioGroup
              stringArray={["한식", "중식", "양식"]}
              setIndex={setHealth}
              name={"food"}
            />
            <br />

            <label className={styles.question}> 학년 </label>
            <RadioGroup
              stringArray={[
                "Freshman",
                "Sophomore",
                "Junior",
                "Senior",
                "Grad",
              ]}
              setIndex={setHealth}
              name={"year"}
            />
            <br />
            <label className={styles.question}> 종교 </label>
            <RadioGroup
              stringArray={["기속교", "천주교", "불교", "무교"]}
              setIndex={setHealth}
              name={"religion"}
            />

            <button onClick={handleClick}> Send </button>

            <br />

          
          
          </main>

          {/* <footer className={styles.footer}>
            <p> Powered by Codable UIUC</p>
          </footer> */}
        </div>
      </ParticlesWrapper>
    </>
  );
}
