import React from 'react';

const Logo = props => {    

    //const url = '//d2cnhr6egzpvdl.cloudfront.net/image/gravitybrain-logo.svg';
    const url = '//d2cnhr6egzpvdl.cloudfront.net/image/bzabc/BZabc_logo_top.png';    
    
    return <div className={props.className || 'm-login__logo'}>
        <a href={props.isLoggedIn ? '/dashboard' : '/'}>
            <img src={url} alt=""/>
        </a>
    </div>;
}

export default Logo;