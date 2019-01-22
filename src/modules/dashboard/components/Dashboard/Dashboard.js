import React from 'react';

export class Dashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            profile: null
        }
    }

    render() {
        return(
            <h1>Hello World</h1>
        )
    }
}