import React, { Component } from 'react'
import ErrorMessage from '../img/404.png'
import { Link } from 'react-router-dom';
import Navbar from './Navbar'

class error404 extends Component {
    render() {
        return (
            <div>
                <Navbar page={this.props.page}/>
                <div className="errorMessage">
                    <img src={ErrorMessage} />
                </div>  
                <div className="returnHome">
                    <Link to='/'>
                        <button type="submit"><span>Home Page</span></button>
                    </Link>
                </div>

            </div>
        )
    }
}

export default error404