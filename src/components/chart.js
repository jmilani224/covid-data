import React, { useEffect, useState } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { FiArrowDownCircle, FiArrowUpCircle} from 'react-icons/fi';
import { dateHandler } from '../utils/dateHandler.js'
import { stateCodeHandler } from '../utils/stateCode.js'
import { theme } from '../App.js'

// inspo: https://dribbble.com/shots/2068645-Red-Points-App-Activity/attachments/2068645-Red-Points-App-Activity?mode=media

const Chart = ({ states }) => {

    const [fetchData, setFetchData] = useState({
        loading: true,
        data: null,
    })
    useEffect(() => {
        fetch(`https://api.covidtracking.com/v1/states/${states}/daily.json`)
        .then(response => response.json())
        .then(data => setFetchData({
            loading: false,
            data: data,
        }));
    }, [states])

const data = fetchData.data
if (!data) return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}><div className='spinner' style={{marginTop: '20rem', marginLeft: '20rem'}} /></div>;

const dataSanitized = data.map(i => ({
  ...i,
  date: dateHandler(i.date),
  "Total Deaths": i.death,
  "Current Hospitalizations": i.hospitalizedCurrently,
  "New Cases": i.positiveIncrease,
})).reverse();

const activeDotStyles = {
  r: 8,
  stroke: null,
  strokeWidth: 0
}

    return (
      <>
      <div className='chart'>
        <h2 className='chartH2'>{stateCodeHandler(states.toUpperCase())}</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={dataSanitized}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid stroke={theme.color.lightBlue} strokeDasharray="3 3" />
            <XAxis dataKey="date" stroke={theme.color.lightBlue}/>
            <YAxis stroke={theme.color.lightBlue}/>
            <Tooltip contentStyle={{
              backgroundColor: theme.color.darkBlue,
              color: theme.color.lightBlue,
              borderColor: theme.color.lightBlue
              }}/>
            <Legend wrapperStyle={{ color: theme.color.lightBlue }} />

            <defs>
              <linearGradient id="gradient1" gradientTransform="rotate(90)">
                <stop offset="20%" stop-color="gold" />
                <stop offset="90%" stop-color="red" />
              </linearGradient>
            </defs>

            <defs>
              <linearGradient id="gradient2" gradientTransform="rotate(90)">
                <stop offset="0%" stop-color="#fdbb2d" />
                <stop offset="100%" stop-color="#22c1c3" />
              </linearGradient>
            </defs>

            <defs>
              <linearGradient id="gradientHeat" gradientTransform="rotate(90)">
                <stop offset="0%" stop-color="#fd622d" />
                <stop offset="33%" stop-color="#fdbb2d" />
                <stop offset="66%" stop-color="#22c1c3" />
                <stop offset="100%" stop-color="#227ec3" />
              </linearGradient>
            </defs>


            <Line
            dot={false}
            type="monotone"
            dataKey="New Cases"
            stroke="url(#gradientHeat)"
            strokeWidth={2}
            activeDot={activeDotStyles}
            />
            <Line
            dot={false}
            type="monotone"
            dataKey="Current Hospitalizations"
            stroke="#f34ab3"
            strokeWidth={2}
            activeDot={activeDotStyles}
            />
            <Line
            dot={false}
            type="monotone"
            dataKey="Total Deaths"
            stroke="#8a4af3"
            strokeWidth={2}
            activeDot={activeDotStyles}
            />

          </LineChart>

        </ResponsiveContainer>
      <div className='cards'>
        <HighlightedStat data={dataSanitized} stat="positiveIncrease" statName="New Cases" />
        <HighlightedStat data={dataSanitized} stat="hospitalizedIncrease" statName="New Hospitalizations"/>
        <HighlightedStat data={dataSanitized} stat="deathIncrease" statName="New Deaths" />
      </div>
    </div>
          </>
    )

    };


    export default Chart;
    
    
    const HighlightedStat = ({ data, stat, statName }) => {
      return (
        <div className="highlightedStat">
          {data[data.length - 1][stat] > data[data.length - 2][stat]
          ?
          (<FiArrowUpCircle className="arrowIcon" color='#fd622d' />)
          :
          (<FiArrowDownCircle className="arrowIcon" color='#22c1c3' />)
          }
          <p>{statName}</p>
          <h3>{data[data.length - 1][stat]}</h3>
        </div>
   )
  }
  