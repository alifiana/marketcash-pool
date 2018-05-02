var fs = require('fs');

var configFile = (function(){
    for (var i = 0; i < process.argv.length; i++){
        if (process.argv[i].indexOf('-config=') === 0)
            return process.argv[i].split('=')[1];
    }
    return 'config.json';
})();


try {
    global.config = JSON.parse(fs.readFileSync(configFile));
}
catch(e){
    console.error('Failed to read config file ' + configFile + '\n\n' + e);
    return;
}

var donationAddresses = {
    Faucet: {
        MKT: 'MrcZTam6sVmeGqsY1roSzSbyfYdkgC79oJfhdSYA3C2gZ7Q44Cvq5Hy57anRcEh4cfjgqb8gSotcdKb2vx4hfsrZAAsAX5V'
    },
    coreDevDonation: {
        MKT: 'MrWXK2c7MygdWeyYz2NRix9sjTsAY8AXhNakJpNDftGSAijJNrL9gmxMh9UyA32a7kgVVNxYzeGMmeLbqCAE2hr9E15APaA'
    },
    extraFeaturesDevDonation: {
        MKT: 'MrWXK2c7MygdWeyYz2NRix9sjTsAY8AXhNakJpNDftGSAijJNrL9gmxMh9UyA32a7kgVVNxYzeGMmeLbqCAE2hr9E15APaA'
    }
};

global.donations = {};

for(var configOption in donationAddresses) {
    var percent = config.blockUnlocker[configOption];
    var wallet = donationAddresses[configOption][config.symbol];
    if(percent && wallet) {
        global.donations[wallet] = percent;
    }
}

global.version = "v1.1.5";
