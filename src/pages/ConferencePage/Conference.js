import React, {Component} from 'react';
import './Conference.css';
import {fetchSingleConference, updateUserConferenceAttendance, updateUserConferenceAttendanceAttend} from '../../connect/connectService';
import {Button, Row, Col, Layout, Menu, Icon} from 'antd';
import {withRouter, Link} from "react-router-dom";
import {hasUserAnyRole, roles} from '../../utils/security';

const {Content, Sider} = Layout;
const SubMenu = Menu.SubMenu;

class Conference extends Component {
    constructor(props) {
        super(props);
        this.state = {
            conference: {}
        }
    }

    componentDidMount = () => {
        this.props.onCheckAttendance(this.props.match.params.id);
        fetchSingleConference(this.props.match.params.id).then(responseJson => {
            this.setState({conference: responseJson})
        }).catch(error => console.log(error));
    }

	isUserAttendingConference = (userAttendance) => {
		return userAttendance && userAttendance.some(attendance => (attendance.role === roles.ORDINARY && attendance.attendance));
	}

    saveAttendance = isAttending => {
        const attendancesAttend = this.props.userAttendance.filter(attendance => attendance.role === roles.ORDINARY);
        console.log(attendancesAttend)
        const attendance = (attendancesAttend && attendancesAttend.length > 0) ? {
            ...attendancesAttend[0],
            attendance: isAttending
        } : {
            attendance: isAttending,
            role: roles.ORDINARY
        };
        updateUserConferenceAttendanceAttend(this.props.match.params.id, attendance).then(responseJson => {
            this.props.onCheckAttendance(this.props.match.params.id, true);
        }).catch(error => console.log(error));
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
            <Layout className="layout">
                <Sider className="conferenceSider sider" width = "25%">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{height: '100%', borderRight: 0}}
                    >

                        {hasUserAnyRole(this.props.userAttendance, roles.CONF_ORGANIZER, roles.EDITOR, roles.REVIEWER) && <Menu.Item>
                            <Icon type="profile" />
                            <Link to={`/conferencesArticles/${this.props.match.params.id}`}>List of all uploaded Articles</Link>

                        </Menu.Item>}
                        <Menu.Item>
                            <Icon type="file-sync" />
                            <Link to={`/conferencesProceedings/${this.props.match.params.id}`}>List of Articles in
                                Proceedings</Link>

                        </Menu.Item>
                        <Menu.Item>
                            <Icon type="schedule" />
                            <Link to={`/conferencesSessions/${this.props.match.params.id}`}>Session plan</Link>
                        </Menu.Item>

                        {hasUserAnyRole(this.props.userAttendance, roles.CONF_ORGANIZER, roles.EDITOR) && <Menu.Item>
                            <Icon type="team" />
                            <Link to={`/conferencesAuthors/${this.props.match.params.id}`}>List of Authors</Link>
                        </Menu.Item>}

                        {hasUserAnyRole(this.props.userAttendance, roles.CONF_ORGANIZER, roles.EDITOR) && <Menu.Item>
                            <Icon type="file-search" />
                            <Link to={`/conferencesReviewers/${this.props.match.params.id}`}>List of reviewers</Link>
                        </Menu.Item>}

                        {hasUserAnyRole(this.props.userAttendance, roles.CONF_ORGANIZER) && <Menu.Item>
                            <Icon type="edit" />
                            <Link to={`/conferencesRoles/${this.props.match.params.id}`}>Edit user roles</Link>
                        </Menu.Item>}
                    </Menu>
                </Sider>
                <div className="container conferenceContainer">
                    <div className="grid-container">
                        <img
                            className="item1"
                            src="https://source.unsplash.com/bzdhc5b3Bxs/250x150"
                            alt=""
                        />
                        <h1 className="item2">{conferenceName}</h1>
                        <h3 className="item3">By: {`${organizerFirstName} ${organizerLastName}`}</h3>
                        <h3 className="item4">Place: {accomodationInfo}</h3>
                        <h3 className="item5">From: {startDate}</h3>
                        <h3 className="item6">To: {finishDate}</h3>
                    </div>

                    <h2>Info:</h2>
                    <div className="descriptionBox">
                        {description}
                    </div>


                    <Row>
                        <Col span={24} style={{textAlign: 'right', marginBottom: '80px'}}>
                            {hasUserAnyRole(this.props.userAttendance, roles.CONF_ORGANIZER) && <Button size='large'
                                                                                                        onClick={() => this.props.history.push(`/conferencesEdit/${this.props.match.params.id}`)}>Edit
                                Event</Button>}
                            {/* {hasUserAnyRole(this.props.userAttendance, roles.CONF_ORGANIZER, roles.EDITOR) &&
                            <Button size='large'
                                    onClick={() => this.props.history.push(`/conferencesEditPlan/${this.props.match.params.id}`)}>Edit
                                the plan and proceedings</Button>} */}
                            {this.props.userData && (this.isUserAttendingConference(this.props.userAttendance) ?
                                <Button size='large' onClick={() => this.saveAttendance(false)}>Remove from my Events</Button>
                                :
                                <Button type='primary' size='large' onClick={() => this.saveAttendance(true)}>Add to my Events</Button>)
                            }
                        </Col>
                    </Row>
                </div>
            </Layout>
        );
    }
}

export default withRouter(Conference);
