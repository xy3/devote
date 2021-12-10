import React, { Component } from 'react';

class NewSocietyForm extends Component {
    render() {
        return (
            <div>
                <h2>Add a new Society</h2>
                <hr />
                <div className="electionform">
                    <form id="newSocietyForm" onSubmit={(event) => {
                        event.preventDefault()
                        const societyName = this.societyName.value;
                        const adminEmail = this.adminEmail.value;
                        
                        if (this.props.addNewSociety(societyName, adminEmail)) {
                            event.target.reset();
                        }
                    
                    }}>
                        <div className="form-group row">
                            <label htmlFor="name" className="col-sm-3 col-form-label">Name</label>
                            <div className="col-sm-9">
                                <input
                                    id="societyName"
                                    type="text"
                                    ref={(input) => {this.societyName = input}}
                                    placeholder="Society name"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <label htmlFor="society" className="col-sm-3 col-form-label">Email</label>
                            <div className="col-sm-9">
                                <input 
                                    id="adminEmail"
                                    type="text"
                                    ref={(input) => {this.adminEmail = input}}
                                    placeholder="Society contact email"
                                />
                            </div>
                        </div>
                    </form>
                    <button type="submit" form="newSocietyForm"><span><i className="fa fa-check-square-o"></i>   Submit</span></button>
                </div>
            </div>
        );
    }
}

export default NewSocietyForm;