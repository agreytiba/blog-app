import { useState, useContext } from 'react';

import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import './navabar.css';
import avatar from "./image/avatar-2.jpg"

const Navbar = () => {
	const [ active, setActive ] = useState(false);
	const { user, dispatch } = useContext(Context);
	const PF = 'http://localhost:5000/images/';

	// handleclick for responsive navbar
	const handleClick = () => {
		setActive(!active);
	};

	// handle lagout for user
	const handleLogout = () => {
		dispatch({ type: 'LOGOUT' });
	};
	return (
		<nav className="navbar">
			<Link to="/" className="navbar-logo">
				<h1 >blog</h1>
			</Link>
			<div className="menu-icon" onClick={handleClick}>
				<i className={active ? 'fas fa-times' : 'fas fa-bars'} />
			</div>
			{/* navigation link */}
			<ul className={active ? 'nav-menu active' : 'nav-menu'}>
				<li>
					<Link className="nav-links" to="/" >
						HOME
					</Link>
				</li>
				<li>
					<Link className="nav-links" to="/" >
						ABOUT
					</Link>
				</li>
				<li>
					<Link className="nav-links" to="/" >
						CONTACT
					</Link>
				</li>
				<li>
					<Link className="nav-links" to="/write" >
						WRITE
					</Link>
				</li>
				<li className={user ? "nav-links":"nav-logout"} onClick={handleLogout}>{user && 'LOGOUT'}</li>
			</ul>

			{/* setting, login & reigister */}

			<div className="topRight">
				{/* check if there is user  diplay setting  but if not 
				display login and  register button*/}
				{user ? (
				     <>
						<Link to="/settings" className='link-setting'>
							<img className="topImg" src={avatar} de alt="" />
						<span>{user.username}</span>
					</Link>
					</>
				) : (
					<ul className="topList" type="none">
						<li className="topListItem nav-login">
							<Link className="link" to="/login">
								LOGIN
							</Link>
						</li>
						<li className="topListItem nav-login">
							<Link className="link" to="/register">
								REGISTER
							</Link>
						</li>
					</ul>
				)}
				
			</div>
		</nav>
	);
};

export default Navbar;
