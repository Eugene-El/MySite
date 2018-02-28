
var Browser = require('zombie');
var assert = require('chai').assert;

var browser;
suite('Crospage tests', function() {
	setup(function() {
		browser = new Browser();
	});

	test('request from "Infinity adventures" have to fill referrer field', function(done) {
			var referrer = 'http://localhost:3000/projects/infinity-adventures';
			browser.visit(referrer, function() {
				browser.clickLink('.requestGroup', function() {

					//assert(browser.field('referrer').value === referrer);
					assert(browser.resources[0].request.headers._headers[0][1] === referrer);

					done();
				});

			});

		});

	test('request by link have to empty referrer field', function(done) {
			browser.visit('http://localhost:3000/projects/request-group', function() {
				assert(browser.field('referrer').value === '');
				done();
			});
	});

});