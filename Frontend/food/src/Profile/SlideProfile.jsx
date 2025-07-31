import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const SlideProfile = () => {
    let navigate=useNavigate()
    let btnprofile=()=>{
        navigate('/profile')
    }
  return (
    <div>
      <button onClick={btnprofile}
  className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg shadow-md transition duration-200"
>
  <span>👤</span>
  <span>Profile</span>
</button>

    </div>
  )
}

export default SlideProfile
