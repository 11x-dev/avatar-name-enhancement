import fs from "fs";
import stylus from "stylus";
import postcss from "postcss";
import atImport from "postcss-import";
import inline_svg from "postcss-inline-svg";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";

console.log("");
console.log("Re-compiling css because vite can't generate production sourcemaps still");

const style = stylus(fs.readFileSync("src/kidsgo.styl", "utf8"))
    .set("filename", "src/kidsgo.styl")
    .set("sourcemap", {
        comment: true,
        inline: true,
    });

style.render((err, css) => {
    if (err) {
        console.error(err);
        return;
    }

    postcss([atImport(), inline_svg(), autoprefixer(), cssnano()])
        .process(css, {
            from: "dist/kidsgo.css",
            to: "dist/kidsgo.min.css",
            map: {
                inline: false,
                prev: style.sourcemap,
            },
        })
        .then((result) => {
            fs.writeFileSync("dist/kidsgo.min.css", result.css);
            if (result.map) {
                fs.writeFileSync("dist/kidsgo.min.css.map", result.map.toString());
            }
        });
});

console.log("Done");
