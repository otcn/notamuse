module.exports = function (grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    concat: {
    	options: {
    	  separator: '\n',
    	},
    	dist: {
    	  src: ['src/fx.js'],
    	  dest: 'dist/fx.min.js'
    	}
		},
    uglify: {
      build: {
        src: 'dist/fx.min.js',
        dest: 'dist/fx.min.js'
      }
    },
	sass: {                               
	   dist: { 
		   options: {
			 style: 'compressed',
			 sourcemap: 'none'  
		   },
		   files: [
		   	{src: ['src/style.scss'], dest: 'dist/assets/css/style.css'}, 
		   	{src: ['src/style.scss'], dest: 'frontend/assets/css/style.css'} 
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
