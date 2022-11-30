import styles from "./NavBar.module.css";
import { useState,useTransition} from "react";
import { useRouter } from "next/router";


export default function SignoutButton({ children }: any) {
    const router = useRouter();
  function handleClick () {
    console.log("로그아웃 진행합니다")
    console.log(document.cookie)
    //document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    console.log(document.cookie)

    //router.push('/')
  }


  return (
    <div>
      <button onClick={handleClick}>Sign Out</button>
    </div>
  );
}
