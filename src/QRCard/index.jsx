import React from 'react';
import PropTypes from 'prop-types';
import * as Styles from './QRCard.styles';
import TextFit from './TextFit';

class QRCard extends React.Component {
  state = {
    overflowVertical: false,
    overflowHorizontal: false,
  };

  render() {
    const { qr, textPosition, styles } = this.props;
    const { overflowVertical, overflowHorizontal } = this.state;
    if (!qr) {
      return null;
    }

    const { url, size, callToAction } = qr;

    return (
      <Styles.Container
        size={size}
        textPosition={textPosition}
        hasCTA={!!callToAction}
        styles={styles.container}
      >
        <Styles.QRCode size={size} src={url} styles={styles.qrImage} />
        {callToAction && (
          <Styles.CallToAction
            size={size}
            textPosition={textPosition}
            overflowVertical={overflowVertical}
            overflowHorizontal={overflowHorizontal}
            styles={styles.callToAction}
          >
            <TextFit
              key={`${size}-${callToAction}-${textPosition}`}
              maxFontSize={42}
              minFontSize={23}
              onCalculated={overflow => this.setState(overflow)}
            >
              {callToAction}
            </TextFit>
          </Styles.CallToAction>
        )}
      </Styles.Container>
    );
  }
}

QRCard.propTypes = {
  qr: PropTypes.shape({
    url: PropTypes.string,
    size: PropTypes.string,
    callToAction: PropTypes.string,
  }),
  textPosition: PropTypes.oneOf(['bottom', 'right']),
  styles: PropTypes.shape({
    container: PropTypes.object,
    qrImage: PropTypes.object,
    callToAction: PropTypes.object,
  }),
};

QRCard.defaultProps = {
  styles: {},
};

export default QRCard;
