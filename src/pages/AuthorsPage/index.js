import React, {Component} from 'react';
import ReactDOM from "react-dom";
import {withRouter} from "react-router-dom";
import {List} from 'antd';

import AuthorItem from "./AuthorItem";

import 'antd/dist/antd.css';
import './index.css';

class AuthorsPage extends Component {

    constructor(props) {
        super(props);
        this.data = [
            {
                "profile_image_url": "https://placehold.it/50x50",
                "name": "John Doe",
                "articles_count": 500,
                "most_recent": "Article Title",
                "joined": 20,
                "average": 3
            },
            {
                "profile_image_url": null,
                "name": "Lorem Ipsum",
                "articles_count": 140,
                "most_recent": "Lorem ipsum dolor.",
                "joined": 10,
                "average": 3
            },
            {
                "profile_image_url": null,
                "name": "Lorem Ipsum2",
                "articles_count": 140,
                "most_recent": "Lorem ipsum dolor.",
                "joined": 10,
                "average": 1.5
            },
            {
                "profile_image_url": "https://placehold.it/50x50",
                "name": "Lorem Ipsum3",
                "articles_count": 140,
                "most_recent": "Lorem ipsum dolor.",
                "joined": 10,
                "average": .5
            },
            {
                "profile_image_url": null,
                "name": "Lorem Ipsum4",
                "articles_count": 140,
                "most_recent": "Lorem ipsum dolor.",
                "joined": 10,
                "average": 3.5
            },
            {
                "profile_image_url": null,
                "name": "Lorem Ipsum5",
                "articles_count": 140,
                "most_recent": "Lorem ipsum dolor.",
                "joined": 10,
                "average": 1.5
            },
            {
                "profile_image_url": null,
                "name": "Lorem Ipsum6",
                "articles_count": 140,
                "most_recent": "Lorem ipsum dolor.",
                "joined": 10,
                "average": 1.5
            },
            {
                "profile_image_url": null,
                "name": "Lorem Ipsum7",
                "articles_count": 140,
                "most_recent": "Lorem ipsum dolor.",
                "joined": 10,
                "average": 1.5
            }
        ];
    }

    componentDidMount = () => {
        let table = ReactDOM.findDOMNode(this).childNodes[0].childNodes[0];
        let table_height = table.getBoundingClientRect().height;
        table.style.height = table_height + "px";
    };

    render() {
        return (
            <div className="AuthorsPage">
                <List
                    className="authors_table"
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: (page) => {
                            console.log(page);
                        },
                        pageSize: 5,
                    }}
                    dataSource={this.data}
                    renderItem={author_data => (
                        <AuthorItem authorData={author_data}/>
                    )}
                />
            </div>
        );
    }
}

export default withRouter(AuthorsPage);