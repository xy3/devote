import React, { Component } from 'react';

class ElectionForm extends Component {
  render() {
    return (
        <div className="col-md-5">
            <h2>New Election</h2>
            <hr />
            <div className="electionform">
                <form>
                    <div className="form-group row">
                        <label htmlFor="name" className="col-sm-3 col-form-label">Name</label>
                        <div className="col-sm-9">
                            <input type="text" placeholder="Name" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="position" className="col-sm-3 col-form-label">Position</label>
                        <div className="col-sm-9">
                            <input type="text" placeholder="Position" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="description" className="col-sm-3 col-form-label">Description</label>
                        <div className="col-sm-9">
                            <textarea name="description" cols="30" rows="5"></textarea>
                        </div>
                    </div>
                </form>
                <button type="submit"><span>Submit</span></button>
            </div>
        </div>
    );
  }
}

export default ElectionForm;