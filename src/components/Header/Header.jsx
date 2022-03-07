import './Header.scss'
import {Link, NavLink} from 'react-router-dom'
import avatar from '../../assets/images/avatar.png'

const Header = () => {
  return (
    <header className="header">
      <div className="wrapper">
        <div className="header-content">
          <div className="header__logo"><Link to="/">Logo</Link></div>
          {/*<nav className="header__nav">*/}
          {/*  <ul className="header__nav-tabs">*/}
          {/*    <li className="header__nav-tab">*/}
          {/*      <NavLink className='header__nav-tab__link' to='/'>Application list</NavLink>*/}
          {/*    </li>*/}
          {/*    <li className="header__nav-tab">*/}
          {/*      <NavLink className='header__nav-tab__link' to='/my-applications'>My applications</NavLink>*/}
          {/*    </li>*/}
          {/*  </ul>*/}
          {/*  <div className="header__nav-buttons">*/}
          {/*    <button className="header__nav-button">*/}
          {/*      <img src={avatar} alt="avatar"/>*/}
          {/*      <span className="header__nav-username">Daria P.</span>*/}
          {/*    </button>*/}
          {/*    <button className="header__nav-button header__nav-button__lang">EN</button>*/}
          {/*  </div>*/}
          {/*</nav>*/}
        </div>
      </div>

    </header>
  )
}

export default Header