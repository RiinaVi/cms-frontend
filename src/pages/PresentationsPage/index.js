import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { fetchConferencePresentations } from '../../connect/connectService';
import { Table } from 'antd';
import 'antd/dist/antd.css';

class Presentation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      presentations: []
    };
  }

  componentDidMount = () => {
    fetchConferencePresentations(this.props.match.params.id)
      .then(responseJson => {
        this.setState({ presentations: responseJson });
      })
      .catch(error => console.log(error));
  };

  render() {
    if (this.state.presentations.length === 0) {
      return <div />;
    } else {
      const dataSource = this.state.presentations.filter(
        presentation =>
          presentation.session.sessionID == this.props.match.params.sessionId
      );
      const { Column, ColumnGroup } = Table;
      console.log(dataSource);
      return (
        <div style={{ margin: '3%' }}>
          <h1>Session name</h1>
          <Table
            pagination={false}
            expandedRowRender={presentation => (
              <p style={{ margin: 0 }}>{presentation.description}</p>
            )}
            dataSource={dataSource}
          >
            <ColumnGroup title="Presentations">
              <Column
                title="Start Time"
                width="10%"
                dataIndex="startTime"
                key="startTime"
              />
              <Column
                title="End time"
                width="10%"
                dataIndex="endTime"
                key="endTime"
              />
              <Column
                title="Name"
                dataIndex="presentationName"
                key="presentationName"
              />
              <Column
                title="Presenter"
                dataIndex="presenterName"
                key="presenterName"
              />
              <Column title="Room" dataIndex="room" key="room" />
            </ColumnGroup>
          </Table>
        </div>
      );
    }
  }
}

export default withRouter(Presentation);
