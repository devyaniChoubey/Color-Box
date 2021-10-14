import { Component} from "react";
import classNames from "classnames";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Link } from "react-router-dom";
import PaletteMetaForm from "./PaletteMetaForm";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import styles from './styles/PaletteformNavStyles';


class PaletteFormNav extends Component{
    constructor(props){
        super(props);
        this.state = {
            newpaletteName : "",
            showingForm : false
        }
    }
    componentDidMount(){
        ValidatorForm.addValidationRule("isPaletteNameUnique" , value => 
             this.props.palettes.every(({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase())
        )
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    showForm = () => {
        this.setState({
            showingForm : true
        })
    }
    hideForm = () => {
        this.setState({
            showinfForm : false
        })
    }
    render(){
        let {handleDrawerOpen , classes , open , handleSubmit, palettes } = this.props;
        let {showingForm} = this.state;
        return(
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position='fixed'color='default'
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: open
                    })}
                >
                    <Toolbar disableGutters={!open}>
                        <IconButton
                            color='inherit'
                            aria-label='Open drawer'
                            onClick={handleDrawerOpen}
                            className={classNames(classes.menuButton, {
                                [classes.hide] : open
                            })}
                        >
                            <AddToPhotosIcon/>
                        </IconButton>
                        <Typography variant='h6' color='inherit' noWrap>
                            Create A Palette
                        </Typography>
                    </Toolbar>
                    <div className={classes.navBtns}>
                        <Link to="/" className={classes.button}><Button variant="contained" color="secondary" >Go Back</Button></Link>  
                        <Button className={classes.button} onClick={this.showForm} variant="contained" color="secondary">Save</Button>
                    </div>
                </AppBar>
                {showingForm && <PaletteMetaForm hideForm={this.hideForm} palettes={palettes} handleSubmit={handleSubmit}/>}
            </div>
        )
    }
}

export default withStyles(styles , { withTheme : true })(PaletteFormNav);