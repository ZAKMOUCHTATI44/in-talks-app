import React from 'react'

const NetworkCard = ({accounts } : {accounts : SocialAccounts[] }) => {
  return (
    <div className='grid grid-cols-3'>
        <div className=" bg-red-500">
            <div
              className="h-12 w-12 bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${`/social-media/${accounts[0].network}.png`})`,
              }}
            ></div>
        </div>
        <div className="grid grid-cols-2 col-span-2 items-center">
            <div className="bg-black h-32"></div>
            <div className="bg-green-700 h-32"></div>
            <div className="bg-green-700 h-32"></div>
            <div className="bg-black h-32"></div>
        </div>
        
    </div>
  )
}

export default NetworkCard