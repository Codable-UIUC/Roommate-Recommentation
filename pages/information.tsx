import Head from "next/head";
import styles from "../styles/Home.module.css";
import ParticlesWrapper from "../components/ParticlesWrapper";
import NavBar from "../components/NavBar";
import RadioGroup from "../components/RadioGroup";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { getIDwithCookie, parseCookie } from "../library/cookie";
import { findUser, findDetail } from "../library/mongodb";


let FRONT_URL = process.env.NEXT_PUBLIC_FRONT_URL;
const API = "api/information";

function isValid(array : any) {
  if ( array == null) {
    return false
  }
  for (let i = 0 ; i < 7; i++) {
    if (typeof(array[i]) == "number") {
      if (array[i] < 0) {
        return false
      }
    } else {
      if (array[i] == null || array[i] == undefined || array[i] == "") {
        return false
      }
    }
  }

  return true
}

export async function getServerSideProps({ req, res }: any) {
  async function initialize() {
    console.log("Information Page::initialize - exec");

    const cookie = req.headers.cookie;
    const token = parseCookie(cookie).token;

    var axios = require('axios');
    var data_t = JSON.stringify({
      "token": token
    });
    
    var config = {
      method: 'post',
      url: FRONT_URL + 'api/user_info',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data_t
    };

    const fetchResponse = await axios(config)

    if (fetchResponse.status == 500) {
      console.log("Information SSG Page::initialize - internal error")
      return { userInfo: "no", detail: "no" };
    }

    if (fetchResponse.data.data == "no matching") {
      return { userInfo: "no", detail: "no" };
    }

    const { data, detail } = fetchResponse.data;
    const userInfo = data;

    return { userInfo, detail };
  }

  const { userInfo, detail } = await initialize();
  if (userInfo == "no") {
    return {
      props: {},
    };
  }

  return {
    props: { userInfo, detail }, // will be passed to the page component as props
  };
}

export default function Information({ userInfo, detail }: any) {
  const router = useRouter();

  const [ageCategory, setAgeCategory] = useState(null);
  const [mbti, setMbti] = useState(null);
  const [majorCategory, setMajorCategory] = useState<null | number>(null);
  const [gender, setGender] = useState<number>(0);
  const [lifePattern, setLifePattern] = useState(null);
  const [numberInvitation, setNumberInvitation] = useState<number | null>(null);
  const [favoriteFoodCategory, setFavoriteFoodCategory] = useState(null);
  const [schoolYear, setSchoolYear] = useState<any>(null);
  const [religionCategory, setRelegionCategory] = useState<number | null>(null);
  const [description, setDescription] = useState<string>("");

  const [disable, setDisable] = useState<boolean>(false);

  const [name, setName] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<string|undefined>(undefined)

  function initialize() {
    setAgeCategory(userInfo.age);
    setMbti(userInfo.MBTI);
    setGender(userInfo.sex)
    setMajorCategory(userInfo.major);
    setLifePattern(userInfo.m_n);
    setNumberInvitation(userInfo.friend);
    setFavoriteFoodCategory(userInfo.food);
    setSchoolYear(userInfo.year);
    setRelegionCategory(userInfo.religion);
    setDescription(detail.content);
    setName(userInfo.name);
  }
  useEffect(() => {
    if (userInfo) {
      initialize();
    }
  }, []);

  function test() {
    console.log(ageCategory);
    console.log(description);
  }

  async function handleClick() {
    console.log("information handleClick()");

    const information = {
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
    }

    if (!isValid(Object.values(information))) {
      setErrorMessage("?????? ?????? ??????????????????")
      return 
    }

    if (description.length < 10) {
      setErrorMessage("????????? ????????? ??? ???????????? ??????????????? (10?????? ??????)")
      return
    }

    setErrorMessage("????????? ??????????????????...")

    const json = JSON.stringify(information);

    // setResult({loading:true,})
    await fetch(FRONT_URL + API, {
      method: "post",
      body: json,
    })
      .then((result) => {
        console.log("?????????: " + result);
        //setDisable(true)
        router.push("/");
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
          placeholder="????????? ??????????????????"
          disabled={disable}
          defaultValue={name}
        />
        <br />

        <label className={styles.question}>Age</label>
        <RadioGroup
          stringArray={["18-20", "21-23", "24-26", "27 +"]}
          setIndex={setAgeCategory}
          name={"age"}
          disabled={disable}
          default_idx={ageCategory}
        />
        <br />

        <label className={styles.question}>MBTI</label>
        <RadioGroup
          stringArray={["E", "I", "not sure"]}
          setIndex={setMbti}
          name={"MBTI"}
          disabled={disable}
          default_idx={mbti}
        />
        <br />
        <label className={styles.question}>Major</label>
        <RadioGroup
          stringArray={["LAS", "BUSINESS", "ENGINEERING", "OTHER"]}
          setIndex={setMajorCategory}
          name={"Major"}
          disabled={disable}
          default_idx={majorCategory}
        />
        <br />
        <label className={styles.question}>Gender</label>
        <RadioGroup
          stringArray={["Male", "Female"]}
          setIndex={setGender}
          name={"Gender"}
          disabled={disable}
          default_idx={gender}
        />
        <br />
        <label className={styles.question}> Morning / Night Person</label>
        <RadioGroup
          stringArray={["Morning", "Night"]}
          setIndex={setLifePattern}
          name={"morning/night"}
          disabled={disable}
          default_idx={lifePattern}
        />
        <br />
        <label className={styles.question}>
          {" "}
          ?????? ???????????? ?????? ???????????? ??????..?
        </label>
        <input
          onChange={(e) => {
            setNumberInvitation(parseInt(e.target.value));
          }}
          placeholder="# of invite"
          disabled={disable}
          defaultValue={numberInvitation?.toString()}
        />

        <br />
        <label className={styles.question}> ???????????? ?????? </label>
        <RadioGroup
          stringArray={["??????", "??????", "??????"]}
          setIndex={setFavoriteFoodCategory}
          name={"food"}
          disabled={disable}
          default_idx={favoriteFoodCategory}
        />
        <br />

        <label className={styles.question}> ?????? </label>
        <RadioGroup
          stringArray={["Freshman", "Sophomore", "Junior", "Senior", "Grad"]}
          setIndex={setSchoolYear}
          name={"year"}
          disabled={disable}
          default_idx={schoolYear}
        />
        <br />
        <label className={styles.question}> ?????? </label>
        <RadioGroup
          stringArray={["?????????", "?????????", "??????", "??????"]}
          setIndex={setRelegionCategory}
          name={"religion"}
          disabled={disable}
          default_idx={religionCategory}
        />

        <label className={styles.question}>????????? ????????????</label>
        <textarea
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          rows={4}
          cols={50}
          placeholder="?????? ??????, ?????????, ???????????? ?????? ???"
          disabled={disable}
          defaultValue={description}
        />

        <br />
        <button onClick={handleClick} disabled={disable}>
          {" "}
          Save{" "}
        </button>
        {/* <button onClick={test} disabled = {disable}> Test </button> */}
        <br />
        <p style={{fontWeight : 'bold'}}>{errorMessage}</p>

      </main>

      {/* <footer className={styles.footer}>
            <p> Powered by Codable UIUC</p>
          </footer> */}
    </div>
  );
}
