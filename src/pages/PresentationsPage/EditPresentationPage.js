import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { fetchConferencePresentations } from '../../connect/connectService';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import AddOrEditPresentation from './AddOrEditPresentation';

class EditPresentationPage extends Component {
  constructor(props) {
    super(props);
    /* Change this state with data retrieved from backend */
    this.state = {
      presentations: [
        {
          key: '1',
          startTime: '15:00',
          endTime: '17:00',
          presentationName: 'Animales en peligro',
          presenterName: 'Sheldon Cooper',
          room: 'room 1',
          description: 'This is the description of the presentation',
          session: {
            startDateTime: new Date(2019, 5, 5, 13),
            endDateTime: new Date(2019, 5, 5, 17)
          }
        },
        {
          key: '2',
          startTime: '15:00',
          endTime: '17:00',
          presentationName: 'Salvemos a las vacas',
          presenterName: 'Perico el de los Palotes',
          room: 'room 2',
          description: 'This is the description of the presentation',
          session: {
            startDateTime: new Date(2019, 5, 5, 13),
            endDateTime: new Date(2019, 5, 5, 17)
          }
        },
        {
          key: '3',
          startTime: '15:00',
          endTime: '17:00',
          presentationName: 'Tengo un perro rosa',
          presenterName: 'Mr. Wonderful',
          room: 'room 3',
          description: 'This is the description of the presentation',
          session: {
            startDateTime: new Date(2019, 5, 5, 13),
            endDateTime: new Date(2019, 5, 5, 17)
          }
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
            <Column
              title="Edit"
              key="key"
              render={presentation => (
                <AddOrEditPresentation
                  linkText="Edit"
                  presentation={presentation}
                />
              )}
            />
          </ColumnGroup>
        </Table>

        <AddOrEditPresentation
          linkText="Add"
          presentation={this.state.presentations[0]}
        />
      </div>
    );
  }
}

export default withRouter(EditPresentationPage);
