import React, { Component } from 'react'
import Signpad from '../../Signpad/Signpad' 
import Labels from '../FormComponents/Labels'
import TextArea from '../FormComponents/TextArea'
import CheckBox from '../FormComponents/CheckBox'
import BooleanCheckbox from '../FormComponents/BooleanCheckbox'
import {Redirect} from 'react-router'


export class Form4 extends Component {
    
    state = {
        Ownership:true,
        popup:false,
        YourRights:"",
        FromDate: "",
        ToDate: "",
        Termination: "",
        sign:null,
        redirect:false
    }

    handleChange = input => (e) => {
        const ab = e.target.value
        this.setState({
            [input] : e.target.value === "true"
        },() => {
            if(input === "Ownership"){
                if(ab === "true") {
                    this.setState({
                        popup:false
                    },() => {
                        console.log(this.state.popup);
                    })
                }
                else if(ab === "false") {
                    this.setState({
                        popup:true
                    },() => {
                        console.log(this.state.popup);
                    })
                }
            }
        })
    }

    handleSubmit = (e) => {
        const id = sessionStorage.getItem('id')
        const fields = {
            "controlAerodrome": {
                "$class": "org.example.airportlicensing.ControlAerodrome",
                "owner": this.state.Ownership,
                "rightsIfNotOver": this.state.YourRights,
                "startingPeriod": this.state.FromDate,
                "endingPeriod": this.state.ToDate,
                "termination": this.state.Termination,
                "id": id
            },
        }
        

        const access_token = sessionStorage.getItem('token');
        fetch('http://3653ec57.ngrok.io/api/LisenceApplication/', {
            headers: {
                    "X-Access-Token":access_token,
                    "Content-Type":"application/json"
                },
            method: 'POST',
            body: JSON.stringify(fields)
            })
            .then(response => response.json())
            .then(success => {
                console.log('sucess');
                this.setState({
                    redirect:true
                })
            })
            .catch(error => console.log(error)
        );
    }

    handleChangeFile = input => (e) => {
        this.setState({
            [input] : e.target.file
        })
    }

    handlePopup = (value) => {
        return (value ? 
            (<div>
                <h6><strong>IF NO – Please state:</strong></h6>
                <TextArea name="Details of the rights you hold over the land" onChange={this.handleChange('YourRights')} placeholder="Details of the rights you hold over the land"/>
                <div>
                    <div class="form-group">
                    <h6>From</h6>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="ni ni-calendar-grid-58"></i></span>
                            </div>
                            <input class="flatpickr flatpickr-input form-control" onChange={(e) => {
                                this.setState({
                                    FromDate: e.target.value.toString()
                                })
                            }} type="date" placeholder={this.props.placeholder}></input>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="form-group">
                    <h6>To</h6>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="ni ni-calendar-grid-58"></i></span>
                            </div>
                            <input class="flatpickr flatpickr-input form-control" onChange={(e) => {
                                this.setState({
                                    ToDate: e.target.value.toString()
                                })
                            }} type="date" placeholder={this.props.placeholder}></input>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="form-group">
                    <h6>To</h6>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="ni ni-calendar-grid-58"></i></span>
                            </div>
                            <input class="flatpickr flatpickr-input form-control" onChange={(e) => {
                                this.setState({
                                    Termination: e.target.value.toString()
                                })
                            }} type="date" placeholder={this.props.placeholder}></input>
                        </div>
                    </div>
                </div>
            </div>) : null)
    }
    
    render() {
        if(this.state.redirect) {
            return (<Redirect to='/form5'/>)
        }

        const setImageURL = (imageURL) =>{
            const whiteURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAUAAarVyFEAAAAASUVORK5CYII=";
            if(imageURL!==whiteURL && imageURL!==this.state.sign)
            {
                this.setState({sign:imageURL},()=>{
                    console.log(this.state.sign);
                });    
            }
        };

        return (
            <div>
                <Labels head="CONTROL OF THE AERODROME" faded=""/>

                <div class="custom-control custom-checkbox mb-3">
                    <h6>Are you the owner of the aerodrome?</h6>
                    <input
                        class="custom-control-input" 
                        id="Y"
                        type="checkbox"
                        value={true}
                        checked={this.state.Ownership}
                        onChange={this.handleChange("Ownership")}
                    />
                    <label class="custom-control-label" for="Y">Yes</label>
                </div>
                <div class="custom-control custom-checkbox mb-3">
                    <input
                        class="custom-control-input" 
                        id="N"
                        type="checkbox"
                        value={false}
                        checked={this.state.Ownership===false}
                        onChange={this.handleChange("Ownership")}
                    />
                    <label class="custom-control-label" for="N">No</label>
                </div>
                {this.handlePopup(this.state.popup)}
                <h6>
                The period you hold these rights
                </h6>
                <Signpad setImageURL={setImageURL}/>
                <button type="button" onClick={this.handleSubmit} class="btn btn-success">Success</button>
            </div>
        )
}   }

export default Form4