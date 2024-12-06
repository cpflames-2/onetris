import { Link } from "react-router-dom";
import './TopNav.css';

export default function TopNav() {
  return (
    <div className="top-nav">
      <Link to="/" className="logo-link">
        <img 
          src="/images/logo.webp" 
          alt="Logo" 
          className="nav-logo" 
        />
      </Link>
      <Link to="/">Home</Link>
      <Link to="/ratings">Ratings Calculator</Link>
    </div>
  );
} 