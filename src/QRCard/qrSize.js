export const QR_IMAGE_SIZE_MAP = {
  small: 200,
  medium: 400,
  large: 525,
  undefined: 0,
};

export const CTA_HORIZONTAL_WIDTH_MAP = {
  small: 461,
  medium: 345,
  large: 117.5,
  undefined: 0,
};

export const getPaddingSize = size => QR_IMAGE_SIZE_MAP[size] / 6;

export const getQRMaxWidth = size =>
  QR_IMAGE_SIZE_MAP[size] +
  CTA_HORIZONTAL_WIDTH_MAP[size] +
  3 * getPaddingSize(size);
