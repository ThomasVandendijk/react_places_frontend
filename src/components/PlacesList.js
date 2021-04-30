import React from 'react'
import Place from './Place'
import '../styling/Places.css'

class PlacesList extends React.Component {

    constructor() {
        super();
        this.state = { places : [], input: '', page: 0, next_places: []};
        this.handleNext = this.handleNext.bind(this);
        this.handlePrevious = this.handlePrevious.bind(this);
    }

    componentDidMount(){
        fetch("http://localhost:8000/search?text=brussel&page=0")
            .then(response => response.json())
            .then(json => {this.setState({places: json['results']})})
            .catch(error => console.log(error));
    }

    render() {     
        let placeComponents = [];
    
        
        for (let place of this.state.places){
            placeComponents.push(<Place item={place}/>);
        }

        let result = <ul>{placeComponents}</ul>

        if (this.state.places.length === 0 && this.state.input !== ''){
             result = <p>No results found</p>
        } 
        
        return <div>
            <form>
            <input
                type="text"
                placeholder="search places"
                onChange= {this.handleChange}
                >
            </input>
            </form>
            <div id="outer">
                <div class="inner"><button type="submit" onClick={this.handlePrevious} >Previous</button></div>
                <div class="inner"><button type="submit" onClick={this.handleNext}>Next</button></div>
            </div>
            {result}
        </div>;
        
    }

    handlePrevious(){
        if (this.state.page > 0){
            this.setState({page: this.state.page - 1})
            this.refreshPlaces()
        }
    }

    handleNext(){
        let url = this.getUrl()
        fetch(url)
            .then(response => response.json())
            .then(json => {this.setState({next_places: json['results']})});
        if (this.state.next_places.length !== 0){
            this.setState({page: this.state.page + 1, next_places: []})
            this.refreshPlaces()
        }
    }

    handleChange = (e) => {
        let search_text = e.target.value
        this.setState({input: search_text})
        this.refreshPlaces()
        console.log(search_text)
    }

    refreshPlaces(){
        let url = this.getUrl()
        fetch(url)
            .then(response => response.json())
            .then(json => {this.setState({places: json['results']})});
    }

    getUrl(){
        return "http://localhost:8000/search?text=" + this.state.input + "&page=" + this.state.page
    }
}

export default PlacesList;