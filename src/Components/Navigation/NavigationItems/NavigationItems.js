import React from 'react';
import NavigationItem from '../NavigationItem';
import './NavigationItems.css'

const navigationItems = () => {
    return (
        <div className="rightNav">
            <NavigationItem  link="/map" exact >Map</NavigationItem>
            <NavigationItem  link="/login" exact >Login</NavigationItem>
            <NavigationItem  link="/signup" exact >Sign Up</NavigationItem>
        </div>    
    );
};

export default navigationItems;