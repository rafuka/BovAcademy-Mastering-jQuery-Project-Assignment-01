const path = require('path');
const SRC = path.join(__dirname, 'src/');
const NODE_MODULES = path.join(__dirname, 'node_modules/');

module.exports = {
    entry: './src',                
    output: {                      
        path: __dirname + '/dist',  
        filename: 'bundle.js'       
    },
    resolve: {
    	modules: [SRC, NODE_MODULES, path.join(SRC, 'modules')]
    }
};