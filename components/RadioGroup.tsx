import { Dispatch, SetStateAction } from 'react'
import styles from './NavBar.module.css'

export default function RadioGroup({stringArray, setIndex, name } : {stringArray : string[], setIndex : any, name: string}) {
    const radios = stringArray.map((val,index,a) => {
        return(
        <div key={val} >
            <input type="radio" id= {`${index}`} name={name} onChange={(e)=> {
                  if (e.target.checked) {
                    setIndex(index);
                  }
                }}></input> 
              <label>{val}</label>
        </div>
        )
    }
    )
  return (
    <div style = {{display : 'flex', justifyContent : 'space-evenly', flexDirection:'row'}}>
        {radios}
    </div>
  )
}
