import React from 'react';
import PropTypes from 'prop-types';
import * as Styles from './QRCard.styles';
import TextFit from './TextFit';

const QRCard = ({ qr, textPosition, styles, vw }) => {
  const [overflow, setOverFlow] = React.useState({
    overflowVertical: false,
    overflowHorizontal: false,
  });

  if (!qr) {
    return null;
  }
  const { overflowVertical, overflowHorizontal } = overflow;
  const { url, size, callToAction } = qr;

  return (
    <Styles.Container
      size={size}
      textPosition={textPosition}
      hasCTA={!!callToAction}
      styles={styles.container}
      vw={vw}
    >
      <Styles.QRCode size={size} src={url} styles={styles.qrImage} vw={vw} />
      {callToAction && (
        <Styles.CallToAction
          size={size}
          textPosition={textPosition}
          overflowVertical={overflowVertical}
          overflowHorizontal={overflowHorizontal}
          styles={styles.callToAction}
          vw={vw}
        >
          <TextFit
            key={`${size}-${callToAction}-${textPosition}`}
            maxFontSize={42}
            minFontSize={23}
            onCalculated={setOverFlow}
            vw={vw}
          >
            {callToAction}
          </TextFit>
        </Styles.CallToAction>
      )}
    </Styles.Container>
  );
};

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
  vw: PropTypes.func.isRequired,
};

QRCard.defaultProps = {
  styles: {},
};

export default QRCard;
