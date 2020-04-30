import batch from './src/index';
import sourceFactory from './src/config/source-config';
var inquirer = require('inquirer');

const chooseLanguage = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'language',
        message: 'Choose language.',
        choices: ['pt-br', 'en-us', 'All'],
        filter: function(val) {
          return val.toLowerCase();
        }
      }
    ])
    .then(answers => {
      chooseFonts(answers.language);
    });
};

const chooseFonts = async (language = 'pt-br') => {
  let sources = await sourceFactory;
  sources = sources.filter(
    (s) => s.language.toLowerCase() === language.toLowerCase() || language === 'all'
  );
  inquirer
    .prompt([
      {
        type: 'checkbox',
        message: 'Select sources.',
        name: 'fonts',
        choices: [...sources.map((item) => { return { name: item.sourceName }; }), { name: 'All' }],
        validate: function(answer) {
          if (answer.length < 1) {
            return 'You must choose at least one topping.';
          }
          return true;
        }
      }
    ])
    .then(answers => {
      let sourcesArray = [];
      answers.fonts.filter(answer => {
        sources.filter(item => {
          if (answer === item.sourceName) sourcesArray.push(item);
        });
      });
      if (answers.fonts.find(item => (item === 'All'))) sourcesArray = sources;
      batch(sourcesArray);
    });
};

chooseLanguage();
