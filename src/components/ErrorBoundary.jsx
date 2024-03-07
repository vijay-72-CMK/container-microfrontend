import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const statusCode = this.props.statusCode || 500;

      if (statusCode === 404) {
        return <NotFoundPage />;
      } else {
        return <ServerErrorPage />;
      }
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
