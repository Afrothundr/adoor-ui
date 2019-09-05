import React from "react";
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';

export const ImagePreview = ({ index, url, handleImageDelete }) => (
    <div className="image-preview-card" key={index}>
        <Fab aria-label="delete" onClick={() => handleImageDelete(index)}>
            <DeleteIcon />
        </Fab>
        <img alt="preview" src={url}></img>
    </div>
);

