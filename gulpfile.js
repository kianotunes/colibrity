const { src, dest, series, parallel, watch } = require('gulp');
const twig = require('gulp-twig');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const prefix = require('gulp-autoprefixer');
const purgecss = require('gulp-purgecss');
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');
const rename = require('gulp-rename');
const data = require('gulp-data');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const plumber = require('gulp-plumber');
const browsersync = require('browser-sync');
const readJson = require('fs');
const path = require('path');

/*
 * Директории
 */
let paths = {
    build: './build/',
    scss: './build/assets/scss/',
    data: './client/data/',
    js: './build/assets/js/',
    css: './build/assets/css/',
    distCSS: './dist/assets/css/',
    distJS: './dist/assets/js/',
    distHTML: './dist/',
    distIMG: './dist/assets/img/',
    distFonts: './dist/assets/fonts/'
}


/** Таски для разработки (пака ./build/) **/

// SCSS task
function css() {
  return src('build/assets/scss/**/*.scss')
    .pipe(sassGlob())
    .pipe(sourcemaps.init())
    // Stay live and reload on error
    .pipe(plumber({
      handleError: function (err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(sass({
      includePaths: [paths.scss + 'components/' + 'custom-style/'],
      outputStyle: 'expanded'
    }).on('error', function (err) {
      console.log(err.message);
      // sass.logError
      this.emit('end');
    }))
    .pipe(prefix(['last 15 versions','> 1%','ie 8','ie 7','iOS >= 9','Safari >= 9','Android >= 4.4','Opera >= 30'], {
      cascade: true
    }))
    .pipe(concat('main.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('build/assets/css/'));
}

// JS task
function js() {
    return src(['build/assets/js/util.js','build/assets/js/components/*.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('scripts.js'))
    .pipe(terser({format: {quote_style: 1}}))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('build/assets/js'));
}


// Компиляция шаблонов .twig и данных из index.twig.json

function twigTpl () {
    return src('./client/templates/*.twig')
    // Stay live and reload on error
    .pipe(plumber({
      handleError: function (err) {
        console.log(err);
        this.emit('end');
      }
    }))
    // Загрузка шаблонов json data
    .pipe(data(function (file) {
        return JSON.parse(readJson.readFileSync(paths.data + path.basename(file.path) + '.json'));		
      }).on('error', function (err) {
        process.stderr.write(err.message + '\n');
        this.emit('end');
      })
    )
    // Twig компиляция и вывод
    .pipe(twig()
        .on('error', function (err) {
          process.stderr.write(err.message + '\n');
          this.emit('end');
        })
    )    
    .pipe(dest(paths.build));
}

// BrowserSync
function browserSync() {
  browsersync({
    server: {
      baseDir: paths.build
    },
    notify: false
  });
}

// BrowserSync reload 
function browserReload () {
  return browsersync.reload;
}

// Watch files
function watchFiles() {
  watch([paths.scss + '**/*.scss'], parallel(css))
  .on('change', browserReload());
  watch([paths.js + 'components/*.js','build/assets/js/util.js'], parallel(js))
  .on('change', browserReload());
  watch(['client/templates/**/*.twig','client/data/*.twig.json'], parallel(twigTpl))
  .on('change', browserReload());
}

/** Таски для итоговой сборки проекта для размещения на сервере (./dist/) **/

// Таск для main.min.css (включёна очистка неиспользованных стилей + минификация)
function purgeCSS() {
  return src([paths.css + 'main.css'])
    .pipe(purgecss({
      content: ['build/*.html', paths.js + 'scripts.js'],
      safelist: ['.is-hidden', '.is-visible', /open$/],
	  safelist: {deep: [/js$/]},
      defaultExtractor: content => content.match(/[\w-/:%@]+(?<!:)/g) || []
    }))
    .pipe(cleanCSS( { level: { 1: { specialComments: 0 } } } ))
    .pipe(rename({suffix: '.min'}))
    .pipe(dest([paths.distCSS]));
}

// Таск для scripts.min.js
function minifyJs() {
	return src([paths.js + 'scripts.js'])
  .pipe(terser({format: {quote_style: 1}}))
  .pipe(rename({suffix: '.min'}))
  .pipe(dest([paths.distJS]));
}

// Таск для переноса html
function moveContent() {
	return src([paths.build + '*.html'])
	.pipe(dest([paths.distHTML]));
}

// Таск для переноса img
function images() {
	return src('build/assets/img/*')
	.pipe(dest([paths.distIMG]));
}

// Таск для переноса шрифтов
function fonts() {
	return src('build/assets/fonts/*')
	.pipe(dest([paths.distFonts]));
}

/** сборка для разработки - ./build/ **/
const watching = parallel(watchFiles, browserSync);

exports.js = js;
exports.css = css;
exports.default = parallel(css, js, twigTpl);
exports.watch = watching;

/** сборка для финального проекта ./dist/ **/

exports.purgeCSS = purgeCSS;
exports.build = series(purgeCSS, minifyJs, moveContent, images, fonts);
