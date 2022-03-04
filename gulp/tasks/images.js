import webp from "gulp-webp";
import imagemin from "gulp-imagemin";

export const images = () => {
  return app.src(app.path.src.images)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "IMAGES",
          message: "Error=  <%= error.message %>",
        })
      )
    )
    .pipe(app.plugins.newer(app.path.build.images))
    .pipe(webp())
    .pipe(app.dest(app.path.build.images))
    .pipe(app.src(app.path.src.images))
    .pipe(app.plugins.newer(app.path.build.images))
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        interlaced: true,
        optimizationLevel: 3, // 0 to 7
      })
    )
    .pipe(app.dest(app.path.build.images))
    .pipe(app.src(app.path.src.svg))
    .pipe(app.dest(app.path.build.images))
    .pipe(app.plugins.browsersync.stream());
};
