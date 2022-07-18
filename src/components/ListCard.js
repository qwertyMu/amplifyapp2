import React from "react";
import {
  withStyles,
  Card,
  CardContent,
  Typography,
  IconButton
} from "@material-ui/core";
import { DeleteOutlined, EditOutlined } from "@material-ui/icons";
import PropTypes from "prop-types";
import ComponentStyles from "./ComponentStyles";
import { Button } from "@mui/material";
import { API } from "aws-amplify";

const ListCard = props => {
  const {
    classes,
    Id,
    PersonName,
    PA,
    Specialty,
    Perm,
    handleUpdate,
    removeData
  } = props;

  const contactDetails = {
    PersonName: PersonName,
    PA: PA,
    Specialty: Specialty,
    Perm: Perm,
  };

  const addContactsData = `mutation createContact($name:String! $phoneNumber:String! $emailAddress:String! $notes:String! $source:String! $exhibit:String!){
    createContact(input:{
      name: $name
      phoneNumber: $phoneNumber
      emailAddress: $emailAddress
      notes: $notes
      source: $source
      exhibit: $exhibit
    }){
      id
      name
      phoneNumber
      emailAddress
      notes
      source
      exhibit
    }
  }`;

    async function createContact(){
    
      const newContactRecord = 
      await API.graphql({
        query: addContactsData,
        variables: contactDetails,
        authMode: "API_KEY"
      });
      console.log(JSON.stringify(newContactRecord));
    };

  return (
    <Card className={classes.card} elevation={8} style={{color: "white"}}>
      <CardContent>
        <IconButton
          aria-label="Update"
          className={classes.edit}
          onClick={e => handleUpdate(e, Id)}
        >
          <EditOutlined />
        </IconButton>
        <IconButton
          aria-label="Delete"
          className={classes.delete}
          onClick={() => removeData(Id)}
        >
          <DeleteOutlined />
        </IconButton>
        <Typography variant="h6" className={classes.name}>
          Dr: {PersonName}
        </Typography><br />
        <Typography className={classes.details}>
          PA: <b>{PA}</b> hrs of Programmed Activity
        </Typography><br />
        <Typography className={classes.details}>
          Specialty: {Specialty}
        </Typography><br />
        <Typography className={classes.details}>
          Perm: {Perm}
        </Typography><br />
        <Button variant="contained" onClick={createContact}>
            Send to DB
        </Button>
      </CardContent>
    </Card>
  );
};

ListCard.propTypes = {
  classes: PropTypes.object.isRequired,
  Id: PropTypes.number,
  PersonName: PropTypes.string.isRequired,
  PA: PropTypes.number.isRequired,
  Specialty: PropTypes.string.isRequired,
  Perm: PropTypes.string.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  removeData: PropTypes.func.isRequired
};

export default withStyles(ComponentStyles)(ListCard);


