import {Component} from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from "./PaletteFooter";
import {Link} from 'react-router-dom';
import {withStyles} from "@material-ui/styles";

const styles= {
    Palette: {
        height: "100vh",
        display: "flex",
        flexDirection: "column"
      },
      colors: {
        height: "90%"
      },
      goBack: {
        width: "20%",
        height: "50%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-6px",
        opacity: 1,
        backgroundColor: "black",
        "& a": {
          color: "white",
          width: "100px",
          height: "30px",
          position: "absolute",
          display: "inline-block",
          top: "50%",
          left: "50%",
          marginLeft: "-50px",
          marginTop: "-15px",
          textAlign: "center",
          outline: "none",
          background: "rgba(255, 255, 255, 0.3)",
          fontSize: "1rem",
          lineHeight: "30px",
          textTransform: "uppercase",
          border: "none",
          textDecoration: "none"
        }
      }
}
class SingleColorPalette extends Component{
    constructor(props){
        super(props);
        this._shades = this.gathershades(this.props.palette , this.props.colorId);
        this.state = {
            format : "hex"
        }
        this.changeFormat = this.changeFormat.bind(this)
        //console.log(this._shades);
    }
    gathershades(palette , colorToFilterBy){
        let shades = [];
        let allColors = palette.colors;
        for(let key in allColors){
            shades = shades.concat(allColors[key].filter(color => color.id === colorToFilterBy))
        }
        return shades.slice(1);
    }
    changeFormat(val){
       this.setState({ format : val})
    }
    render(){
        const {format} = this.state;
        const {paletteName , emoji , id} = this .props.palette;
        const {classes} = this.props;
        const colorBoxes = this._shades.map(color => (
            <ColorBox showFullPalette={false}  name={color.name} background={color[format]} key={color.name}/>
        ))
        return(
           <div className={classes.Palette}>
               <Navbar handleChange={this.changeFormat}  showAllColors={false}/>
               <div className={classes.colors}>{colorBoxes}
                   <div className={classes.goBack}><Link to={`/palette/${id}`}>Go Back</Link></div>
               </div>
               <PaletteFooter paletteName={paletteName} emoji={emoji}/>
           </div>
        )
    }
}
export default withStyles(styles)(SingleColorPalette);