import { mdiAccount } from '@mdi/js'; 
import Icon from '@mdi/react';
import { useState } from 'react';
import { mdiPlusCircle } from '@mdi/js';

function BasePictureCropper() {
    const [overlayHeight, editOverlayHeight] = useState("0px");
    const [image, setImage] = useState(null);

    return <div className="base-picture-cropper">
        <div
            className="cropper-image"
            onMouseEnter={() => editOverlayHeight("100%")}
            onMouseLeave={() => editOverlayHeight("0px")}
        >
            <GetImage image={image} />
            <div style={{ height: overlayHeight }} className="cropper-overlay">
                <div
                    className="overlay-trigger-icon"
                    style={{ visibility: overlayHeight !== "0px" ? "visible" : "hidden" }}
                >
                    { !image ? <Icon path={mdiPlusCircle} size={2} /> : '' }
                </div>
            </div>
        </div>
    </div>
}

function GetImage(props) {
    return props.image !== 'null' ?
        <Icon path={mdiAccount} size={6} /> : "";
}

export default BasePictureCropper;