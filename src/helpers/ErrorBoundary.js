import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    const errorHeaderWrapper = {
      textAlign: "center",
    };

    if (this.state.hasError) {
      return (
        <div style={errorHeaderWrapper}>
          <h1>Something went wrong.</h1>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
