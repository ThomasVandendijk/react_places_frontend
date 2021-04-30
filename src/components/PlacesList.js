import React from 'react'
import Place from './Place'

class PlacesList extends React.Component {

    constructor() {
        super();
        this.state = { places : [], input: ''};
        
    }

    componentDidMount(){
        fetch("http://localhost:8000/search?text=brussel")
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
            <form action='/' method="get">
            <input
                type="text"
                onChange= {this.handleChange}
                >
            </input>
            </form>
            {result}
        </div>;
        
    }

    handleSubmit(e) {
        //fetch("http://localhost:8000/search?text=Leuven")
         //   .then(response => response.json())
          //  .then(json => {this.setState({places: json['results']})});
          this.setState({places: []})
        
    }

    handleChange = (e) => {
        let search_text = e.target.value
        let url = "http://localhost:8000/search?text=" + search_text
        fetch(url)
            .then(response => response.json())
            .then(json => {this.setState({places: json['results']})});
        this.setState({input: search_text})
        console.log(search_text)
    }
}

export default PlacesList;