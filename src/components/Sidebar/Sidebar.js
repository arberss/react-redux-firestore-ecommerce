import React from 'react';
import './Sidebar.scss';
import { NavLink as Link } from 'react-router-dom';
import { HiDocumentAdd } from 'react-icons/hi';

function Sidebar() {
  return (
    <div className='sidebar'>
      <Link className='link' to='/product/add'>
        <div className='sidebar__links'>
          <HiDocumentAdd /> Add Product
        </div>
      </Link>
    </div>
  );
}

export default Sidebar;
