import React from 'react';

const CldImage = (props) => {    
    const {src, alt,  ...rest} = props;    
    return (
        <img src={`//d2cnhr6egzpvdl.cloudfront.net/image/bzabc/${src}`} alt={alt || ""} {...rest} />
    );
};

export default CldImage;