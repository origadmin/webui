const fs = require('fs');

module.exports = {
    async load(path) {
        console.log('>> load:', path);
    },
    async generateEnd(params) {
        console.log('>> generate end');
        // await delay(1000);
        console.dir(params.stats, {depth: 10});
    }
}
