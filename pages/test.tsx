import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import ParticlesWrapper from "../components/ParticlesWrapper";
import { useState, useRef } from "react";
import NavBar from "../components/NavBar";
import RadioGroup from "../components/RadioGroup";
import {parseCookie} from "../library/cookie"
import { getEffectiveTypeParameterDeclarations } from "typescript";


let FRONT_URL = process.env.NEXT_PUBLIC_FRONT_URL;



//Function overloading
// function tt() : string;
function tt(arg1 : string): string[]
function tt(arg1 : string, arg2:string) : string[]
function tt(arg1 : number) :number[]
function tt(arg1 : number, arg2:number) : number[]

function tt (arg1 :string|number , arg2? :string|number): (string|number)[]  {
  if (arg1 == undefined ) {
    arg1 = "바부"
  } 
  if (arg2 == undefined ) {
    arg2 = "똥"
  }

  return [arg1, arg2]
}

const gg : () => string = () => {
  return "hhi"
}



export default function Test() {
  async function handleClick() {
    document.cookie = ""
    console.log(document.cookie)
    console.log(parseCookie(document.cookie))
    console.log(tt("하잉"))
    console.log(tt('하잉','바붕'))
    console.log(tt(1))
    console.log(tt(1,3))
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
