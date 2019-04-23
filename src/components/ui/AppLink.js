import React from 'react';

const AppLink = (props) => {    
    const {type} = props;
    
    const links = {
        parents: {
            ios: 'http://itunes.apple.com/app/id1073325131',
            android: 'https://play.google.com/store/apps/details?id=com.gravitybrain.bzabc'
        },
        students: {
            ios: 'http://itunes.apple.com/app/id1436064922',
            android: 'https://play.google.com/store/apps/details?id=air.com.bzabc.student'
        }
    }
    
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
    let os = 'ios';
    
    if (/android/i.test(userAgent)) {
        os = 'android';
    }
    
    return (
        <a href={links[type][os]} target="_blank">{props.children}</a>
    );
};

export default AppLink;