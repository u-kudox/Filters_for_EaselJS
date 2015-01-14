module.exports = function(grunt) {
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		uglify : {
			glowfilter : {
				options : {
					banner : grunt.file.read('src/License.js'),
				},
				src : ['src/GlowFilter.js'],
				dest : 'lib/glowfilter.min.js'
			},
			dropshadowfilter : {
				options : {
					banner : grunt.file.read('src/License.js'),
				},
				src : ['src/DropShadowFilter.js'],
				dest : 'lib/dropshadowfilter.min.js'
			},
			filters : {
				options : {
					banner : grunt.file.read('src/License.js'),
				},
				src : ['src/GlowFilter.js', 'src/DropShadowFilter.js'],
				dest : 'lib/filters-for-easeljs-<%= pkg.version %>.min.js'
			}
		},
		copy : {
			glowfilter : {
				files : [{expand:true, cwd:'lib/', src:'glowfilter.min.js', dest:'examples/js/'}]
			},
			dropshadowfilter : {
				files : [{expand:true, cwd:'lib/', src:'dropshadowfilter.min.js', dest:'examples/js/'}]
			},
			filters : {
				files : [{expand:true, cwd:'lib/', src:'filters-for-easeljs-<%= pkg.version %>.min.js', dest:'examples/js/'}]
			}
		},
		watch : {
			glowfilter : {
				files : ['src/GlowFilter.js'],
				tasks : ['glowfilter']
			},
			dropshadowfilter : {
				files : ['src/DropShadowFilter.js'],
				tasks : ['dropshadowfilter']
			},
			filters : {
				files : ['src/GlowFilter.js', 'src/DropShadowFilter.js'],
				tasks : ['filters']
			}
		},
		clean : {
			filters : {
				src : ['lib/filters-for-easeljs*.js', 'examples/js/filters-for-easeljs*.js']
			},
			docs : {
				src : ['build/yuidoc', 'docs']
			}
		},
		yuidoc : {
			docs : {
				name : 'Filters for EaselJS API documentation',
				description : '<%= pkg.description %>',
				version : '<%= pkg.version %>',
				url : '<%= pkg.url %>',
				options : {
					paths : 'src',
					outdir : 'build/yuidoc'
				}
			}
		},
		compress : {
			docs : {
				options : {
					archive : 'docs/<%= pkg.name.toLowerCase() %>-<%= pkg.version %>-docs.zip'
				},
				files : [{expand:true, src:'**', cwd:'build/yuidoc'}]
			}
		},
		replace : {
			bitmapdata : {
				src : ['examples/*.html'],
				overwrite : true,
				replacements : [{
					from : /js\/bitmapdata-.+min\.js/,
					to : 'js/bitmapdata-1.1.0.min.js'
				}]
			},
			easeljs : {
				src : ['examples/*.html'],
				overwrite : true,
				replacements : [{
					from : /easeljs-.+min\.js/,
					to : 'easeljs-0.8.0.min.js'
				}]
			},
			tweenjs : {
				src : ['examples/*.html'],
				overwrite : true,
				replacements : [{
					from : /tweenjs-.+min\.js/,
					to : 'tweenjs-0.6.0.min.js'
				}]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-yuidoc');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-text-replace');

	grunt.registerTask('docs', ['clean:docs', 'yuidoc:docs', 'compress:docs']);
	grunt.registerTask('glowfilter', ['uglify:glowfilter', 'copy:glowfilter']);
	grunt.registerTask('dropshadowfilter', ['uglify:dropshadowfilter', 'copy:dropshadowfilter']);
	grunt.registerTask('filters', ['clean:filters', 'uglify:filters', 'copy:filters']);
};