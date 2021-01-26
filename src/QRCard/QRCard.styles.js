import styled from '@emotion/styled';
import {
  QR_IMAGE_SIZE_MAP,
  CTA_HORIZONTAL_WIDTH_MAP,
  getPaddingSize,
  getQRMaxWidth,
} from './qrSize';

export const Container = styled('div')(
  ({ size, textPosition, hasCTA, styles, vw }) => {
    const paddingSize = getPaddingSize(size);
    const qrSize = QR_IMAGE_SIZE_MAP[size];

    const sizeWithPaddings = qrSize + 2 * paddingSize;
    const sizeStyles =
      textPosition === 'right'
        ? {
            width: vw(hasCTA ? getQRMaxWidth(size) : sizeWithPaddings),
            height: vw(sizeWithPaddings),
          }
        : {
            width: vw(sizeWithPaddings),
            maxHeight: `calc(100% - ${vw(2 * paddingSize)})`,
          };

    return {
      display: 'flex',
      flexDirection: textPosition === 'right' ? 'row' : 'column',
      position: 'absolute',
      margin: vw(paddingSize),
      padding: vw(paddingSize),
      boxSizing: 'border-box',
      boxShadow: `${vw(8)} ${vw(8)} ${vw(16)} 0 rgba(0, 0, 0, 0.5)`,
      borderRadius: vw(8),
      backgroundColor: '#FFFFFF',
      ...sizeStyles,
      ...styles,
    };
  },
);

export const QRCode = styled('img')(({ size, styles, vw }) => ({
  flexShrink: 0,
  objectFit: 'contain',
  width: vw(QR_IMAGE_SIZE_MAP[size]),
  height: vw(QR_IMAGE_SIZE_MAP[size]),
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
    vw,
  }) => {
    const ctaStyles =
      textPosition === 'right'
        ? {
            alignItems: overflowVertical ? 'flex-start' : 'center',
            justifyContent: 'flex-start',
            marginLeft: vw(getPaddingSize(size)),
            width: vw(CTA_HORIZONTAL_WIDTH_MAP[size]),
          }
        : {
            alignItems: 'flex-start',
            justifyContent: overflowHorizontal ? 'flex-start' : 'center',
            textAlign: 'center',
            marginTop: vw(getPaddingSize(size)),
            width: vw(QR_IMAGE_SIZE_MAP[size]),
          };

    return {
      display: 'flex',
      whiteSpace: 'pre-wrap',
      fontFamily: theme.qrCtaFont,
      letterSpacing: vw(0.46),
      color: '#000000',
      ...ctaStyles,
      ...styles,
    };
  },
);
