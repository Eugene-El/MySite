
module.exports = function(grunt) {

	// Load plugins
	[
		'grunt-cafe-mocha',
		'grunt-contrib-jshint',
		//'grunt-exec'
	].forEach(function(task) {
		grunt.loadNpmTasks(task);
	});

	// Setup plugins
	grunt.initConfig({
		cafemocha: {
			all: { src: 'qa/tests-*.js', options: { ui: 'tdd'} }
		},
		jshint: {
			app: ['index.js', 'public/js/**/*.js', 'lib/**/*.js'],
			qa: ['Gruntfile.js', 'public/qa/**/*.js', 'qa/**/*.js']
		}
	});

	// Registration
	grunt.registerTask('default', ['cafemocha', 'jshint']);
};