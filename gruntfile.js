module.exports = function (grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    concat: {
    	options: {
    	  separator: '\n',
    	},
    	dist: {
    	  src: ['src/fx.js'],
    	  dest: 'dist/assets/js/fx.min.js'
    	}
		},
    uglify: {
      build: {
        src: 'dist/assets/js/fx.min.js',
        dest: 'dist/assets/js/fx.min.js'
      }
    },
	sass: {
	   dist: {
		   options: {
			 style: 'compressed',
			 sourcemap: 'none'
		   },
		   files: [
		   	{src: ['src/index.scss'], dest: 'dist/assets/css/index.css'},
		   ]
	   }
	},
	watch: {
	  css: {
	    files: 'src/*.scss',
	    tasks: ['sass'],
	    options: {
	      livereload: true,
	    },
	  },
	  js: {
	    files: 'src/fx.js',
	    tasks: ['concat', 'uglify'],
	    options: {
	      livereload: true,
	    },
	  },
	}
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('default', ['concat','uglify','sass']);

};
