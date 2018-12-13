import {Component} from 'react';
import withRouter from 'react-router/es/withRouter'

class ScrollToTop extends Component {
  componentDidMount() {
    document.querySelector('.app-content').scrollTo(0, 0);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      document.querySelector('.app-content').scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);