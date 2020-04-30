import batch from './src/index';
import sourceFactory from './src/config/source-config';
import { prompt } from 'inquirer';

async function chooseLanguage() {
  const sources = await sourceFactory;
  const answers = await
  prompt([
    {
      type: 'list',
      name: 'language',
      message: 'Choose language.',
      choices: [...new Set(sources.map((item) => item.language.toLowerCase())), 'All'],
      filter: function(val) {
        return val.toLowerCase();
      }
    }
  ]);
  chooseSources(answers.language);
};

async function chooseSources(language = 'pt-br') {
  let sources = await sourceFactory;
  sources = sources.filter(
    (s) => s.language.toLowerCase() === language.toLowerCase() || language === 'all'
  );
  const answers = await
  prompt([
    {
      type: 'checkbox',
      message: 'Select sources.',
      name: 'sources',
      choices: [...sources.map((item) => { return { name: item.sourceName }; }), { name: 'All' }],
      validate: function(answer) {
        if (answer.length < 1) {
          return 'You must choose at least one topping.';
        }
        return true;
      }
    }
  ]);

  let sourcesArray = [];
  answers.sources.filter(answer => {
    sources.filter(item => {
      if (answer === item.sourceName) sourcesArray.push(item);
    });
  });
  if (answers.sources.find(item => (item === 'All'))) sourcesArray = sources;
  batch(sourcesArray);
};

chooseLanguage();
