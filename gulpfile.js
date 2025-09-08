const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const server = require ('gulp-server-livereload');
const clean = require ('gulp-clean');
const fs = require ('fs');
const sourceMaps = require ('gulp-sourcemaps');
const plumber = require ('gulp-plumber');
const notify = require ('gulp-notify');
const error  = require('console');
const data = require('gulp-data');

gulp.task ('clean', function (done) {
    if (fs.existsSync('./dist/')) {
        return gulp.src('./dist/', { read:false })
        .pipe(clean());
    }
    done();
})

const fileIncludeSettings = {
    prefix: '@@',
    basepath: '@file'
};

const plumberHtmlConfig = {
    errorHandler: notify.onError ({
        title: 'HTML',
        message: 'Error <%= error.message %>',
        sound: false
    })
}

function getCardsData() {
    try {
        const data = fs.readFileSync('./src/data/cards.json', 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading cards.json:', error);
        return { cards: [] };
    }
}

gulp.task('html', function() {
    const cardsData = getCardsData(); // ← Получаем данные карточек
    
    return gulp
        .src('./src/*.html')
        .pipe(plumber(plumberHtmlConfig))
        .pipe(data(function() {
            return { cards: cardsData.cards }; // ← Передаем данные в gulp-data
        }))
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file',
            context: {
                cards: cardsData.cards // ← Передаем данные в fileInclude
            }
        }))
        .pipe(gulp.dest("./dist/"));
});

const plumberScssConfig = {
    errorHandler: notify.onError ({
        title: 'Styles',
        message: 'Error <%= error.message %>',
        sound: false
    })
}

gulp.task ('scss', function() {
    return gulp
    .src('./src/scss/*.scss')
    .pipe(plumber(plumberScssConfig))
    .pipe(sourceMaps.init())
    .pipe(sass())
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('./dist/css'))
})

gulp.task('img', function () {
    return gulp.src('./src/img/**/*', {encoding: false})
    .pipe(gulp.dest('./dist/img/'));
})

gulp.task('fonts', function () {
    return gulp.src('./src/fonts/**/*', {encoding: false})
    .pipe(gulp.dest('./dist/fonts/'));
})

gulp.task('script', function () {
    return gulp.src('./src/script/**/*', {encoding: false})
    .pipe(gulp.dest('./dist/script/'));
})

gulp.task('data', function() {
    return gulp.src('./src/data/**/*', { encoding: false })
        .pipe(gulp.dest('./dist/data/'));
});

const serverOptions = {
    livereload: true,
    open: true
}

gulp.task('server', function() {
    return gulp.src('./dist/')
    .pipe(server(serverOptions))
})

gulp.task('watch', function() {
    gulp.watch ('./src/scss/**/**.scss', gulp.parallel('scss'));
    gulp.watch ('./src/**/*.html', gulp.parallel('html'));
    gulp.watch ('./src/img/**/*', gulp.parallel('img'));
    gulp.watch ('./src/script/**/*', gulp.parallel('script'));
    gulp.watch ('./src/fonts/**/*', gulp.parallel('fonts'));
    gulp.watch('./src/data/**/*', gulp.parallel('html', 'data'));
})

gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('html', 'scss', 'img', 'fonts', 'script', 'data'),
    gulp.parallel('server', 'watch')
));