module.exports = function(grunt) {

    grunt.initConfig({
        // Metadata
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                stripBanners: true
            },
            dist: {
                src: [
                    'js/pace.min.js',
                    'js/jszip.js',
                    'js/jszip-utils.js',
                    'js/jquery.min.js',
                    'js/jquery.ba-throttle-debounce.min.js',
                    'js/flexsearch/flexsearch.debug.js',
                    'js/striptags.js',
                    'js/jquery.highlight.js',
                    'js/jquery.scrollto.js',
                    'js/jquery.finder.js',
                    'js/bible.js',
                    'js/ImageGallery.js',
                    'js/functions.js',
                    'js/search.js',
                ],
                dest: 'js/web-view.js'
            },
            // distCss: {
            //     src: ['Content/bootstrap.css', 'Content/site.css'],
            //     dest: 'dist/app.css'
            // }
        },
        uglify: {
            dist :{
                src: ['js/web-view.js'],
                dest: 'js/web-view.min.js'
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Default task(s).
    grunt.registerTask('default', ['concat', 'uglify']);

};