import { FC } from "react";
import { ListOfSubjects } from "../listOfSubjects";
import "./details.css";
import "./style.css";
import arrowHeader from "../../images/arrow-header.svg";
import { Link } from "react-router-dom";

export const Header: FC = () => {
  return (
    <div className="header-bg">
      <div className="header-box">
      <div className="header-left">
        <div className="sub-menu-parent">
          <Link to="/" className="header-link" style={{display: 'flex', alignItems: 'center'}}>
            <img alt="arrow" style={{height: 64}} src={arrowHeader}/>
            Subject
          </Link>
          <ListOfSubjects />
        </div>
      </div>
      <div className="header-right">
        <Link to="/auth" className="header-link link-with-hover link-with-hover1">Log in</Link>
        <Link to="/auth" className="header-link link-with-hover link-with-hover3">Sign up</Link>
      </div>
    </div>
    </div>
  );
};
