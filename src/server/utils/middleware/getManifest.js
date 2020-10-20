import fs from 'fs';
import path from 'path';

const getManifest = () => {
  try {
    return JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../public/manifest.json')));
  } catch (error) {
    console.log(error);
  }
};

export default getManifest;
