module.exports = {
    lintOnSave: false, //Turn off syntax checking
    devServer: {
        port: 80,
        /* proxy: {
          '/api': {
            target: 'http://112.74.54.192:8080',
            ws: true, // The default is true, support websocket
            changeOrigin: true, // default is true,true is to deceive the server as the network segment ip 
            pathRewrite: {
              "^/api": ""
            } // rewrite the path
          },

        } */
    }
}