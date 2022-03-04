import webpack from "webpack-stream";

export const js = () => {
  return app
    .src(app.path.src.js, { sourcemaps: true })
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "JS",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(
      webpack({
        mode: "development",
        output: {
          filename: "index.min.js",
        },
      })
    )
    .pipe(app.dest(app.path.build.js))
    .pipe(app.plugins.browsersync.stream());
};
