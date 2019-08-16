import React from 'react';
import Mtta from './tRNA/MT-TA';
import Mttt from './tRNA/MT-TT';
import Mtty from './tRNA/MT-TY';
import Mttw from './tRNA/MT-TW';
import Mttv from './tRNA/MT-TV';
import Mtts1 from './tRNA/MT-TS1';
import Mtts2 from './tRNA/MT-TS2';
import Mttp from './tRNA/MT-TP';
import Mttf from './tRNA/MT-TF';
import Mttk from './tRNA/MT-TK';
import Mttl1 from './tRNA/MT-TL1';
import Mttl2 from './tRNA/MT-TL2';
import Mtti from './tRNA/MT-TI';
import Mtth from './tRNA/MT-TH';
import Mttg from './tRNA/MT-TG';
import Mttq from './tRNA/MT-TQ';
import Mtte from './tRNA/MT-TE';
import Mttc from './tRNA/MT-TC';
import Mttd from './tRNA/MT-TD';
import Mttn from './tRNA/MT-TN';
import Mttm from './tRNA/MT-TM';
import Mttr from './tRNA/MT-TR';

//match each gene to its respective component
const components = {
    'MT-TA': Mtta,
    'MT-TT': Mttt,
    'MT-TW': Mttw,
    'MT-TY': Mtty,
    'MT-TV': Mttv,
    'MT-TS1':Mtts1,
    'MT-TS2':Mtts2,
    'MT-TP':Mttp,
    'MT-TF':Mttf,
    'MT-TK':Mttk,
    'MT-TL1':Mttl1,
    'MT-TL2':Mttl2,
    'MT-TI':Mtti,
    'MT-TH':Mtth,
    'MT-TG':Mttg,
    'MT-TQ':Mttq,
    'MT-TE':Mtte,
    'MT-TC':Mttc,
    'MT-TD':Mttd,
    'MT-TN':Mttn,
    'MT-TM':Mttm,
    'MT-TR':Mttr
};

//match each gene to its respective region
var dict = {
    'MT-TF': [577,647],
    'MT-RNR1': [648,1601],
    'MT-TV':  [1602,1670],
    'MT-RNR2':[1671, 3229],
    'MT-TL1':[3230, 3304],
    'MT-ND1':[3307,4262],
    'MT-TI':[4263,4331],
    'MT-TQ':[4329,4400],
    'MT-TM':[4402,4469],
    'MT-ND2':[4470,5511],
    'MT-TW':[5512,5579],
    'MT-TA':[5587,5655],
    'MT-TN':[5657,5729],
    'MT-TC':[5761,5826],
    'MT-TY':[5826,5891],
    'MT-CO1':[5904,7445],
    'MT-TS1':[7446,7514],
    'MT-TD':[7518,7585],
    'MT-CO2':[7586,8269],
    'MT-TK':[8295,8364],
    'MT-ATP8':[8366,8572],
    'MT-ATP6':[8527,9207],
    'MT-CO3':[9207,9990],
    'MT-TG':[9991,10058],
    'MT-ND3':[10059,10404],
    'MT-TR':[10405,10469],
    'MT-ND4L':[10470,10766],
    'MT-ND4':[10760,12137],
    'MT-TH':[12138,12206],
    'MT-TS2': [12207,12265],
    'MT-TL2': [12266,12336],
    'MT-ND5': [12337,14148],
    'MT-ND6': [14149,14673],
    'MT-TE': [14674,14742],
    'MT-CYB': [14747,15887],
    'MT-TT': [15888,15953],
    'MT-TP': [15956,16023],
};

class TrnaTool extends React.Component {

    state = {
        varId: null,
        varPos: null,
        gene: null,
        inputSubmitted: false
    }

    handleSubmitVar = (e) => {        
        e.preventDefault();
        
        this.setState({
            varId: document.getElementById('var').value,
            inputSubmitted: true
        })
        var varPos = document.getElementById('var').value.split('-')[1];

        this.setState({
            varPos: varPos
        })

        for (const [key, value] of Object.entries(dict)){
            if(varPos<=value[1] && varPos>=value[0]){
                this.setState({
                    gene: key
                });
            }
        }
        
    }

    render(){
        var Gene = this.state.gene;
        var variant = this.state.varPos;
        var variantId = this.state.varId;

        return(
            
            <div id="container">
                
                <h3>Not working!!</h3>
                <form onSubmit={this.handleSubmitVar}>
                    <label htmlFor="var">Input variant</label>
                    <input type="text" id='var'></input>
                    <button type="submit">Submit</button>
                </form>
                
                {
                this.state.inputLinkClicked?
    
                <input label=""
                    type="text"
                    id="id-condition2"
                />
    
                :
    
                <div></div>
                }
    
      
                
            </div>
            
          );




        // if(!components[Gene]){
        //     return(
        //        <div id="container">
        //            <form onSubmit={this.handleSubmitVar}>
        //                <label htmlFor="var">Input variant</label>
        //                <input type="text" id="var"></input>
        //                <button type="submit">Submit</button>
        //            </form>
        //        </div>
                
        //     );
        // } else {
        //     var label = React.createElement('label',{htmlFor:'var'},"Input variant");
        //     var input = React.createElement('input',{type:'text',id:'var'},null);
        //     var button = React.createElement('button',{type:'submit'},'Submit');
        //     var form = React.createElement('form',{onSubmit:this.handleSubmitVar},[label,input,button]);
        //     var trna = React.createElement(components[Gene],{variant:variant, gene:Gene, variantId:variantId});
        //     return(
        //         React.createElement('div',{id:'container'},[trna,form])
        //      );
        // }
    }

}

export default TrnaTool;