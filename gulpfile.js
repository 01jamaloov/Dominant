import gulp from "gulp";
const { src, dest, watch, parallel, series, task } = gulp;
import { path } from "./gulp/config/paths.js";
import { plugins } from "./gulp/config/plugins.js";

global.app = {
  path,
  src,
  dest,
	plugins
};

import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/index.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";

function watcher() {
  watch(path.watch.files, copy);
  watch(path.watch.html, html);
	watch(path.watch.scss, scss);
	watch(path.watch.js, js)
  watch(path.watch.images, images)
}

const fonts = series(otfToTtf, ttfToWoff, fontsStyle)

const mainTasks = series(fonts, parallel(copy, html, scss, js, images));

const dev = series(reset, mainTasks, parallel(watcher, server));

task("default", dev);
