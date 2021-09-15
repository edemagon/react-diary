import React from 'react';
import './index.css';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';


class AddIngredient extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            show: false,
            userInput: '',
            choices: []
        };
    }
    handleShow() {
        this.setState({show: true});
    }
    handleClose() {
        this.setState({show: false});
    }
    // mise à jour userInput
    handleChange(event) {
        const target = event.target;
        const name = target.name;
        this.setState({
            [name]: target.value
        });
    }
    render() {
        let showSelection;
        if (this.props.ing.value) {
            showSelection = <Card className="m-2" style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{this.props.ing.value.description}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{this.props.ing.value.category}</Card.Subtitle>
                    <Card.Text>
                        {this.props.ing.userInputQuantity} grams: {this.props.ing.value.nutrientFacts.kcal} Kcal, {this.props.ing.value.nutrientFacts.carbohydrate} G, {this.props.ing.value.nutrientFacts.protein} P, {this.props.ing.value.nutrientFacts.lipid} L
                    </Card.Text>
                </Card.Body>
            </Card>
        }
        else {
            showSelection = <p><Form.Group controlId={'compute.' + this.props.index} className="mb-3 w-50">
                <Form.Label>Ingredient n° {this.props.index + 1}</Form.Label>
                <Form.Control type="text" name="userInputName" placeholder={this.props.ing.userInputName} onChange={e => this.props.handleChangeIng(e, this.props.index)}/>
                <Form.Control type="text" name="userInputQuantity" placeholder={this.props.ing.userInputQuantity} onChange={e => this.props.handleChangeIng(e, this.props.index)}/>
            </Form.Group>
                <Button variant="primary" onClick={e => {this.state.show = true; this.props.findIng(e, this.props.index)}}>
                    Show ingredients
                </Button></p>
        }
        return (
            <Container className="pl-5">
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Select ingredient from list</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ul>
                            {!this.props.ing.value && this.props.ing.choices && this.props.ing.choices.map((choice, index) => {
                                return (
                                    <li key={'choices.' + index}>
                                        {choice.description}
                                        <button variant="info" onClick={e => {this.props.selectChoice(e, this.props.index, index); this.handleClose()}}>
                                            Select
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                    </Modal.Body>
                </Modal>
                {showSelection}
                        <Button variant="warning" onClick={e => this.props.removeIng(e, this.props.index)}>
                            Remove
                        </Button>
            </Container>
        );
    }
}
export default AddIngredient;