import React, { Component } from 'react';

class SocsYouManage extends Component {
    render() {
        return (
            <div>
            
                <h2>Societies You Manage</h2>
                <hr/>
                
                { this.props.yourSocs.map((soc, key) => {
                
                return (
                    <div className="society" key={key}>
                        <div>
                            <span className="socInvite"><i className="fa fa-link"></i></span>
                            <span className="socName">{soc.name}</span>
                            <span className="socRemove" onClick={() => this.props.removeSoc(soc.id)}><i className="fa fa-times"></i></span>
                        </div>
                    </div>
                    )
                
                })
                }
            </div>
        )
    }
}

export default SocsYouManage;