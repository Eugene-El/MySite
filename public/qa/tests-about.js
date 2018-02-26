
suite('About page tests', function() {
	test('Page contains reference to Contact page', function() {
		assert($('a[href="/contact"]').length);
	});
});