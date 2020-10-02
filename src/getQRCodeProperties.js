import * as PropTypes from 'raydiant-kit/prop-types';

const sizeHelperTexts = {
  small: 'Small: Scannable from approx 2ft away',
  medium: 'Medium: Scannable from approx 3.5ft away',
  large: 'Large: Scannable from approx 4.5ft away',
};

export default (presentation, singleSize=false) => {
  const {
    qrActive: selectedQrActive,
    qrSource: selectedQrSource,
    qrSize: selectedQrSize,
  } = presentation.values;

  const qrActive = PropTypes.boolean('QR code')
    .default(true)
    .helperText('What are QR codes?')
    .helperLink('https://support.raydiant.com/hc/en-us/articles/360049375592');
  const showQRControls = selectedQrActive;

  const qrSource = PropTypes.toggleButtonGroup('QR code')
    .exclusive()
    .option('needQRCode', 'I need a QR code')
    .option('haveQRCode', 'I have a QR code')
    .default('needQRCode')
    .show(showQRControls);

  const qrUrlContent = PropTypes.string('QR code destination URL').show(
    showQRControls && selectedQrSource === 'needQRCode',
  );
  const qrImage = PropTypes.file('QR code graphic')
    .contentTypes([
      'image/png',
      'image/jpeg',
      'image/svg+xml',
      'image/bmp',
      'image/tiff',
    ])
    .show(showQRControls && selectedQrSource === 'haveQRCode')
    .helperText('Upload your QR code');

  const qrCallToAction = PropTypes.text('Call to action')
    .maxLength(40)
    .show(showQRControls)
    .helperText("Ex 'Scan for mobile menu'. Max 40 characters");

  const controls = {
    qrActive,
    qrSource,
    qrUrlContent,
    qrImage,
    qrCallToAction,
  };

  if (!singleSize) {
    const qrSize = PropTypes.toggleButtonGroup('Size')
      .exclusive()
      .option('small', 'Small')
      .option('medium', 'Medium')
      .option('large', 'Large')
      .default('small')
      .show(showQRControls);
    qrSize.helperText(sizeHelperTexts[selectedQrSize]);
    controls.qrSize = qrSize;
  }

  return controls;
};
