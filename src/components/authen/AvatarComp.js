import React, { Component } from 'react';
import { connect } from "react-redux";
import { Avatar } from 'primereact/avatar';
import { userActions } from '../../redux/actions/UserActions';


class AvatarComp extends Component {

    constructor(props) {
        super(props)

    }

    render() {

        return (
            <div>
                <div className="align-items-center">
                    <a href="#" className="avatar" data-toggle="modal" data-target="#exampleModalLong">
                        <p>{this.props.userInfor.user.userName.substr(0, 1)}</p>
                    </a>
                </div>
                <div className="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                                {/* <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button> */}
                            </div>
                            <div className="modal-body">
                                ...
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.props.signOutAction}>Sign out</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }

}
const mapStateToProps = (state) => {
    return {
        userInfor: state.authState
    };
};
const mapDispatchToProps = {
    signOutAction : userActions.logout
};

export default connect(mapStateToProps, mapDispatchToProps)(AvatarComp);
