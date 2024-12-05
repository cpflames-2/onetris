import { Link } from "react-router-dom";
import './TopNav.css';

export default function TopNav() {
  return (
    <div className="top-nav">
      <Link to="/">Home</Link>
      <Link to="/ratings">Ratings Calculator</Link>
    </div>
  );
} 