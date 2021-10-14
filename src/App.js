import './App.css';
import Palette from './Palette';
import seedColors from './seedColors';
import { generatePalette } from "./colorHelper";
import {Component} from "react";
import {Switch , Route} from 'react-router-dom';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import {TransitionGroup  , CSSTransition} from 'react-transition-group';
import Page from './Page';

class App extends Component{
  constructor(props){
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
    this.state = {
      palettes : savedPalettes || seedColors
    }
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
  }
  savePalette(newpalette){
    this.setState({
      palettes : [...this.state.palettes , newpalette]
    } , this.syncLocalStorage)
  }
  findPalette(id){
    return this.state.palettes.find(seedColor => seedColor.id === id);
  }
  syncLocalStorage(){
    window.localStorage.setItem("palettes" , JSON.stringify(this.state.palettes))
  }
  deletePalette = (id) =>{
    this.setState(st => ({ palettes : st.palettes.filter(palette => palette.id !==  id)}), this.syncLocalStorage)
  }

  render(){
      return (
        <Route render={({location}) => (
          <TransitionGroup>
            <CSSTransition key={location.key} classNames="page" timeout={700}>
                <Switch location={location}>
                  <Route exact path="/palette/new" render={(routeProps) => <Page><NewPaletteForm palettes={this.state.palettes} savePalette={this.savePalette} {...routeProps}/></Page>}/>
                  <Route exact path="/" render={(rProps) =>  <Page><PaletteList deletePalette={this.deletePalette} palettes={this.state.palettes} {...rProps}/></Page>}/>
                  <Route exact path="/palette/:id" render={(rProps) => <Page><Palette palette={generatePalette(this.findPalette(rProps.match.params.id))}/></Page>}/>
                  <Route exact path="/palette/:paletteId/:colorId" render={(rProps) => (
                    <Page><SingleColorPalette colorId={rProps.match.params.colorId} palette={generatePalette(this.findPalette(rProps.match.params.paletteId))}/></Page>
                  )}/>
                  <Route render={(rProps) =>  <Page><PaletteList deletePalette={this.deletePalette} palettes={this.state.palettes} {...rProps}/></Page>}/>
                </Switch>
            </CSSTransition>
          </TransitionGroup>
          )}/>
        
      );
  } 
}

export default App;
