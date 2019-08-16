import React from 'react';

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


class GeneSVG extends React.Component{

    state = {
        cx: 260,            //x coordinate of circle center
        cy: 220,            //y coordinate of circle center
        radius: 155,        //radius of outer circle
        innerRadius: 135,   //radius of inner circle
        dist: 20,           //distance between two circles; diff in radii
        mRNA: "turquoise",  //colors of each sectors
        tRNA: "lightgreen",
        rRNA: "bisque",
        overlap: "deepskyblue",
        noncoding: "lightpink"
    }
    
    //a function that determines cartesian coordinates based on angle; will be used to determine how to draw the sector
    polarToCartesian(centerX, centerY, radius, angleInDegrees) {
        var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    }

    //handles mouseenter events to highlight the gene that's being hovered over
    handleMouseEnter = (e) => {
        
        //clear preexisting highlights - sector
        var active = document.getElementsByClassName('hover-active');
        for(var a of active){
            a.setAttribute('class','');
            if(a.getAttribute('id').startsWith("MT-R")){a.setAttribute('fill',this.state.rRNA);}
            else if(a.getAttribute('id').startsWith("MT-T")){a.setAttribute('fill',this.state.tRNA);}
            else {a.setAttribute('fill',this.state.mRNA)};
        }
        //clear preexisting highlights - text label
        active = document.getElementsByClassName('hover-active-text');
        for(var a of active){
            a.remove();
        }
        //bring back hidden label
        active = document.getElementsByClassName('hover-hidden-text');
        for(var a of active){
            a.setAttribute('fill','black');
            a.setAttribute('class','');
        }

        //highlight current target if it is not the gene passed in prop
        var curGene = e.target.getAttribute('id').split("_")[0];    //gets name of current gene
        if(curGene!==this.props.gene){
            //highlight sector
            e.target.setAttribute('fill','blue');
            e.target.setAttribute('class','hover-active');
            //create bigger text label on the outside of circle
            var hiddenGeneText = document.getElementById(curGene);
            hiddenGeneText.setAttribute('class','hover-hidden-text');
            hiddenGeneText.setAttribute('fill','none');

            var newPos = dict[curGene];
            var textPos = (newPos[0]+newPos[1])/2;
            var textAngle = textPos/16569*2*Math.PI-Math.PI/2;  //text angle in radians; add Math.PI/2 becasue by default 0 is postive x-axis but we want it to be positive y-axis
            var textX = 1.03 * this.state.radius * Math.cos(textAngle) + this.state.cx;
            var textY = 1.03 * this.state.radius * Math.sin(textAngle) + this.state.cy;
            var highlightGeneText = document.createElementNS('http://www.w3.org/2000/svg','text');
            var highlightGeneTextNode = document.createTextNode(curGene);
            highlightGeneText.appendChild(highlightGeneTextNode);

            highlightGeneText.setAttribute("x",textX);
            highlightGeneText.setAttribute("y",textY);
            highlightGeneText.setAttribute("class","hover-active-text");

            textAngle = textAngle + Math.PI/2;  //convert back to 0 as positive x-axis
            if(textAngle<=Math.PI/4||textAngle>=Math.PI*7/4){
                highlightGeneText.setAttribute("alignment-baseline","baseline");
            } else if (textAngle<=Math.PI*5/4&&textAngle>=Math.PI*3/4){
                highlightGeneText.setAttribute("alignment-baseline","hanging");
            } else {
                highlightGeneText.setAttribute("alignment-baseline","central");
            }

            if(hiddenGeneText.getAttribute('text-anchor')==="end"){
                highlightGeneText.setAttribute("text-anchor","start");
            } else {
                highlightGeneText.setAttribute('text-anchor','end');
            }                
            highlightGeneText.setAttribute('font-weight','bold');
            highlightGeneText.setAttribute('fill','blue');
            highlightGeneText.setAttribute('font-size','15');

            var svgnode = document.getElementById("circle"); 
            svgnode.insertBefore(highlightGeneText, svgnode.childNodes[svgnode.childNodes.length-1]);
        }
        
    }

    //clears highlighting when mouse leaves
    handleMouseLeave = (e) =>{
        //clear preexisting highlights - sector
        var active = document.getElementsByClassName('hover-active');
        for(var a of active){
            a.setAttribute('class','');
            if(a.getAttribute('id').startsWith("MT-R")){a.setAttribute('fill',this.state.rRNA);}
            else if(a.getAttribute('id').startsWith("MT-T")){a.setAttribute('fill',this.state.tRNA);}
            else {a.setAttribute('fill',this.state.mRNA)};
        }
        //clear preexisting highlights - text label
        active = document.getElementsByClassName('hover-active-text');
        for(var a of active){
            a.remove();
        }
        //bring back hidden labels
        active = document.getElementsByClassName('hover-hidden-text');
        for(var a of active){
            a.setAttribute('fill','black');
            a.setAttribute('class','');
        }
    }

    //redirect to gene page when clicked on
    handleClick = (e) => {
        var curGene = e.target.getAttribute('id').split("_")[0];    //gets name of current gene
        var newURL = "http://35.239.55.19:8008/gene/"+curGene;
        window.location.href = newURL;
    }

    componentDidMount(){
        //retrieve information stored in state
        var radius = this.state.radius;
        var dist = this.state.dist;
        var cx = this.state.cx;
        var cy = this.state.cy;
        var innerRadius = this.state.innerRadius;
            
        /**********
         * Lines
        **********/

        //position of each lines
        var pos = [577,648,1602,1671,3230,3305,3307,4263,4331,4329,4401,4402,4470,5512,5580,5587,5656,5657,5730,5761,5826,5892,5904,7446,7515,7518,7586,8270,8295,8365,8366,8572,8527,9207,9991,10059,10405,10470,10766,10760,12138,12207,12266,12337,14149,14674,14743,14747,15888,15954,15956,16024];
        var angles = [];
        for (var p of pos){
            angles.push(p/16569*2*Math.PI-Math.PI/2);   //angles in radians
        }
        
        //plot each line
        for (var angle of angles){
            var pt1x = radius * Math.cos(angle) + cx;
            var pt1y = radius * Math.sin(angle) + cy;
            var pt2x = (radius-dist) * Math.cos(angle) + cx;
            var pt2y = (radius-dist) * Math.sin(angle) + cy;
            var line = document.createElementNS('http://www.w3.org/2000/svg','line');
            line.setAttribute("x1",pt1x);
            line.setAttribute("y1",pt1y);
            line.setAttribute("x2",pt2x);
            line.setAttribute("y2",pt2y);
            line.setAttribute("stroke","saddlebrown");
            line.setAttribute("stroke-width","1");
            var svgnode = document.getElementById("circle"); 
            svgnode.insertBefore(line, svgnode.childNodes[svgnode.childNodes.length-1]);
        }

        /***************
         * Each sector
        ***************/

        //store parameters in opts
        var opts = {    
            start_angle: null,  //start angle of sector
            end_angle: null,    //end angle of sector
        };

        //color to represent each section
        var colors = {
            mRNA: this.state.mRNA,
            tRNA: this.state.tRNA,
            rRNA: this.state.rRNA,
            overlap: this.state.overlap,
            noncoding: this.state.noncoding
        }

        //mRNA overlap
        var overlap = [8,9,31,32,38,39];
        for (var i = 0; i<overlap.length/2; i++){
            //calculate the start angle and end angle in degrees;
            //added Math.PI/2 here because by default 0 rad is positive x-axis but the angles array had 0 as positive y axis
            opts.start_angle = (angles[overlap[i*2]]+Math.PI/2)*180/Math.PI;
            opts.end_angle = (angles[overlap[i*2+1]]+Math.PI/2)*180/Math.PI;

            //calculate start and end coordinates
            var start = this.polarToCartesian(cx, cy, radius, opts.end_angle),
                end = this.polarToCartesian(cx, cy, radius, opts.start_angle),
                largeArcFlag = opts.end_angle - opts.start_angle <= 180 ? "0" : "1";

            //set path
            var d = [
                "M", start.x, start.y,
                "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
                "L", cx, cy,
                "Z"
                ].join(" ");
            
            var over = document.createElementNS('http://www.w3.org/2000/svg','path');
            over.setAttribute("d",d);
            over.setAttribute("fill",colors.overlap);
            var svgnode = document.getElementById("circle");
            svgnode.insertBefore(over, svgnode.childNodes[0]);
        }  

        //tRNA
        var tRNAs = ["MT-TA","MT-TC","MT-TD","MT-TE","MT-TF","MT-TG","MT-TH","MT-TI","MT-TK","MT-TL1","MT-TL2","MT-TM","MT-TN","MT-TP","MT-TQ","MT-TR","MT-TS1","MT-TS2","MT-TT","MT-TV","MT-TW","MT-TY"]
        for (var t of tRNAs){
            //calculate the start angle and end angle in degrees;
            opts.start_angle = dict[t][0]/16569*360;
            opts.end_angle = dict[t][1]/16569*360;
            
            //calculate start and end coordinates
            var start = this.polarToCartesian(cx, cy, radius, opts.end_angle),
                end = this.polarToCartesian(cx, cy, radius, opts.start_angle),
                largeArcFlag = opts.end_angle - opts.start_angle <= 180 ? "0" : "1";
            
            //set path
            var d = [
                "M", start.x, start.y,
                "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
                "L", cx, cy,
                "Z"
                ].join(" ");
            
            var sector = document.createElementNS('http://www.w3.org/2000/svg','path');
            sector.setAttribute("d",d);
            sector.setAttribute("fill",colors.tRNA);
            sector.setAttribute("id",t+"_svg");
            sector.style.cursor = 'pointer';
            var svgnode = document.getElementById("circle");
            svgnode.insertBefore(sector, svgnode.childNodes[0]);
            sector.addEventListener('mouseenter',(event)=>this.handleMouseEnter(event));
            sector.addEventListener('mouseleave',(event)=>this.handleMouseLeave(event));
            sector.addEventListener('click',(event)=>this.handleClick(event));
        }

        //mRNA
        var mRNAs = ["MT-ND1","MT-ND2","MT-CO1","MT-CO2","MT-ATP8","MT-ATP6","MT-CO3","MT-ND3","MT-ND4L","MT-ND4","MT-ND5","MT-ND6","MT-CYB"];
        for (var r of mRNAs){
            //calculate start and end angles
            opts.start_angle = dict[r][0]/16569*360;
            opts.end_angle = dict[r][1]/16569*360;

            //calculate start and end coordinates
            var start = this.polarToCartesian(cx, cy, radius, opts.end_angle),
                end = this.polarToCartesian(cx, cy, radius, opts.start_angle),
                largeArcFlag = opts.end_angle - opts.start_angle <= 180 ? "0" : "1";

            //set path
            var d = [
                "M", start.x, start.y,
                "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
                "L", cx, cy,
                "Z"
                ].join(" ");
            
            var sector = document.createElementNS('http://www.w3.org/2000/svg','path');
            sector.setAttribute("d",d);
            sector.setAttribute("fill",colors.mRNA);
            sector.setAttribute("id",r+"_svg");
            sector.style.cursor = 'pointer';
            var svgnode = document.getElementById("circle");
            svgnode.insertBefore(sector, svgnode.childNodes[0]);
            sector.addEventListener('mouseenter',(event)=>this.handleMouseEnter(event));
            sector.addEventListener('mouseleave',(event)=>this.handleMouseLeave(event));
            sector.addEventListener('click',(event)=>this.handleClick(event));
        }  
        
        //rRNA
        var rRNAs = ["MT-RNR1","MT-RNR2"];
        for(var r of rRNAs){
            //calculate start and end angles
            opts.start_angle = dict[r][0]/16569*360;
            opts.end_angle = dict[r][1]/16569*360;

            //calculate start and end coordinates
            var start = this.polarToCartesian(cx, cy, radius, opts.end_angle),
                end = this.polarToCartesian(cx, cy, radius, opts.start_angle),
                largeArcFlag = opts.end_angle - opts.start_angle <= 180 ? "0" : "1";

            //set path
            var d = [
                "M", start.x, start.y,
                "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
                "L", cx, cy,
                "Z"
                ].join(" ");
            
            var sector = document.createElementNS('http://www.w3.org/2000/svg','path');
            sector.setAttribute("d",d);
            sector.setAttribute("fill",colors.rRNA);
            sector.setAttribute("id",r+"_svg");
            sector.style.cursor = 'pointer';
            var svgnode = document.getElementById("circle");
            svgnode.insertBefore(sector, svgnode.childNodes[0]);
            sector.addEventListener('mouseenter',(event)=>this.handleMouseEnter(event));
            sector.addEventListener('mouseleave',(event)=>this.handleMouseLeave(event));
            sector.addEventListener('click',(event)=>this.handleClick(event));
        }

        //noncoding
        var noncode = [1,576,3305,3306,4401,4401,5580,5586,5656,5656,5730,5760,5892,5903,7515,7517,8270,8294,8365,8365,14743,14746,15954,15955,16024,16569]
        for (var i = 0; i<noncode.length/2; i++){
            //calculate start and end angles
            opts.start_angle = noncode[i*2]/16569*360;
            opts.end_angle = noncode[i*2+1]/16569*360;

            //calculate start and end coordinates
            var start = this.polarToCartesian(cx, cy, radius, opts.end_angle),
                end = this.polarToCartesian(cx, cy, radius, opts.start_angle),
                largeArcFlag = opts.end_angle - opts.start_angle <= 180 ? "0" : "1";

            //set path
            var d = [
                "M", start.x, start.y,
                "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
                "L", cx, cy,
                "Z"
                ].join(" ");
            
            var noncoding = document.createElementNS('http://www.w3.org/2000/svg','path');
            noncoding.setAttribute("d",d);
            noncoding.setAttribute("fill",colors.noncoding);
            var svgnode = document.getElementById("circle");
            svgnode.insertBefore(noncoding, svgnode.childNodes[0]);
        }  

        /**************
         * Text Labels
         **************/
        
        for (const [key, value] of Object.entries(dict)) {

            //find text position
            var textPos = (value[0]+value[1])/2;
            var textAngle = textPos/16569*2*Math.PI-Math.PI/2;  //text angle in radians
            var textX = 0.98 * innerRadius * Math.cos(textAngle) + cx;
            var textY = 0.98 * innerRadius * Math.sin(textAngle) + cy;

            var labelNode = document.createElementNS('http://www.w3.org/2000/svg','text');
            var label = document.createTextNode(key);
            labelNode.appendChild(label);

            labelNode.setAttribute("x",textX);
            labelNode.setAttribute("y",textY);
            if(textAngle>Math.PI/2){
                textAngle = textAngle+Math.PI;
                labelNode.setAttribute("text-anchor","start");
            } else {
                labelNode.setAttribute("text-anchor","end");
            }
            labelNode.setAttribute("transform","rotate("+textAngle*180/Math.PI+","+textX+","+textY+")");
            labelNode.setAttribute("fill","black");
            labelNode.setAttribute("font-size","6");
            labelNode.setAttribute("alignment-baseline","central");
            labelNode.setAttribute("id",key);
            
            //fix text overlap
            if(key=="MT-TY"|key=="MT-TM"|key=="MT-TH"){
                labelNode.setAttribute("alignment-baseline","hanging");
            }
            else if(key=="MT-TW"|key=="MT-TI"|key=="MT-TL2"|key=="MT-TP"){
                labelNode.setAttribute("alignment-baseline","baseline");
            }
            else if(key=="MT-TA"|key=="MT-TP"|key=="MT-TS1"){
                labelNode.setAttribute("alignment-baseline","middle");
            }

            var svgnode = document.getElementById("circle");
            svgnode.insertBefore(labelNode, svgnode.childNodes[svgnode.childNodes.length-1]);
            
        }

        //if on gene page, a gene prop is passed
        if(this.props.gene&&this.props.gene.startsWith("MT-")){            

            var newGene = this.props.gene;
            var newPos = dict[newGene]; //find start and end of the gene

            if (newPos!==null){
                //highlight sector
                var opts = {
                    start_angle: (newPos[0]/16569*2*Math.PI)*180/Math.PI,
                    end_angle: (newPos[1]/16569*2*Math.PI)*180/Math.PI,
                };
                var start = this.polarToCartesian(cx, cy, radius, opts.end_angle),
                    end = this.polarToCartesian(cx, cy, radius, opts.start_angle),
                    largeArcFlag = opts.end_angle - opts.start_angle <= 180 ? "0" : "1";
                var d = [
                    "M", start.x, start.y,
                    "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
                    "L", cx, cy,
                    "Z"
                ].join(" ");
                var highlight = document.createElementNS('http://www.w3.org/2000/svg','path');
                highlight.setAttribute("d",d);
                highlight.setAttribute("fill","red");
                highlight.setAttribute("id","highlight");
                var svgnode = document.getElementById("circle");
                svgnode.insertBefore(highlight, document.getElementsByTagName('circle')[3]);

                //highlight gene name and move to outside the circle
                var highlightGene = document.getElementById(newGene);
                var textPos = (newPos[0]+newPos[1])/2;
                var textAngle = textPos/16569*2*Math.PI-Math.PI/2;  //text angle in radians; add Math.PI/2 becasue by default 0 is postive x-axis but we want it to be positive y-axis
                var textX = 1.03 * radius * Math.cos(textAngle) + cx;
                var textY = 1.03 * radius * Math.sin(textAngle) + cy;
                highlightGene.setAttribute("transform","rotate("+0+","+textX+","+textY+")");
                highlightGene.setAttribute("x",textX);
                highlightGene.setAttribute("y",textY);

                textAngle = textAngle + Math.PI/2;  //convert to 0 as positive x-axis
                //change text alignment based on its position with respect to the circle
                if(textAngle<=Math.PI/4||textAngle>=Math.PI*7/4){
                    highlightGene.setAttribute("alignment-baseline","baseline");
                } else if (textAngle<=Math.PI*5/4&&textAngle>=Math.PI*3/4){
                    highlightGene.setAttribute("alignment-baseline","hanging");
                } else {
                    highlightGene.setAttribute("alignment-baseline","central");
                }

                if(highlightGene.getAttribute('text-anchor')=="end"){
                    highlightGene.setAttribute("text-anchor","start");
                } else {
                    highlightGene.setAttribute('text-anchor','end');
                }                
                highlightGene.setAttribute('font-weight','bold');
                highlightGene.setAttribute('fill','red');
                highlightGene.setAttribute('font-size','15');
            }
        }  

        //if variant page
        if(this.props.variant&&this.props.variant.startsWith("MT-")){
            
            var varPos = this.props.variant.split("-")[1];
        
            //add line to highlight variant position
            var angle = varPos/16569*2*Math.PI-Math.PI/2;   //angles in radians
            var pt1x = (radius+10) * Math.cos(angle) + cx;
            var pt1y = (radius+10) * Math.sin(angle) + cy;
            var pt2x = innerRadius * Math.cos(angle) + cx;
            var pt2y = innerRadius * Math.sin(angle) + cy;

            var line = document.createElementNS('http://www.w3.org/2000/svg','line');
            line.setAttribute("x1",pt1x);
            line.setAttribute("y1",pt1y);
            line.setAttribute("x2",pt2x);
            line.setAttribute("y2",pt2y);
            line.setAttribute("stroke","crimson");
            line.setAttribute("stroke-width","1.5");
            line.setAttribute("id","highlight-var");
            var svgnode = document.getElementById("circle"); 
            svgnode.insertBefore(line, svgnode.childNodes[svgnode.childNodes.length-1]);

            //add text label for variant
            var textNode = document.createElementNS('http://www.w3.org/2000/svg','text');
            var node1 = document.createElementNS('http://www.w3.org/2000/svg','tspan');
            var text = document.createTextNode(this.props.variant);
            node1.appendChild(text);
            textNode.appendChild(node1);
            
            pt1x = (radius+15) * Math.cos(angle) + cx;
            pt1y = (radius+15) * Math.sin(angle) + cy;
            textNode.setAttribute('x',pt1x);
            textNode.setAttribute('y',pt1y);

            if(varPos>16569/2){
                textNode.setAttribute('text-anchor','end');
            } else {
                textNode.setAttribute("text-anchor","start");
            }

            textNode.setAttribute("fill","crimson");
            textNode.setAttribute("font-size","15");
            node1.setAttribute("alignment-baseline","central");
            textNode.setAttribute("id","varLabel");
            textNode.setAttribute("font-weight","bold");
            svgnode.insertBefore(textNode, svgnode.childNodes[svgnode.childNodes.length-1]);

        }

    }

    render() {
        return(
            <div>
                <svg id="circle" width="510" height="450">
                    <circle cx={this.state.cx} cy={this.state.cy} r={this.state.radius} stroke="saddlebrown" strokeWidth="1" fill="none" />
                    <circle cx={this.state.cx} cy={this.state.cy} r={this.state.radius-10} stroke="none" fill="#ffffff90" filter="url(#blurMe)" />
                    <circle cx={this.state.cx} cy={this.state.cy} r={this.state.radius-20} stroke="none" fill="#ffffffd0" filter="url(#blurMe)" />
                    <circle cx={this.state.cx} cy={this.state.cy} r={this.state.innerRadius} stroke="#8b4513c0" strokeWidth="1" fill="white" />
                
                    <filter id="blurMe">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
                    </filter>
                </svg>
            </div>
        )
    }
    
}

export default GeneSVG;
