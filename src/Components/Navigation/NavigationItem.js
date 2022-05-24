import React from 'react';
import {NavLink} from 'react-router-dom';
import './NavigationItem.css';


const navigationItems = (props) => {
    return (
        <div>
            <NavLink
                exact = {props.exact}
                to={props.link}
                activeClassName={props.classname}
                activeStyle={props.children !== "LOCOMO" ? 
                {
                    backgroundColor:"#FED440",
                    color:"black"
                }: null} > {props.children}</NavLink>
        </div>
    );
};

export default navigationItems;