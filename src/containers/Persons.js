import React, { Component } from 'react';
import * as actionTypes from '../store/actions';
import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';
import { connect } from 'react-redux';

class Persons extends Component {

    render() {
        console.log('PROPS ABAIXO');
        console.log(this.props);
        console.log('-------------------------------');
        return (
            <div>
                <AddPerson personAdded={() => this.props.onPersonAddedHandler({
                    id: Math.random(), // not really unique but good enough here!
                    name: 'Max',
                    age: Math.floor(Math.random() * 40)
                })} />
                {this.props.persons.map(person => (
                    <Person
                        key={person.id}
                        name={person.name}
                        age={person.age}
                        clicked={() => this.props.onPersonDeletedHandler(person.id)} />
                ))}
            </div>
        );
    }
}
//STATE SE REFERE A INDEX.JS 
//PROPRIEDADES CRIADAS NO rootReducer
const mapStateToProps = state => {
    return {
        persons: state.persons.persons
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onPersonAddedHandler: (person) => dispatch({ type: actionTypes.ADD_PERSON, person: person }),
        onPersonDeletedHandler: (id) => dispatch({ type: actionTypes.DELETE_PERSON, id: id })
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Persons);