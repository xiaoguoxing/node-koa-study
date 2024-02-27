import installer from './defaults';
export * from '../components/index.js';
export * from '../hooks/index.js';
export * from './make-installer';

export const install = installer.install;

export default installer;
