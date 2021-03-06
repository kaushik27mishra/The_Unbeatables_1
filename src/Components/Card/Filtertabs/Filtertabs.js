import React from 'react';
import Searchbar from '../Searchbar/Searchbar';
import Displaycardlist from '../Displaycard/Displaycardlist';
import {Link} from 'react-router-dom';


const Filtertabs = (props) =>{

    const handleTab1 = () =>{
        props.tabHandler(1);
    }
    const handleTab2 = () =>{
        props.tabHandler(2);
    }
    const handleTab3 = () =>{
        props.tabHandler(3);
    }
    const handleTab4 = () =>{
        props.tabHandler(4);
    }

    const searchHandler1 = (e) =>{
        props.searchHandler(e)
    }
    return(
        <div>
            <div className="nav-wrapper">
                <ul className="nav nav-pills nav-fill flex-column flex-md-row" id="tabs-icons-text" role="tablist">
                    <li className="nav-item"onClick={ handleTab1}>
                        <a className="nav-link mb-sm-3 mb-md-0 active" id="tabs-icons-text-1-tab" data-toggle="tab" href="#tabs-icons-text-1" role="tab" aria-controls="tabs-icons-text-1" aria-selected="true"><i className="ni ni-folder-17 mr-2"></i>All</a>
                    </li>
                    <li className="nav-item" onClick={ handleTab2}>
                        <a className="nav-link mb-sm-3 mb-md-0" id="tabs-icons-text-2-tab" data-toggle="tab" href="#tabs-icons-text-2" role="tab" aria-controls="tabs-icons-text-2" aria-selected="false"><i className="ni ni-check-bold mr-2"></i>Approved</a>
                    </li>
                    <li className="nav-item" onClick={ handleTab3}>
                        <a className="nav-link mb-sm-3 mb-md-0" id="tabs-icons-text-3-tab" data-toggle="tab" href="#tabs-icons-text-3" role="tab" aria-controls="tabs-icons-text-3" aria-selected="false"><i className="ni ni-ruler-pencil mr-2"></i>Under Process</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link mb-sm-3 mb-md-0" id="tabs-icons-text-4-tab" data-toggle="tab" href="#tabs-icons-text-4" role="tab" aria-controls="tabs-icons-text-3" aria-selected="false"><i className="ni ni-fat-remove mr-2"></i>Rejected</a>
                    </li>
                </ul>
            </div>
            <div className="card shadow">
                <div className="card-body">
                    <Link to="/license"><button class="btn btn-success float-right">New Application</button></Link>
                    <Searchbar searchHandler1={(e)=>searchHandler1(e)} />
                    
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="tabs-icons-text-1" role="tabpanel" aria-labelledby="tabs-icons-text-1-tab">
                            <Displaycardlist data={props.data}/>
                        </div>
                        <div className="tab-pane fade" id="tabs-icons-text-2" role="tabpanel" aria-labelledby="tabs-icons-text-2-tab">
                            <Displaycardlist data={props.data}/>
                        </div>
                        <div className="tab-pane fade" id="tabs-icons-text-3" role="tabpanel" aria-labelledby="tabs-icons-text-3-tab">
                            <Displaycardlist data={props.data}/>
                        </div>
                        <div className="tab-pane fade" id="tabs-icons-text-4" role="tabpanel" aria-labelledby="tabs-icons-text-4-tab">
                            <Displaycardlist data={props.data}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Filtertabs;