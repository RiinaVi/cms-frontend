import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { fetchConferencePresentations } from '../../connect/connectService';
import { Table } from 'antd';
import 'antd/dist/antd.css';

class Presentation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /* Change this state with data retrieved from backend */
      presentations: [
        {
          key: '1',
          startTime: '15:00',
          endTime: '17:00',
          presentationName: 'Animales en peligro',
          presenterName: 'Sheldon Cooper',
          room: 'room 1',
          description: 'This is the description of the presentation'
        },
        {
          key: '2',
          startTime: '15:00',
          endTime: '17:00',
          presentationName: 'Salvemos a las vacas',
          presenterName: 'Perico el de los Palotes',
          room: 'room 2',
          description: 'This is the description of the presentation'
        },
        {
          key: '3',
          startTime: '15:00',
          endTime: '17:00',
          presentationName: 'Tengo un perro rosa',
          presenterName: 'Mr. Wonderful',
          room: 'room 3',
          description: 'This is the description of the presentation'
        }
      ]
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
    const { Column, ColumnGroup } = Table;

    return (
      <div style={{ margin: '3%' }}>
        {/* Change hardcoded session name to data from backend */}
        <h1>Session name</h1>
        <Table
          pagination={false}
          expandedRowRender={presentation => (
            <p style={{ margin: 0 }}>{presentation.description}</p>
          )}
          dataSource={this.state.presentations}
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

export default withRouter(Presentation);
