import React, { Component } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import ComboBox from './ComboBox';
import { InputText } from 'primereact/inputtext';


class SearchParamsComp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currVal: null,
        }
        this.changeComboxHandler = this.changeComboxHandler.bind(this)
    }


    changeComboxHandler(e) {
        this.props.changeComboxHandler(e)
        this.setState({
            currVal: e.value
        })
    }
    render() {
        return (
            <div className="search-component">
                <div className="row">
                    <div className="col-12 col-sm-12 col-lg-6">
                        <div className="in-line">
                            <label htmlFor="basic">From</label>
                            <Calendar id="basic" value={this.state.date1} onChange={(e) => this.setState({ date1: e.value })} />
                            <label htmlFor="basic">To</label>
                            <Calendar id="basic" value={this.state.date1} onChange={(e) => this.setState({ date1: e.value })} />
                            {/* <Button label="Search" className="p-button-success p-mr-2" onClick={this.openNew} /> */}
                        </div>
                    </div>

                    <div className="col-12 col-sm-12 col-lg-6">
                        <div className="p-grid">
                            <div className="p-col-4">
                                <div className="in-line">
                                    <label htmlFor="basic">By</label>
                                    <InputText />
                                </div>
                            </div>
                            <div className="p-col-4">
                                <ComboBox />
                            </div>
                            <div className="p-col-4">
                                <Button label="Search" className="p-button-success p-mr-2" onClick={this.openNew} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default SearchParamsComp