import styles from "./NavBar.module.css";
import { useState,useTransition} from "react";

let audioPlayer:any = null

if (typeof window !== "undefined") {
  audioPlayer = new Audio("/sample_audio.mp3")
  audioPlayer.volume = 0.4
}



export default function NavBar({ children }: any) {
  const [clientPos, setClientPos] = useState<number[]>([0, 0]);
  const [displayPointer, setDisplayPointer] = useState<boolean>(false);
  const [isPending, transition] = useTransition()

  const pointer = (
    <div style={{ position: "fixed", left: clientPos[0], top: clientPos[1] }}>
      <img src="/alien.ico" />
    </div>
  );

  return (
    <div className={styles.navbar}>
      {displayPointer ? pointer : null}

      <div className={styles.one}>

      </div>
      <div className={styles.two}>
        <h1 className={styles.title}>
        <a href="/">
          <img
            src="/roomie.png"
            alt="roomie"
            className={styles.image}
          />
        </a>
        </h1>
      </div>
      <div
        className={styles.three}

        onMouseOver={(e) => {
          transition(() => {
            setClientPos([e.clientX, e.clientY]);
          })
          setDisplayPointer(true);
        }}
        onMouseOut={() => {
          setDisplayPointer(false);
        }}

        onTouchStart ={() => {
          if (audioPlayer) {
            audioPlayer.play()
          }
        }}

        onMouseDown ={()=> {
          if (audioPlayer) {
            audioPlayer.play()
          }


        }}


      ></div>
    </div>
  );
}
