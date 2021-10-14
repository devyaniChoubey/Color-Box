import { Component } from "react";
import Button from '@material-ui/core/Button';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {withStyles} from '@material-ui/core/styles';
import styles from './styles/ColorPickerStyles';
  
class ColorPickerForm extends Component{
    constructor(props){
        super(props);
        this.state = {
           currentColor : "",
           newColorName : ""
        }
    }
    updateCurrentColor= (currentColor) => {
        console.log(currentColor)
        this.setState({
            currentColor : currentColor.hex
        })
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    handleSubmit = () => {
        const newColor = {color : this.state.currentColor , name : this.state.newColorName}
        this.props.addNewColor(newColor)
    }
    componentDidMount(){
        ValidatorForm.addValidationRule("isColorNameUnique" , value => 
          this.props.colors.every(({name}) => name.toLowerCase() !== value.toLowerCase())
        )
        ValidatorForm.addValidationRule("isColorUnique" , value => 
          this.props.colors.every(({color}) => color !== this.state.currentColor)
        )
    }
    render(){
        const {isPaletteFull, classes} = this.props;
        const {currentColor , newColorName} = this.state;
        return(
            <div>
                <ChromePicker className={classes.picker} color={currentColor} onChangeComplete={this.updateCurrentColor} />
                <ValidatorForm onSubmit={this.handleSubmit} instantValidate={false} ref="form">
                    <TextValidator  className={classes.colorNameInput}
                    placeholder='Color Name' name='newColorName' value={newColorName} onChange={this.handleChange} validators={["required", "isColorNameUnique", "isColorUnique"]}
                    errorMessages={[
                        "Enter a color name",
                        "Color name must be unique",
                        "Color already used!"
                    ]} 
                    variant='filled'
                    margin='normal'/> 
                    <Button className={classes.addColor}  type="submit" variant="contained" color="primary" disabled={isPaletteFull} style={{ backgroundColor: isPaletteFull ? "grey" : this.state.currentColor }}>{isPaletteFull ? "Palette Full" : "Add Color" }</Button>
                </ValidatorForm> 
            </div>
        )
    }
}

export default withStyles(styles)(ColorPickerForm);