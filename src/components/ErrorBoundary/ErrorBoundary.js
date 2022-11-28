import React, { Component } from 'react'

export default class ErrorBoundary extends Component {

  state = {
    hasError: false
  };

  componentDidCatch() {
    this.setState({
      hasError: true
    });
  }
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong...please try again</h1>
    }
    return this.props.children
  };
};