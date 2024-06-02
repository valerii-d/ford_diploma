import { sha256 } from 'hash.js';

export default (stringToHash) => sha256().update(stringToHash).digest('hex');
