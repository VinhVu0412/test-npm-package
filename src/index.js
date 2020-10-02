// fix regeneratorRuntime is not defined
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import getQRCodeProperties from './getQRCodeProperties';
import withQRCode from './withQRCode';
import QRCard from './QRCard';

export { getQRCodeProperties, withQRCode, QRCard };