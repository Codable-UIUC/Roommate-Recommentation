import styles from "./NavBar.module.css";
import { useState,useTransition} from "react";
import { useRouter } from "next/router";

let FRONT_URL = process.env.NEXT_PUBLIC_FRONT_URL;
const API = "api/signout"

export default function SignoutButton({ children }: any) {
    const router = useRouter();
  async function handleClick () {
    const res = await fetch(FRONT_URL + API,{method : 'POST'})
    router.push('/')
  }


  return (
    <button className={"Button"} onClick={handleClick}>
      Sign Out
    </button>
  );
}
