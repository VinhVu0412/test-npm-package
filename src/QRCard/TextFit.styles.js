import styled from '@emotion/styled';

export const TextFit = styled('div')(({ elFontSize, calculating }) => ({
  width: calculating ? '100%' : null,
  height: calculating ? '100%' : null,
  fontSize: elFontSize,
  opacity: calculating ? 0 : 1,
  overflow: calculating ? 'hidden' : null,
}));
