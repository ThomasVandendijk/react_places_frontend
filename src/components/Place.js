import React from 'react'

class Place extends React.Component {
    render(){
        let link = '';
        console.log('photos',this.props.item.photos)

        if (this.props.item.photos && this.props.item.photos.length !== 0){
            let photo_reference = this.props.item.photos[0]['photo_reference']
            let url = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photoreference=' + photo_reference + '&key=AIzaSyAxppkIvtGHdKv1bpW2S3hikwCDBDehuGc'
            link = <a href={url}>View</a>
        }
        return <li>
            <h3>{this.props.item.name}</h3>
            <p>{this.props.item.formatted_address}</p>
            <p>Rating: {this.props.item.rating}</p>
            {link}
        </li>
    }
}

export default Place