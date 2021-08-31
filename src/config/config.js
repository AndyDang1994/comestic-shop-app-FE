// const proxy = require("http-proxy-middleware");

// module.exports = function(app) {
//   app.use(
//     proxy("/api/authentication", {
//       target: "http://localhost:19191",
//       secure: false,
//       changeOrigin: true
//     })
//   );
// };

const cloudinaryConfig = {
  cloud_name: 'dflum5bkr',
  upload_preset: 'r0nopqbv' //Create an unsigned upload preset and update this
}

export const config = {
  cloudinaryConfig
}