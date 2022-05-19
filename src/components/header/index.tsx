import { FC } from "react";
import { ListOfSubjects } from "../listOfSubjects";
import "./details.css";
import "./style.css";
import arrowHeader from "../../images/arrow-header.svg";

export const Header: FC = () => {
  return (
    <div className="header-bg">
      <div className="header-box">
      <div className="header-left">
        <div className="sub-menu-parent">
          <div style={{display: 'flex', alignItems: 'center'}}>
            <img alt="arrow" style={{height: 64}} src={arrowHeader}/>
            <p style={{marginLeft: 0}} className="header-link">Subject</p>
          </div>
          <ListOfSubjects />
        </div>
      </div>
      <div className="header-right">
        <p className="header-link">Sign in</p>
        <p className="header-link">Sign up</p>
      </div>
    </div>
    </div>
  );
};
