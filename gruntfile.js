module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          //hostname: '127.0.0.1',
          hostname: '*',
          port: 18307,
          base: 'src',
          livereload: true
        }
      }
    },
    watch: {
      scripts: {
        files: 'src/**/*.js',
        options: {
          interrupt: true
        }
      },
      html: {
        files: 'src/**/*.html',
        options: {
          interrupt: true
        }
      },
      livereload: {
        options: {
          livereload: true
        },
        files: ['src/**/*']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', []);
  grunt.registerTask('dev', ['connect:server', 'watch']);
};
