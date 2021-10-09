import './App.css';
import Palette from './Palette';
import seedColors from './seedColors';
import { generatePalette } from "./colorHelper";
import {Component} from "react";
import {Switch , Route} from 'react-router-dom';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
class App extends Component{
  render(){
      const findPalette = (id) => {
        return seedColors.find(seedColor => seedColor.id === id);
      }
      return (
        <Switch>
          <Route exact path="/" render={(rProps) => <PaletteList palettes={seedColors} {...rProps}/>}/>
          <Route exact path="/palette/:id" render={(rProps) => <Palette palette={generatePalette(findPalette(rProps.match.params.id))}/>}/>
          <Route exact path="/palette/:paletteId/:colorId" render={(rProps) => (
            <SingleColorPalette colorId={rProps.match.params.colorId} palette={generatePalette(findPalette(rProps.match.params.paletteId))}/>
          )}/>
        </Switch>
      );
  } 
}

export default App;
