import styles from "./NavBar.module.css";
import { useState,useTransition} from "react";
import { useRouter } from "next/router";


export default function SignoutButton({ children }: any) {
    const router = useRouter();
  function handleClick () {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push('/')
  }


  return (
    <div>
      <button onClick={handleClick}>Sign Out</button>
    </div>
  );
}
