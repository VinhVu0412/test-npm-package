import React from 'react';
import PropTypes from 'prop-types';

import * as Styles from './TextFit.styles';

export const getOverflow = ref => {
  if (!ref.current) {
    return { overflowVertical: false, overflowHorizontal: false };
  }

  const { scrollWidth, scrollHeight, clientWidth, clientHeight } = ref.current;
  return {
    overflowVertical: scrollHeight > clientHeight,
    overflowHorizontal: scrollWidth > clientWidth,
  };
};

const TextFit = ({
  maxFontSize,
  minFontSize,
  step,
  onCalculated,
  vw,
  children,
}) => {
  const [fontSize, setFontSize] = React.useState(maxFontSize);
  const [calculating, setCalculating] = React.useState(false);

  React.useEffect(
    () => {
      setFontSize(maxFontSize);
      setCalculating(true);
    },
    [children],
  );

  const ref = React.useRef(null);

  React.useEffect(
    () => {
      if (calculating) {
        const nextFontSize = fontSize - step;
        // In Menus, we don't need to shrink the text if it exceeds the height
        const overflows = getOverflow(ref);

        if (!overflows.overflowHorizontal || nextFontSize < minFontSize) {
          setCalculating(false);
          onCalculated(overflows);
        } else {
          setFontSize(nextFontSize);
        }
      }
    },
    [calculating, fontSize, ref],
  );

  return (
    <Styles.TextContent
      ref={ref}
      elFontSize={fontSize}
      calculating={calculating}
      vw={vw}
    >
      {children}
    </Styles.TextContent>
  );
};

TextFit.propTypes = {
  maxFontSize: PropTypes.number,
  minFontSize: PropTypes.number,
  step: PropTypes.number,
  onCalculated: PropTypes.func,
  vw: PropTypes.func,
  children: PropTypes.node.isRequired,
};

TextFit.defaultProps = {
  maxFontSize: 100,
  minFontSize: 1,
  step: 1,
  onCalculated: () => {},
};

export default TextFit;
