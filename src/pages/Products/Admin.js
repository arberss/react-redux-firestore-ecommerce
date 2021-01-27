import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Product from '../../components/Product/Product';

import { BsCardList } from 'react-icons/bs';

function Admin() {
  return (
    <div className='container' style={{ padding: 0 }}>
      <div className='grid'>
        <Sidebar />
        <div className='container'>
          <Product />
        </div>
      </div>
    </div>
  );
}

export default Admin;
