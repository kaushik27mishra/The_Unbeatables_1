import React, { Component } from 'react'
import { Redirect } from 'react-router';
import axios from "axios"

export class AuthCard extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            card: null,
            name: "restadmin@airport-licensing",
            redirectToReferrer:false,
            participant:"",
            identity:"",
            version:"",
        }
    }
    
    handleChange = (e) => {
        // console.log(e.target.files);
        this.setState({
            card : e.target.files,
        }, () => {
            console.log(this.state.card);
        })
    }

    componentDidMount() {
        axios.get(`https://airport-licensing-server.shri99.now.sh/token`)
        .then(res => {
            const auth = res.data; 
            const {_id} = auth;
            console.log(_id);
            sessionStorage.setItem('token',_id)
        })
        .catch(error => {
            console.log(error);
        })
    }



    // var data = new FormData();
    // data.append("name", "restadmin@airport-licensing");
    // data.append("card", "/home/kaushik/SIH/restadmin.card");
    // 
    // var xhr = new XMLHttpRequest();
    // xhr.withCredentials = true;
    // 
    // xhr.addEventListener("readystatechange", function () {
    //   if (this.readyState === 4) {
        // console.log(this.responseText);
    //   }
    // });
    // 
    // xhr.open("POST", "http://172.22.137.166:3000/api/wallet/import");
    // xhr.setRequestHeader("X-Access-Token", "yLHaWGB2HGtXihgoTcPnKsx3cKzf3CwQVl6KFZ1ZXnTKGdaprbsD3Tkwu2BZLJcs");
    // xhr.setRequestHeader("cache-control", "no-cache");
    // xhr.setRequestHeader("Postman-Token", "902b7db3-e7f1-47e3-ad29-bc1bdbd7945b");
    // 
    // xhr.send(data);

    handleSubmit(e) {
        // access_token = sessionStorage.getItem('token')
        var data = new FormData();
        data.append("name", "restadmin@airport-licensing");
        console.log(this.state.card[0]);
        data.append("card",this.state.card[0]);
        fetch('http://192.168.137.152:3000/api/wallet/import', {
                    method: 'POST', 
                    headers: {
                        "X-Access-Token": "ALtYuknvuZsTfJ237MbLdAHIDogpNOy2yDs9Orap0ICVrvZIZEzxnsiDSlqZ9hHq",
                        // "Access-Control-Allow-origin" : "*"
                    },
                    body: data
                })
                .then((response) => console.log(response))
                .then((data) => {
                    //system/ ping
                    fetch('http://192.168.137.152:3000/api/system/ping', {
                        method: 'GET', 
                        headers: {
                            "X-Access-Token": "ALtYuknvuZsTfJ237MbLdAHIDogpNOy2yDs9Orap0ICVrvZIZEzxnsiDSlqZ9hHq",
                        },
                    })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log('Success:', data);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
                    // end of fetch request

                })
                .catch((error) => {
                    console.error('Error:', error);
                });

    }


    render() {

        return (
            <div>
                <div class="info">
                    <div class="icon icon-lg icon-shape icon-shape-primary shadow rounded-circle">
                        <i class="ni ni-key-25"></i>
                    </div>
                    <h6 class="info-title text-uppercase text-primary">Card Login</h6>
                    <p class="description opacity-8">To ensure better security we use card login. If you have the acess card please upload it to login.</p>
                    <div class="text-primary"> 
                        <div class="fileinput fileinput-new text-center" data-provides="fileinput">
                                <div class="fileinput-new thumbnail img-raised"></div>
                            <div>
                                <span class="btn btn-raised btn-round btn-primary btn-simple btn-file">
                                    <span class="fileinput-new">Select File</span>
                                    <span class="fileinput-exists">Change</span>
                                    <input type="file" name="..." onClick={this.handleChange}/>
                                </span>
                                <button type="button" onClick={(e) => {this.handleSubmit(e)}} class="btn btn-success btn-round fileinput-exists">Submit</button>
                            </div>
                        </div>
             {       //   <input type="file" name="card" onClick={this.handleChange}/>
            }
                    </div>
                </div>
            </div>
        )
    }
}

export default AuthCard
