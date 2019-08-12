import React from 'react';

class TreeSVG extends React.Component{

    componentDidMount(){

        //set styles
        var allLines = document.getElementById('haplogroup-tree').getElementsByTagName('line');
        for(var t of allLines){
            t.setAttribute('stroke',"black");
            t.setAttribute('stroke-width',"1");
            t.setAttribute('stroke-linecap',"round");
        }
        var allText = document.getElementById('haplogroup-tree').getElementsByTagName('text');
        for(var t of allText){
            t.setAttribute('font-size', '17');
            t.setAttribute('fill', 'black');
            t.setAttribute('font-family', 'Roboto, sans-serif');
            t.setAttribute('text-anchor', 'middle');
        }
        var allRects = document.getElementById('haplogroup-tree').getElementsByTagName('rect');
        for(var t of allRects){
            t.setAttribute('stroke', 'black');
            t.setAttribute('stroke-width', '1.5');
            t.setAttribute('fill', 'white');
        }

        //highlight
        var hgroup = this.props.hgroup;
        var max = 2;    //max of stroke width; equivalent to allele freq = 1
        var min = 1.5;    //min of stroke width; equivalent to allele freq = 0
        for (var h of hgroup) {
            if(h.ac==0) {continue;}
            var allHighlight = document.getElementsByClassName(h.id);
            for (var a of allHighlight){
                var prevStrokeWidth = parseFloat(a.getAttribute('stroke-width'));
                var newStrokeWidth = h.ac/h.an * (max-min) + min;
                var strokeWidth = prevStrokeWidth + newStrokeWidth;
                if(strokeWidth>5){strokeWidth=6;}
                a.setAttribute('stroke-width', strokeWidth);
                if(a.tagName=="text"){
                    a.setAttribute('stroke-width','1');
                    a.setAttribute('font-weight','bold');
                }
                if(a.tagName=="rect"){
                    a.setAttribute('stroke-width','4');
                }
                a.setAttribute('stroke','slateblue');
            }
        }

        //add text legend
        var text = document.createTextNode("Haplogroup Tree");
        var textNode = document.createElementNS('http://www.w3.org/2000/svg','text');
        textNode.appendChild(text);
        textNode.setAttribute("x","420");
        textNode.setAttribute("y","30");
        textNode.setAttribute("font-family","Roboto, sans-serif");
        textNode.setAttribute("font-size","18");
        textNode.setAttribute("font-weight","bold");
        document.getElementById('haplogroup-tree').appendChild(textNode);

        

    }

    render() {
        return(
            <svg style={{position:'relative'}} id="haplogroup-tree" height="450" width="1000" xmlns="http://www.w3.org/2000/svg">
                <line x1="55" y1="50" x2="55" y2="65" className="down L0 L1 L5 L2 L6 L4 L3 M C Z E G Q D N I W Y A O S X R HV V H J T F B P U K"></line>
                <rect x="40" y="28" width="30" height="22" className="L0 L1 L5 L2 L6 L4 L3 M C Z E G Q D N I W Y A O S X R HV V H J T F B P U K"></rect>
                <text x="55" y="45" className="L0 L1 L5 L2 L6 L4 L3 M C Z E G Q D N I W Y A O S X R HV V H J T F B P U K">L</text>
                <line x1="55" y1="65" x2="25" y2="65" className="side L0"></line>
                <line x1="25" y1="65" x2="25" y2="365" className="down L0"></line>
                <text x="25" y="385" className="L0">L0</text>

                <line x1="55" y1="65" x2="85" y2="65" className="side L1 L5 L2 L6 L4 L3 M C Z E G Q D N I W Y A O S X R HV V H J T F B P U K"></line>
                <line x1="85" y1="65" x2="85" y2="90" className="down L1 L5 L2 L6 L4 L3 M C Z E G Q D N I W Y A O S X R HV V H J T F B P U K"></line>
                <line x1="85" y1="90" x2="55" y2="90" className="side L1"></line>
                <line x1="55" y1="90" x2="55" y2="365" className="down L1"></line>
                <text x="55" y="385" className="L1">L1</text>

                <line x1="85" y1="90" x2="115" y2="90" className="side L5 L2 L6 L4 L3 M C Z E G Q D N I W Y A O S X R HV V H J T F B P U K"></line>
                <line x1="115" y1="90" x2="115" y2="115" className="down L5 L2 L6 L4 L3 M C Z E G Q D N I W Y A O S X R HV V H J T F B P U K"></line>
                <line x1="115" y1="115" x2="85" y2="115" className="side L5"></line>
                <line x1="85" y1="115" x2="85" y2="365" className="down L5"></line>
                <text x="85" y="385" className="L5">L5</text>
                
                <line x1="115" y1="115" x2="155" y2="115" className="side L2 L6 L4 L3 M C Z E G Q D N I W Y A O S X R HV V H J T F B P U K"></line>
                <line x1="155" y1="115" x2="155" y2="140" className="down L2 L6 L4 L3 M C Z E G Q D N I W Y A O S X R HV V H J T F B P U K"></line>
                <line x1="155" y1="140" x2="115" y2="140" className="side L2"></line>
                <line x1="115" y1="140" x2="115" y2="365" className="down L2"></line>
                <text x="115" y="385" className="L2">L2</text>

                <line x1="155" y1="140" x2="205" y2="140" className="side L6 L4 L3 M C Z E G Q D N I W Y A O S X R HV V H J T F B P U K"></line>
                <line x1="205" y1="140" x2="205" y2="165" className="down L6 L4 L3 M C Z E G Q D N I W Y A O S X R HV V H J T F B P U K"></line>
                <line x1="205" y1="165" x2="145" y2="165" className="side L6"></line>
                <line x1="145" y1="165" x2="145" y2="365" className="down L6"></line>
                <text x="145" y="385" className="L6">L6</text>

                <line x1="205" y1="165" x2="285" y2="165" className="side L4 L3 M C Z E G Q D N I W Y A O S X R HV V H J T F B P U K"></line>
                <line x1="285" y1="165" x2="285" y2="190" className="down L4 L3 M C Z E G Q D N I W Y A O S X R HV V H J T F B P U K"></line>
                <line x1="285" y1="190" x2="175" y2="190" className="side L4"></line>
                <line x1="175" y1="190" x2="175" y2="365" className="down L4"></line>
                <text x="175" y="385" className="L4">L4</text>

                <line x1="285" y1="190" x2="415" y2="190" className="side L3 M C Z E G Q D N I W Y A O S X R HV V H J T F B P U K"></line>
                <line x1="415" y1="190" x2="415" y2="215" className="down L3 M C Z E G Q D N I W Y A O S X R HV V H J T F B P U K"></line>
                <line x1="415" y1="215" x2="300" y2="215" className="side L3 M C Z E G Q D"></line>
                <line x1="300" y1="215" x2="300" y2="229" className="down M C Z E G Q D"></line>
                <line x1="300" y1="251" x2="300" y2="265" className="down M C Z E G Q D"></line>
                <rect x="285" y="229" height="22" width="30" className="down M C Z E G Q D"></rect>
                <text x="300" y="246" className="down M C Z E G Q D">M</text>
                <line x1="300" y1="265" x2="280" y2="265" className="side M C Z"></line>
                <line x1="280" y1="265" x2="280" y2="315" className="down C Z"></line>
                <line x1="280" y1="315" x2="265" y2="315" className="side C"></line>
                <line x1="265" y1="315" x2="265" y2="365" className="down C"></line>
                <text x="265" y="385" className="C">C</text>

                <line x1="280" y1="315" x2="295" y2="315" className="side Z"></line>
                <line x1="295" y1="315" x2="295" y2="365" className="down Z"></line>
                <text x="295" y="385" className="Z">Z</text>
                
                <line x1="280" y1="265" x2="235" y2="265" className="side M"></line>
                <line x1="235" y1="265" x2="235" y2="365" className="down M"></line>
                <text x="235" y="385" className="M">M</text>

                <line x1="300" y1="215" x2="205" y2="215" className="side L3"></line>
                <line x1="205" y1="215" x2="205" y2="365" className="down L3"></line>
                <text x="205" y="385" className="L3">L3</text>

                <line x1="300" y1="265" x2="325" y2="265" className="side E G Q D"></line>
                <line x1="325" y1="265" x2="325" y2="365" className="down E"></line>
                <text x="325" y="385" className="E">E</text>

                <line x1="325" y1="265" x2="355" y2="265" className="side G Q D"></line>
                <line x1="355" y1="265" x2="355" y2="365" className="down G"></line>
                <text x="355" y="385" className="G">G</text>

                <line x1="355" y1="265" x2="385" y2="265" className="side Q D"></line>
                <line x1="385" y1="265" x2="385" y2="365" className="down Q"></line>
                <text x="385" y="385" className="Q">Q</text>

                <line x1="385" y1="265" x2="415" y2="265" className="side D"></line>
                <line x1="415" y1="265" x2="415" y2="365" className="down D"></line>
                <text x="415" y="385" className="D">D</text>

                <line x1="415" y1="215" x2="640" y2="215" className="side N I W Y A O S X R HV V H J T F B P U K"></line>
                <line x1="640" y1="215" x2="640" y2="229" className="down N I W Y A O S X R HV V H J T F B P U K"></line>
                <line x1="640" y1="251" x2="640" y2="265" className="down N I W Y A O S X R HV V H J T F B P U K"></line>
                <rect x="625" y="229" height="22" width="30" className="down N I W Y A O S X R HV V H J T F B P U K"></rect>
                <text x="640" y="246" className="down N I W Y A O S X R HV V H J T F B P U K">N</text>
                
                <line x1="640" y1="265" x2="625" y2="265" className="side N I W Y A O S"></line>
                <line x1="625" y1="265" x2="625" y2="365" className="down S"></line>
                <text x="625" y="385" className="S">S</text>

                <line x1="625" y1="265" x2="595" y2="265" className="side N I W Y A O"></line>
                <line x1="595" y1="265" x2="595" y2="365" className="down O"></line>
                <text x="595" y="385" className="O">O</text>

                <line x1="595" y1="265" x2="565" y2="265" className="side N I W Y A"></line>
                <line x1="565" y1="265" x2="565" y2="365" className="down A"></line>
                <text x="565" y="385" className="A">A</text>

                <line x1="565" y1="265" x2="535" y2="265" className="side N I W Y"></line>
                <line x1="535" y1="265" x2="535" y2="365" className="down Y"></line>
                <text x="535" y="385" className="Y">Y</text>

                <line x1="535" y1="265" x2="505" y2="265" className="side N I W"></line>
                <line x1="505" y1="265" x2="505" y2="365" className="down W"></line>
                <text x="505" y="385" className="W">W</text>

                <line x1="505" y1="265" x2="475" y2="265" className="side N I"></line>
                <line x1="475" y1="265" x2="475" y2="365" className="down I"></line>
                <text x="475" y="385" className="I">I</text>

                <line x1="475" y1="265" x2="445" y2="265" className="side N"></line>
                <line x1="445" y1="265" x2="445" y2="365" className="down N"></line>
                <text x="445" y="385" className="N">N</text>

                <line x1="640" y1="265" x2="655" y2="265" className="side X R HV V H J T F B P U K"></line>
                <line x1="655" y1="265" x2="655" y2="365" className="down X"></line>
                <text x="655" y="385" className="X">X</text>

                <line x1="655" y1="265" x2="835" y2="265" className="side R HV V H J T F B P U K"></line>
                <line x1="835" y1="265" x2="835" y2="290" className="down R HV V H J T F B P U K"></line>

                <line x1="835" y1="290" x2="820" y2="290" className="side R HV V H J T"></line>
                <line x1="820" y1="290" x2="820" y2="315" className="down J T"></line>
                <line x1="820" y1="315" x2="805" y2="315" className="side J"></line>
                <line x1="805" y1="315" x2="805" y2="365" className="down J"></line>
                <text x="805" y="385" className="J">J</text>
                <line x1="820" y1="315" x2="835" y2="315" className="side T"></line>
                <line x1="835" y1="315" x2="835" y2="365" className="down T"></line>
                <text x="835" y="385" className="T">T</text>

                <line x1="820" y1="290" x2="745" y2="290" className="side R HV V H"></line>
                <line x1="745" y1="290" x2="745" y2="315" className="down HV V H"></line>
                <line x1="745" y1="315" x2="745" y2="365" className="down V"></line>
                <text x="745" y="385" className="V">V</text>
                <line x1="745" y1="315" x2="715" y2="315" className="side HV"></line>
                <line x1="715" y1="315" x2="715" y2="365" className="down HV"></line>
                <text x="715" y="385" className="HV">HV</text>
                <line x1="745" y1="315" x2="775" y2="315" className="side H"></line>
                <line x1="775" y1="315" x2="775" y2="365" className="down H"></line>
                <text x="775" y="385" className="H">H</text>

                <line x1="745" y1="290" x2="685" y2="290" className="side R"></line>
                <line x1="685" y1="290" x2="685" y2="365" className="down R"></line>
                <text x="685" y="385" className="R">R</text>

                <line x1="835" y1="290" x2="865" y2="290" className="side F B P U K"></line>
                <line x1="865" y1="290" x2="865" y2="365" className="down F"></line>
                <text x="865" y="385" className="F">F</text>
                
                <line x1="865" y1="290" x2="895" y2="290" className="side B P U K"></line>
                <line x1="895" y1="290" x2="895" y2="365" className="down B"></line>
                <text x="895" y="385" className="B">B</text>

                <line x1="895" y1="290" x2="925" y2="290" className="side P U K"></line>
                <line x1="925" y1="290" x2="925" y2="365" className="down P"></line>
                <text x="925" y="385" className="P">P</text>

                <line x1="925" y1="290" x2="970" y2="290" className="side U K"></line>
                <line x1="970" y1="290" x2="970" y2="315" className="down U K"></line>
                <line x1="970" y1="315" x2="955" y2="315" className="side U"></line>
                <line x1="955" y1="315" x2="955" y2="365" className="down U"></line>
                <text x="955" y="385" className="U">U</text>
                <line x1="970" y1="315" x2="985" y2="315" className="side K"></line>
                <line x1="985" y1="315" x2="985" y2="365" className="down K"></line>
                <text x="985" y="385" className="K">K</text>
                
            </svg>
        )
    }
    
}

export default TreeSVG;
