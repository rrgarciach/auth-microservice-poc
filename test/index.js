const Jasmine = require('jasmine');

process.env.NODE_ENV = 'test';

process.env.NODE_ENV = 'test';

const jasmine = new Jasmine();
jasmine.loadConfigFile('./test/jasmine.json');
jasmine.execute();
