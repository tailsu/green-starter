import React, {Component} from 'react'
import store from './state/store'
import {Grid, Row, Col} from 'react-bootstrap'

@store('funny')
export default class App extends Component {
    constructor() {
        super();

        this.onClick = this.onClick.bind(this);
    }

    render() {
        return <Grid>
            <Row><div>{this.props.funny || 'wot'}</div></Row>
            <Row><button onClick={this.onClick}>Go!</button></Row>
        </Grid>
    }

    onClick() {
        this.props.makeFunny('very funny');
    }
}
