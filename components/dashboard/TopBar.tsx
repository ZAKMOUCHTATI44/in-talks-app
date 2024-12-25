import React from 'react'
import ChangeLang from '../utils/ChangeLang'
import ModeToggle from '../utils/ModeToggle'
import UserAvatar from '../utils/UserAvatar'
import ModalSearch from '../account/ModalSearch'

const TopBar = () => {
  return (
    <div className='dark:bg-darkColor bg-white shadow-sm my-5 py-3 px-5 flex justify-between items-center'>
      <ModalSearch />
      <div className='flex items-center gap-2'>
        <ModeToggle />
        <ChangeLang />
        <UserAvatar />
      </div>
    </div>
  )
}

export default TopBar