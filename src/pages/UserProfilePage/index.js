import React, {Component} from 'react';
import logo from './user.svg';
import './style.css';


class UserPage extends Component{
	render(){
		return(
			 <div className="content">
				<div className="inform">
					
					<div className="text">
						<h1>(Username)</h1>
						<h1>(Contact e-mail)</h1>
						<h1>(Phone number)</h1>
						<h1>(bio)</h1>
					</div>

					<div className="user"><img src={logo} className="User-logo" alt="logo" /></div>
				</div>

				<div className="bio">
						<br></br>
						<hr></hr><br></br>
						<hr></hr><br></br>
						<hr></hr><br></br>
						<hr></hr><br></br>
						<br></br>

				</div>
			</div>
		);
	}
}

export default UserPage;
