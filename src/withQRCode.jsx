import React from 'react';
import PropTypes from 'prop-types';
import * as QRCode from 'qrcode';
import { format as formatURL, parse as parseUrl } from 'url';

const createQRCodeUrl = async content => {
  if (!content) {
    return '';
  }
  const svgString = await QRCode.toString(content, {
    type: 'svg',
    color: {
      dark: '#000000',
      light: '#FFFFFF',
    },
    margin: 0,
  });
  const blob = new Blob([svgString], { type: 'image/svg+xml' });
  return URL.createObjectURL(blob);
};

export default Component => {
  class WithQRCodeComponent extends React.Component {
    static propTypes = {
      presentation: PropTypes.shape({
        values: PropTypes.shape({
          qrActive: PropTypes.bool,
          qrSource: PropTypes.string,
          qrUrlContent: PropTypes.string,
          qrImage: PropTypes.object,
          qrSize: PropTypes.string,
          qrCallToAction: PropTypes.string,
        }),
      }),
      onError: PropTypes.func.isRequired,
    };

    state = {
      url: '',
    };

    componentDidMount() {
      this.setUrl();
    }

    componentDidUpdate(prevProps) {
      const { values } = this.props.presentation;
      const { qrActive, qrSource, qrUrlContent, qrImage, qrSize } = values;
      const {
        qrActive: prevQRActive,
        qrSource: prevQRSource,
        qrUrlContent: prevQRUrlContent,
        qrImage: prevQRImage,
        qrSize: prevQRSize,
      } = prevProps.presentation.values;
      const qrImageUrl = qrImage && qrImage.url;
      const prevQRImageUrl = prevQRImage && prevQRImage.url;

      if (
        prevQRActive !== qrActive ||
        prevQRSource !== qrSource ||
        prevQRUrlContent !== qrUrlContent ||
        prevQRImageUrl !== qrImageUrl ||
        prevQRSize !== qrSize
      ) {
        this.setUrl();
      }
    }

    setUrl = async () => {
      const {
        qrActive,
        qrSource,
        qrUrlContent,
        qrImage,
      } = this.props.presentation.values;
      if (!qrActive) {
        return;
      }

      const url =
        qrSource === 'haveQRCode'
          ? qrImage
            ? qrImage.url
            : ''
          : await createQRCodeUrl(this.validateUrl(qrUrlContent));
      this.setState({ url });
    };

    validateUrl = url => {
      const trimmedUrl = url ? url.trim() : '';
      if (!trimmedUrl) {
        return '';
      }
      const urlWithProtocol = parseUrl(trimmedUrl).protocol
        ? trimmedUrl
        : `https://${trimmedUrl}`;
      const urlObject = parseUrl(urlWithProtocol);
      if (!urlObject.hostname || !urlObject.hostname.includes('.')) {
        this.props.onError(new Error('Please enter a valid website URL'));
        return '';
      }

      return formatURL(urlObject);
    };

    render() {
      const {
        qrActive,
        qrSize,
        qrCallToAction,
      } = this.props.presentation.values;
      const { url } = this.state;
      const qr =
        qrActive && url
          ? {
              url,
              size: qrSize,
              callToAction: qrCallToAction,
            }
          : null;

      return <Component {...this.props} qr={qr} />;
    }
  }

  return WithQRCodeComponent;
};
