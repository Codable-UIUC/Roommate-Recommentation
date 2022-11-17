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
        <a href="https://www.kaggle.com/competitions/petfinder-adoption-prediction">
          <img
            src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-royalty-free-image-506756303-1560962726.jpg?crop=0.672xw:1.00xh;0.166xw,0&resize=640:*"
            alt="Italian Trulli"
            className={styles.image}
          />
        </a>
      </div>
      <div className={styles.two}>
        <h1 className={styles.title}>
          <span style={{ color: "Orange" }}>Pet </span>
          <span style={{ color: "red" }}>F</span>
          <span style={{ color: "yellow" }}>i</span>
          <span style={{ color: "navy" }}>n</span>
          <span style={{ color: "blue" }}>d</span>
          <span style={{ color: "green" }}>e</span>
          <span style={{ color: "purple" }}>r</span>
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
