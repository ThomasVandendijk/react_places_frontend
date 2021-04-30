import React from 'react'
import '../styling/Places.css'
import PlacesList from './PlacesList'

class Places extends React.Component {

    render() {
        return <div>
            <h2>Search for places</h2>
            <PlacesList />
        </div>;
    }
}

export default Places