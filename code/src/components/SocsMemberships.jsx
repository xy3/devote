import React, { Component } from 'react';

class SocsMemberships extends Component {
    render() {
        return (
            <div>
            
                <h2>Society Memberships</h2>
                <hr/>
                
                { this.props.memberships.map((soc, key) => {
                
                return (
                    <div className="society" key={key}>
                        <div>
                            <span className="socName">{soc.name}</span>
                            <span className="socLeave" onClick={() => this.props.leaveSoc(soc.id)}><i className="fa fa-sign-out"></i></span>
                        </div>
                    </div>
                    )
                
                })
                }
            </div>
        )
    }
}

export default SocsMemberships;