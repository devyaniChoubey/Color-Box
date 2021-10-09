import {withStyles} from '@material-ui/styles';
import {Link} from 'react-router-dom';
import styles from './styles/MiniPaletteStyles';

function MiniPalette(props){
    const {classes , paletteName , emoji , colors , id} = props;
    const miniColorBoxes = colors.map(color => (
        <div
           className={classes.miniColor}
           style={{ backgroundColor : color.color}}
           key={color.name}
        />
    ))
    return(
 
        <div className={classes.root} onClick={props.handleClick}>
            <div className={classes.colors}>{miniColorBoxes}</div>
            <h5 className={classes.title}>
               {paletteName} <span className={classes.emoji}>{emoji}</span>
            </h5>
        </div>
   
    )
}

export default withStyles(styles)(MiniPalette);
