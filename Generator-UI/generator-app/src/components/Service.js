import React, { Component } from "react";
import Compose from "./Compose";
import axios from "axios";
import { Helmet } from "react-helmet";
var fileDownload = require("js-file-download");

class Service extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: [""],
      collectionName: "",
      isValid: true,
      errors: [],
      isValidTeam: true,
      serviceCount: 1,
      isGenerated: false,
      isReset: false
      // newServiceData: []
    };
    this.state.services[0] = {};
    this.state.services[0].isDeleted = false;
    this.setState({ services: this.state.services });
    this.handleAddService = this.handleAddService.bind(this);
    this.handleCollectionNameChange = this.handleCollectionNameChange.bind(
      this
    );

    this.handleSubmit = this.handleSubmit.bind(this);
    this.myCallback = this.myCallback.bind(this);
    // this.handleRemoveService = this.handleRemoveService(this);
  }

  styles = {
    fontSize: 20,
    fontWeight: "bold"
    // float: left,
    // width: "50%"
  };

  //   validate(finalServiceState) {
  //     const errors = [];
  //     const teamName = finalServiceState.collectionName;

  //     if (teamName.length === 0) {
  //       this.setState({ isValidTeam: false });
  //     }

  //     return errors;
  //   }
  handleSubmit = e => {
    e.preventDefault();

    this.setState({ isGenerated: true });

    this.state.services.forEach((service, index) => {
      if (
        !service.isDeleted && (
        service == "" ||
        service.serviceName == "" ||
        service.imageName == "" ||
        this.state.collectionName == "" ||
        service.imageName == undefined ||
        service.serviceName == undefined ||
        (!service.isIngress &&  service.portNumber == "") ||
        (!service.isIngress && service.portNumber == undefined) ||
        (service.isIngress && service.traefikURL == "") ||
        (service.isIngress && service.traefikURL == undefined) ||
        (service.isIngress && service.traefikAppPort == "") ||
        (service.isIngress && service.traefikAppPort == undefined) )
        
      ) {
        this.setState({ isValid: false });
      } else {
        this.setState({ isValid: true });
      }
    });

    var genServices = [];
    this.state.services.forEach((service, index) => {
      if (!service.isDeleted) {
        genServices.push(service);
      }
    });

    

    var finalServiceState = {};
    finalServiceState.services = genServices;
    finalServiceState.collectionName = this.state.collectionName;

    

    // finalServiceState.services = this.state.services;
    // finalServiceState.collectionName = this.state.collectionName;
    // console.log(finalServiceState.collectionName);
    //console.log(finalServiceState.services.serviceName);
    // const errors = this.validate(finalServiceState);
    // if (errors.length > 0) {
    //   this.setState({ errors });
    //   return;
    // }

    console.log(this.state.isValid);

    if (this.state.isValid) {
      axios
        .post("http://localhost:7000/", finalServiceState)
        .then(response => {
          fileDownload(response.data, "docker-compose.yml");
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  handleAddService() {
    this.setState({ services: [...this.state.services, ""] });
    var serviceCount_actual = this.state.services.length;
    this.state.services[serviceCount_actual] = {};
    this.state.services[serviceCount_actual].isDeleted = false;
    this.setState({ services: this.state.services });
    var count = 0;
    this.state.services.forEach((service, index) => {
      if (service.isDeleted == false) {
        count++;
        // this.state.serviceCount++;
        // this.setState({serviceCount: this.state.serviceCount})
      }
    });
    this.state.serviceCount = count;
    this.setState({ serviceCount: this.state.serviceCount });
  }

  handleResetButton(){

    var help= "";

    window.location.reload(); 
  }


  handleCollectionNameChange(event) {
    var text = event.target.value;
    var newText = "";
    if (text.includes(" ")) {
      newText = text.replace(" ", "");
    } else {
      newText = text;
    }
    this.state.collectionName = newText;
    this.setState({ collectionName: this.state.collectionName });
    this.state.services.forEach((service, index) => {
      if (
        service == "" ||
        service.serviceName == "" ||
        service.imageName == "" ||
        this.state.collectionName == "" ||
        service.imageName == undefined ||
        service.serviceName == undefined ||
        (!service.isIngress && service.portNumber == "") ||
        (!service.isIngress && service.portNumber == undefined)
        (service.isIngress && service.traefikURL == "") ||
        (service.isIngress && service.traefikURL == undefined) ||
        (service.isIngress && service.traefikAppPort == "") ||
        (service.isIngress && service.traefikAppPort == undefined)
      ) {
        this.setState({ isValid: false });
      } else {
        this.setState({ isValid: true });
      }
    });
  }

  myCallback(dataFromChild, index) {
    this.setState({ listDataFromChild: dataFromChild });
    //this.setFinalState()
    console.log("child to parent data" + this.state.listDataFromChild);

    if (this.state.services[index] == "") {
      this.state.services[index] = {};
    }

    this.state.services[index] = dataFromChild;
    this.setState({ services: this.state.services });

    this.state.services[index].isDeleted = false;
    this.setState({ services: this.state.services });

    if (
      this.state.services[index].serviceName == "" ||
      this.state.services[index].imageName == "" ||
      this.state.collectionName == "" ||
      (!this.state.services[index].isIngress && this.state.services[index].portNumber == "" ) ||
      (this.state.services[index].isIngress && this.state.services[index].traefikURL == "") ||
      (this.state.services[index].isIngress && this.state.services[index].traefikAppPort == "")

      ) {
      this.setState({ isValid: false });
    } else {
      this.setState({ isValid: true });
    }
    // if(this.state.services[index] != null && this.state.services[index].serviceName != ""){
    //     console.log("service name in parent:" + this.state.services[index].serviceName)
    // }
  }

  handleRemoveService(index) {
    //this.state.services.splice(index, 1);
    this.state.services[index].isDeleted = true;

    this.setState({ services: this.state.services });

    var count = 0;
    this.state.services.forEach((service, index) => {
      if (service.isDeleted == false) {
        count++;
        // this.state.serviceCount++;
        // this.setState({serviceCount: this.state.serviceCount})
      }
    });
    this.state.serviceCount = count;
    this.setState({ serviceCount: this.state.serviceCount });
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        <div class="row">
          <div class="col-md-2" />
          <div class="col-md-3" />
          <div class="col-md-5">
            {/* <button
              onClick={() => this.handleRemoveLocalVolumeOne()}
              class="close"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>{" "} */}
          </div>
        </div>

        {/* <div style={"float: left; width: 50%"}>I'm on the left</div> */}
        <Helmet>
          <style>{}</style>
        </Helmet>
        <font color="red">
          {errors.map(error => (
            <p key={error}>Error: {error}</p>
          ))}
        </font>
        <br />

        <div class="row">
          <div class="col-md-2" />
          <div class="col-md-3">
            <span style={this.styles} className="badge badge-primary m-2">
              Collection(Team) name :
            </span>
          </div>
          <div class="col-md-4">
            {" "}
            <input
              type="text"
              name="collectionName"
              class="form-control"
              placeholder='ex. "Team Name"'
              value={this.state.collectionName}
              onChange={this.handleCollectionNameChange}
            />
            {this.state.isGenerated &&
              !this.state.isValid &&
              this.state.collectionName == "" && (
                <font class="text-danger">
                  {" "}
                  Please Enter Collection(Team) Name
                </font>
              )}
          </div>
          <div class="col-md-2">
            <button
              class="btn btn-danger"
              onClick={() => this.handleResetButton()}
            >
              Reset All Fields
            </button>
          </div>
        </div>

        {this.state.services.map((service, index) => {
          let isDeletedVal = service != "" ? service.isDeleted : false;
          return (
            <div>
              <Compose
                service={service}
                callbackFromParent={this.myCallback}
                id={index}
                isValid={this.state.isValid}
                isDeleted={isDeletedVal}
                isGenerated={this.state.isGenerated}
              />
              {!isDeletedVal && this.state.serviceCount > 1 && (
                <div class="row">
                  <div class="col-md-9"> </div>
                  <div class="col-md-3">
                    <button
                      class="btn btn-danger"
                      onClick={() => this.handleRemoveService(index)}
                    >
                      Remove above service
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
 {/* <footer class="fixed-bottom">  */}
        <div class="row">
          <div class="col-md-2" />
          <div class="col-md-3" />
          <div class="col-md-5">
            <br />
            <button
              onClick={this.handleAddService}
              class="btn btn-outline-secondary"
            >
              Add More Services
            </button>{" "}
            <button onClick={this.handleSubmit} class="btn btn-outline-success">
              Generate the Docker Compose file
            </button>
          </div>
        </div>
         {/* </footer>  */}
        <br />
      </div>
    );
  }
}
export default Service;
