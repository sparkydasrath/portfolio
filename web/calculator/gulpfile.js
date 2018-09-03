let gulp = require("gulp");
let gts = require("gulp-typescript");
let mocha = require("gulp-mocha");
let del = require("del");
let sourcemaps = require("gulp-sourcemaps");
let log = require("fancylog");
let uglify = require("gulp-uglify");
let watchify = require("watchify");
let browserify = require("browserify");
let glob = require("glob");
let source = require('vinyl-source-stream');
let tsify = require("tsify");
let buffer = require("vinyl-buffer");
let tsProject = gts.createProject("tsconfig.json");

let paths = {
    "htmlSource": "src/views/*.html",
    "cssSource": "src/css/*.css",
    "specs": "test/ts/*.spec.ts",
    "deleteDestination": "dist/**/*",
    "globEntries": "./src/ts/*.ts",
}

let config = {
    paths: {
        "htmlSource": "src/views/*.html",
        "cssSource": "src/css/*.css",
        "specs": "test/ts/*.spec.ts",
        "deleteDestination": "dist/**/*",
    },
    ext: {
        glob: {
            "globEntries": "./src/ts/*.ts",
        },
        browserifyConfig: {
            basedir: ".",
            debug: true,
            entries: ["./src/ts/app.ts"] // main ts entry point
        },
        sourceMapsConfig: {
            loadMaps: true,
        }
    }
};

// let fileList = glob.sync(config.paths.ext.glob.globEntries);

// let browserifyConfig = {
//     basedir: ".",
//     debug: true,
//     entries: [fileList]
// }

// let sourceMapsConfig = {
//     loadMaps: true,
// }

gulp.task("clean", () => {
    return del([paths.deleteDestination]);
});


gulp.task("run-tests", function () {
    return gulp.src(paths.specs)
        .pipe(mocha({
            reporter: "list",
            require: ["ts-node/register"]
        }));
});

// gulp.task("compile", () => {

//     let bify = browserify(browserifyConfig);

//     return tsProject
//         .src()
//         .pipe(tsProject())
//         .js
//         .pipe(gulp.dest("dist"));
// });

gulp.task("compile", () => {

    // let bify = browserify(browserifyConfig);
    let bify = browserify(config.ext.browserifyConfig);

    return bify
        .plugin(tsify)
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(source("app.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init(config.ext.sourceMapsConfig))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("dist/js"))

});


gulp.task("copy-html", () => {
    return gulp.src(paths.htmlSource)
        .pipe(gulp.dest("dist/views"))
});

gulp.task("copy-css", () => {
    return gulp.src(paths.cssSource)
        .pipe(gulp.dest("dist/css"))
});

// gulp.task("default", gulp.series("clean", "run-tests", "compile", (done) => {
//     console.log("GULP: default task running...");
//     done();
// }));

gulp.task("default", gulp.series("clean", "compile", "copy-html", "copy-css", (done) => {
    console.log("GULP: default task running...");
    done();
}));