import React, { useState } from 'react'
import { stateArr } from '../utils/stateCode.js'
import { stateCodes, stateCodeHandler } from '../utils/stateCode.js'
import { RiCloseCircleFill } from 'react-icons/ri'

const SideBar = ({ states, setStates }) => {

    const [stateSelection, setStateSelection] = useState(null);
    const [stateValidation, setStateValidation] = useState(true);
    const [stateDupValidation, setStateDupValidation] = useState(true);

    const addState = e => {
        e.preventDefault();
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

    return (
        <div className="sideBarContainer">
            <h1>COVID-19 <br /><span className='smallerH1Font'>State Stats</span></h1>
            <div className="inputContainer">
                <form>
                    <input
                    className="stateInput inputStyle"
                    list="states"
                    id="state-selector"
                    name="state-selector"
                    placeholder="Enter a State Here"
                    onChange={e => {
                        setStateValidation(true)
                        setStateDupValidation(true)
                        setStateSelection(e.target.value)
                    }}
                    onClick={e => e.target.value = null}
                    />
                    <datalist id="states">
                        {stateArr.map(i => <option value={i} />)}
                    </datalist>
                    <input
                    className="submitButton inputStyle"
                    type="submit"
                    onClick={addState}
                    value="Add State"
                    />
                    {!stateValidation && <ErrorMessage text="Please enter a valid state." />}
                    {!stateDupValidation && <ErrorMessage text={`You've already added ${stateSelection}.`} />}
                </form>

                <StateList states={states} setStates={setStates} />
            </div>
        </div>
    )
}

export default SideBar;

const ErrorMessage = ({ text }) => <p className='error'>{text}</p>

const StateList = ({ states, setStates }) => {

    return (
        <div className='stateList'>
            {states.map((i) =>
            <StateListItem
            state={i}
            states={states}
            setStates={setStates}
            />)}
        </div>
    )
}

const StateListItem = ({ state, states, setStates }) => {
    return (
        <div className='stateListItem'>
            <RiCloseCircleFill
            className='xIconContainer'
            color='#fd622d'
            onClick={() => setStates(states.filter(i => i !== state))}
            />
            <p>{stateCodeHandler(state.toUpperCase())}</p>
        </div>
    )
}