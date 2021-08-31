function CustNav() {
    return (
        <div className="row d-flex align-items-center" >
            <div id="navbar" role="navigation" className=" navbar-expand-lg">
                <div id="navigation" className="navbar-collapse collapse">
                    <ul className="main-nav nav ">
                        <li className="nav-item dropdown menu-large"><a href="#" data-toggle="dropdown">Categories<b
                            className="caret"></b></a>
                            <ul className="dropdown-menu megamenu">
                                <li>
                                    <div className="row">
                                        <div className="col-lg-3 col-md-6">
                                            <h5>Shortcodes</h5>
                                            <ul className="list-unstyled mb-3">
                                                <li className="nav-item"><a href="template-accordions.html" className="nav-link">Accordions</a></li>
                                                <li className="nav-item"><a href="template-alerts.html" className="nav-link">Alerts</a></li>
                                                <li className="nav-item"><a href="template-buttons.html" className="nav-link">Buttons</a></li>
                                                <li className="nav-item"><a href="template-content-boxes.html" className="nav-link">Content boxes</a>
                                                </li>
                                                <li className="nav-item"><a href="template-blocks.html" className="nav-link">Horizontal blocks</a>
                                                </li>
                                                <li className="nav-item"><a href="template-pagination.html" className="nav-link">Pagination</a></li>
                                                <li className="nav-item"><a href="template-tabs.html" className="nav-link">Tabs</a></li>
                                                <li className="nav-item"><a href="template-typography.html" className="nav-link">Typography</a></li>
                                            </ul>
                                        </div>
                                        <div className="col-lg-3 col-md-6">
                                            <h5>Header variations</h5>
                                            <ul className="list-unstyled mb-3">
                                                <li className="nav-item"><a href="template-header-default.html" className="nav-link">Default sticky
                                                    header</a></li>
                                                <li className="nav-item"><a href="template-header-nosticky.html" className="nav-link">No sticky
                                                    header</a></li>
                                                <li className="nav-item"><a href="template-header-light.html" className="nav-link">Light header</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </li>
                        <li><a href="#">Home <b className="caret"></b></a></li>
                        <li><a href="#">Blog <b className="caret"></b></a></li>
                        <li><a href="#">About <b className="caret"></b></a></li>

                    </ul>
                </div>

            </div>
        </div>
    )
}

export default CustNav
