import styled from '@emotion/styled';

export const TextContent = styled('div')(({ elFontSize, calculating, vw }) => ({
  width: calculating ? '100%' : null,
  height: calculating ? '100%' : null,
  fontSize: vw(elFontSize),
  opacity: calculating ? 0 : 1,
  overflow: calculating ? 'hidden' : null,
}));
