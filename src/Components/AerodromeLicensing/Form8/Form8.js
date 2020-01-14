import React, { Component } from 'react'
import InputForm from '../../FormComponents/InputForm'

export class Form1 extends Component {
    
    state = {
        challanno:"",
        amount:"",
        datedrawee:"",
        namedrawee:""
        
    }

// 0 for normal input Form
// 1 form under evaluation but needs any change
// 2 for sucessful Form only readme 
// 3 for incorrect form needs change with the error
// 4 for incorect and rejected so diabled with the error

    handleChange = input => (e) => {
        this.setState({
            [input] : e.target.value
        })
    }
    
    render() {
        return (
            <div>
                <InputForm type={0} name="Challan No. for online deposit" onChange={this.handleChange('challanno')} placeholder="Challan No. for online deposit" />
                <InputForm type={0} name="Amount" onChange={this.handleChange('amount')} placeholder="Amount" />
                {
                    //Attach a sheet showing the calculation of amount as per runway length)

                }
                <InputForm type={0} name="Date of drawing the fees" onChange={this.handleChange('datedrawee')} placeholder="Date of drawing the fees" />
                <InputForm type={0} name="Name of the drawee bank" onChange={this.handleChange('namedrawee')} placeholder="Name of the drawee bank" />
                
                
                

            </div>
        )
    }
}

export default Form1