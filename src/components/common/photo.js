import React, { Component } from 'react';
import { Image, Transformation } from 'cloudinary-react';


class Photo extends Component {

    constructor(props) {
        super(props)
    }
    
    componentDidMount(){
        console.log("Photo " + JSON.stringify( this.props))
        console.log("Photo publicId " + this.props.publicId)
    }
    render() {
        return (
            <div>
                <Image publicId={this.props.publicId} cloudName = {this.props.cloudName}>
                    <Transformation aspectRatio={this.props.aspectRatio} height={this.props.height} crop="lfill" />
                </Image>
            </div>
        );

    }

}

export default Photo;

