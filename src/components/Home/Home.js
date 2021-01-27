import React from 'react';
import './Home.scss';
import { NavLink as Link } from 'react-router-dom';

function Home() {
  return (
    <div className='home'>
      <div className='container'>
        <div className='content'>
          <div className='content__women'>
            <Link to='/products'>
              <button className='btn'>Women</button>
            </Link>
          </div>
          <div className='content__men'>
            <Link to='/products'>
              <button className='btn'>Men</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
