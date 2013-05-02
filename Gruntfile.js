
/*!
 * @description Gruntfile for Angular Google Maps Zip Search
 * @actions:
 *  - uglify
 *  - jshint
 *  - concat
 *  - watch
 */

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> v<%= pkg.version %>, <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'js/main.js',
                dest: 'js/main.min.js'
            }
        },
        jshint: {
            options: {
                browser: true,
                laxcomma: true,
                globals: {
                    jQuery: true
                }
            },
            all: {
                files: {
                    src: ['js/app/**/*.js']
                }
            }
        },
        concat: {
            options: {
            },
            dist: {
                src: [
                    'js/libs/jquery-1.9.1.min.js',
                    'js/libs/angular-1.0.6.min.js',
                    'js/libs/angular-resource.js',
                    'js/libs/angular-ui-0.4.0.min.js',
                    'js/libs/augular-ui-ieshiv.js',
                    'js/libs/bootstrap.js',
                    'js/libs/ui-bootstrap-0.1.0.min.js',
                    'js/libs/underscore-min.js',
                    'js/app/**/*.js'
                ],
                dest: 'js/main.js'
            }
        },
        watch: {
            scripts: {
                files: ['Gruntfile.js','js/app/**/*.js','js/libs**/*.js'],
                tasks: ['jshint','concat'],
                options: {
                    debounceDelay: 250
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['jshint','concat','uglify','watch']);

};

/* EOF */