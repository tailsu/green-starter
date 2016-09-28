import React, {Component} from 'react'
import store from '$store'
import {Grid, Row, Col, Button} from 'react-bootstrap'

@store('funny')
export default class App extends Component {
    constructor() {
        super();

        this.onClick = this.onClick.bind(this);
    }

    render() {
        return <Grid>
            <Row><div>{this.props.funny || 'wot'}</div></Row>
            <Row><Button onClick={this.onClick}>Go!</Button></Row>
        </Grid>
    }

    onClick() {
        this.props.makeFunny('very funny');
    }
}
