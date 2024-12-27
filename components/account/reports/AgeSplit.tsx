import React from 'react'
import { Doughnut } from 'react-chartjs-2'

type AgeGroup = {
  [key: string]: number // Key represents age range as a string, e.g., "13-17", "18-24".
}
const AgeSplit = ({ props }: { props: AgeGroup[] }) => {
  const labels = props.map(item => Object.keys(item)[0])
  const data = props.map(item => Object.values(item)[0])

  const credibilityData = {
    datasets: [
      {
        data: data,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
        borderWidth: 0
      }
    ],
    labels: labels
  }

  const options = {
    plugins: {
      legend: {
        display: false // Hide legend inside the chart
      },
      // tooltip: {
      //   callbacks: {
      //     label: (tooltipItem: any) => {
      //       return `${tooltipItem.label}: ${tooltipItem.raw}%`
      //     }
      //   }
      // }
    },
    cutout: '80%' // Adjusts the cutout size of the chart to create a doughnut
  }

  return (
    <div className='p-5 dark:bg-darkColor  border border-gray-200 shadow-md rounded-md'>
      <p className='text-sm'>Age split</p>
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <div style={{ position: 'relative', width: '150px', marginTop: '20px' }}>
          <Doughnut data={credibilityData} options={options} />
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>22 %</div>
            <div style={{ color: '#FF6384' }}>Male</div>
          </div>
        </div>

        <div style={{ marginTop: '1rem', fontSize: '14px' }}>
          <div style={{ marginTop: '1rem', fontSize: '14px' }}>
            {props.map((item, index) => {
              const ageRange = Object.keys(item)[0]
              const value = Object.values(item)[0]
              const color = credibilityData.datasets[0].backgroundColor[index]

              return (
                <p key={index}>
                  <span
                    style={{
                      width: '10px',
                      height: '10px',
                      display: 'inline-flex',
                      borderRadius: '50%',
                      backgroundColor: color
                    }}
                  ></span>{' '}
                  {ageRange} : {value}%
                </p>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}


export default AgeSplit