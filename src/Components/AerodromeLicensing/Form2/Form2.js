import React, { Component } from 'react'
import InputForm from '../FormComponents/InputForm'
import Labels from '../FormComponents/Labels'
import ImageUpload from '../FormComponents/ImageUpload'
import Signpad from '../../Signpad/Signpad'

export class Form2 extends Component {
    
    state = {
        type:"",
        "id": "",
        "placeName": "",
        "situation": "",
        "firstName":"",
        "lastName": "",
        "grid": "",
        "elevationMeter": 0,
        "elevationFeet": 0,
        "orentationMeter": 0,
        "orentationFeet": 0,
        "line1": "",
        "line": "",
        "city": "",
        "state": "",
        "country": "",
        "postalcode": 0,
        "telephoneNumber": "",
        "faxnumber":"",
        "email_telex_number": "",
        "state_district":"",
        surveyMap:null, //to add in api
        runways: [{name : ""}], // to add in api
        sign:null // add to api
    }

    handleSubmit = (e) => {
        const fields = {
            "aerodrome" : {
                "$class": "org.example.airportlicensing.Aerodrome",
                "id": "",
                "placeName": this.state.placeName,
                "situation": this.state.situation,
                "grid": this.state.grid,
                "elevationMeter": this.state.elevationMeter,
                "elevationFeet": this.state.elevationFeet,
                "orentationMeter": this.state.orentationMeter,
                "orentationFeet": this.state.orentationFeet,
                "address": {
                    "$class": "org.example.airportlicensing.Address",
                    "line1": this.state.line1,
                    "line": this.state.line,
                    "city": this.state.city,
                    "state": this.state.State,
                    "country": this.state.country,
                    "postalcode": 0,
                    "id": "",
                    
                    }
            }
        }

        const access_token = sessionStorage.getItem('token');
        fetch('', {
            headers: {
                    "X-Access-Token":access_token,
                },
            method: 'POST',
            body: {fields}
            })
            .then(response => response.json())
            .then(success => {
                console.log('sucess');
            })
            .catch(error => console.log(error)
        );
    }

    handleChange = input => (e) => {
        this.setState({
            [input] : e.target.value
        })
    }

    handleChangeFile = input => (e) => {
        this.setState({
            [input] : e.target.file
        })
    }

    handleRunwayChange = evt => {
        this.setState({ name: evt.target.value });
    };

    handleRunwayNameChange = idx => evt => {
        const newRunways = this.state.runways.map((runway, sidx) => {
            if (idx !== sidx) return runway;
            return { ...runway, name: evt.target.value };
        });
    
        this.setState({ runways: newRunways });
    };
    
    handleAddRunway = () => {
        this.setState({
            runways: this.state.runways.concat([{ name: "" }])
        });
    };

    handleRemoveRunway = idx => () => {
        this.setState({
            runways: this.state.runways.filter((s, sidx) => idx !== sidx)
        });
    };

    render() {

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
                <Labels head="DETAILS OF AERODROME (as required to be shown on the license)" faded=""/>
                <InputForm 
                    type={0}   
                    name="Place name by which the aerodrome is to be known in all future references" 
                    onChange={this.handleChange('placeName')} 
                    placeholder="Place name by which the aerodrome is to be known in all future references" />
                <h6>
                    Name of owner of Aerodrome
                </h6>
                <InputForm 
                    type={0} 
                    name="First name of applicant" 
                    onChange={this.handleChange('firstName')} 
                    placeholder="First Name" />
                <InputForm 
                    type={0} 
                    name="Last Name of applicant" 
                    onChange={this.handleChange('lastName')} 
                    placeholder="Last Name"/>
                <h6>
                    Address of owner of Aerodrome
                </h6>
                
                <InputForm 
                    type={0} 
                    name="Line 1" 
                    onChange={this.handleChange('line1')} 
                    placeholder="Line 1" />
                <InputForm 
                    type={0} 
                    name="Line 2" 
                    onChange={this.handleChange('line')} 
                    placeholder="Line 2" />
                <InputForm 
                    type={0} 
                    name="City" 
                    onChange={this.handleChange('city')} 
                    placeholder="City" />
                <InputForm 
                    type={0} 
                    name="State" 
                    onChange={this.handleChange('state')} 
                    placeholder="state" />
                <InputForm 
                    type={0} 
                    name="Country" 
                    onChange={this.handleChange('country')} 
                    placeholder="country" />
                
                <InputForm 
                    type={0} 
                    name="Postal Code" 
                    onChange={this.handleChange('postalcode')} 
                    placeholder="Postal Code" />
                <InputForm 
                    type={0}   
                    name="Telephone Number" 
                    onChange={this.handleChange('telephoneNumber')} 
                    placeholder="Telephone Number" />
                <InputForm 
                    type={0}   
                    name="Fax Number" 
                    onChange={this.handleChange('faxnumber')} 
                    placeholder="Fax Number"/>
                <InputForm 
                    type={0}   
                    name="Email/Telex Number" 
                    onChange={this.handleChange('email_telex_number')} 
                    placeholder="Email/Telex Number" />
                <InputForm 
                    type={0} 
                    name="Situation of the aerodrome site with reference to the nearest airport, railway station and town/village" 
                    onChange={this.handleChange('situation')} 
                    placeholder="Situation of the aerodrome site with reference to the nearest airport, railway station and town/village"/>
                <InputForm 
                    type={0} 
                    name="State / District in which situated" 
                    onChange={this.handleChange('state_district')} 
                    placeholder="State / District in which situated" />
                <InputForm 
                    type={0} 
                    name="Grid reference in WGS 84" 
                    onChange={this.handleChange('grid')} 
                    placeholder="Grid reference in WGS 84" />
                <h6>
                    Attach a survey map, scale 1:10,000 showing by means of broken line the exact boundaries of the aerodrome         
                </h6>
                <br/>
                    <ImageUpload handleChange={this.handleChangeFile('file')}/>
                <br/>
                <InputForm 
                    type={0} 
                    name="Elevation of the Aerodrome reference point (AMSL) (in feet)" 
                    onChange={this.handleChange('elevationFeet')} 
                    placeholder="Elevation of the Aerodrome reference point (AMSL)(in feet)" />
                <InputForm 
                    type={0} 
                    name="Elevation of the Aerodrome reference point (AMSL) (in meter)"
                    onChange={this.handleChange('elevationMeter')} 
                    placeholder="Elevation of the Aerodrome reference point (AMSL)(in meters)" />
                <div>
                    {
                        //didn't really understand the orientation part
                        //2 fields need to be added for each runway, length and and orientation
                    }
                <h6>Orientation and length of runway (s) (in feet and meter)</h6>
                    {this.state.runways.map((runway, idx) => (
                    <div class="container">
                        <div class="row justify-content-md-center">
                            <div class="col col-lg-10">
                                <div class="form-group" >
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder={`Runway ${idx + 1}`}
                                        value={runway.name}
                                        onChange={this.handleRunwayNameChange(idx)}
                                    />
                                </div>
                                </div>
                                <div class="col col-lg-2">                                
                                    <button 
                                        class="btn btn-primary" 
                                        onClick={this.handleRemoveRunway(idx)} 
                                        type="button">
                                        Remove
                                    </button>
                                </div>
                        </div>
                    </div>
                    ))}
                    <button class="btn btn-primary" onClick={this.handleAddRunway} type="button">Add Runway</button>
                </div>
                <br/>
                <Signpad setImageURL={setImageURL}/>
            </div>
        )
    }
}

export default Form2