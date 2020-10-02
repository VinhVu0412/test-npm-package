import styled from '@emotion/styled';

export const QR_IMAGE_SIZE_MAP = {
  small: 200,
  medium: 400,
  large: 525,
  undefined: 0,
};
export const CTA_HORIZONTAL_WIDTH_MAP = {
  small: 461,
  medium: 345,
  large: 118,
  undefined: 0,
};

export const getPaddingSize = size => QR_IMAGE_SIZE_MAP[size] / 6;
export const getQrMaxWidth = size =>
  QR_IMAGE_SIZE_MAP[size] +
  CTA_HORIZONTAL_WIDTH_MAP[size] +
  3 * getPaddingSize(size);

export const Container = styled('div')(
  ({ size, textPosition, hasCTA, styles }) => {
    const paddingSize = getPaddingSize(size);
    const qrSize = QR_IMAGE_SIZE_MAP[size];

    const cardStyles = {
      position: 'absolute',
      margin: paddingSize,
      boxShadow: '8px 8px 16px 0 rgba(0, 0, 0, 0.5)',
      borderRadius: 8,
    };

    const sizeWidthPaddings = qrSize + 2 * paddingSize;
    const sizeStyles =
      textPosition === 'right'
        ? {
            width: hasCTA ? getQrMaxWidth(size) : sizeWidthPaddings,
            height: sizeWidthPaddings,
          }
        : {
            width: sizeWidthPaddings,
            maxHeight: `calc(100% - ${2 * paddingSize}px)`,
          };

    return {
      display: 'flex',
      flexDirection: textPosition === 'right' ? 'row' : 'column',
      padding: paddingSize,
      boxSizing: 'border-box',
      backgroundColor: '#FFFFFF',
      ...sizeStyles,
      ...cardStyles,
      ...styles,
    };
  },
);

export const QRCode = styled('img')(({ size, styles }) => ({
  flexShrink: 0,
  objectFit: 'contain',
  width: QR_IMAGE_SIZE_MAP[size],
  height: QR_IMAGE_SIZE_MAP[size],
  ...styles,
}));

export const CallToAction = styled('div')(
  ({
    theme,
    size,
    textPosition,
    overflowVertical,
    overflowHorizontal,
    styles,
  }) => {
    let ctaStyles;
    if (textPosition === 'right') {
      ctaStyles = {
        alignItems: overflowVertical ? 'flex-start' : 'center',
        justifyContent: 'flex-start',
        marginLeft: getPaddingSize(size),
        width: CTA_HORIZONTAL_WIDTH_MAP[size],
      };
    } else {
      ctaStyles = {
        alignItems: 'flex-start',
        justifyContent: overflowHorizontal ? 'flex-start' : 'center',
        textAlign: 'center',
        marginTop: getPaddingSize(size),
        width: QR_IMAGE_SIZE_MAP[size],
      };
    }

    return {
      display: 'flex',
      whiteSpace: 'pre-wrap',
      fontFamily: theme.qrCtaFont,
      letterSpacing: 0.46,
      color: '#000000',
      ...ctaStyles,
      ...styles,
    };
  },
);
