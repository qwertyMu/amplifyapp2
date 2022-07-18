import React from "react";
import { withStyles, TextField, Button, Card } from "@material-ui/core";
import PropTypes from "prop-types";
import ComponentStyles from "./ComponentStyles.js";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import { useState } from "react";

const CreateTeamDetails = props => {
  const {
    Id,
    PersonName,
    PA,
    Specialty,
    Perm,
    handleChange,
    addData,
    saveUpdate,
    classes,
    isEditing
  } = props;

  // const [specialty, setSpecialty] = React.useState('');

  // const handleSpecialtyChange = (event) => {
    
  //   setSpecialty(event.target.value);

  // };
  // const [permSwitch, setPermSwitch] = useState(true);

  // const handlePermSwitch = (event) => {
  //   setPermSwitch(event.target.checked);
  // };

  return (
    <div className={classes.formWrapper} >
      <Card elevation={8}>
        <form onSubmit={addData} style={{padding: "8px", backgroundImage: "linear-gradient(#ffffff, #edd0ce)", borderRadius: "5px"}}>
          <TextField
            id="name-id"
            name="PersonName"
            label="Person Name"
            onChange={handleChange}
            value={PersonName}
            fullWidth
            required
          />
          <TextField
            id="occupation-id"
            name="PA"
            label="Number of PA"
            onChange={handleChange}
            value={PA}
            fullWidth
            required
          />
          <FormControl sx={{ m: 1, minWidth: 300 }}>
            <InputLabel id="demo-simple-select-autowidth-label">Specialty</InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="desc-id"
              defaultValue={''}
              value={Specialty}
              onChange={handleChange}
              autoWidth
              name="Specialty"
              label="Specialty"
              fullWidth
              required
            >
            <MenuItem value={'Endo'}>Endo</MenuItem>
            <MenuItem value={'Surgery'}>Surgery</MenuItem>
            <MenuItem value={'Diabetes'}>Diabetes</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 300 }}>
            <InputLabel id="demo-simple-select-autowidth-label">Perm?</InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="desc-id"
              defaultValue={''}
              value={Perm}
              onChange={handleChange}
              autoWidth
              name="Perm"
              label="Perm"
              fullWidth
              required
            >
            <MenuItem value={'Yes'}>Yes</MenuItem>
            <MenuItem value={'No'}>No</MenuItem>
            </Select>
          </FormControl>
          {isEditing ? (
            <Button
              type="submit"
              variant="contained"
              className={classes.button}
              onClick={e => saveUpdate(e, Id)}
              fullWidth
              style={{backgroundColor: "black", color: "white"}}
            >
              Update
            </Button>
          ) : (
            <Button
              type="submit"
              variant="contained"
              className={classes.button}
              fullWidth
              style={{backgroundColor: "#ec483e", color: "white"}}
            >
              Submit
            </Button>
          )}
        </form>
      </Card>
    </div>
  );
};

CreateTeamDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  Id: PropTypes.number,
  PersonName: PropTypes.string.isRequired,
  PA: PropTypes.number.isRequired,
  Specialty: PropTypes.string.isRequired,
  Perm: PropTypes.string.isRequired,
  addData: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  saveUpdate: PropTypes.func.isRequired
};

export default withStyles(ComponentStyles)(CreateTeamDetails);
