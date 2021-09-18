import React, { Component } from 'react';
import { connect } from "react-redux";
import { productActions } from '../../redux/actions/ProductActions';
import Items from '../common/Items';


class Home extends Component {

    constructor(props) {
        super(props)

    }

    componentDidMount() {
        this.props.getAllProducts('')
    }

    render() {

        return (
            <div>
                <section
                    className="bar background-white relative-positioned">
                    <div className="container">
                        <div className="home-carousel">
                            <div className="dark-mask mask-primary" />
                            <div className="container">
                                <div className="homepage owl-carousel">
                                    <div className="item">
                                        <div className="row">
                                            <div className="col-md-5 text-right">
                                                <img src="img/logo.png" alt="" className="ml-auto" />
                                                <h1>Multipurpose responsive theme</h1>
                                                <p>Business. Corporate. Agency.</p>
                                            </div>
                                            <div className="col-md-7"><img src="/images/template-homepage.png" alt="" className="img-fluid" /></div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="row">
                                            <div className="col-md-7 text-center"><img src="/images/template-mac.png" alt="" className="img-fluid" /></div>
                                            <div className="col-md-5">
                                                <h2>46 HTML pages full of features</h2>
                                                <ul className="list-unstyled">
                                                    <li>Sliders and carousels</li>
                                                    <li>4 Header variations</li>
                                                    <li>Google maps, Forms, Megamenu, CSS3 Animations and much more</li>
                                                    <li>+ 11 extra pages showing template features</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="row">
                                            <div className="col-md-5 text-right">
                                                <h1>Design</h1>
                                                <ul className="list-unstyled">
                                                    <li>Clean and elegant design</li>
                                                    <li>Full width and boxed mode</li>
                                                    <li>Easily readable Roboto font and awesome icons</li>
                                                    <li>7 preprepared colour variations</li>
                                                </ul>
                                            </div>
                                            <div className="col-md-7"><img src="/images/template-easy-customize.png" alt="" className="img-fluid" /></div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="row">
                                            <div className="col-md-7"><img src="/images/template-easy-code.png" alt="" className="img-fluid" /></div>
                                            <div className="col-md-5">
                                                <h1>Easy to customize</h1>
                                                <ul className="list-unstyled">
                                                    <li>7 preprepared colour variations.</li>
                                                    <li>Easily to change fonts</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bar background-white">
                    <div className="container">

                        <div className="title-box">
                            <p>Hot Deals</p>
                        </div>
                        <div className="box-flashell">
                            <div id="carousel-example" className="carousel slide" data-ride="carousel">
                                <div className="carousel-inner row w-100 mx-auto owl-flashsell" role="listbox">
                                    <div className="carousel-item col-12 col-sm-6 col-md-4 col-lg-3 active">
                                        <div className="box-simple">
                                            <div className="icon-outlined"><i className="fa fa-desktop"></i></div>
                                            <h3 className="h4">Webdesign</h3>
                                            <p>Fifth abundantly made Give sixth hath. Cattle creature i be don't them behold green moved fowl Moved
                                                life us beast good yielding. Have bring.</p>
                                        </div>
                                    </div>
                                    <div className="carousel-item col-12 col-sm-6 col-md-4 col-lg-3">
                                        <div className="box-simple">
                                            <div className="icon-outlined"><i className="fa fa-desktop"></i></div>
                                            <h3 className="h4">Webdesign2</h3>
                                            <p>Fifth abundantly made Give sixth hath. Cattle creature i be don't them behold green moved fowl Moved
                                                life us beast good yielding. Have bring.</p>
                                        </div>
                                    </div>
                                    <div className="carousel-item col-12 col-sm-6 col-md-4 col-lg-3">
                                        <div className="box-simple">
                                            <div className="icon-outlined"><i className="fa fa-desktop"></i></div>
                                            <h3 className="h4">Webdesign3</h3>
                                            <p>Fifth abundantly made Give sixth hath. Cattle creature i be don't them behold green moved fowl Moved
                                                life us beast good yielding. Have bring.</p>
                                        </div>
                                    </div>
                                    <div className="carousel-item col-12 col-sm-6 col-md-4 col-lg-3">
                                        <div className="box-simple">
                                            <div className="icon-outlined"><i className="fa fa-desktop"></i></div>
                                            <h3 className="h4">Webdesign4</h3>
                                            <p>Fifth abundantly made Give sixth hath. Cattle creature i be don't them behold green moved fowl Moved
                                                life us beast good yielding. Have bring.</p>
                                        </div>
                                    </div>
                                    <div className="carousel-item col-12 col-sm-6 col-md-4 col-lg-3">
                                        <div className="box-simple">
                                            <div className="icon-outlined"><i className="fa fa-desktop"></i></div>
                                            <h3 className="h4">Webdesign5</h3>
                                            <p>Fifth abundantly made Give sixth hath. Cattle creature i be don't them behold green moved fowl Moved
                                                life us beast good yielding. Have bring.</p>
                                        </div>
                                    </div>

                                </div>
                                <a className="carousel-control-prev flashsell-custom-control" href="#carousel-example" role="button" data-slide="prev" >
                                    <button><i className="fa fa-angle-double-left fa-3x"></i></button>
                                    <span className="sr-only">Previous</span>
                                </a>
                                <a className="carousel-control-next flashsell-custom-control" href="#carousel-example" role="button" data-slide="next">
                                    <button><i className="fa fa-angle-double-right fa-3x"></i></button>
                                    <span className="sr-only">Next</span>
                                </a>
                            </div>
                        </div>
                        <div className="section-title">
                            <h3 className="title">Products</h3>
                            <div className="section-nav">
                                <ul className="section-tab-nav tab-nav">
                                    <li><a data-toggle="tab" href="#tab1">New Arrival</a></li>
                                    <li><a data-toggle="tab" href="#tab1">Best Seller</a></li>
                                    <li><a data-toggle="tab" href="#tab1">Sell Off</a></li>
                                    <li><a data-toggle="tab" href="#tab1">All Product</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="products-tabs">
                            <div id="tab1" className="tab-pane active">
                                <div className="products-slick" data-nav="#slick-nav-1">
                                    <div className="row">
                                        {this.props.products != null && this.props.products.map(
                                            (product, i) => {
                                                return (
                                                    <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={i}>
                                                        <Items prod={product} />
                                                    </div>
                                                )
                                            }
                                        )}
                                    </div>
                                </div>
                                <div id="slick-nav-1" className="products-slick-nav"></div>
                            </div>
                        </div>

                    </div>
                </section>

            </div>
        )

    }
}
const mapStateToProps = (state) => {
    return {
        products: state.AllProducts.products,
        count: state.AllProducts.count,
    };
};

const mapDispatchToProps = {
    getAllProducts: productActions.getAll,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);