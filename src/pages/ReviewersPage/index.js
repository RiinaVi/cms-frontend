import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {withRouter} from "react-router-dom";

import ReviewItem from "./ReviewItem";
import {Pagination} from "antd";

import './index.css';

class ReviewersPage extends Component {
    constructor(props) {
        super(props);
        this.itemsPerPage = 8;
        this.data = {
            1: {
                "profile_image_url": "https://placehold.it/50x50",
                "name": "John Doe",
                "reviews_count": 500,
                "articles_read":500,
                "most_recent": "Article Title",
                "joined": 20,
                "link": "/articles#123"
            },
            2: {
                "profile_image_url": null,
                "name": "Lorem Ipsum",
                "reviews_count": 140,
                "articles_read":500,
                "most_recent": "Lorem ipsum dolor",
                "joined": 10,
                "link": "/articles"
            },
            3: {
                "profile_image_url": null,
                "name": "Lorem Ipsum2",
                "reviews_count": 140,
                "articles_read":500,
                "most_recent": "Lorem ipsum dolor",
                "joined": 10,
                "link": "/articles",
            },
            4: {
                "profile_image_url": "https://placehold.it/50x50",
                "name": "Lorem Ipsum3",
                "reviews_count": 140,
                "articles_read":500,
                "most_recent": "Lorem ipsum dolor",
                "joined": 10,
                "link": "/articles"
            },
            5: {
                "profile_image_url": null,
                "name": "Lorem Ipsum4",
                "reviews_count": 140,
                "articles_read":500,
                "most_recent": "Lorem ipsum dolor",
                "joined": 10,
                "link": "/articles"
            },
            6: {
                "profile_image_url": null,
                "name": "Lorem Ipsum5",
                "reviews_count": 140,
                "articles_read":500,
                "most_recent": "Lorem ipsum dolor",
                "joined": 10,
                "link": "/articles"
            },
            7: {
                "profile_image_url": null,
                "name": "Lorem Ipsum5",
                "reviews_count": 140,
                "articles_read":500,
                "most_recent": "Lorem ipsum dolor",
                "joined": 10,
                "link": "/articles"
            },
            8: {
                "profile_image_url": null,
                "name": "Lorem Ipsum5",
                "reviews_count": 140,
                "articles_read":500,
                "most_recent": "Lorem ipsum dolor",
                "joined": 10,
                "link": "/articles"
            }
        };

        this.state = {
            page: 1
        }
    }

    changePage = (page) => {
        this.setState({page: page});
        this.forceUpdate();
    };
    componentDidMount = () => {
        let node = ReactDOM.findDOMNode(this);
        let table_height = node.getBoundingClientRect().height;
        console.log(node.childNodes[0]);
        node.childNodes[0].style.height = table_height + "px";
        // set el height and width etc.

    };

    render() {
        let self = this,
            arr = [];
        console.log(self.state.page * self.itemsPerPage);
        for (let i = 1; i < self.itemsPerPage + 1; i++) {
            let index = i + (self.state.page - 1) * self.itemsPerPage,
                authorData = self.data[index];
            if (index <= (Object.keys(self.data).length)) {
                arr.push(
                    <ReviewItem authorData={authorData}/>
                );
            }
        }
        return (
            <div className="ReviewersPage">
                <div className="table_container">
                    <div className="reviewers_table">
                        {
                            arr
                        }
                    </div>
                </div>
                <Pagination className="pagination"
                            defaultCurrent={1}
                            defaultPageSize={this.itemsPerPage}
                            total={Object.keys(this.data).length}
                            onChange={(page, pageTotal) => {
                                this.changePage(page)
                            }}
                />
            </div>
        );
    }
}

export default withRouter(ReviewersPage);