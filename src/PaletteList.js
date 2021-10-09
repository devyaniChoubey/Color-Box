import { withStyles } from '@material-ui/styles';
import {Component} from 'react';
import {Link} from 'react-router-dom';
import MiniPalette from './MiniPalette';
import styles from './styles/PaletteListStyles';    

class PaletteList extends Component{
    componentDidMount(){
        console.log(this.props.palettes);
    }
    goToPalette(id){
        console.log("HI")
        this.props.history.push(`/palette/${id}`)
    }
    render(){
        const {palettes , classes} = this.props;
        return(
            <div className={classes.root}>
                <div className={classes.container}>
                   <nav className={classes.nav}>
                        <h1>React Colors</h1>
                   </nav>
                   <div className={classes.palettes}>
                       {palettes.map(palette => (
                           <MiniPalette {...palette} handleClick={() => this.goToPalette(palette.id)}/>
                       ))}
                   </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(PaletteList);



