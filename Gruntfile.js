/* global require, module, process: false */

module.exports = function(grunt) {
'use strict';

var githubPagesDir = 'gh_pages';

require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

grunt.initConfig({
    exec: {
        buildSlateDocs: {
            cmd: function() {
                return [
                    'bundle install',
                    'rm -rf build',
                    'bundle exec middleman build --clean'
                ].join(' && ');
            }
        },
        checkoutDocs: {
            cmd: function() {
                return [
                    'rm -rf ' + githubPagesDir,
                    'git clone git@github.com:supportkit/supportkit-docs.git --branch gh-pages --single-branch ' + githubPagesDir,
                    'cp -R build/* ' + githubPagesDir
                ].join(' && ');
            }
        },
        server: {
            cmd: function() {
                return 'bundle exec middleman server';
            }
        }
    },
    githubPages: {
        docs: {
            options: {
                commitMessage: 'Update docs'
            },
            src: githubPagesDir
        }
    }
});

grunt.registerTask('logurl', function() {
    grunt.log.write('http://localhost:4567');
});

grunt.registerTask('publish', function() {
    grunt.task.run('exec:buildSlateDocs', 'exec:checkoutDocs', 'githubPages:docs');
});

grunt.registerTask('default', ['logurl', 'exec:server']);
};
