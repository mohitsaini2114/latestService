import React, { Component } from "react";
//import { MDBInput } from "mdbreact";
//const mdbreact = require('mdbreact');
import NetworkComponent from "./NetworkComponent";

import BootstrapSwitchButton from "bootstrap-switch-button-react";
import "./compose.css";

class Compose extends Component {
  // state = {

  // };
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      service: [],
      serviceName: "",
      imageName: "",
      portNumber: "",

      traefikURL: "",
      traefikAppPort: "",

      health: "",
      replica: "",
      memory: "",
      isVolumeNAS: false,
      isIngress: false,
      networkClick: false,
      networksOne: [],
      secretsOne: [],
      localVolumeOne: [],
      configs: [],
      NASVol: []
    };
    this.handleServiceNameChange = this.handleServiceNameChange.bind(this);
    this.handleImageNameChange = this.handleImageNameChange.bind(this);
    this.handlePortNumberChange = this.handlePortNumberChange.bind(this);

    this.handleTraefikURLInputChange = this.handleTraefikURLInputChange.bind(
      this
    );
    this.handleTraefikAppPortInputChange = this.handleTraefikAppPortInputChange.bind(
      this
    );

    this.handleHealthChange = this.handleHealthChange.bind(this);
    this.handleMemoryChange = this.handleMemoryChange.bind(this);
    this.handleReplicaChange = this.handleReplicaChange.bind(this);
    this.handleNetworkClick = this.handleNetworkClick.bind(this);
  }
  styles = {
    fontSize: 20,
    fontWeight: "bold"
  };

  //   restrictSpace(event) {
  //     if (event.keyCode == 32) {
  //         return false;
  //     }
  // }

  handleServiceNameChange(event) {
    var text = event.target.value;
    var newText = "";
    if (text.includes(" ")) {
      newText = text.replace(" ", "");
    } else {
      newText = text;
    }
    this.state.serviceName = newText;
    this.setState({ serviceName: this.state.serviceName });
    console.log("servie name: " + this.state.serviceName);
    this.props.callbackFromParent(this.state, this.state.id);
  }
  handleImageNameChange(event) {
    var text = event.target.value;
    var newText = "";
    if (text.includes(" ")) {
      newText = text.replace(" ", "");
    } else {
      newText = text;
    }
    this.state.imageName = newText;
    this.setState({ imageName: this.state.imageName });
    this.props.callbackFromParent(this.state, this.state.id);
  }
  handlePortNumberChange(event) {
    var text = event.target.value;
    var newText = "";
    if (text.includes(" ")) {
      newText = text.replace(" ", "");
    } else {
      newText = text;
    }
    this.state.portNumber = newText;
    this.setState({ portNumber: this.state.portNumber });
    this.props.callbackFromParent(this.state, this.state.id);
  }

  handleTraefikURLInputChange(event) {
    var text = event.target.value;
    var newText = "";
    if (text.includes(" ")) {
      newText = text.replace(" ", "");
    } else {
      newText = text;
    }
    this.state.traefikURL = newText;
    this.setState({ traefikURL: this.state.traefikURL });
    this.props.callbackFromParent(this.state, this.state.id);
  }
  handleTraefikAppPortInputChange(event) {
    var text = event.target.value;
    var newText = "";
    if (text.includes(" ")) {
      newText = text.replace(" ", "");
    } else {
      newText = text;
    }
    this.state.traefikAppPort = newText;
    this.setState({ traefikAppPort: this.state.traefikAppPort });
    this.props.callbackFromParent(this.state, this.state.id);
  }

  handleHealthChange(event) {
    var text = event.target.value;
    var newText = "";
    if (text.includes(" ")) {
      newText = text.replace(" ", "");
    } else {
      newText = text;
    }
    this.state.health = newText;
    this.setState({ health: this.state.health });
    this.props.callbackFromParent(this.state, this.state.id);
  }
  handleReplicaChange(event) {
    var text = event.target.value;
    var newText = "";
    if (text.includes(" ")) {
      newText = text.replace(" ", "");
    } else {
      newText = text;
    }
    this.state.replica = newText;
    this.setState({ replica: this.state.replica });
    this.props.callbackFromParent(this.state, this.state.id);
  }
  handleMemoryChange(event) {
    var text = event.target.value;
    var newText = "";
    if (text.includes(" ")) {
      newText = text.replace(" ", "");
    } else {
      newText = text;
    }
    this.state.memory = newText;
    this.setState({ memory: this.state.memory });
    this.props.callbackFromParent(this.state, this.state.id);
  }

  handleNetworkClick() {
    this.setState({
      networkClick: !this.state.networkClick
    });
  }

  handleAddNetworkOne() {
    this.setState({ networksOne: [...this.state.networksOne, ""] });
  }

  handleNetworkOneInput(e, index) {
    this.state.networksOne[index] = e.target.value;
    this.setState({ networksOne: this.state.networksOne });
    this.props.callbackFromParent(this.state, this.state.id);
  }

  handlePortAddNetwork() {
    var randomNetwork;
    var traefic = [];
    this.state.portNumber = "";
    this.setState({portNumber: this.state.portNumber});
    this.state.traefikURL = "";
    this.setState({traefikURL: this.state.traefikURL});
    this.state.traefikAppPort = "";
    this.setState({traefikAppPort: this.state.traefikAppPort});
    
    if (!this.state.isIngress) {
    
      var randomNetworkGen = Math.floor(Math.random() * 6 + 1);
      randomNetwork = "traefik-" + randomNetworkGen;
      traefic = randomNetwork;
      this.state.networksOne = [randomNetwork, ...this.state.networksOne];
      this.setState({ networksOne: this.state.networksOne });
      
    } else if (this.state.isIngress) {
      
      this.state.networksOne.splice(0, 1);
    }
    this.props.callbackFromParent(this.state, this.state.id);
  }

  handleRemoveNetworkOne(index) {
    this.state.networksOne.splice(index, 1);

    console.log(this.state.networksOne, "$$$$");

    this.setState({ networksOne: this.state.networksOne });
  }
  handleAddSecrets() {
    this.setState({ secretsOne: [...this.state.secretsOne, ""] });
  }

  handleSecretNameInput(e, index) {
    if (this.state.secretsOne[index] == "") {
      this.state.secretsOne[index] = {};
    }

    var text = e.target.value;
    var newText = "";
    if (text.includes(" ")) {
      newText = text.replace(" ", "");
    } else {
      newText = text;
    }

    this.state.secretsOne[index].secretName = newText;
    this.setState({ secretsOne: this.state.secretsOne });
    this.props.callbackFromParent(this.state, this.state.id);
  }
  handleSecretFileInput(e, index) {
    if (this.state.secretsOne[index] == "") {
      this.state.secretsOne[index] = {};
    }

    var text = e.target.value;
    var newText = "";
    if (text.includes(" ")) {
      newText = text.replace(" ", "");
    } else {
      newText = text;
    }
    this.state.secretsOne[index].secretFile = newText;
    this.setState({ secretsOne: this.state.secretsOne });
    this.props.callbackFromParent(this.state, this.state.id);
  }
  handleRemoveSecretOne(index) {
    this.state.secretsOne.splice(index, 1);
    this.setState({ secretsOne: this.state.secretsOne });
  }
  handleAddLocalVolume() {
    this.setState({ localVolumeOne: [...this.state.localVolumeOne, ""] });
  }
  handleLocalVolumeOneInput(e, index) {
    var text = e.target.value;
    var newText = "";
    if (text.includes(" ")) {
      newText = text.replace(" ", "");
    } else {
      newText = text;
    }
    this.state.localVolumeOne[index] = newText;
    this.setState({ localVolumeOne: this.state.localVolumeOne });
    this.props.callbackFromParent(this.state, this.state.id);
  }
  handleRemoveLocalVolumeOne(index) {
    this.state.localVolumeOne.splice(index, 1);
    this.setState({ localVolumeOne: this.state.localVolumeOne });
  }
  handleAddConfig() {
    this.setState({ configs: [...this.state.configs, ""] });
  }
  handleConfigSourceInput(e, index) {
    if (this.state.configs[index] == "") {
      this.state.configs[index] = {};
    }
    var text = e.target.value;
    var newText = "";
    if (text.includes(" ")) {
      newText = text.replace(" ", "");
    } else {
      newText = text;
    }
    
    this.state.configs[index].source = newText;
    this.setState({ configs: this.state.configs });
    //this.state.service.configs = this.state.configs[index]
    //this.state.service.configs[index] ={}
    //this.state.service.configs = this.state.configs
    //this.setState({service: this.state.service.configs})
    this.props.callbackFromParent(this.state, this.state.id);
  }
  handleConfigTargetInput(e, index) {
    if (this.state.configs[index] == "") {
      this.state.configs[index] = {};
    }
    var text = e.target.value;
    var newText = "";
    if (text.includes(" ")) {
      newText = text.replace(" ", "");
    } else {
      newText = text;
    }
    this.state.configs[index].target = newText;
    this.setState({ configs: this.state.configs });
    this.props.callbackFromParent(this.state, this.state.id);
  }
  handleConfigVersionInput(e, index) {
    if (this.state.configs[index] == "") {
      this.state.configs[index] = {};
    }
    var text = e.target.value;
    var newText = "";
    if (text.includes(" ")) {
      newText = text.replace(" ", "");
    } else {
      newText = text;
    }
    this.state.configs[index].version = newText;
    this.setState({ configs: this.state.configs });
  }
  handleConfigFileInput(e, index) {
    if (this.state.configs[index] == "") {
      this.state.configs[index] = {};
    }

    var text = e.target.value;
    var newText = "";
    if (text.includes(" ")) {
      newText = text.replace(" ", "");
    } else {
      newText = text;
    }

    this.state.configs[index].file = newText;
    this.setState({ configs: this.state.configs });
  }
  handleRemoveConfig(index) {
    this.state.configs.splice(index, 1);

    console.log(this.state.configs, "$$$$");

    this.setState({ configs: this.state.configs });
  }
  handleAddNASVolume() {
    this.setState({ NASVol: [...this.state.NASVol, ""] });
  }
  handleNASVolNameInput(e, index) {
    if (this.state.NASVol[index] == "") {
      this.state.NASVol[index] = {};
    }

    var text = e.target.value;
    var newText = "";
    if (text.includes(" ")) {
      newText = text.replace(" ", "");
    } else {
      newText = text;
    }

    this.state.NASVol[index].NASVolume = newText;
    this.setState({ NASVol: this.state.NASVol });
    this.props.callbackFromParent(this.state, this.state.id);
  }
  handleNASHostInput(e, index) {
    if (this.state.NASVol[index] == "") {
      this.state.NASVol[index] = {};
    }
    var text = e.target.value;
    var newText = "";
    if (text.includes(" ")) {
      newText = text.replace(" ", "");
    } else {
      newText = text;
    }
    this.state.NASVol[index].NASHost = newText;
    this.setState({ NASVol: this.state.NASVol });
    this.props.callbackFromParent(this.state, this.state.id);
  }
  handleNASPathInput(e, index) {
    if (this.state.NASVol[index] == "") {
      this.state.NASVol[index] = {};
    }
    var text = e.target.value;
    var newText = "";
    if (text.includes(" ")) {
      newText = text.replace(" ", "");
    } else {
      newText = text;
    }
    this.state.NASVol[index].NASPath = newText;
    this.setState({ NASVol: this.state.NASVol });
  }
  handleRemoveNASVol(index) {
    this.state.NASVol.splice(index, 1);
    this.setState({ NASVol: this.state.NASVol });
  }
  //validations for numeric fields. The user can't enter e,-,+,.
  handleNumberInput(event) {
    if (
      event.key === "e" ||
      event.key === "-" ||
      event.key === "+" ||
      event.key === "."
    ) {
      event.returnValue = false;
      if (event.preventDefault) event.preventDefault();
    }
  }
  // handleSubmit(){
  //     var services = []
  //     //console.log(this.state.networksOne,"mera network")
  //     //console.log(this.state.configs, "mera config")

  //     services.push(this.state.configs)
  //     console.log(services)
  // }

  render() {
    const isVolumeNAS = this.state.isVolumeNAS;
    const isIngress = this.state.isIngress;
    let localVolLabel,
      lovalVolInput,
      localVolAdd,
      localVolAddRemoveButton,
      NASVolAdd,
      portNumberInput,
      traefikURLLabel,
      traefikURLInput,
      traefikAppPortLabel,
      traefikAppPortInput,
      NASVolAddAll;

    if (!isIngress) {
      // portNumberLabel = (
      //     <span style={this.styles} className="badge badge-primary m-2">
      //       Port Mapping :
      //     </span>

      //   );
      portNumberInput = (
        <input
          type="text"
          name="portNumber"
          class="form-control"
          value={this.state.portNumber}
          onChange={this.handlePortNumberChange}
          placeholder="ex. 8080:8080"
        />
      );
    } else {
      traefikURLLabel = (
        <div class="row">
          <div class="col-md-3">
            <span style={this.styles} className="badge badge-primary m-2">
              URL:
            </span>
          </div>

          <div class="col-md-6">
            <input
              class="form-control"
              type="text"
              name="portNumber"
              value={this.state.traefikURL}
              onChange={this.handleTraefikURLInputChange}
            />
          </div>
        </div>
      );

      traefikAppPortLabel = (
        <div class="row">
          <div class="col-md-3">
            <span style={this.styles} className="badge badge-primary m-2">
              App Port:
            </span>
          </div>

          <div class="col-md-6">
            <input
              class="form-control"
              type="text"
              name="portNumber"
              value={this.state.traefikAppPort}
              onChange={this.handleTraefikAppPortInputChange}
            />
          </div>
        </div>
      );
    }

    if (!isVolumeNAS) {
      //   localVolLabel = (
      //     <span style={this.styles} className="badge badge-primary m-2">
      //       Local Volume Name:{" "}
      //     </span>
      //   );
      //   lovalVolInput = (
      //     <input type="text" onChange={this.handleServiceNameChange} />
      //   );
      localVolAdd = (
        <button
          onClick={e => this.handleAddLocalVolume(e)}
          class="btn btn-outline-success"
        >
          {" "}
          Add Local Volume
        </button>
      );

      localVolAddRemoveButton = this.state.localVolumeOne.map(
        (secret, index) => {
          return (
            <div key={index} class="border">
              <div class="row">
                <div class="col-md-4">
                  <span style={this.styles} className="badge badge-primary m-2">
                    Local Volume:{" "}
                  </span>
                </div>

                <div class="col-md-6">
                  <input
                    class="form-control"
                    onChange={e => this.handleLocalVolumeOneInput(e, index)}
                    value={secret}
                  />
                </div>

                <div class="col-md-2">
                  <button
                    onClick={() => this.handleRemoveLocalVolumeOne(index)}
                    class="close"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              </div>
            </div>
          );
        }
      );
    } else {
      NASVolAdd = (
        <button
          onClick={e => this.handleAddNASVolume(e)}
          class="btn btn-outline-success"
        >
          {" "}
          Add NAS Volume
        </button>
      );
      NASVolAddAll = this.state.NASVol.map((config, index) => {
        return (
          <div key={index} class="border">
            &nbsp;
            <div class="row">
              <div class="col-md-3">
                <span style={this.styles} className="badge badge-primary m-2">
                  NAS Volume:{" "}
                </span>
              </div>

              <div class="col-md-7">
                <input
                  class="form-control"
                  onChange={e => this.handleNASVolNameInput(e, index)}
                  value={config.NASVolume}
                />
              </div>

              <div class="col-md-2">
                <button
                  onClick={() => this.handleRemoveNASVol(index)}
                  class="close"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
            <div class="row">
              <div class="col-md-3">
                <span style={this.styles} className="badge badge-primary m-2">
                  NAS Host:{" "}
                </span>
              </div>

              <div class="col-md-7">
                <input
                  class="form-control"
                  onChange={e => this.handleNASHostInput(e, index)}
                  value={config.NASHost}
                />
              </div>
            </div>
            <div class="row">
              <div class="col-md-3">
                <span style={this.styles} className="badge badge-primary m-2">
                  NAS Path:{" "}
                </span>
              </div>

              <div class="col-md-7">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon3">
                      :/
                    </span>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    aria-describedby="basic-addon3"
                    onChange={e => this.handleNASPathInput(e, index)}
                    value={config.NASPath}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      });
    }

    let isDeleted = this.props.isDeleted;

    return (
        !isDeleted &&
      <div key={this.props.id} class="border border-secondary">
        <br />

        <div class="row">
          <div class="col-md-2" />
          <div class="col-md-3">
            <span style={this.styles} className="badge badge-primary m-2">
              Services name :
            </span>
          </div>
          <div class="col-md-4">
            <input
              type="text"
              name="ServiceName"
              class="form-control"
              onkeypress={this.restrictSpace}
              value={this.state.serviceName}
              onChange={this.handleServiceNameChange}
            />
            {this.props.isGenerated && !this.props.isValid && this.state.serviceName == "" && (
              <font class="text-danger"> Please Enter Service Name</font>
            )}
          </div>
        </div>

        <div class="row">
          <div class="col-md-2" />
          <div class="col-md-3">
            <span style={this.styles} className="badge badge-primary m-2">
              Image name :
            </span>
            <a
              href="https://docs.docker.com/compose/compose-file/#image"
              target="_blank"
            >
              what's this?{" "}
            </a>
          </div>
          <div class="col-md-4">
            <input
              type="text"
              name="imageName"
              class="form-control input-normal"
              value={this.state.imageName}
              onChange={this.handleImageNameChange}
            />
            {this.props.isGenerated && !this.props.isValid && this.state.imageName == "" && (
              <font class="text-danger"> Please Enter Image Name</font>
            )}
          </div>
        </div>

        <div class="row">
          <div class="col-md-2" />
          <div class="col-md-3">
            <span style={this.styles} className="badge badge-primary m-2">
              Port Mapping :
            </span>{" "}
            <a
              href="https://docs.docker.com/compose/compose-file/#ports"
              target="_blank"
            >
              what's this?{" "}
            </a>
          </div>
          <div class="col-md-4">
            <BootstrapSwitchButton
              checked={false}
              onlabel="Traefik"
              onstyle="secondary"
              offlabel="Ingress"
              offstyle="success"
              style="w-50 mx-2"
              onChange={(checked: boolean) => {
                this.setState(
                  { isIngress: checked }
                );
                this.handlePortAddNetwork();
              }}
            //   ,
            //       this.setState(
            //         { traefikURL: "" },
            //         this.setState(
            //           { traefikAppPort: "" },
            //           this.setState({ portNumber: "" })
            //         )
            //       )
            />
            <br />
            <br />
            {portNumberInput}
            {this.props.isGenerated && !this.props.isValid && !this.state.isIngress && this.state.portNumber == ""  && (
              <font class="text-danger"> Please Enter Port Mapping</font>
            )}

            {traefikURLLabel}
            {traefikURLInput}
            {this.props.isGenerated && !this.props.isValid && this.state.isIngress && this.state.traefikURL == ""  && (
              <font class="text-danger"> Please Enter URL</font>
            )}

            {traefikAppPortLabel}
            {traefikAppPortInput}
            {this.props.isGenerated && !this.props.isValid && this.state.isIngress && this.state.traefikAppPort == "" &&  (
              <font class="text-danger"> Please Enter App Port</font>
            )}
            <br />
          </div>
        </div>

        <div class="row">
          <div class="col-md-2" />
          <div class="col-md-3">
            <span style={this.styles} className="badge badge-primary m-2">
              Health Check URL:
            </span>
            <a
              href="https://docs.docker.com/compose/compose-file/#healthcheck"
              target="_blank"
            >
              what's this?{" "}
            </a>
          </div>
          <div class="col-md-4">
            <input
              type="text"
              name="health"
              size="27"
              class="form-control"
              value={this.state.health}
              onChange={this.handleHealthChange}
              placeholder="ex. http://localhost:8080/patient"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-md-2" />
          <div class="col-md-3">
            <span style={this.styles} className="badge badge-primary m-2">
              No. of Replicas :
            </span>
          </div>
          <div class="col-md-4">
            <input
              type="number"
              min="1"
              max="12"
              name="replica"
              class="form-control"
              placeholder="ex. 3"
              value={this.state.replica}
              onChange={this.handleReplicaChange}
              onKeyDown={this.handleNumberInput}
            />
          </div>
        </div>

        <div class="row">
          <div class="col-md-2" />
          <div class="col-md-3">
            <span style={this.styles} className="badge badge-primary m-2">
              Memory(in megabytes) :
            </span>
          </div>
          <div class="col-md-4">
            <input
              type="number"
              min="0"
              name="memory"
              step="128"
              class="form-control"
              placeholder="ex. 1024(in megabytes)"
              value={this.state.memory}
              onChange={this.handleMemoryChange}
              onKeyDown={this.handleNumberInput}
            />
          </div>
        </div>

        <div class="row">
          <div class="col-md-2" />
          <div class="col-md-3">
            <span style={this.styles} className="badge badge-primary m-2">
              Networks:
            </span>
            <a
              href="https://docs.docker.com/compose/compose-file/#networks"
              target="_blank"
              color="black"
            >
              what's this?{" "}
            </a>
            {/* <button onClick = {this.handleNetworkClick}>Plus</button> */}
          </div>
          <div class="col-md-4">
            <button
              onClick={e => this.handleAddNetworkOne(e)}
              class="btn btn-outline-success"
            >
              {" "}
              Add Network
            </button>

            {/* {this.state.networkClick ? (<NetworkComponent></NetworkComponent>) :""} */}
            {this.state.networksOne.map((network, index) => {
              return (
                <div key={index} class="border">
                  &nbsp;&nbsp;&nbsp;
                  <div class="row">
                    <div class="col-md-3">
                      <span
                        style={this.styles}
                        className="badge badge-primary m-2"
                      >
                        Network:{" "}
                      </span>
                    </div>

                    <div class="col-md-7">
                      <input
                        class="form-control"
                        onChange={e => this.handleNetworkOneInput(e, index)}
                        value={network}
                      />
                    </div>

                    <div class="col-md-0">
                      {this.state.networksOne[0].includes("traefik") &&
                      index == 0 &&
                      this.state.isIngress ? (
                        <label class="text-info">
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*Default
                          Network Added for Traefik Port Mapping
                        </label>
                      ) : (
                        <button
                          onClick={() => this.handleRemoveNetworkOne(index)}
                          class="close"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            <br />
          </div>
        </div>

        <div class="row">
          <div class="col-md-2" />
          <div class="col-md-3">
            <span style={this.styles} className="badge badge-primary m-2">
              Secrets:
            </span>
            <a
              href="https://docs.docker.com/compose/compose-file/#secrets"
              target="_blank"
            >
              what's this?{" "}
            </a>
            {/* <button onClick = {this.handleNetworkClick}>Plus</button> */}
          </div>
          <div class="col-md-4">
            <button
              onClick={e => this.handleAddSecrets(e)}
              class="btn btn-outline-success"
            >
              {" "}
              Add Secrets
            </button>
            {/* {this.state.networkClick ? (<NetworkComponent></NetworkComponent>) :""} */}
            {this.state.secretsOne.map((secret, index) => {
              return (
                <div key={index} class="border ">
                  &nbsp;&nbsp;&nbsp;
                  <div class="row">
                    <div class="col-md-3">
                      <span
                        style={this.styles}
                        className="badge badge-primary m-2"
                      >
                        Secret:{" "}
                      </span>
                    </div>

                    <div class="col-md-7">
                      <input
                        class="form-control"
                        onChange={e => this.handleSecretNameInput(e, index)}
                        value={secret.secretName}
                      />
                    </div>

                    <div class="col-md-2">
                      <button
                        onClick={() => this.handleRemoveSecretOne(index)}
                        class="close"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>

                    <div class="row">
                      <div class="col-md-4">
                        <span
                          style={this.styles}
                          className="badge badge-primary m-3"
                        >
                          File Path:{" "}
                        </span>
                      </div>

                      <div class="col-md-8">
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon3">
                              ./
                            </span>
                          </div>
                          <input
                            type="text"
                            class="form-control"
                            aria-describedby="basic-addon3"
                            onChange={e => this.handleSecretFileInput(e, index)}
                            value={secret.secretFile}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <br />
          </div>
        </div>
        <div />

        <div class="row">
          <div class="col-md-2" />
          <div class="col-md-3">
            <span style={this.styles} className="badge badge-primary m-2">
              Configs:
            </span>
            <a
              href="https://docs.docker.com/compose/compose-file/#configs"
              target="_blank"
            >
              what's this?{" "}
            </a>
          </div>
          <div class="col-md-4">
            <button
              onClick={e => this.handleAddConfig(e)}
              class="btn btn-outline-success"
            >
              {" "}
              Add Config
            </button>

            {this.state.configs.map((config, index) => {
              return (
                <div key={index} class="border ">
                  <div>
                    &nbsp;&nbsp;&nbsp;
                    <div class="row">
                      <div class="col-md-3">
                        <span
                          style={this.styles}
                          className="badge badge-primary m-2"
                        >
                          Source:{" "}
                        </span>
                      </div>

                      <div class="col-md-7">
                        <input
                          class="form-control"
                          onChange={e => this.handleConfigSourceInput(e, index)}
                          value={config.source}
                        />
                      </div>

                      <div class="col-md-2">
                        <button
                          onClick={() => this.handleRemoveConfig(index)}
                          class="close"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-3">
                        <span
                          style={this.styles}
                          className="badge badge-primary m-2"
                        >
                          Target:{" "}
                        </span>
                      </div>

                      <div class="col-md-7">
                        <input
                          class="form-control"
                          onChange={e => this.handleConfigTargetInput(e, index)}
                          value={config.target}
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-3">
                        <span
                          style={this.styles}
                          className="badge badge-primary m-2"
                        >
                          Version:{" "}
                        </span>
                      </div>

                      <div class="col-md-7">
                        <input
                          class="form-control"
                          type="number"
                          min="1"
                          onKeyDown={this.handleNumberInput}
                          onChange={e =>
                            this.handleConfigVersionInput(e, index)
                          }
                          value={config.version}
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-4">
                        <span
                          style={this.styles}
                          className="badge badge-primary m-2"
                        >
                          File Path:{" "}
                        </span>
                      </div>

                      <div class="col-md-7">
                        <div class="input-group mb-1">
                          <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon3">
                              ./
                            </span>
                          </div>
                          <input
                            type="text"
                            class="form-control"
                            aria-describedby="basic-addon3"
                            onChange={e => this.handleConfigFileInput(e, index)}
                            value={config.file}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <br />
          </div>
        </div>

        <div class="row">
          <div class="col-md-2" />
          <div class="col-md-3">
            <span style={this.styles} className="badge badge-primary m-2">
              Volumes:
            </span>
            <a
              href="https://docs.docker.com/compose/compose-file/#volumes"
              target="_blank"
            >
              what's this?{" "}
            </a>
          </div>
          <div class="col-md-4">
            <BootstrapSwitchButton
              checked={false}
              onlabel="NAS Volume"
              onstyle="secondary"
              offlabel="Local Volume"
              offstyle="success"
              style="w-50 mx-2"
              onChange={(checked: boolean) => {
                this.setState(
                  { isVolumeNAS: checked },
                  this.setState(
                    { localVolumeOne: [] },
                    this.setState({ NASVol: [] })
                  )
                );
              }}
            />
          </div>
        </div>

        <div class="row">
          <div class="col-md-2" />
          <div class="col-md-3" />
          <div class="col-md-5">
            {localVolAdd}
            <div>{NASVolAdd}</div>
            <div>{NASVolAddAll}</div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-2" />
          <div class="col-md-3" />
          <div class="col-md-5">
            <div>{localVolAddRemoveButton}</div>
          </div>
        </div>
        <br />
      </div>
    );
  }
}

export default Compose;
