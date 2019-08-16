import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import GeneTool from './components/GeneTool';
import TrnaTool from './components/TrnaTool';
import LinearSVG from './components/LinearSVG';
import GeneSVG from './components/GeneSVG';
import TrnaSVG from './components/TrnaSVG';
import TreeSVG from './components/TreeSVG';
//import RrnaSVG from './components/RrnaSVG';

//define haplogroup that is passed to TreeSVG as a prop
var hgroup = [
  {id:'V',ac:1,an:409},
  {id:'L2',ac:2,an:128},
]

class App extends React.Component{
    
  render() {
      return (
        <BrowserRouter>
          <div className="App">
            <Navbar />
            
            <Route exact path='/' component={Home} />
            <Route path='/gene-tool' component={GeneTool} />
            <Route path='/trna-tool' component={TrnaTool} />
            <Route path='/linear-svg' component={LinearSVG} />
            <Route path='/gene-svg' render={(props) => <GeneSVG {...props} variant="" gene="MT-CO1" />} />
            <Route path='/trna-svg' render={(props) => <TrnaSVG {...props} variantId="MT-5592-A-G" variant="" gene="MT-TA" conseq="n.51T>C" />} />
            <Route path='/tree-svg' render={(props) => <TreeSVG {...props} hgroup={hgroup} />} />
            {/*<Route path='/rrna-svg' render={(props) => <RrnaSVG {...props} gene="MT-RNR2" variant="2020" />} />*/}
          </div>
        </BrowserRouter>
      );
  }

}

export default App;
