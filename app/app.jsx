import React, {Component} from 'react'
import {bound} from 'class-bind'
import uuid from 'node-uuid'
import store from '$store'
import {Grid, Row, Col, Button} from 'react-bootstrap'

@store('foos')
export default class App extends Component {
    constructor() {
        super();
    }

    render() {
        if (!this.props.foos) {
            return null;
        }
        return <Grid>
            {this.props.foos.map(f => <Row key={f.id}><Button onClick={() => this.onDelete(f)}>{f.id}</Button></Row>)}
            
            <Row><Button onClick={this.onAdd}>Add!</Button></Row>
        </Grid>
    }

    @bound
    onAdd() {
        this.props.pushNew('foos', {data: 'yes'});
    }

    onDelete(f) {
        this.props.pushDelete('foos', f.id);
    }
}
