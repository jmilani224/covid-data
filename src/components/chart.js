import React, { useEffect, useState } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { dateHandler } from '../utils/dateHandler.js'

const Chart = ({ state }) => {

    const [fetchData, setFetchData] = useState({
        loading: true,
        data: null,
    })
    useEffect(() => {
        fetch(`https://api.covidtracking.com/v1/states/${state}/daily.json`)
        .then(response => response.json())
        .then(data => setFetchData({
            loading: false,
            data: data,
        }));
    }, [])

const data = fetchData.data
if (!data) return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}><div className='spinner' style={{marginTop: '20rem'}} /></div>;

const dataSanitizedDate = data.map(i => ({...i, date: dateHandler(i.date)})).reverse();

    return (
      <LineChart
        width={1000}
        height={400}
        data={dataSanitizedDate}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid stroke="#1553b6" strokeDasharray="3 3" />
        <XAxis dataKey="date" stroke="#1553b6"/>
        <YAxis stroke="#1553b6"/>
        <Tooltip wrapperStyle={{ backgroundColor: "#1553b6" }}/>
        <Legend wrapperStyle={{ color: "#1553b6" }} />
        {/* <Line type="monotone" dataKey="positive" stroke="#8884d8" activeDot={{ r: 8 }} /> */}
        <Line dot={false} type="monotone" dataKey="death" stroke="#e21e45" activeDot={{ r: 8 }} />
        <Line dot={false} type="monotone" dataKey="hospitalizedCurrently" stroke="#eec00b" activeDot={{ r: 8 }} />
      </LineChart>
    )

    };


export default Chart
