import React, {Component} from 'react'
import {bound} from 'class-bind'
import uuid from 'node-uuid'
import store from '$store'
import {Grid, Row, Col, Button} from 'react-bootstrap'

@store('funny')
export default class App extends Component {
    constructor() {
        super();
    }

    render() {
        return <Grid>
            <Row><div>{this.props.funny || 'wot'}</div></Row>
            <Row><Button onClick={this.onAdd}>Add!</Button></Row>
            <Row><Button onClick={this.onUpdate}>Update!</Button></Row>
            <Row><Button onClick={this.onRemove}>Remove!</Button></Row>
        </Grid>
    }

    @bound
    onAdd() {
        this.props.pushNew('foos', {id: 1, data: 'yes'});
    }
    @bound
    onUpdate() {
        this.props.pushUpdate('foos', {id: 1, data: 'no', and: 1});
    }
    @bound
    onRemove() {
        this.props.pushDelete('foos', 1);
    }
}
