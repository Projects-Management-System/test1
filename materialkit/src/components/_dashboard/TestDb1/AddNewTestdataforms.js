import React, { Component } from 'react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Link } from '@mui/material';

export default class Testdataforms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    this.retrievePosts();
  }

  retrievePosts() {
    axios.get('/posts').then((res) => {
      if (res.data.success) {
        this.setState({
          posts: res.data.existingPosts
        });
      }
    });
  }

  render() {
    return (
      <div>
        <table className="table table-dark table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Topic</th>
              <th scope="col">Description</th>
              <th scope="col">Post Category</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((posts, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{posts.topic}</td>
                <td>{posts.description}</td>
                <td>{posts.postcategory}</td>
                <td>
                  <a className="btn btn-warning" href="#">
                    <i className="fas fa-edit" />
                  </a>
                  &nbsp;
                  <a className="btn btn-danger" href="#">
                    <i className="far fa-trash-alt" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Button style={{ width: 170 }} size="large" color="primary" variant="outlined">
          <Link underline="hover" component={RouterLink} to="/dashboard/TestDb1/addpost">
            &nbsp; Create new post
          </Link>
        </Button>
      </div>
    );
  }
}
