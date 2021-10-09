import { Component } from "react";
import ColorBox from "./ColorBox";
import "rc-slider/assets/index.css";
import './Palette.css';
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import {withStyles} from '@material-ui/styles';
import styles from './styles/PaletteStyles';

class Palette extends Component{
    componentDidMount(){
        console.log(this.props.palette)
    }
    constructor(props){
        super(props);
        this.state = {
            level : 500,
            format : "hex"
        }
    }
    changeLevel = (level) =>{
        this.setState({level})
    }
    changeFormat= (val) => {
       this.setState({format : val})
    }
    render(){
        const {colors , paletteName , emoji , id} = this.props.palette;
        const { level, format } = this.state;
        const { classes} = this.props;
        const colorBoxes = colors[level].map(color => (
            <ColorBox showFullPalette showLink background={color[format]} name={color.name} key={color.id} moreUrl={`/palette/${id}/${color.id}`}/>
        ))
        return(
            <div className={classes.Palette}>
                <Navbar showAllColors level={level} changeLevel={this.changeLevel} handleChange={this.changeFormat}/>
                <div className={classes.colors}>{colorBoxes}</div>
                <PaletteFooter paletteName={paletteName} emoji={emoji}/>
            </div>
        )
    }
}
export default withStyles(styles)(Palette);