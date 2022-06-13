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
            <li className='btn'>
              <a href='https://github.com/AntonAtnagulov'>GitHub</a>
            </li>
            <li className='btn'>
              <a href='https://t.me/antonatnagulov'>Telegram</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
