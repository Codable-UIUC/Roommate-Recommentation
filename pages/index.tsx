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
  const [loading, setLoading] =useState<boolean>(false)



  async function handleClick() {
    setLoading(true)
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
    .then (async (res) => {
      const result = await res.json()
      console.log("결과값: " + result);
      setLoading(false)
      setResult(result)
    })
    .catch((e) => {
      console.log(e);
    })

    // response.json().then((body: any) => {

      
    //   setResult(body);
    // });
  }
  return (
    <>
      <ParticlesWrapper>
        <div className={styles.container}>
          <Head>
            <title>Roommie</title>
            <meta name="description" content="yay" />
            <link rel="icon" href="/cat.ico" type="image/x-icon" />
          </Head>

          <main className={styles.main}>
            <NavBar />

            <p className={styles.description}>
              Contributors:{" "}
              <code className={styles.code}>김채훈, 박창훈, 서상혁</code>
            </p>

            <h2 className="input">Inputs</h2>
            <label htmlFor="myfile">Select a file:</label>
            <input
              name="myfile"
              type="file"
              accept=".png, .jpg, .jpeg"
              onChange={(e) => {
                const reader = new FileReader();
                setData(reader);

                const file: any = e.target.files;
                if (file[0]) {
                  reader.readAsArrayBuffer(file[0]);
                }
              }}
            />
            <br />

            <p>Age</p>
            <input
              type="number"
              onChange={(e) => {
                setAge(parseInt(e.target.value));
              }}
              placeholder="Months"
            />

            <br />

            <label> Check if Vaccinated</label>

            <RadioGroup
              stringArray={["yes", "no", "not sure"]}
              setIndex={setIsVaccinated}
              name={"Vaccinated"}
            />

            <label htmlFor="vehicle2"> Check if Sterilized</label>
            <RadioGroup
              stringArray={["yes", "no", "not sure"]}
              setIndex={setIsSterilized}
              name={"Sterialized"}
            />

            <label htmlFor="vehicle3"> Dewormed</label>
            <RadioGroup
              stringArray={["yes", "no", "not sure"]}
              setIndex={setIsDewormed}
              name={"Dewormed"}
            />

            <label htmlFor="vehicle3"> Type</label>
            <RadioGroup
              stringArray={["Dog", "Cat"]}
              setIndex={setType}
              name={"Type"}
            />
            <label htmlFor="vehicle3"> Gender</label>
            <RadioGroup
              stringArray={["Male", "Female", "Other"]}
              setIndex={setGender}
              name={"Gender"}
            />
            <label htmlFor="vehicle3"> Health</label>
            <RadioGroup
              stringArray={["healty", "bad", "very bad"]}
              setIndex={setHealth}
              name={"Health"}
            />

            <button onClick={handleClick}> Send </button>

            <br />

            {loading ? (
              <>
                <h2 className={styles.description}>
                로딩중...
                </h2>
                <p>Sending request to {FRONT_URL}</p>
                </>
            )  : null}
            {result ? (
              <h2
                className={styles.description}
              >{`Pet Adoption Category : ${result}`}</h2>
            ): null}

            <br />

            <h2>Reference</h2>
            <div className={styles.grid}>
              <a className={styles.card}>
                <h2>Implementation &rarr;</h2>
                <p>Python, TypeScript, Tensorflow</p>
              </a>

              <a className={styles.card}>
                <h2>Model &rarr;</h2>
                <p>CNN</p>
                <p>XGBoost</p>
              </a>
            </div>
          </main>

          <footer className={styles.footer}>
            <p> Powered by Codable UIUC</p>
          </footer>
        </div>
      </ParticlesWrapper>
    </>
  );
}
