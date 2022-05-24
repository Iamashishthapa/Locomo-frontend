import React from 'react';
import './Toolbar.css';
import NavigationItem from '../NavigationItem';
import NavigationItems from '../NavigationItems/NavigationItems';



const toolbar = () => {
    return (
        <div className="toolbar">

            <div className="left-nav">
                <NavigationItem exact link="/">LOCOMO</NavigationItem>
            </div>
            
            <div className="right-nav">
                <NavigationItems />
            </div>    
        </div>
    );
};

export default toolbar;

