import React from 'react';
import { Redirect } from 'react-router-dom';

//list of all valid gene names
const components = [
    'MT-TA',
    'MT-TT',
    'MT-TW',
    'MT-TY',
    'MT-TV',
    'MT-TS1',
    'MT-TS2',
    'MT-TP',
    'MT-TF',
    'MT-TK',
    'MT-TL1',
    'MT-TL2',
    'MT-TI',
    'MT-TH',
    'MT-TG',
    'MT-TQ',
    'MT-TE',
    'MT-TC',
    'MT-TD',
    'MT-TN',
    'MT-TM',
    'MT-TR'];

class RnaPage extends React.Component{

    state = {
        submitted: false
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({submitted:true});
    }

    render() {

        if(this.state.submitted){
            var mitoInput = document.getElementById('input').value;
            if(isNaN(mitoInput[3])&&components.includes(mitoInput)){
                return(
                    <Redirect push to={'./gene/'+mitoInput} />
                );
            }
            else{
                return(
                    <Redirect push to={'./variant/'+mitoInput} />
                );
            }
        }
        else{
            return(
                <div id="container">
                    <div id="submit-form">
                        <p>Input tRNA/rRNA gene or variant</p>
                        <form onSubmit={this.handleSubmit}>
                            <label htmlFor="input">Input</label>
                            <input type="text" id="input"></input>
                            <button type="submit">Submit</button>
                        </form>
                        <br></br>
                    </div>
                </div>
            )
        }

    }
    
}

export default RnaPage;

