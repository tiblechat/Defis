
import React, { Component } from "react";

import Card from 'react-bootstrap/Card'
import { Button, ListGroup, Form, Table } from 'react-bootstrap';
import Stepper from 'react-stepper-horizontal';
class Admin extends Component {

    // TODO: move steps outside state if necessary

    constructor() {
        super();
        this.state = {
            steps: [{
                title: 'Step One',
                href: 'http://example1.com',
                onClick: (e) => {
                    e.preventDefault()
                    console.log('onClick', 1)
                }
            }, {
                title: 'Step Two',
                href: 'http://example2.com',
                onClick: (e) => {
                    e.preventDefault()
                    console.log('onClick', 2)
                }
            }, {
                title: 'Step Three (Disabled)',
                href: 'http://example3.com',
                onClick: (e) => {
                    e.preventDefault()
                    console.log('onClick', 3)
                }
            }, {
                title: 'Step Four',
                href: 'http://example4.com',
                onClick: (e) => {
                    e.preventDefault()
                    console.log('onClick', 4)
                }
            }],
            currentStep: 0,
        };
        this.onClickNext = this.onClickNext.bind(this);
    }

    onClickNext() {
        const { steps, currentStep } = this.state;
        this.setState({
            currentStep: currentStep + 1,
        });
    }
    componentDidMount = async () => {

    };


    render() {
        const { steps, currentStep } = this.state;
        const buttonStyle = { background: '#E0E0E0', width: 200, padding: 16, textAlign: 'center', margin: '0 auto', marginTop: 32 };



        return (
            <div className="Admin">
                
               
              
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Card style={{ width: '50rem' }}>
                        <Card.Header><strong>Voting status</strong></Card.Header>
                        <Card.Body>
                            <Stepper steps={steps} activeStep={currentStep} disabledSteps={[2]} />
                            <div style={buttonStyle} onClick={this.onClickNext}>Next</div>
                        </Card.Body>
                    </Card>
                </div>
                <br></br>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Card style={{ width: '50rem' }}>
                        <Card.Header><strong>Autoriser un nouveau compte</strong></Card.Header>
                        <Card.Body>
                            <Form.Group controlId="formAddress">
                                <Form.Control type="text" id="address"
                                    ref={(input) => { this.address = input }}
                                />
                            </Form.Group>
                            <Button variant="dark" > Autoriser </Button>


                        </Card.Body>
                    </Card>
                </div>
                <br></br>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Card style={{ width: '50rem' }}>
                        <Card.Header><strong>Liste des comptes autorisés</strong></Card.Header>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>@</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.props.whitelist !== null && this.props.whitelist.map((a) => <tr><td>{a}</td></tr>)
                                            }
                                        </tbody>
                                    </Table>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        );
    }
}

export default Admin;
