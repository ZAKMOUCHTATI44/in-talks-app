import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

interface PropsType {
  cleared: number
  flagged: number

  // mass_followers_percent: number
  // real_people_percent: number
}
const FollowersCredibility = ({ props }: { props: PropsType }) => {
  const credibilityData = {
    datasets: [
      {
        data: [props.cleared, props.flagged],
        backgroundColor: ['#4CAF50', '#F44336'],
        borderWidth: 0
      }
    ],
    labels: ['Real', 'Suspicious']
  }

  // Data for the followers breakdown chart (right)
  const breakdownData = {
    datasets: [
      {
        data: [
          props.cleared,
          props.flagged

          // props.influencer_percent,
          // props.real_people_percent
        ], // Mass followers, Suspicious, Influencers, Real
        backgroundColor: ['#4CAF50', '#F44336'],
        borderWidth: 0
      }
    ],
    labels: ['Real', 'Suspicious']
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
    <div className='p-5 bg-darkColor text-center rounded-md'>
      <p className='text-sm'>Followers Credibility</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '15px' }}>
        <div style={{ position: 'relative', width: '150px' }}>
          <Doughnut data={credibilityData} options={options} />
          <div
          className='text-green-500'
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{props.cleared * 100}%</div>
            <div className='text-green-400'>Real People</div>
          </div>
        </div>
        <div style={{ width: '150px', display: 'none' }}>
          <Doughnut data={breakdownData} options={options} />
        </div>
        <div style={{ marginTop: '1rem', fontSize: '14px' }}>
          <p>
            <span
              style={{
                width: '10px',
                height: '10px',
                display: 'inline-flex',
                borderRadius: '50%',
                backgroundColor: '#4CAF50'
              }}
            ></span>{' '}
            Real {(props.cleared * 100).toFixed(2)}%
          </p>
          <p>
            <span
              style={{
                width: '10px',
                height: '10px',
                display: 'inline-flex',
                borderRadius: '50%',
                backgroundColor: '#F44336'
              }}
            ></span>{' '}
            Suspicious {(props.flagged * 100).toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  )
}

export default FollowersCredibility
