import React, { useEffect, useState } from 'react'
import jsonp from 'jsonp'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Line,
  ComposedChart,
  Area,
} from 'recharts'
import colors from 'tailwindcss/colors' // Import Tailwind colors

const DateSelection = ({ setDisplayRange }) => {
  function onButtonClick(days) {
    // console.log(days === displayRange)
    if (days === 0) {
      setDisplayRange(265)
      return
    }
    setDisplayRange(days)
  }

  const buttonClass = `w-half  m-1 rounded-md bg-primary-500  px-2  py-1  sm:py-1 font-medium text-xs text-white sm:py-0 hover:bg-primary-700 dark:hover:bg-primary-400
        focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 dark:ring-offset-black`
  const selectedButtonClass = `text-gray-800`
  return (
    <div className="m-0 mr-4 flex flex-row justify-end ">
      <button
        className={buttonClass}
        onClick={() => {
          onButtonClick(7)
        }}
      >
        7 Days
      </button>
      <button
        className={buttonClass}
        onClick={() => {
          onButtonClick(14)
        }}
      >
        14 Days
      </button>
      <button
        className={buttonClass}
        onClick={() => {
          onButtonClick(30)
        }}
      >
        30 Days
      </button>
      <button
        className={buttonClass}
        onClick={() => {
          onButtonClick(90)
        }}
      >
        90 Days
      </button>
      <button
        className={buttonClass}
        onClick={() => {
          onButtonClick(0)
        }}
      >
        Max
      </button>
    </div>
  )
}

const WakaTimeChart = ({ width, height }) => {
  const [data, setData] = useState([])
  // const Days = displayNum !== 0 ? displayNum : 5; // Set the number of days to display (e.g., last 5 days)
  const [totalHours, setTotalHours] = useState(0) // For total hours
  const [averageHours, setAverageHours] = useState(0) // For average hours
  const [displayRange, setDisplayRange] = useState(7)

  useEffect(() => {
    jsonp(
      'https://wakatime.com/share/@Bucci/06259ac0-a533-4c42-a0a6-5d1559383068.json',
      null,
      (err, response) => {
        if (err) {
          console.error('Error fetching WakaTime data with JSONP:', err)
          return
        }
        // Function to transform WakaTime data for the chart
        const transformData = (data, lastNumDays) => {
          // Sort data by date (newest first)
          const sortedData = data.sort((a, b) => new Date(b.range.date) - new Date(a.range.date))

          // Slice the array to get the last X days
          const recentData = sortedData.slice(0, lastNumDays)
          const reversedData = recentData.sort(
            (a, b) => new Date(a.range.date) - new Date(b.range.date)
          )
          // Convert to the chart-friendly format
          return reversedData.map((entry) => {
            const formattedDate = entry.range.date.slice(5) // Remove the year, keep MM-DD
            const formattedDateText = entry.range.text.slice(0, -5) // Remove the year, keep MM-DD
            return {
              date: formattedDate,
              dateText: formattedDateText,
              hours: (entry.grand_total.hours + entry.grand_total.minutes / 60).toFixed(2), // Convert time to total hours
              text: entry.grand_total.text,
              average: averageHours,
            }
          })
        }
        // Transform the WakaTime data for the chart
        const chartData = transformData(response.data, displayRange)
        setData(chartData)
        // Calculate total and average hours
        const total = chartData.reduce((acc, entry) => acc + parseFloat(entry.hours), 0)
        const average = total / chartData.length
        setTotalHours(total.toFixed(2)) // Set total hours
        setAverageHours(average.toFixed(2)) // Set average hours
      }
    )
  }, [displayRange, averageHours])

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload // Get the first item in the payload
      return (
        <div className="custom-tooltip border-2 border-gray-200 border-opacity-60 bg-white p-2 dark:border-gray-700 dark:bg-black">
          <p className="label mb-1 text-2xl font-bold leading-8 tracking-tight ">{`${data.text}`}</p>
          <p className="intro prose mb-0 text-gray-500 dark:text-gray-400">{data.dateText}</p>
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" aspect={2.5} className="h-auto">
      <DateSelection displayRange={displayRange} setDisplayRange={setDisplayRange} />
      <ComposedChart data={data} margin={{ top: 0, right: 4, left: 0, bottom: 0 }}>
        <Area type="monotone" dataKey="average" fill={colors.teal[800]} stroke={colors.teal[600]} />
        <CartesianGrid strokeDasharray="3 7" />
        <XAxis dataKey="date" />
        <YAxis />
        {/* <Tooltip /> */}
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="hours" fill={colors.teal[600]} />
      </ComposedChart>
      <div className="mr-8 flex justify-end space-y-0 pb-6 pt-0 text-base md:space-y-0">
        {/* <p className="text-lg leading-7 text-gray-500 dark:text-gray-400"> */}
        Total Hours {totalHours}
        {/* </p> */}
      </div>
    </ResponsiveContainer>
  )
}

export default WakaTimeChart
