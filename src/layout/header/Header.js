
import React from 'react';
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Login from '../../components/authen/Login';
import AdminNav from '../../components/managements/AdminNav';
import { LogOutAuthAction } from "../../redux/actions/AuthAction";
import ErrorHandler from "../../components/error/ErrorHandler";
import AvatarComp from '../../components/authen/AvatarComp';


function Header(props) {

    const { auth, logout, errorHandler } = props;
    const history = useHistory();
    return (
        <div>
            <ErrorHandler
                errorHandler={errorHandler || { hasError: false, message: "" }}
            />
            <div className="top-bar align-items-center">
                <div className="contact-info">
                    <div className="container">
                        <div className="row d-flex contact-info">
                            <div className="col-md-6 d-md-block d-none">
                                <p>Contact us on +420 777 555 333 or hello@universal.com.</p>
                            </div>
                            <div className="col-md-6">
                                {!auth.isLoggedIn ? (
                                    <div className="d-flex justify-content-md-end justify-content-between">

                                        <div className="login">
                                            <a href="#" data-toggle="modal" data-target="#login-modal" className="login-btn"><i
                                                className="fa fa-sign-in"></i><span className="d-none d-md-inline-block">Sign In</span></a>
                                            <a className="signup-btn"><i className="fa fa-user"></i><span
                                                className="d-none d-md-inline-block">Sign Up</span></a>
                                        </div>
                                    </div>
                                ) : (
                                    // <React.Fragment>
                                    //     <h5>{auth.user.name}</h5>
                                    //     <button
                                    //         className="btn btn-danger btn-sm mx-2"
                                    //         onClick={() => {
                                    //             logout(history);
                                    //         }}
                                    //     >
                                    //         Log Out
                                    //     </button>
                                    // </React.Fragment>
                                    <AvatarComp/>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="search-component">
                    <div className="container">
                        <div className="row">
                            {/* <!-- LOGO --> */}
                            <div className="col-md-3">
                                <div className="header-logo">
                                    <a href="index.html" className="navbar-brand home">
                                        <img src="img/logo.png" alt="Universal logo" className="d-none d-md-inline-block" />
                                        <img src="img/logo-small.png" alt="Universal logo" className="d-inline-block d-md-none" />
                                        <span className="sr-only">Universal - go to homepage</span>
                                    </a>
                                </div>
                            </div>
                            {/* <!-- /LOGO -->

                            <!-- SEARCH BAR --> */}
                            <div className="col-md-6">
                                <div className="header-search">
                                    <form>
                                        <input className="input" placeholder="Search here" />
                                        <button className="search-btn">Search</button>
                                    </form>
                                </div>
                            </div>
                            {/* <!-- /SEARCH BAR -->

                            <!-- ACCOUNT --> */}
                            <div className="col-md-3">
                                <div className="header-ctn">
                                    {/* <!-- Wishlist --> */}
                                    <div>
                                        <a href="#">
                                            <i className="fa fa-heart-o"></i>
                                            <span>Your Wishlist</span>
                                            <div className="qty">2</div>
                                        </a>
                                    </div>
                                    {/* <!-- /Wishlist -->

                                <!-- Cart --> */}
                                    <div>
                                        <a href="#">
                                            <i className="fa fa-shopping-cart"></i>
                                            <span>Your Cart</span>
                                            <div className="qty">3</div>
                                        </a>

                                    </div>
                                    {/* <!-- /Cart --> */}

                                    {/* <!-- Menu Toogle --> */}
                                    <div className="menu-toggle">
                                        <a href="#" data-toggle="collapse" data-target="#navigation">
                                            <i className="fa fa-bars" data-toggle="collapse" data-target="#navigation"></i>
                                            <span>Menu</span>
                                        </a>
                                    </div>
                                    {/* <!-- /Menu Toogle --> */}
                                </div>
                            </div>
                            {/* <!-- ACCOUNT --> */}
                        </div>
                        {/* <!-- row --> */}

                    </div>
                </div>
                <div id="navbar">
                    <div className="container">
                        <AdminNav />
                    </div>
                </div>
            </div>

            <div id="login-modal" role="dialog" aria-labelledby="login-modalLabel" aria-hidden="true" className="modal fade">
                <Login />
            </div>
        </div>

    );

}

const mapStateToProps = (state) => {
    return {
        auth: state.authState,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: (history) => {
            dispatch(LogOutAuthAction(history));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);