import React, { Component } from 'react';
import logouser from './user.svg';
import './App.css';
import './romacss.css';

class App extends Component {

	constructor() { 
    super(); 
    this.state = { value: '' }; 
    }

  render() {
  	let value = this.state.value;
    return (
	<div class="UserPro">
	<script src="js/jquery.maskedinput.min.js"></script>
	<form name="comment" action="#" method="post">
			<div class="Sector">		
	    <p>
	        <label class="Textlabel">Username: </label>
	        <input type="text" name="name" placeholder="Anonymous" class="textField" />
	    </p>
	    <br />
	    <p>
	        <label class="Textlabel">Avatar:</label><br />
	        	<img src={logouser} width="100" height="100" class="images" />
	    </p>
<br />
	    <p>
	    	<script src="js/maskedinput.js"></script>
	    	<label class="Textlabel">Phone Number:</label>
	    	  <input type="tel" name="tel" pattern="+[0-9]{2}-[0-9]{3}-[0-9]{3}-[0-9]{3}" placeholder="+(##)-###-###-###" class="textField1"/>

	    </p>
	    


	   
			</div>
	<div class="Sectorbio"> 
	<p>
			<label class="Textlabel">Bio:</label>
		        <br />
		        <textarea name="text_comment" cols="120" rows="10"></textarea>
		    </p>
		    <p>
		        <input type="hidden" name="page_id" value="150" />
		        <br />
		        <a href="#"> <input class="button" type="submit" value="Save" /></a>
		    </p>
	</div>
		</form>
</div>
    );
  }
}

export default App;
