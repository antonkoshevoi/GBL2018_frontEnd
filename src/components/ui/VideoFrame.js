import React from 'react';

export const VideoFrame = (props) => {
    const {src, title} = props;
    return <iframe 
        src={src}
        title={title}
        width="560" 
        height="315"         
        frameBorder="0" 
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen        
        style={{
          maxWidth: '97%',
          position: 'absolute',
          left: 0,
          right: 0,
          margin: 'auto',
          top: '50%',
          transform: 'translateY(-50%)',
        }}>
    </iframe>    
};
