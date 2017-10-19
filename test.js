const Jasmine = require('jasmine');

process.env.NODE_ENV = 'test';

process.env.NODE_ENV = 'test';

const jasmine = new Jasmine();
jasmine.loadConfigFile('./jasmine.json');
jasmine.execute();
