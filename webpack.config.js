const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const map = path.basename(path.join(__dirname, "../"));
const fs = require("fs");

const excludeFiles = ['bundle.css', 'bundle.css.map', 'bundle.js', 'bundle.js.map'];
const excludeFileTypes = ['.svg', '.png', '.jpg', '.woff'];

//Clear dist folder
const distFolder = "./dist";
fs.readdir(distFolder, (err, files) => {
    if (err) throw err;

    for (const file of files) {
        if ( !excludeFiles.includes(file) && !excludeFileTypes.includes(path.extname(file)) ) {
            fs.unlinkSync(path.join(distFolder, file), (err) => {
                if (err) throw err;
            });
        }
    }
});

module.exports = {
    target: "web",
    devtool: "source-map",
    mode: "development",
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css"
        })
    ],
    entry: {
        bundle: path.resolve(__dirname, "./ts/index.ts"),
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            //TypeScript support
            {
                test: /\.ts?$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            //Sass + CSS Support
            {
                test: /\.(s(a|c)ss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "postcss-loader"
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[name].js"
    },
    devServer: {
        host: "0.0.0.0",
        hot: true,
        proxy: {
            "*": {
                target: "https://" + map + ".ratiodesign.dev",
                secure: false
            }
        },
        allowedHosts: map + ".ratiodesign.dev",
        server: {
            type: "https",
            options: {
                key: fs.readFileSync(
                    "/mnt/sites/RD Sites/RDSitesCert/cert-key.pem"
                ),
                cert: fs.readFileSync(
                    "/mnt/sites/RD Sites/RDSitesCert/cert.pem"
                )
            }
        },
        watchFiles: ['./**/*.php', './**/*.html'],
        liveReload: true,
        devMiddleware: {
            writeToDisk: true
        }
    }
};