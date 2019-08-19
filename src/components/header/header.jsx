import React, { useState } from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'

import MenuIconAnimated from '../menu-icon/menu-icon'

import MenuIcon from './menu-icon.svg'
import NUbotsIcon from './nubots-icon.svg'
import SearchIcon from './search-icon.svg'

const HeaderMenu = ({ menu, menuOpen }) => {
  const style = {
    backgroundColor: 'rgba(36,41,46,0.85)',
    backdropFilter: 'blur(20px)',
    display: menuOpen ? 'block' : 'none',
  }
  const getLinkProps = ({ isCurrent }) => {
    return {
      className: `block py-2 font-semibold ${isCurrent ? 'text-nubots-500' : 'text-primary-inverted'}`
    }
  }
  return <nav
    className='container h-screen overflow-y-auto pt-24 pb-6 fixed z-10'
    style={style}
  >
    {
      menu.map(chapter => {
        return <section className='mb-6' key={chapter.title}>
          <h3 className='text-hint-inverted text-sm uppercase tracking-wide font-semibold mb-1'>
            { chapter.title }
          </h3>
          {
            chapter.pages.map(page => (
              <Link
                to={page.slug}
                key={page.slug}
                getProps={getLinkProps}
              >{ page.title }</Link>
            ))
          }
        </section>
      })
    }
  </nav>
}

const Header = ({ menu }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return <>
    <Helmet>
      <body className={menuOpen ? 'overflow-y-hidden' : ''} />
    </Helmet>
    <div className='w-full bg-gray-900 fixed z-20'>
      <div className='container h-16 flex items-center'>
        <NUbotsIcon className='w-9 h-9 md:w-10 md:h-10 flex-shrink-0' />
        <div className='px-6 flex-grow'>
          <div className='relative'>
            <input
              type='text'
              placeholder='Search handbook...'
              className='h-10 w-full pl-14 pr-4 rounded appearance-none text-base md:text-lg bg-gray-800 placeholder-gray-500 text-white focus:bg-white focus:text-primary'
            />
            <SearchIcon className='absolute top-0 left-0 w-6 h-6 ml-4 mt-2 text-icon-inverted pointer-events-none' />
          </div>
        </div>
        <div className='h-6'>
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <MenuIconAnimated menuOpen={menuOpen} />
            {/*<MenuIcon className='text-icon-inverted' />*/}
          </button>
        </div>
      </div>
    </div>
    <HeaderMenu menu={menu} menuOpen={menuOpen} />
  </>
}

export default Header
