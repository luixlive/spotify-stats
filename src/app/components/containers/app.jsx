import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Error from './error';
import Footer from './footer';
import Header from './header';
import { loadUser } from './../../actions/user';
import { ScreenLoader } from './../templates';
import { SizeDetector } from './../hoc';

import './../../style/components/containers/app.less';

export class PureApp extends Component {
  componentDidMount() {
    this.props.loadUser();
  }

  renderBody() {
    if (this.props.error) {
      return <Error />;
    } else if (this.props.userLoaded) {
      return this.props.children;
    }
    return <ScreenLoader text="Loading..." />;
  }

  render() {
    return (
      <div>
        <Header />
        <div className="content">{this.renderBody()}</div>
        <Footer />
      </div>
    );
  }
}

PureApp.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  error: PropTypes.string.isRequired,
  loadUser: PropTypes.func.isRequired,
  userLoaded: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ error, user }) => ({
  error,
  userLoaded: user.userLoaded,
});

const mapDispatchToProps = dispatch => ({
  loadUser: () => dispatch(loadUser()),
});

export const ConnectedApp =
  connect(mapStateToProps, mapDispatchToProps)(PureApp);

export default withRouter(SizeDetector(ConnectedApp));
