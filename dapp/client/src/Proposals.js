
import React, { Component } from "react";
import Card from 'react-bootstrap/Card'
import { Button, ListGroup, Form, Table, Container, Row, Col } from 'react-bootstrap';
import "./Proposals.css";


class Proposals extends Component {

    constructor(props) {
        super(props);

        this.handleClickButton = this.handleClickButton.bind(this);
        this.handleClickText = this.handleClickText.bind(this);
    }

    handleClickButton() {

        console.log("bouton cliqued");
        this.props.onPageChangedClicked(3);
    }

    handleClickText() {
        console.log("texte cliqued");
        this.props.onPageChangedClicked(4);
    }

    componentDidMount = async () => {

    };


    render() {
        return (
            <div className="Proposals">

                <div class="container">
                    <div class="row">
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <h1>Proposals</h1>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-3 bg-color1">
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div class="container p-5 my-5 border">
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Button onClick={() => this.handleClickButton()} variant="dark" > Add new </Button>
                                    </div>
                                </div>
                            </div></div>
                        <div class="col-sm-9 bg-color2"> <div style={{ display: 'flex', justifyContent: 'center' }}>

                            <div class="w-100">
                                <ul class="list-group">
                                    <li class="list-group-item">

                                        <div class="card" onClick={() => this.handleClickText()}>
                                            <div class="card-body">
                                                <h4 class="card-title">proposal 1</h4>
                                                <p class="card-text">Some example text. Some example text.</p>
                                                <a href="#" class="card-link">Go to proposal</a>
                                            </div>
                                        </div>

                                    </li>
                                    <li class="list-group-item">

                                        <div class="card" onClick={() => this.handleClickText()}>
                                            <div class="card-body">
                                            <h4 class="card-title">proposal 2</h4>
                                                <p class="card-text">Some example text. Some example text. Some example text. Some example text.</p>
                                                <a href="#" class="card-link">Go to proposal</a>
                                            </div>

                                        </div></li>
                                    <li class="list-group-item">

                                        <div class="card" onClick={() => this.handleClickText()}>
                                            <div class="card-body">
                                            <h4 class="card-title">proposal 3</h4>
                                                <p class="card-text">Some example text. Some example text.</p>
                                                <a href="#" class="card-link">Go to proposal</a>
                                            </div>

                                        </div></li>
                                </ul>
                            </div>
                            {/* <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <textarea onClick={() => this.handleClickText()}
                                        className="form-control"
                                        id="exampleFormControlTextarea1"
                                        rows="5"> salut ca va
        </textarea>
                                </ListGroup.Item>
                                <ListGroup.Item>Proposition 2</ListGroup.Item>
                                <ListGroup.Item>Proposition 3</ListGroup.Item>
                            </ListGroup> */}

                        </div></div>
                    </div>
                </div>


                {/* <Container>
                    <Row>
                        <Col>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <br></br>
                                <Card style={{ width: '20rem' }}>

                                    <Card.Body>

                                        <Button onClick={() => this.handleClickButton()} variant="dark" > Add new </Button>


                                    </Card.Body>
                                </Card>
                            </div>
                        </Col>
                        <Col>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>


                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <textarea onClick={() => this.handleClickText()}
                                        className="form-control"
                                        id="exampleFormControlTextarea1"
                                        rows="5"> salut ca va
                                        </textarea>
                                        </ListGroup.Item>
                                    <ListGroup.Item>Proposition 2</ListGroup.Item>
                                    <ListGroup.Item>Proposition 3</ListGroup.Item>
                                </ListGroup>

                            </div>
                        </Col>

                    </Row>
                </Container> */}
            </div>

        );
    }
}

export default Proposals;
