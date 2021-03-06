import { withStyles } from '@material-ui/styles';
import {Component} from 'react';
import {Link} from 'react-router-dom';
import MiniPalette from './MiniPalette';
import styles from './styles/PaletteListStyles';   
import {CSSTransition , TransitionGroup} from 'react-transition-group'; 
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import DialogTitle from "@material-ui/core/DialogTitle";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";

class PaletteList extends Component{
    constructor(props){
        super(props);
        this.state = {
            deletingId : "",
            openDeleteDialog : false
        }
    }
    onCloseDialog = () => {
        this.setState({
            openDeleteDialog : false,
            deletingId : ""
        })
    }
    onOpenDialog = (id) => {
        this.setState({
            openDeleteDialog : true,
            deletingId : id
        })
    }
    componentDidMount(){
        console.log(this.props.palettes);
    }
    goToPalette = (id) =>{
        console.log("HI")
        this.props.history.push(`/palette/${id}`)
    }
    handleDelete = () => {
        this.props.deletePalette(this.state.deletingId)
        this.onCloseDialog()
    }
    render(){
        const {palettes , classes } = this.props;
        const { openDeleteDialog } = this.state;
        return(
            <div className={classes.root}>
                <div className={classes.container}>
                   <nav className={classes.nav}>
                        <h1 className={classes.heading}>React Colors</h1>
                        <Link to="/palette/new">Create Palette</Link>
                   </nav>
                   <TransitionGroup className={classes.palettes}>
                       {palettes.map(palette => (
                           <CSSTransition classNames="fade" key={palette.id} timeout={500}>
                           <MiniPalette onOpenDialog={this.onOpenDialog} key={palette.id} id={palette.id} {...palette} goToPalette={this.goToPalette}/>
                           </CSSTransition>
                       ))}
                   </TransitionGroup>
                </div>
                <Dialog open={openDeleteDialog} aria-labelledby='delete-dialog-title' onClose={this.closeDialog}>
                    <DialogTitle id="delete-dialog-title">Delete This Palette</DialogTitle>
                    <List>
                        <ListItem button onClick={this.handleDelete}>
                           <ListItemAvatar>
                                <Avatar style={{ backgroundColor : blue[100] , color : blue[600]}}>
                                    <CheckIcon/>
                                </Avatar>
                           </ListItemAvatar>
                           <ListItemText primary="Delete"/>
                        </ListItem>
                        <ListItem button onClick={this.onCloseDialog}>
                           <ListItemAvatar>
                                <Avatar style={{ backgroundColor : red[100] , color : red[600]}}>
                                    <CloseIcon/>
                                </Avatar>
                           </ListItemAvatar>
                           <ListItemText primary="Cancel"/>
                        </ListItem>
                    </List>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(PaletteList);




