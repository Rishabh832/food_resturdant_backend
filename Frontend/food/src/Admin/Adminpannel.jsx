import React from 'react'
import Addmenuitem from './addmenuitem'
import MenuListItem from './MenuListItem'

const Adminpannel = () => {
  return (
    <div>
      <h2>Admin Panel - Manage Menu</h2>
      <Addmenuitem onItemAdded={() => window.location.reload()}/>
      <MenuListItem/>
    </div>
  )
}

export default Adminpannel
