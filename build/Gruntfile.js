module.exports = function(grunt) {
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		uglify : {
			glowfilter : {
				src : ['../src/GlowFilter.js'],
				dest : '../lib/glowfilter.min.js'
			}
		},
		copy : {
			glowfilter : {
				files : [{expand:true, cwd:'../lib/', src:'glowfilter.min.js', dest:'../examples/js/'}]
			}
		},
		watch : {
			glowfilter : {
				files : ['../src/GlowFilter.js'],
				tasks : ['glowfilter']
			}
		},
		yuidoc : {
			docs : {
				name : 'Filters for EaselJS',
				description : '<%= pkg.description %>',
				version : '<%= pkg.version %>',
				url : '<%= pkg.url %>',
				options : {
					paths : '../src',
					outdir : 'yuidoc'
				}
			}
		},
		compress : {
			docs : {
				options : {
					archive : '../docs/<%= pkg.name.toLowerCase() %>-<%= pkg.version %>-docs.zip'
				},
				files : [{expand:true, src:'**', cwd:'yuidoc'}]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-yuidoc');
	grunt.loadNpmTasks('grunt-contrib-compress');

	grunt.registerTask('docs', ['yuidoc:docs', 'compress:docs']);
	grunt.registerTask('glowfilter', ['uglify:glowfilter', 'copy:glowfilter']);
};