import React from "react";
import axios from "axios";

export default class Nav extends React.Component {
  state = {
    note: "",
    noteSendingState: false,
    noteDeleteAllState: false
  };

  handleChange = event => {
    this.setState({ note: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const note = {
      note: this.state.note
    };

    if (note.note === "") {
      alert("Tasks cannot be blank");
    } else {
      console.log(note);
      this.setState({ noteSendingState: true });
      axios.post(`http://13.70.6.93:3000/note`, { note }).then(res => {
        console.log(res);
        console.log(res.data);
        this.setState({ noteSendingState: false });
        window.location.reload();
      });
    }
  };

  deleteFunction = event => {
    event.preventDefault();
    this.setState({ noteDeleteAllState: true });
    axios.delete(`http://13.70.6.93:3000/deleteallnotes`, {}).then(res => {
      console.log(res);
      console.log(res.data);
      this.setState({ noteDeleteAllState: false });
      window.location.reload();
    });
  };

  render() {
    return (
      <form className="p-3 pt-5" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <div className="row">
            <h3 className="font-weight-bold">New Task:</h3>
            <textarea
              className="form-control p-2 mt-3 mb-3"
              type="text"
              name="name"
              rows="5"
              onChange={this.handleChange}
            />
          </div>
          <div className="row">
            <button className="btn btn-outline-success" type="submit">
              {this.state.noteSendingState ? (
                <>
                  &nbsp;
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  &nbsp;
                </>
              ) : (
                "Add"
              )}
            </button>
            <button
              className="btn btn-outline-danger ml-2"
              onClick={event => {
                event.preventDefault();

                if (
                  window.confirm("Are you sure you wish to delete ALL tasks?")
                )
                  this.deleteFunction(event);
              }}
            >
              {this.state.noteDeleteAllState ? (
                <>
                  &nbsp; &nbsp; &nbsp;
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  &nbsp; &nbsp; &nbsp;
                </>
              ) : (
                "Delete All"
              )}
            </button>
          </div>
        </div>
      </form>
    );
  }
}
