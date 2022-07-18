import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import CreateTeamDetails from "./CreateTeamDetails";
import DataLists from "./DataLists.js";

class InputTeamDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLists: [],
      Id: null,
      PersonName: "",
      PA: 0,
      Specialty: "",
      Perm: "",
      isEditing: false
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  //To add data to the dataList array
  addData = e => {
    e.preventDefault();
    const { PersonName, PA, Specialty, Perm } = this.state;
    if (!PersonName || !PA || !Specialty || !Perm ) return;
    let dataLists = [
      ...this.state.dataLists,
      {
        Id: Math.random(),
        PersonName: this.state.PersonName,
        PA: this.state.PA,
        Specialty: this.state.Specialty,
        Perm: this.state.Perm,
      }
    ];
    this.setState({
      dataLists
    });
    console.log(JSON.stringify(dataLists));
    this.reset();
  };

  //To reset the form fields
  reset = () => {
    this.setState({
        PersonName: "",
        PA: 0,
        Specialty: ["Surgery", "Diabetes", "Endo"],
        Perm: false,
    });
  };

  //To remove the data from the list
  removeData = Id => {
    let dataLists = this.state.dataLists.filter(data => {
      return data.Id !== Id;
    });

    this.setState({
      dataLists
    });
  };

  //To handle the data Update
  handleUpdate = (e, Id) => {
    const index = this.state.dataLists.findIndex(data => {
      return data.Id === Id;
    });
    const data = Object.assign({}, this.state.dataLists[index]);
    this.setState({
      Id: data.Id,
      PersonName: data.PersonName,
      PA: data.PA,
      Perm: data.Perm,
      isEditing: true
    });
  };

  //To save the updated data
  saveUpdate = (e, Id) => {
    const newData = this.state.dataLists.map(data => {
      if (data.Id === Id) {
        return {
            PersonName: this.state.PersonName,
            PA: this.state.PA,
            Specialty: this.state.Specialty,
            Perm: this.state.Perm,
        };
      }
      return data;
    });
    this.setState(
      {
        dataLists: newData,
        isEditing: false
      },
      () => {
        this.reset();
      }
    );
  };

  render() {
    const {
      dataLists,
      Id,
      PersonName,
      PA,
      Specialty,
      Perm,
      isEditing
    } = this.state;
    return (
      <Grid container spacing={0}>
        <Grid item ls={12} md={12} sm={12} xs={12}>
          <CreateTeamDetails
            Id={Id}
            PersonName={PersonName}
            PA={PA}
            Specialty={Specialty}
            Perm={Perm}
            addData={this.addData}
            handleChange={this.handleChange}
            saveUpdate={this.saveUpdate}
            isEditing={isEditing}
          />
        </Grid>
        <Grid item ls={12} md={12} sm={12} xs={12}>
          <DataLists
            lists={dataLists}
            removeData={this.removeData}
            handleUpdate={this.handleUpdate}
          />
        </Grid>
      </Grid>
    );
  }
}

export default InputTeamDetails;
