import "./header.css";
import back from "./images/back.jpg"
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className="header" >
      <div className="headerTitles">
        
        <span className="headerTitleLg">KNOWELEDGE IS POWER</span>
        <span className="headerTitleSm">share what on your mind</span>
        <Link className="nav-button" to="/write" >
						Write Article
				</Link>
      </div>
    
    </div>
  );
}
