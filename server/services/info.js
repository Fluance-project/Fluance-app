const os = require('os'); 
const errorManager = require('../lib/error');

function getHostInfo() {
    return new Promise(function(resolve, reject) {
        if(os.hostname()){
            resolve({
                'os' : os.hostname(),
                'type' : os.type(),
                'platform' : os.platform(),
                'arch' : os.arch(),
                'release' : os.release(),
                'uptime' : os.uptime(),
                'loadavg' : os.loadavg(),
                'totalmem' : os.totalmem(),
                'freemem' : os.freemem(),
                'cpus' : os.cpus(),
                'networkInterfaces' : os.networkInterfaces(),
            });
        } else {
            reject(errorManager.error('errorToGetHostData'));
        }
    });
} 

module.exports = {
    getHostInfo,
}