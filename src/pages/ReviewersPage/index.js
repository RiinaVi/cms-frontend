import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {withRouter} from "react-router-dom";
import {List} from "antd";

import ReviewItem from "./ReviewItem";

import './index.css';
import AuthorItem from "../AuthorsPage/AuthorItem";

class ReviewersPage extends Component {
    constructor(props) {
        super(props);
        this.data = [
            {
                "profile_image_url": "https://placehold.it/50x50",
                "name": "John Doe",
                "reviews_count": 500,
                "articles_read":500,
                "most_recent": "Article Title",
                "joined": 20,
                "link": "/articles#123"
            },
            {
                "profile_image_url": null,
                "name": "Lorem Ipsum",
                "reviews_count": 140,
                "articles_read":500,
                "most_recent": "Lorem ipsum dolor",
                "joined": 10,
                "link": "/articles"
            },
            {
                "profile_image_url": null,
                "name": "Lorem Ipsum2",
                "reviews_count": 140,
                "articles_read":500,
                "most_recent": "Lorem ipsum dolor",
                "joined": 10,
                "link": "/articles",
            },
            {
                "profile_image_url": "https://placehold.it/50x50",
                "name": "Lorem Ipsum3",
                "reviews_count": 140,
                "articles_read":500,
                "most_recent": "Lorem ipsum dolor",
                "joined": 10,
                "link": "/articles"
            },
            {
                "profile_image_url": null,
                "name": "Lorem Ipsum4",
                "reviews_count": 140,
                "articles_read":500,
                "most_recent": "Lorem ipsum dolor",
                "joined": 10,
                "link": "/articles"
            },
            {
                "profile_image_url": null,
                "name": "Lorem Ipsum5",
                "reviews_count": 140,
                "articles_read":500,
                "most_recent": "Lorem ipsum dolor",
                "joined": 10,
                "link": "/articles"
            },
            {
                "profile_image_url": null,
                "name": "Lorem Ipsum5",
                "reviews_count": 140,
                "articles_read":500,
                "most_recent": "Lorem ipsum dolor",
                "joined": 10,
                "link": "/articles"
            },
            {
                "profile_image_url": null,
                "name": "Lorem Ipsum5",
                "reviews_count": 140,
                "articles_read":500,
                "most_recent": "Lorem ipsum dolor",
                "joined": 10,
                "link": "/articles"
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
            <div className="ReviewersPage">
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
                        <ReviewItem authorData={author_data}/>
                    )}
                />
            </div>
        );
    }
}

export default withRouter(ReviewersPage);