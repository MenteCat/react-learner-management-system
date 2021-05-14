import firebase from "../firebase";

const db = firebase.firestore().collection("/learners");

class LearnerService {
  getAll() {
    return db;
  }

  create(learner) {
    return db.add(learner);
  }

  update(id, value) {
    return db.doc(id).update(value);
  }

  delete(id) {
    return db.doc(id).delete();
  }
}

export default new LearnerService();
