import React, { useState } from 'react'
import axios from 'axios'

const Signupbtn = () => {
  return (
    <a
            href="/signup"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg text-sm"
          >
            Signup
          </a>
  )
}

export default Signupbtn
