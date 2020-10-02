import React from 'react';
import PropTypes from 'prop-types';
import * as Styles from './TextFit.styles';

class TextFit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fontSize: props.maxFontSize,
      calculating: false,
    };
  }

  componentDidMount() {
    this.startCalculating();
  }

  componentDidUpdate(prevProps) {
    const childrenChanged = this.props.children !== prevProps.children;

    if (childrenChanged) {
      this.startCalculating();
    }

    if (this.state.calculating) {
      this.calculate();
    }
  }

  getOverflow() {
    if (!this.element) {
      return false;
    }

    const {
      scrollWidth,
      scrollHeight,
      clientWidth,
      clientHeight,
    } = this.element;
    return {
      overflowVertical: scrollHeight > clientHeight,
      overflowHorizontal: scrollWidth > clientWidth,
    };
  }

  startCalculating() {
    const { maxFontSize } = this.props;
    this.setState({ fontSize: maxFontSize, calculating: true });
  }

  calculate() {
    const { minFontSize, step } = this.props;
    const { fontSize } = this.state;
    const nextFontSize = fontSize - step;

    // In Menus, we don't need to shrink the text if it exceeds the height
    if (!this.getOverflow().overflowHorizontal || nextFontSize < minFontSize) {
      this.doneCalculate();
      return;
    }

    this.setState({ fontSize: nextFontSize });
  }

  doneCalculate() {
    const { onCalculated } = this.props;
    this.setState({ calculating: false });
    onCalculated(this.getOverflow());
  }

  render() {
    const { children } = this.props;
    const { fontSize, calculating } = this.state;
    return (
      <Styles.TextFit
        ref={el => (this.element = el)}
        elFontSize={fontSize}
        calculating={calculating}
      >
        {children}
      </Styles.TextFit>
    );
  }
}

TextFit.propTypes = {
  maxFontSize: PropTypes.number,
  minFontSize: PropTypes.number,
  step: PropTypes.number,
  onCalculated: PropTypes.func,
  children: PropTypes.node.isRequired,
};

TextFit.defaultProps = {
  maxFontSize: 100,
  minFontSize: 1,
  step: 1,
  onCalculated: () => {},
};

export default TextFit;
