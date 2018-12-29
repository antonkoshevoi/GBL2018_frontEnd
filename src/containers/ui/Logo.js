import React from 'react';

const Logo = props => {    

    //const url = '//d2cnhr6egzpvdl.cloudfront.net/image/gravitybrain-logo.svg';
    const url = '//d2cnhr6egzpvdl.cloudfront.net/image/bzabc/BZabc_logo_top.png';
    
    const style = {
        maxWidth: 180
    };
    
    return <div className={props.className || 'm-login__logo'}>
        <a href={"/"}>
            <img style={style} src={url} alt=""/>
        </a>
    </div>;
}

export default Logo;