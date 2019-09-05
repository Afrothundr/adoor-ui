import React, {useState} from 'react';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import { Redirect } from 'react-router-dom';

export const EditButton = props => {
    let [shouldEdit, enterEditMode] = useState(false);
    
    return shouldEdit ? 
    <Redirect to={{pathname: '/dashboard/add-listing', state: {listing: props.listing}}}/> :
    <Fab
        color="primary"
        aria-label="edit"
        onClick={() => enterEditMode(shouldEdit = !shouldEdit)}
        style={
            {
                position: 'absolute',
                zIndex: 5, top: '1rem',
                left: '1rem',
                boxShadow: '0 4px 6px 0 hsla(0, 0%, 0%, 0.2)'
            }
        }>
        <EditIcon />
    </Fab>
};