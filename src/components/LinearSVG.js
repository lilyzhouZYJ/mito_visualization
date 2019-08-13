import React from 'react';

//create dictionary that matches gene names to regions
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

class LinearSVG extends React.Component {

    state = {
        x: 50,
        y: 100,
        width: 1100,
        height: 30
    }

    componentDidMount(){

        //dimensions of container rectangle
        var x = this.state.x;
        var y = this.state.y;
        var width = this.state.width;
        var height = this.state.height;

        /**********
            Lines
        **********/

        //position of each lines
        var pos = [577,648,1602,1671,3230,3305,3307,4263,4331,4329,4401,4402,4470,5512,5580,5587,5656,5657,5730,5761,5826,5892,5904,7446,7515,7518,7586,8270,8295,8365,8366,8572,8527,9207,9991,10059,10405,10470,10766,10760,12138,12207,12266,12337,14149,14674,14743,14747,15888,15954,15956,16024];
        var locations = [];
        for (var p of pos){
            locations.push(p/16569*width + x);   //location in px
        }

        //plot each line
        for (var loc of locations){
            var line = document.createElementNS('http://www.w3.org/2000/svg','line');
            var lineStyle = "stroke:black;stroke-width:0.7";
            line.setAttribute("style",lineStyle);
            line.setAttribute("x1",loc);
            line.setAttribute("y1",y);
            line.setAttribute("x2",loc);
            line.setAttribute("y2",y+height);
            var svgnode = document.getElementById("linear"); 
            svgnode.insertBefore(line, svgnode.childNodes[svgnode.childNodes.length-1]);
        }

        /**************************
            Each section (rectangle)
        ***************************/

        var opts = {  
            start_pos: null,  
            end_pos: null,    
        };

        var colors = {
            mRNA: "turquoise",
            tRNA: "lightgreen",
            rRNA: "bisque",
            overlap: "deepskyblue",
            noncoding: "lightpink"
        }

        //mRNA overlap
        var overlap = [8,9,31,32,38,39];
        for (var i = 0; i<overlap.length/2; i++){
            opts.start_pos = locations[overlap[i*2]];
            opts.end_pos = locations[overlap[i*2+1]];
            
            var over = document.createElementNS('http://www.w3.org/2000/svg','rect');
            over.setAttribute("x", Math.min(opts.start_pos, opts.end_pos));
            over.setAttribute("y", y);
            over.setAttribute("height", height);
            over.setAttribute("width", Math.abs(opts.start_pos-opts.end_pos));
            var overStyle = "fill:"+colors.overlap;
            over.setAttribute("style",overStyle);
            var svgnode = document.getElementById("linear");
            svgnode.insertBefore(over, svgnode.childNodes[0]);
        }  

        //tRNA
        var tRnaPos = [0,1,2,3,4,6,7,12,13,18,19,22,23,26,27,29,34,35,36,37,40,43,45,47,48,51];
        for (var i = 0; i<tRnaPos.length/2; i++){
            opts.start_pos = locations[tRnaPos[i*2]];
            opts.end_pos = locations[tRnaPos[i*2+1]];
            
            var trna = document.createElementNS('http://www.w3.org/2000/svg','rect');
            var trnaStyle = "fill:"+colors.tRNA;
            trna.setAttribute("style",trnaStyle);
            trna.setAttribute("x", opts.start_pos);
            trna.setAttribute("y", y);
            trna.setAttribute("height", height);
            trna.setAttribute("width", opts.end_pos-opts.start_pos);
            var svgnode = document.getElementById("linear");
            svgnode.insertBefore(trna, svgnode.childNodes[0]);
        }

        //mRNA
        var mRnaAngles = [5,18,19,48];
        for (var i = 0; i<mRnaAngles.length/2; i++){
            opts.start_pos = locations[mRnaAngles[i*2]];
            opts.end_pos = locations[mRnaAngles[i*2+1]];

            var mrna = document.createElementNS('http://www.w3.org/2000/svg','rect');
            var mrnaStyle = "fill:"+colors.mRNA;
            mrna.setAttribute("style",mrnaStyle);
            mrna.setAttribute("x", opts.start_pos);
            mrna.setAttribute("y", y);
            mrna.setAttribute("height", height);
            mrna.setAttribute("width", opts.end_pos-opts.start_pos);
            var svgnode = document.getElementById("linear");
            svgnode.insertBefore(mrna, svgnode.childNodes[0]);
        }  

        //rRNA
        opts.start_pos = locations[1];
        opts.end_pos = locations[4];

        var rrna = document.createElementNS('http://www.w3.org/2000/svg','rect');
        var rrnaStyle = "fill:"+colors.rRNA;
        rrna.setAttribute("style",rrnaStyle);
        rrna.setAttribute("x", opts.start_pos);
        rrna.setAttribute("y", y);
        rrna.setAttribute("height", height);
        rrna.setAttribute("width", opts.end_pos-opts.start_pos);
        var svgnode = document.getElementById("linear");
        svgnode.insertBefore(rrna, svgnode.childNodes[0]);

        //noncoding goes from origin to locations[0], locations[18] to locations[19], and locations[51] to end
        var noncode = [0, 18, 51];
        for (var i = 0; i<noncode.length; i++){
            if(noncode[i]===51){
                opts.end_pos = width+x;
                opts.start_pos = locations[noncode[i]];
            } else if (noncode[i]===0){
                opts.end_pos = locations[noncode[i]];
                opts.start_pos = x;
            } else {
                opts.start_pos = locations[noncode[i]];
                opts.end_pos = locations[19];
            }

            var noncoding = document.createElementNS('http://www.w3.org/2000/svg','rect');
            noncoding.setAttribute("x", opts.start_pos);
            noncoding.setAttribute("y", y);
            noncoding.setAttribute("height", height);
            noncoding.setAttribute("width", opts.end_pos-opts.start_pos);
            var noncodingStyle = "fill:"+colors.noncoding;
            noncoding.setAttribute("style",noncodingStyle);
            var svgnode = document.getElementById("linear");
            svgnode.insertBefore(noncoding, svgnode.childNodes[0]);
        }  

        /**************
        * Text Labels
        **************/

        for (const [key, value] of Object.entries(dict)) {

            var textPos = (value[0]+value[1])/2/16569*width + x;

            var labelNode = document.createElementNS('http://www.w3.org/2000/svg','text');
            var label = document.createTextNode(key);
            labelNode.appendChild(label);
            labelNode.setAttribute("x",textPos);
            labelNode.setAttribute("y",y+height+9);
            labelNode.setAttribute("text-anchor","middle");
            var labelStyle = "fill: black; font-size:9; font-family:sans-serif";
            labelNode.setAttribute("style", labelStyle);
            labelNode.setAttribute("alignment-base","middle");
            var svgnode = document.getElementById("linear");
            var shortlineStyle = "stroke:black; stroke-width:1";
            //hardcoding overlapping labels
            if(key=="MT-TF"||key=="MT-TV"||key=="MT-TL1"||key=="MT-TK"||key=="MT-TE"){
                var shortLine = document.createElementNS('http://www.w3.org/2000/svg','line');
                shortLine.setAttribute("x1",textPos);
                shortLine.setAttribute("y1",y+height+2);
                shortLine.setAttribute("x2",textPos);
                shortLine.setAttribute("y2",y+height+11);
                shortLine.setAttribute("style",shortlineStyle);
                svgnode.appendChild(shortLine);
                labelNode.setAttribute('y',y+height+20);
            }
            if(key=="MT-TW"){
                var shortLine = document.createElementNS('http://www.w3.org/2000/svg','line');
                shortLine.setAttribute("x1",textPos);
                shortLine.setAttribute("y1",y+height+2);
                shortLine.setAttribute("x2",textPos-10);
                shortLine.setAttribute("y2",y+height+10);
                shortLine.setAttribute("style",shortlineStyle);
                svgnode.appendChild(shortLine);
                labelNode.setAttribute('y',y+height+20);
                labelNode.setAttribute('x',textPos-20);
            }
            if(key=="MT-TA"){
                var shortLine = document.createElementNS('http://www.w3.org/2000/svg','line');
                shortLine.setAttribute("x1",textPos);
                shortLine.setAttribute("y1",y+height+2);
                shortLine.setAttribute("x2",textPos-5);
                shortLine.setAttribute("y2",y+height+20);
                shortLine.setAttribute("style",shortlineStyle);
                svgnode.appendChild(shortLine);
                labelNode.setAttribute('y',y+height+30);
                labelNode.setAttribute('x',textPos-15);
            }
            if(key=="MT-TN"){
                var shortLine = document.createElementNS('http://www.w3.org/2000/svg','line');
                shortLine.setAttribute("x1",textPos);
                shortLine.setAttribute("y1",y+height+2);
                shortLine.setAttribute("x2",textPos);
                shortLine.setAttribute("y2",y+height+30);
                shortLine.setAttribute("style",shortlineStyle);
                svgnode.appendChild(shortLine);
                labelNode.setAttribute('y',y+height+40);
            }
            if(key=="MT-TC"){
                var shortLine = document.createElementNS('http://www.w3.org/2000/svg','line');
                shortLine.setAttribute("x1",textPos);
                shortLine.setAttribute("y1",y+height+2);
                shortLine.setAttribute("x2",textPos+5);
                shortLine.setAttribute("y2",y+height+20);
                shortLine.setAttribute("style",shortlineStyle);
                svgnode.appendChild(shortLine);
                labelNode.setAttribute('y',y+height+30);
                labelNode.setAttribute('x',textPos+15);
            }
            if(key=="MT-ATP8"||key=="MT-TD"){
                var shortLine = document.createElementNS('http://www.w3.org/2000/svg','line');
                shortLine.setAttribute("x1",textPos);
                shortLine.setAttribute("y1",y+height+2);
                shortLine.setAttribute("x2",textPos+10);
                shortLine.setAttribute("y2",y+height+20);
                shortLine.setAttribute("style",shortlineStyle);
                svgnode.appendChild(shortLine);
                labelNode.setAttribute('y',y+height+30);
                labelNode.setAttribute('x',textPos+17);
            }
            if(key=="MT-TY"||key=="MT-TP"||key=="MT-ATP6"){
                var shortLine = document.createElementNS('http://www.w3.org/2000/svg','line');
                shortLine.setAttribute("x1",textPos);
                shortLine.setAttribute("y1",y+height+2);
                shortLine.setAttribute("x2",textPos+10);
                shortLine.setAttribute("y2",y+height+10);
                shortLine.setAttribute("style",shortlineStyle);
                svgnode.appendChild(shortLine);
                labelNode.setAttribute('y',y+height+20);
                labelNode.setAttribute('x',textPos+20);
            }
            if(key=="MT-TI"||key=="MT-TS1"||key=="MT-TH"||key=="MT-TT"){
                var shortLine = document.createElementNS('http://www.w3.org/2000/svg','line');
                shortLine.setAttribute("x1",textPos);
                shortLine.setAttribute("y1",y+height+2);
                shortLine.setAttribute("x2",textPos-10);
                shortLine.setAttribute("y2",y+height+10);
                shortLine.setAttribute("style",shortlineStyle);
                svgnode.appendChild(shortLine);
                labelNode.setAttribute('y',y+height+20);
                labelNode.setAttribute('x',textPos-15);
            }
            if(key=="MT-TQ"||key=="MT-TS2"||key=="MT-ND3"){
                var shortLine = document.createElementNS('http://www.w3.org/2000/svg','line');
                shortLine.setAttribute("x1",textPos);
                shortLine.setAttribute("y1",y+height+2);
                shortLine.setAttribute("x2",textPos);
                shortLine.setAttribute("y2",y+height+20);
                shortLine.setAttribute("style",shortlineStyle);
                svgnode.appendChild(shortLine);
                labelNode.setAttribute('y',y+height+29);
            }
            if(key=="MT-TM"||key=="MT-TL2"){
                var shortLine = document.createElementNS('http://www.w3.org/2000/svg','line');
                shortLine.setAttribute("x1",textPos);
                shortLine.setAttribute("y1",y+height+2);
                shortLine.setAttribute("x2",textPos+10);
                shortLine.setAttribute("y2",y+height+10);
                shortLine.setAttribute("style",shortlineStyle);
                svgnode.appendChild(shortLine);
                labelNode.setAttribute('y',y+height+20);
                labelNode.setAttribute('x',textPos+15);
            }
            if(key=="MT-TR"){
                var shortLine = document.createElementNS('http://www.w3.org/2000/svg','line');
                shortLine.setAttribute("x1",textPos);
                shortLine.setAttribute("y1",y+height+2);
                shortLine.setAttribute("x2",textPos);
                shortLine.setAttribute("y2",y+height+10);
                shortLine.setAttribute("style",shortlineStyle);
                svgnode.appendChild(shortLine);
                labelNode.setAttribute('y',y+height+18);
                labelNode.setAttribute('x',textPos+5);
            }
            if(key=="MT-TG"){
                var shortLine = document.createElementNS('http://www.w3.org/2000/svg','line');
                shortLine.setAttribute("x1",textPos);
                shortLine.setAttribute("y1",y+height+2);
                shortLine.setAttribute("x2",textPos);
                shortLine.setAttribute("y2",y+height+10);
                shortLine.setAttribute("style",shortlineStyle);
                svgnode.appendChild(shortLine);
                labelNode.setAttribute('y',y+height+18);
                labelNode.setAttribute('x',textPos-5);
            }
            if(key=="MT-ND4L"){
                labelNode.setAttribute('x',textPos+12);
            }
            svgnode.insertBefore(labelNode, svgnode.childNodes[svgnode.childNodes.length-1]);
        }

    }

    render() {
        return(
            
            <div>
                <svg id="linear" width="1500" height="400">
                    <rect x={this.state.x} y={this.state.y} height={this.state.height} width={this.state.width} stroke="saddlebrown" strokeWidth="1" fill="none"></rect>
                    <rect x={this.state.x} y={this.state.y} height={this.state.height-10} width={this.state.width} stroke="none" fill="#FFFFFF90" filter="url(#blurMe)"></rect>
                    <rect x={this.state.x} y={this.state.y} height={this.state.height-20} width={this.state.width} stroke="none" fill="#FFFFFFD0" filter="url(#blurMe)"></rect>

                    <filter id="blurMe">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
                    </filter>
                </svg>

            </div>
        )
    }

}

export default LinearSVG;