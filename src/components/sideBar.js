import React, { useState } from 'react'
import { stateArr } from '../utils/stateCode.js'
import { stateCodes } from '../utils/stateCode.js'

const SideBar = ({ states, setStates }) => {

    const [stateSelection, setStateSelection] = useState(null);
    const [stateValidation, setStateValidation] = useState(true);
    const [stateDupValidation, setStateDupValidation] = useState(true);

    const addState = () => {
        setStateDupValidation(true);
        for (const i in stateCodes) {
            if (stateCodes[i] === stateSelection) {
                if(states.includes(i.toLocaleLowerCase())) {
                    setStateDupValidation(false)
                    setStateValidation(true)
                    return
                }
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                  });
                setStates([i.toLocaleLowerCase(), ...states])
                setStateValidation(true)
                return
            } else {
                setStateValidation(false)
            }
        }
    }
    console.log(stateDupValidation)
    return (
        <div className="sideBarContainer">
            <h1>COVID-19 State Stats</h1>
            <div className="inputContainer">
                <input
                className="stateInput"
                list="states"
                id="state-selector"
                name="state-selector"
                placeholder="Enter a State"
                onChange={e => {
                    setStateValidation(true)
                    setStateDupValidation(true)
                    setStateSelection(e.target.value)
                }}
                />
                <datalist id="states">
                    {stateArr.map(i => <option value={i} />)}
                </datalist>
                <button onClick={addState}>Add State</button>
                {!stateValidation && <ErrorMessage text="Please Enter a Valid State" />}
                {!stateDupValidation && <ErrorMessage text={`You've already selected ${stateSelection}.`} />}
            </div>
        </div>
    )
}

export default SideBar;

const ErrorMessage = ({ text }) => <p className='error'>{text}</p>