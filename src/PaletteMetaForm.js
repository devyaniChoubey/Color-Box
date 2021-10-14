import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {Picker} from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

class PaletteMetaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage : "form",
      newpaletteName: ""
    };
  }
  componentDidMount() {
    ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
      this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }
  showEmojiPicker = () => {
    this.setState({
       stage : "emoji"
    })
  }
  savePalette = (emoji) =>{
      const newPalette = {
        paletteName : this.state.newpaletteName,
        emoji : emoji.native
      }
      this.props.handleSubmit(newPalette);
      this.setState({
        stage : ""
      })
  }
  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { newpaletteName , stage } = this.state;
    const {  hideForm } = this.props;
    return (
      <div>
        <Dialog open={stage === "emoji"} onClose={hideForm}>
            <DialogTitle id='form-dialog-title'>
                Choose a Palette Emoji
            </DialogTitle>
            <Picker onSelect={this.savePalette}/>
        </Dialog>
        <Dialog
          open={stage === "form"}
          onClose={hideForm}
          aria-labelledby='form-dialog-title'
        >
            <DialogTitle id='form-dialog-title'>Choose a palette Name</DialogTitle>
            <ValidatorForm onSubmit={this.showEmojiPicker}>
                <DialogContent>
                    <DialogContentText>
                        Please enter a name for your new beautiful palette. Make sure it's unique!.
                    </DialogContentText>
                    <TextValidator autoFocus
                    fullWidth variant='filled'
                    margin='normal' label='Palette Name'  validators={["required", "isPaletteNameUnique"]}
                    errorMessages={["Enter Palette Name", "Name already used"]} name="newpaletteName" value={newpaletteName} onChange={this.handleChange}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={hideForm} color='primary'>
                    Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="secondary">Save Palette</Button>
                </DialogActions>
            </ValidatorForm>
        </Dialog>
      </div>
      
    );
  }
}
export default PaletteMetaForm;