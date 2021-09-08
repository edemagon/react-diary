import React from 'react';
import './index.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';


class Creation extends React.Component {
    constructor(props) {
        super(props);
        this.createArticle = this.createArticle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            ID: 'undef',
            title: 'undef',
            type: 'undef',
            creationDate: 'undef',
            content: 'Écrivez un essai à propos de votre élément du DOM préféré'
        };
    }
    handleChange(event) {
        const target = event.target;
        const name = target.name;

        this.setState({
            [name]: target.value
        });
    }
    createArticle() {
        this.setState({
            title: 'new',
            creationDate: new Date().toLocaleString()
        });
        console.log(this.state.creationDate);
    }
    handleClick(event) {
        // alert('Un essai a été envoyé : ' + JSON.stringify(this.state));
        this.props.submit(this.state);
        event.preventDefault();
    }
    render() {
        return (
            <Container className="p-3 w-50">
                <Form onSubmit={this.handleClick}>
                    <Form.Group controlId="creation.typeSelect" className="w-50">
                        <Form.Label>Choose article Type</Form.Label>
                        <Form.Control
                            as="select"
                            value={this.state.type}
                            onChange={this.handleChange}
                        >
                            <option value="recipe">Recipe</option>
                            <option value="poem">Poem</option>
                            <option value="trip">Trip</option>
                            <option value="note">Note</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="creation.titleInput" className="mb-3 w-50">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" name="title" placeholder={this.state.title} onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="creation.contentTextArea" className="mb-3 w-100">
                        <Form.Label>Content</Form.Label>
                        <Form.Control as="textarea" style={{ height: '100px' }} name="content" placeholder={this.state.content} onChange={this.handleChange}/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
        );
    }
}
export default Creation;