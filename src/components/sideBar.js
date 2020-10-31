import React from 'react'
import { stateArr } from '../utils/stateCode.js'

const SideBar = ({ setState }) => {
    return (
        <div className="sideBarContainer">
            <h1>COVID-19 State Statistics</h1>
            
            <label for="state-selector">Select a State</label>
            <input list="states" id="state-selector" name="state-selector" />
            <datalist id="states">
                {stateArr.map(i => <option value={i} />)}
            </datalist>
        </div>
    )
}

export default SideBar;
