import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
  // hoc comp which can be usse to error handle any component which uses axios
  return class extends Component {
    state = {
      error: null
    };
    componentWillMount() {
      axios.interceptors.request.use(req => {
        this.setState({
          error: null
        });
        return req;
      });
      axios.interceptors.response.use(
        res => res,
        err => {
          this.setState({
            error: err
          });
        }
      );
    }
    errorConfirmedHandler = () => {
      this.setState({
        error: null
      });
    };
    render() {
      return (
        <Auxiliary>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Auxiliary>
      );
    }
  };
};

export default withErrorHandler;
