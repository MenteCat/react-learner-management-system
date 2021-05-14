import React, { Component } from "react";
import LearnerService from "../services/learner.service";

import Learner from "../components/Learner";

export default class LearnersList extends Component {
  constructor(props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveLearner = this.setActiveLearner.bind(this);
    this.onDataChange = this.onDataChange.bind(this);

    this.state = {
      learners: [],
      currentLearner: null,
      currentIndex: -1,
      averageScore: null,
      logged: props.location.logged,
    };

    this.unsubscribe = undefined;
  }

  componentDidMount() {
    this.unsubscribe = LearnerService.getAll().orderBy("first_name", "asc").onSnapshot(this.onDataChange);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onDataChange(items) {
    let learners = [];
    let totalScore = 0;

    items.forEach((item) => {
      let id = item.id;
      let data = item.data();
      learners.push({
        id: id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        score: data.score,
      });
  
      totalScore += Number(data.score);

    });
  
    let average = Math.round(totalScore / learners.length);

    this.setState({
      learners: learners,
      averageScore: average,
    });
  }

  refreshList() {
    this.setState({
      currentLearner: null,
      currentIndex: -1,
    });
  }

  setActiveLearner(learner, index) {
    this.setState({
      currentLearner: learner,
      currentIndex: index,
    });
  }

  render() {
    const { learners, currentLearner, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Learners List</h4>
          Average score: {this.state.averageScore}
          <ul className="list-group">
            {learners &&
              learners.map((learner, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveLearner(learner, index)}
                  key={index}
                >
                  {learner.first_name} {learner.last_name}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentLearner ? (
            <Learner
              learner={currentLearner}
              refreshList={this.refreshList}
            />
          ) : (
            <div>
              <br />
              <p>Please click on a Learner...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
