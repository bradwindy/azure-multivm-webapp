import React from "react";
import axios from "axios";

export default class NoteList extends React.Component {
  state = {
    reply: [],
    taskLoadingState: false
  };

  componentDidMount() {
    this.setState({ taskLoadingState: true });
    axios.get(`http://13.70.6.93:3000/notes`).then(res => {
      const reply = res.data;
      console.log(reply);
      this.setState({ taskLoadingState: false });
      this.setState({ reply });
    });
  }

  deleteOne = id => {
    axios.delete(`http://13.70.6.93:3000/delete/${id}`).then(res => {
      console.log(res);
      console.log(res.data);
      window.location.reload();
    });
  };

  render() {
    if (
      this.state.reply === undefined ||
      this.state.reply === 0 ||
      this.state.reply.length === 0
    ) {
      return (
        <ul className="list-group pt-3">
          <li className="list-group-item text-muted">
            {this.state.taskLoadingState ? (
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              "No tasks to display."
            )}
          </li>
        </ul>
      );
    } else {
      return (
        <>
          {this.state.taskLoadingState ? (
            <ul className="list-group pt-3 pb-5">
              <li className="list-group-item font-weight-bold">
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              </li>
            </ul>
          ) : (
            <ul className="list-group pt-3 pb-5">
              {this.state.reply.map(note => (
                <li className="list-group-item font-weight-bold" key={note._id}>
                  {note.note}{" "}
                  <button
                    className="btn btn-link float-right p-0 text-muted"
                    onClick={this.deleteOne.bind(this, note._id)}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      );
    }
  }
}
