
var randomError = require('../lib/randomError.js');
var expect = require('chai').expect;

suite('Random error test', function() {
	test('getRandomError() must return string', function() {
		expect(typeof randomError.getRandomError() === 'string');
	});
});