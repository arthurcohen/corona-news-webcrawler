import { readdirSync } from 'fs';
import { resolve, join } from 'path';

const loadSources: Function = async (sourcesPath = '../new-sources/') => {
  try {
    const pathToNewsSources = resolve(__dirname, sourcesPath);
    const newsSouresDirectory = readdirSync(pathToNewsSources);

    const dynamicImports = [];
    newsSouresDirectory
      .filter(fileName => !fileName.includes('.map')) // the transpilator creates 2 files: .js e .js.map.
      .forEach(
        fileName => {
          const sourceFullPath = join(pathToNewsSources, fileName);
          dynamicImports.push(import(sourceFullPath));
        }
      );

    const allImports = await Promise.all(dynamicImports);
    const allModules = allImports
      .reduce((acc, curr) => {
        acc.push(curr.default);
        return acc;
      }, []);

    return allModules;
  } catch (e) {
    // TODO
  }

  return []; // TODO
};

export default loadSources();
