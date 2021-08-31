
import React, { Component } from 'react';
import Photo from './photo';
import { config } from '../../config/config'
import { Rating } from 'primereact/rating';
import { Image, Transformation } from 'cloudinary-react';

class Items extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="product ">
                <div className="product-img">
                    {
                        this.props.prod.thumbnail != null &&
                        <Photo
                            publicId={this.props.prod.thumbnail[0]}
                            cloudName={config.cloudinaryConfig.cloud_name} 
                            height="250" aspectRatio="1.0"/>

                    }
                    {/* <img src="/images/template-homepage.png" alt="" className="img-fluid" /> */}
                    <div className="product-label">
                        <span className="sale">-30%</span>
                        <span className="new">NEW</span>

                    </div>
                </div>
                <div className="product-body">
                    <h3 className="product-name"><a href="#">{this.props.prod.name}</a></h3>
                    <h4 className="product-price">{this.props.prod.price} <del className="product-old-price">$990.00</del></h4>
                    <div className="product-rating">
                        <Rating value={this.props.prod.vote} readOnly cancel={false} />
                    </div>
                    <div className="product-btns">
                        <button className="add-to-wishlist"><i className="fa fa-heart-o"></i><span className="tooltipp">add to
                            wishlist</span></button>
                        <button className="quick-view"><i className="fa fa-eye"></i><span className="tooltipp">quick
                            view</span></button>
                        <button className="add-cart"><i className="fa fa-shopping-cart"></i><span className="tooltipp">add to cart</span></button>
                    </div>
                </div>

            </div>
        )
    }

}

export default Items