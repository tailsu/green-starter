import React, {Component} from 'react'
import {bound} from 'class-bind'
import uuid from 'node-uuid'
import store from '$store'
import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Grid, Row, Col, Button} from 'react-bootstrap'

@store('foos')
export default class App extends Component {
    constructor() {
        super();
    }

    render() {
        if (!this.props.foos) {
            return null;
        }
        return <div>
            <Navbar fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href='#'>React-Bootstrap</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem eventKey={1} href='#'>Link</NavItem>
                    <NavItem eventKey={2} href='#'>Link</NavItem>
                    <NavDropdown eventKey={3} title='Dropdown' id='basic-nav-dropdown'>
                        <MenuItem eventKey={3.1}>Action</MenuItem>
                        <MenuItem eventKey={3.2}>Another action</MenuItem>
                        <MenuItem eventKey={3.3}>Something else here</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey={3.3}>Separated link</MenuItem>
                    </NavDropdown>
                </Nav>
            </Navbar>
            <Grid className='under-navbar'>
                    {this.props.foos.map(f => <Row key={f.id}><Button onClick={() => this.onDelete(f)}>{f.id}</Button></Row>)}
                    
                    <Row><Button onClick={this.onAdd}>Add new</Button></Row>
            </Grid>
        </div>
    }

    @bound
    onAdd() {
        this.props.pushNew('foos', {data: 'yes'});
    }

    onDelete(f) {
        this.props.pushDelete('foos', f.id);
    }
}
