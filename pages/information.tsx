import Head from "next/head";
import styles from "../styles/Home.module.css";
import ParticlesWrapper from "../components/ParticlesWrapper";
import NavBar from "../components/NavBar";
import RadioGroup from "../components/RadioGroup";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {getIDwithCookie, parseCookie} from "../library/cookie"
import {findUser, findDetail} from "../library/mongodb"

// export async function getStaticProps() {
//   return {
//     props: {}, // will be passed to the page component as props
//   }
// }
let FRONT_URL = "http://localhost:3000";

if (typeof window !== "undefined") {
  FRONT_URL = window.location.origin;
}
const API = "/api/information"

export async function getServerSideProps({req , res} : any) {
  async function initialize () {
  console.log('Information Page::initialize - exec')
    
    const cookie = req.headers.cookie;
    const token = parseCookie(cookie).token;
    const  tmp = await fetch(FRONT_URL + "/api/user_info", {method : 'post', body: JSON.stringify({token})});
    const tmp2 = await tmp.json();
    const {data, detail} = tmp2
    const userInfo = data
    return {userInfo, detail};
  }
  
  const {userInfo, detail}  = await initialize()

  return {
    props: {userInfo, detail}, // will be passed to the page component as props
  }
}



//const FRONT_URL = "http://localhost:3000/api/hello"
// const FRONT_URL = "https://pet-finder-zeta.vercel.app//api/hello"

export default function Information({userInfo, detail} : any) {

  const router = useRouter();

  const [ageCategory, setAgeCategory] = useState(null);
  const [mbti, setMbti] = useState(null);
  const [majorCategory, setMajorCategory] = useState<null | number>(null);
  const [gender, setGender] = useState<number>(0);
  const [lifePattern, setLifePattern] = useState(null);
  const [numberInvitation, setNumberInvitation] = useState<number | null>(null);
  const [favoriteFoodCategory, setFavoriteFoodCategory] = useState(null);
  const [schoolYear, setSchoolYear] = useState<any>(null);
  const [religionCategory, setRelegionCategory] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");

  const [disable, setDisable] = useState<boolean>(false)

  const [name, setName] = useState<string>("");

  function initialize() {
    setAgeCategory(userInfo.age)
    setMbti(userInfo.MBTI)
    setMajorCategory(userInfo.sex)
    setLifePattern(userInfo.m_n)
    setNumberInvitation(userInfo.friend)
    setFavoriteFoodCategory(userInfo.food)
    setSchoolYear(userInfo.year)
    setRelegionCategory(userInfo.religion)
    setDescription(detail.content)
    setName (userInfo.name)
  }
  useEffect(() => {
    if (userInfo) {
      initialize()
    }
    
  }, [])

  function test () {
    console.log(ageCategory)
    console.log(description)
  }

  async function handleClick() {
    console.log("information handleClick()")

    const json = JSON.stringify({
      name,
      ageCategory,
      mbti,
      majorCategory,
      gender,
      lifePattern,
      numberInvitation,
      favoriteFoodCategory,
      schoolYear,
      religionCategory,
      description,
    });

    // setResult({loading:true,})
    await fetch(FRONT_URL + API, {
      method: "post",
      body: json,
    })
      .then((result) => {
        console.log("결과값: " + result);
        //setDisable(true)
        router.push('/')
      })
      .catch((e) => {
        console.log("error in information.tsx fetch");
      });
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

            <br />
            <label className={styles.question}>Name</label>
            <input
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="이름을 입력해주세요"
              disabled = {disable}
              defaultValue = {name}
            />
            <br />

            <label className={styles.question}>Age</label>
            <RadioGroup
              stringArray={["18-20", "21-23", "24-26", "27 +"]}
              setIndex={setAgeCategory}
              name={"age"}
              disabled = {disable}
              default_idx = {ageCategory}
            />
            <br />

            <label className={styles.question}>MBTI</label>
            <RadioGroup
              stringArray={["E", "I", "not sure"]}
              setIndex={setMbti}
              name={"MBTI"}
              disabled = {disable}
              default_idx = {mbti}
            />
            <br />
            <label className={styles.question}>Major</label>
            <RadioGroup
              stringArray={["LAS", "BUSINESS", "ENGINEERING", "OTHER"]}
              setIndex={setMajorCategory}
              name={"Major"}
              disabled = {disable}
              default_idx = {majorCategory}
            />
            <br />
            <label className={styles.question}>Gender</label>
            <RadioGroup
              stringArray={["Male", "Female"]}
              setIndex={setGender}
              name={"Gender"}
              disabled = {disable}
              default_idx = {gender}
            />
            <br />
            <label className={styles.question}> Morning / Night Person</label>
            <RadioGroup
              stringArray={["Morning", "Night"]}
              setIndex={setLifePattern}
              name={"morning/night"}
              disabled = {disable}
              default_idx = {lifePattern}
            />
            <br />
            <label className={styles.question}>
              {" "}
              친구 데려오는 여부 일주일에 몇회..?
            </label>
            <input
              type="number"
              onChange={(e) => {
                setNumberInvitation(parseInt(e.target.value));
              }}
              placeholder="invite"
              disabled = {disable}
              defaultValue = {String(numberInvitation)}
            />

            <br />
            <label className={styles.question}> 좋아하는 음식 </label>
            <RadioGroup
              stringArray={["한식", "중식", "양식"]}
              setIndex={setFavoriteFoodCategory}
              name={"food"}
              disabled = {disable}
              default_idx = {favoriteFoodCategory}
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
              setIndex={setSchoolYear}
              name={"year"}
              disabled = {disable}
              default_idx = {schoolYear}
            />
            <br />
            <label className={styles.question}> 종교 </label>
            <RadioGroup
              stringArray={["기속교", "천주교", "불교", "무교"]}
              setIndex={setRelegionCategory}
              name={"religion"}
              disabled = {disable}
              default_idx = {Number(religionCategory)}
            />

            <label className={styles.question}>간단한 자기소개</label>
            <textarea
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              rows={4}
              cols={50}
              placeholder="음식 취향, 알러지, 좋아하는 노래 등"
              disabled = {disable}
              defaultValue = {description}
            />

            <br />
            <button onClick={handleClick} disabled = {disable}> Save </button>
            {/* <button onClick={test} disabled = {disable}> Test </button> */}


            <br />

            {/* <Link href="/">
              <h1>홈으로</h1>
            </Link> */}
    
          </main>

          {/* <footer className={styles.footer}>
            <p> Powered by Codable UIUC</p>
          </footer> */}
        </div>

  );
}
