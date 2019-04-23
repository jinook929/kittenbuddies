import React, { Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';

class App extends Component {
    constructor() {
        super()
        this.state = {
            cats: [],
            searchfield: ''
        }
    }

    componentDidMount() {
        fetch('https://www.json-generator.com/api/json/get/ceZcVFktMy?indent=2')
            .then(response => response.json())
            // .then(text => console.log(text))
            .then(users => this.setState({ cats: users}))
            ;
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })
    }

    render () {
        const { cats, searchfield } = this.state;
        const filteredCats = cats.filter(cat => {
            return cat.name.toLowerCase().includes(searchfield.toLowerCase())
        })
        return !cats.length ? 
            <h1 className="frame head">Loading</h1> :
            (
                <div className="frame">
                    <h1 className="head"><span>Kitten</span><span>Buddies</span></h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    <p id="instruction">Find your favorites from 101 happiest kitties</p>
                    <Scroll>
                        <CardList cats={filteredCats} />
                    </Scroll>
                </div>
            );
        }
    }

export default App;