import Head from 'next/head'
import Image from 'next/image'
import Particles from 'react-particles'
import styles from '../styles/Home.module.css'
import { loadFull } from "tsparticles";
import {useCallback} from "react"

export default function ParticlesWrapper({children} : any) {
  const particlesInit = useCallback(async (engine : any) => {
    console.log(engine);

    // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
}, []);

const particlesLoaded = useCallback(async (container: any) => {
    await console.log(container);
}, []);
  return (
  <>
      <Particles
    init={particlesInit} loaded={particlesLoaded}
    options={{
      background: {
          color: {
              value: "#C1D5DD",
          },
      },
      fpsLimit: 60,
      interactivity: {
          events: {
              onClick: {
                  enable: false,
                  mode: "repulse",
              },
            //   onHover: {
            //       enable: true,
            //       mode: ["grab", "bubble"],
            //   },
              resize: true,
          },
          modes: {
              push: {
                  quantity: 4,
              },
              repulse: {
                  distance: 200,
                  duration: 1,
              },
          },
      },
      particles: {
          color: {
              value: ["random","random"],
          },
          links: {
              color: "#ffffff",
              distance: 150,
              enable: false,
              opacity: 0.5,
              width: 1,
          },
          collisions: {
              enable: true,
          },
          move: {
              enable: true,
              outModes: {
                  default: "bounce",
              },
              random: false,
              speed: 0.3,
              straight: false,
          },
          number: {
              density: {
                  enable: true,
                  area: 800,
              },
              value: 80,
          },
          opacity: {
              value: 0.5,
          },
          shape: {
              type: "circle",
          },
          size: {
              value: { min: 1, max: 3 },
          },
      },
      detectRetina: true,
  }   
	} />
    {children}
    </>
  )
}
