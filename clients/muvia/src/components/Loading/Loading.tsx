import React from 'react'

function Loading() {
    return (
        <div style={{width:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}>
            <video autoPlay loop muted playsInline
                 style={{ width: '300px', height: '300px' }} 
            >
                <source src="/loading.webm" type="video/webm" />
                Your browser does not support the video tag.
            </video>
        </div>

    )
}

export default Loading