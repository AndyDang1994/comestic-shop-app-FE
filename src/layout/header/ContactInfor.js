import AvatarComp from '../../components/authen/AvatarComp';
import React from 'react';

export const ContactInfor = (props) => {
    const {isLoggedIn}  = props
    console.log("ContactInfor " + isLoggedIn)
    return (
        <div className="top-bar align-items-center">
            <div className="contact-info">
                <div className="container">
                    <div className="row d-flex contact-info">
                        <div className="col-md-6 d-md-block d-none">
                            <p>Contact us on +420 777 555 333 or hello@universal.com.</p>
                        </div>
                        <div className="col-md-6">
                            {!isLoggedIn ? (
                                <div className="d-flex justify-content-md-end justify-content-between">

                                    <div className="login">
                                        <a href="#" data-toggle="modal" data-target="#login-modal" className="login-btn"><i
                                            className="fa fa-sign-in"></i><span className="d-none d-md-inline-block">Sign In</span></a>
                                        <a className="signup-btn"><i className="fa fa-user"></i><span
                                            className="d-none d-md-inline-block">Sign Up</span></a>
                                    </div>
                                </div>
                            ) : (
                                <AvatarComp />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}