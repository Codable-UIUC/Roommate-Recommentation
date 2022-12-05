import { Dispatch, SetStateAction } from 'react'
import styles from './NavBar.module.css'

export default function RadioGroup({stringArray, setIndex, name, disabled , default_idx }: 
  {stringArray : string[], setIndex? : any, name: string, disabled : boolean, default_idx : number | null}) {
    const radios = stringArray.map((val,index,a) => {
        return(
        <div key={val} >
            <input type="radio" id= {`${index}`} name={name} disabled = {disabled} checked = {(index == default_idx) ? true : false} onChange={(e)=> {
                  if (e.target.checked) {
                    setIndex(index);
                  }
                }}/>
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

RadioGroup.defaultProps = {
  disabled : false,
  default_idx : -1
}