import React, { Component } from "react";
import LearnerService from "../services/learner.service";

export default class Learner extends Component {
  constructor(props) {
    super(props);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeScore = this.onChangeScore.bind(this);
    this.updateLearner = this.updateLearner.bind(this);
    this.deleteLearner = this.deleteLearner.bind(this);

    this.state = {
      currentLearner: {
        id: null,
        first_name: "",
        last_name: "",
        email: "",
        score: 0,
      },
      message: "",
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { learner } = nextProps;
    if (prevState.currentLearner.id !== learner.id) {
      return {
        currentLearner: learner,
        message: ""
      };
    }

    return prevState.currentLearner;
  }

  componentDidMount() {
    this.setState({
      currentLearner: this.props.learner,
    });
  }

  onChangeFirstName(e) {
    const first_name = e.target.value;

    this.setState(function (prevState) {
      return {
        currentLearner: {
          ...prevState.currentLearner,
          first_name: first_name,
        },
      };
    });
  }

  onChangeLastName(e) {
    const last_name = e.target.value;

    this.setState((prevState) => ({
      currentLearner: {
        ...prevState.currentLearner,
        last_name: last_name,
      },
    }));
  }

  onChangeEmail(e) {
    const email = e.target.value;

    this.setState((prevState) => ({
      currentLearner: {
        ...prevState.currentLearner,
        email: email,
      },
    }));
  }

  onChangeScore(e) {
    const score = e.target.value;

    this.setState((prevState) => ({
      currentLearner: {
        ...prevState.currentLearner,
        score: score,
      },
    }));
  }

  updateLearner() {
    const data = {
      first_name: this.state.currentLearner.first_name,
      last_name: this.state.currentLearner.last_name,
      email: this.state.currentLearner.email,
      score: this.state.currentLearner.score,
    };

    LearnerService.update(this.state.currentLearner.id, data)
      .then(() => {
        this.setState({
          message: "The learner was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteLearner() {
    LearnerService.delete(this.state.currentLearner.id)
      .then(() => {
        this.props.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentLearner } = this.state;

      return (
        <div>
          <h4>Learner</h4>
          {currentLearner ? (
            <div className="edit-form">
              <form>
                <div className="form-group">
                  <label htmlFor="title">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={currentLearner.first_name}
                    onChange={this.onChangeFirstName}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    value={currentLearner.last_name}
                    onChange={this.onChangeLastName}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    value={currentLearner.email}
                    onChange={this.onChangeEmail}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="score">Score</label>
                  <input
                    type="number"
                    className="form-control"
                    id="score"
                    value={currentLearner.score}
                    onChange={this.onChangeScore}
                    min="0"
                    max="10"
                  />
                </div>
              </form>
    
              <div className="btn-group" role="group">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.updateLearner}
              >
                Update
              </button>
    
              <button
                type="button"
                className="btn btn-danger"
                onClick={this.deleteLearner}
              >
                Delete
              </button>
              </div>
              
              <p>{this.state.message}</p>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Learner...</p>
            </div>
          )}
        </div>
      );
  }
}
