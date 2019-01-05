import React, {Component} from 'react';
import {Form, Icon, Input, Button,Avatar} from 'antd';
import 'antd/dist/antd.css';
import { withRouter } from "react-router-dom";
import './index.css';

class TestPage extends Component{

  render() {
    const { TextArea } = Input;
    return (
    <div className="example-conteiner">
    <label>
      <div className="example-text">Username :</div>
      <div className="example-input">
        <Input size="large" placeholder="Anonymous" />
        </div>
      </label>
      <br /><br />
      <label>
      <div className="example-text">Avatar :</div>
      <div className="example-Avatar">
        <Avatar size="small" icon="user" className="Avatar" />
        <Avatar size={64} icon="user" className="Avatar"/>
        </div>
      </label>
      <br />
      <label>
      <div className="example-text">Phone number :</div>
      <div className="example-input">
        <Input size="large" placeholder="+##-###-###" />
        </div>
      </label>
      <label>
      <div className="example-text">Bio :</div><br /><br />
      <div className="example-textarea">
        <TextArea placeholder="Autobiograpia Users" className="TextArea"/>
        </div>
      </label>
      <Button type="primary" className="Button">Save</Button>
 </div>



      // <form>
      //   <label>
      //     Username:
      //     <input type="text" placeholder="Anonymous"/>
      //   </label>
      //   <br />
      //   <label>
      //     Avatar:
      //     <img src={Avatar} alt="logoavatar" />
      //   </label>
      //   <br />
      //   <label>
      //     Phone number:
      //      <input type="tel" name="tel" pattern="+[0-9]{2}-[0-9]{3}-[0-9]{3}-[0-9]{3}" placeholder="+(##)-###-###-###"/>
      //   </label>
      //   <br />
      //   <label>
      //     BIO:<br />
      //     <textarea name="text_comment" cols="80" rows="10"></textarea>
      //   </label>
      //   <br />
      //   <input type="submit" value="Save" />
      // </form>
    );
	}
}

export default withRouter(TestPage);
