// import {Tabs} from 'antd';
import 'antd/dist/antd.css';

import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import AuthorInfo from "./authorInfo";
import './index.css';
import {Pagination} from 'antd';

class AuthorsPage extends Component {

    constructor(props) {
        super(props);
        this.itemsPerPage = 8;
        this.data = {
            1: {
                "profile_image_url": "https://placehold.it/50x50",
                "name": "John Doe",
                "articles_count": 500,
                "most_recent": "Article Title",
                "joined": 20,
                "average": 3
            },
            2: {
                "profile_image_url": null,
                "name": "Lorem Ipsum",
                "articles_count": 140,
                "most_recent": "Lorem ipsum dolor.",
                "joined": 10,
                "average": 3
            },
            3: {
                "profile_image_url": null,
                "name": "Lorem Ipsum2",
                "articles_count": 140,
                "most_recent": "Lorem ipsum dolor.",
                "joined": 10,
                "average": 1.5
            },
            4: {
                "profile_image_url": "https://placehold.it/50x50",
                "name": "Lorem Ipsum3",
                "articles_count": 140,
                "most_recent": "Lorem ipsum dolor.",
                "joined": 10,
                "average": .5
            },
            5: {
                "profile_image_url": null,
                "name": "Lorem Ipsum4",
                "articles_count": 140,
                "most_recent": "Lorem ipsum dolor.",
                "joined": 10,
                "average": 3.5
            },
            6: {
                "profile_image_url": null,
                "name": "Lorem Ipsum5",
                "articles_count": 140,
                "most_recent": "Lorem ipsum dolor.",
                "joined": 10,
                "average": 1.5
            },
            7: {
                "profile_image_url": null,
                "name": "Lorem Ipsum5",
                "articles_count": 140,
                "most_recent": "Lorem ipsum dolor.",
                "joined": 10,
                "average": 1.5
            },
            8: {
                "profile_image_url": null,
                "name": "Lorem Ipsum5",
                "articles_count": 140,
                "most_recent": "Lorem ipsum dolor.",
                "joined": 10,
                "average": 1.5
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

    render() {
        let self = this,
            arr = [];
        console.log(self.state.page * self.itemsPerPage);
        for (let i = 1; i < self.itemsPerPage + 1; i++) {
            let index = i + (self.state.page - 1) * self.itemsPerPage,
                authorData = self.data[index];
            if(index <= (Object.keys(self.data).length) ){
                arr.push(
                    <AuthorInfo authorData = {authorData}/>
                );
            }
        }
        return (
            <div className="AuthorsPage">
                <div className="authors_table">
                    {
                        arr
                    }
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

export default withRouter(AuthorsPage);