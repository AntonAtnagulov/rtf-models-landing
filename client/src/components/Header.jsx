import React from 'react'

export default function Header() {
  return (
    <header>
      <div className='header-inner'>
        <div className='logoBox'>
        <div className='logo'>Frontend developer/3d Artist</div>
        <div className='logo'>Anton Atangulov</div>
        </div>
        <nav>
          <ul>
            <li>
              <a href='/'>models</a>
            </li>
            <li>
              <a href='/'>about me</a>
            </li>
            <li className='btn'>
              <a href='/'>contacts</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
