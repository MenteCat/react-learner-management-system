import React, { Component } from "react";
import LearnerService from "../services/learner.service";

export default class AddLearner extends Component {
  constructor(props) {
    super(props);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeScore = this.onChangeScore.bind(this);
    this.saveLearner = this.saveLearner.bind(this);
    this.newLearner = this.newLearner.bind(this);

    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      score: 0,
      submitted: false,
    };
  }

  onChangeFirstName(e) {
    this.setState({
      first_name: e.target.value,
    });
  }

  onChangeLastName(e) {
    this.setState({
      last_name: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangeScore(e) {
    this.setState({
      score: e.target.value,
    });
  }

  saveLearner() {
    let data = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      score: this.state.score,
    };

    LearnerService.create(data)
      .then(() => {
        console.log("Created new item successfully!");
        this.setState({
          submitted: true,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newLearner() {
    this.setState({
      first_name: "",
      last_name: "",
      email: "",
      score: 0,
      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newLearner}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">First Name</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.first_name}
                onChange={this.onChangeFirstName}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.last_name}
                onChange={this.onChangeLastName}
                name="description"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Email</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.email}
                onChange={this.onChangeEmail}
                name="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="score">Score</label>
              <input
                type="number"
                className="form-control"
                id="score"
                required
                value={this.state.score}
                onChange={this.onChangeScore}
                name="score"
                min="0"
                max="10"
              />
            </div>
            <button onClick={this.saveLearner} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
