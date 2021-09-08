import React from 'react';
import './index.css';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import AddIngredient from './AddIngredient.js';


class ComputeRecipe extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeIng = this.handleChangeIng.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.addIng = this.addIng.bind(this);
        this.removeIng = this.removeIng.bind(this);
        this.selectChoice = this.selectChoice.bind(this);
        this.SumNutrients = this.SumNutrients.bind(this);
        this.findIng = this.findIng.bind(this);
        this.state = {
            new: '',
            title: 'Your recipe title',
            type: 'recipe type',
            ingredients: [],
            nutrientFacts: {}
        };
    }
    //Confirmrecipe: clean choices, calculate overall nutrtional facts
    SumNutrients() {
        let nutrientFacts = {
            kcal: 0,
            carbohydrate: 0,
            sugars: 0,
            lipid: 0,
            protein: 0
        };
        const ingredients = this.state.ingredients.slice();
        ingredients.forEach((ing) =>{
            nutrientFacts['kcal'] += ing.value.nutrientFacts.kcal || 0;
            nutrientFacts['carbohydrate'] += ing.value.nutrientFacts.carbohydrate || 0;
            nutrientFacts['lipid'] += ing.value.nutrientFacts.lipid || 0;
            nutrientFacts['protein'] += ing.value.nutrientFacts.protein || 0;
            nutrientFacts['sugars'] += ing.value.nutrientFacts.sugars || 0;
        });
        this.setState({
            nutrientFacts: nutrientFacts
        });
    }
    handleChange(event) {
        const target = event.target;
        const name = target.name;
        this.setState({
            [name]: target.value
        });
    }
    handleChangeIng(event, index) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        let ingredients = this.state.ingredients.slice();
        ingredients[index][name] = value;
        this.setState({
            ingredients: ingredients
        });
    }
    handleClick(event) {
        alert('Une recette a été envoyé : ' + JSON.stringify(this.state));
        event.preventDefault();
    }
    addIng() {
        let ingredients =this.state.ingredients.slice();
        ingredients.push({
            userInputName: 'Ingredient name',
            userInputQuantity: 'Quantity in grams',
            choices: []
        });
        this.setState({
            ingredients: ingredients
        });
    }
    removeIng(event, ingNumber) {
        let ingredients = this.state.ingredients.slice();
        ingredients.splice(ingNumber, 1);
        this.setState({
            ingredients: ingredients
        });
    }
    findIng(event, ingNumber) {
        let value = this.state.ingredients[ingNumber].userInputName;
        // let ApiBase= "https://api.nal.usda.gov/fdc/v1/foods/search?query=XXX&pageSize=&api_key=tgyxI8kaDGTFx9V50jKbPXTpMnzKSEJG3c6oAZsD";
        let apiBase= "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=DEMO_KEY&";
        let requestBody= {
            "query": value,
            "generalSearchInput": value,
            "includeDataTypes" : {
                "SR Legacy": true
            },
            "includeMarketCountries": null,
            "referenceFoodsCheckBox": true,
            "exactBrandOwner": null,
            "requireAllWords": true,
            "pageNumber": 1,
            "sortCriteria":{
                "sortColumn":"description",
                "sortDirection":"asc"
            }
        };
        // get all entities - GET
        fetch(apiBase, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
            .then(response => response.json())
            .then(response => {
                let responses= response.foods.slice(0,10);
                let choices = [];
                responses.forEach((response, index) => {
                    choices[index] = {
                        fdcId: response.fdcId,
                        foodCategory: response.foodCategory,
                        description: response.description,
                        nutrientFacts: {
                            protein: 0,
                            carbohydrate: 0,
                            lipid:0,
                            sugar: 0,
                            kcal:0
                        }
                    };
                    response.foodNutrients.forEach((nutrientFact) => {
                        switch (nutrientFact.nutrientName) {
                            case 'Protein':
                                choices[index].nutrientFacts.protein = nutrientFact.value;
                                break;
                            case 'Carbohydrate, by difference':
                                choices[index].nutrientFacts.carbohydrate = nutrientFact.value;
                                break;
                            case 'Total lipid (fat)':
                                choices[index].nutrientFacts.lipid = nutrientFact.value;
                                break;
                            case 'Sugars, Total NLEA':
                                choices[index].nutrientFacts.sugar = nutrientFact.value;
                                break;
                        }
                        if (nutrientFact.unitName === 'KCAL') {
                            choices[index].nutrientFacts.kcal= nutrientFact.value;
                        }
                    });
                });
                let ings = this.state.ingredients.slice();
                ings[ingNumber].choices = choices;
                this.setState({
                    ingredients: ings
                });
            })
            .catch(err => { console.log(err);});
    }
    selectChoice(event, ingNumber, choiceNumber) {
        const computeQuantityNutrients = function(ingNutrientFacts, ingQuantity) {
            let nutrientFacts = {};
            for (const [key, value] of Object.entries(ingNutrientFacts)) {
                nutrientFacts[key] = value * (ingQuantity/100);
            }
            return nutrientFacts;
        };
        let ings = this.state.ingredients.slice();
        let choice = ings[ingNumber].choices[choiceNumber];
        ings[ingNumber]['value'] = choice;
        ings[ingNumber]['value']['nutrientFacts'] = computeQuantityNutrients(choice.nutrientFacts, ings[ingNumber].userInputQuantity);
        // TODO cleanup choices
        this.setState({
            ingredients: ings
        });
        this.SumNutrients();
    }
    render() {
        const showNutrientFacts = () => {
            if (this.state.nutrientFacts) {
                return (
                    <Table bordered hover>
                        <thead>
                        <tr>
                            <th>kcal</th>
                            <th>carbohydrate</th>
                            <th>sugars</th>
                            <th>lipid</th>
                            <th>protein</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{this.state.nutrientFacts.kcal}</td>
                            <td>{this.state.nutrientFacts.carbohydrate}</td>
                            <td>{this.state.nutrientFacts.sugars}</td>
                            <td>{this.state.nutrientFacts.lipid}</td>
                            <td>{this.state.nutrientFacts.protein}</td>
                        </tr>
                        </tbody>
                    </Table>
                );
            }
        };
        return (
            <Container fluid className="article-recipe p-5 w-75">
                <Form onSubmit={this.handleClick}>
                    <Form.Group controlId="compute.type" className="w-50">
                        <Form.Label>Choose article Type</Form.Label>
                        <Form.Control
                            as="select"
                            name="type"
                            value={this.state.type}
                            onChange={this.handleChange}
                        >
                            <option value="choose">Choose</option>
                            <option value="dessert">Dessert</option>
                            <option value="plat">Plat</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='compute.title' className="mb-3 w-50">
                        <Form.Label>Titre de la recette</Form.Label>
                        <Form.Control type="text" name="title" placeholder={this.state.title} onChange={this.handleChange}/>
                    </Form.Group>
                {this.state.ingredients.map((ing, index) => {
                    return (
                        <AddIngredient
                            ing={ing}
                            index={index}
                            handleChangeIng={this.handleChangeIng}
                            findIng={this.findIng}
                            selectChoice={this.selectChoice}
                            removeIng={this.removeIng}
                        />
                    );
                })}
                    <Button variant="info" onClick={this.addIng} className="m-3">
                        Add ingredient
                    </Button>
                    <Button variant="success" type="submit" className="m-3">
                        create recipe
                    </Button>
                </Form>

                <div>
                    <p>La recette de {this.state.title}</p>
                    <i>{this.state.type}</i>
                    <ul>
                        {this.state.ingredients.map((ing, index) => {
                            return ing.value ? <li key={'ing.' + index}> {ing.userInputQuantity} grams {ing.value.description}</li> : <li key={'ing.' + index}> choose ingredients</li>
                        })}
                    </ul>
                </div>
                {showNutrientFacts()}
            </Container>
        );
    }
}
export default ComputeRecipe;