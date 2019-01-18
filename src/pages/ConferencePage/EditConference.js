import React, { Component } from 'react';
import './Conference.css';
import { Button, DatePicker, Form, Input } from 'antd';
import { fetchSingleConference, updateSingleConference } from '../../connect/connectService';
import * as moment from 'moment';

class EditConference extends Component {
	constructor(props) {
		super(props);
		this.state = {
      conference: {},
      conferenceName: '',
      accomodationInfo: '',
      emergencyInfo: '',
      description: '', 
      startDate: moment(), 
      finishDate: moment(),
      loadingSave: false
		}
  }
  
  componentDidMount = () => {
    this.props.onCheckAttendance(this.props.match.params.id);
		fetchSingleConference(this.props.match.params.id).then(responseJson => {
			this.setState({
        conference: responseJson, 
        conferenceName: responseJson.conferenceName,
        accomodationInfo: responseJson.accomodationInfo, 
        emergencyInfo: responseJson.emergencyInfo,
        description: responseJson.description,
        startDate: moment(responseJson.startDate), 
        finishDate: moment(responseJson.finishDate)
      })
		}).catch(error => console.log(error));
  }

  onSaveConference = e => {
    e.preventDefault();
    this.setState({loadingSave: true});
    const params = {
      ...this.state.conference,
      conferenceName: this.state.conferenceName,
      accomodationInfo: this.state.accomodationInfo,
      emergencyInfo: this.state.emergencyInfo,
      description: this.state.description,
      startDate: this.state.startDate.format('YYYY-MM-DD'), 
      finishDate: this.state.finishDate.format('YYYY-MM-DD')
    }
    updateSingleConference(this.props.match.params.id, params).then(responseJson => {
      this.setState({loadingSave: false});
      this.props.history.push(`/conferences/${this.props.match.params.id}`)
		}).catch(error => {
      console.log(error)
      this.setState({loadingSave: false});
    });
  }

  render() {
    const {
      conferenceName,
      description,
      accomodationInfo,
      emergencyInfo,
      startDate,
      finishDate,
      organizer
    } = this.state.conference;
    const organizerFirstName = !!this.state.conference && !!this.state.conference.organizer && organizer.firstName;
    const organizerLastName = !!this.state.conference && !!this.state.conference.organizer && organizer.lastName;

    return (
      <div className="container">
        <Form onSubmit={this.onSaveConference}>
          <Form.Item 
            label="Conference Name:"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}>
            <Input type="text" name="by" placeholder='Conference name' value={this.state.conferenceName} onChange={e => this.setState({conferenceName: e.target.value})} />
              {/* onChange={e => this.setState(prevState => ({conference: {...prevState.conference, organizer: {...prevState.conference.organizer, firstName: e.target.value}}}))} /> */}
          </Form.Item>
          <div className="grid-container">
            <img
              className="item1"
              src="https://source.unsplash.com/bzdhc5b3Bxs/250x150"
              alt=""
            />
            <Form.Item 
              label="Emer info:"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}>
              <Input type="text" name="by" placeholder='Emergency name' value={this.state.emergencyInfo} onChange={e => this.setState({emergencyInfo: e.target.value})} />
                {/* onChange={e => this.setState(prevState => ({conference: {...prevState.conference, organizer: {...prevState.conference.organizer, firstName: e.target.value}}}))} /> */}
            </Form.Item>
            <Form.Item 
              label="Acc info:"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}>
              <Input type="text" name="date" placeholder='Accomodation info' value={this.state.accomodationInfo} onChange={e => this.setState({accomodationInfo: e.target.value})} />
            </Form.Item>
            <Form.Item 
              label="From:"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}>
              <DatePicker format="YYYY-MM-DD" value={this.state.startDate} onChange={(date, dateString) => this.setState({startDate: date})} />
            </Form.Item>
            <Form.Item 
              label="To:"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}>
              <DatePicker format="YYYY-MM-DD" value={this.state.finishDate} onChange={(date, dateString) => this.setState({finishDate: date})} />
            </Form.Item>
          </div>
          
          <Form.Item 
            label={<h2>Info:</h2>}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}>
            <Input.TextArea
              maxLength="750"
              className="descriptionBox"
              cols="30"
              rows="5"
              value={this.state.description} 
              onChange={e => this.setState({description: e.target.value})}
            />
          </Form.Item>

          <Button size='large' onClick={() => this.props.history.push(`/conferences/${this.props.match.params.id}`)}>Cancel</Button>
          <Button type='primary' size='large' htmlType='submit' loading={this.state.loadingSave}>Save</Button>
        </Form>
      </div>
    );
  }
}

export default EditConference;
