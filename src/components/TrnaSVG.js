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

class TrnaSVG extends React.Component{

    render() {
        var Gene = this.props.gene;
        var variant = this.props.variant;
        var variantId = this.props.variantId;
        var conseq = this.props.conseq;
        if(components[Gene]){
            return(
                React.createElement(components[Gene],{variant:variant, gene:Gene, variantId:variantId, conseq:conseq})
            )
        } else {
             return null
        }
    }
    
}

export default TrnaSVG;

