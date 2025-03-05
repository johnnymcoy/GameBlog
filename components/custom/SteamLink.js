import { useRef } from 'react';
import CSS from './SteamLink.module.css'

export default function SteamLink({ src, width, height }) {

    const DefaultWidth = 646;
    const DefaultHeight = 190;
    const DefaultLink = "https://store.steampowered.com/widget/2926030/"
    const Link = src ? src : DefaultLink;
    const FrameWidth = width ? width : DefaultWidth;
    const FrameHeight = height ? height : DefaultHeight;
    const iframeRef = useRef();

    // if(iframeRef &&  iframeRef.current)
    // {
    //     iframeRef.current.style.background = "black"
    //     iframeRef.current.contentWindow.document.body.style.backgroundColor = "black"
    // }
    // var iframe = document.getElementsByTagName('iframe')[0];
    // iframe.style.background = 'black';
    // iframe.contentWindow.document.body.style.backgroundColor = 'white';

    return(
<div className={CSS.container}>
    <iframe ref={iframeRef} className={CSS.frame} 
    allowTransparency="true" 
    src={Link} 
        //width={FrameWidth} height={FrameHeight}
    >
    </iframe>
</div>
)}


