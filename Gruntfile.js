// Currently this is used as a utility that I can run manually to quickly
// batch optimise all images in the pictures folder; as jpeg optimisation
// is lossy, I batch everything into a separate directory so I can inpsect
// and compare the changes before manually replacing image files. If I ever
// move to a more separate master/gh-pages model, I may consider automatically
// creating a proper dist folder and somehow pumping that into gh-pages branch,
// but for now this serves my simple purposes...
module.exports = function(grunt) {
  var mozjpeg = require('imagemin-mozjpeg');

  grunt.initConfig({
    imagemin: {                          // Task
      dynamic: {
        options: {                       // Target options
          optimizationLevel: 3,
          svgoPlugins: [{ removeViewBox: false }],
          use: [mozjpeg()]
        },
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'pictures/',              // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: 'pictures-dist/'         // Destination path prefix
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.registerTask('default', ['imagemin']);
};