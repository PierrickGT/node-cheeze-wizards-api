# Cheeze Wizards API Node Wrapper

[![Build Status](https://travis-ci.org/PierrickGT/node-cheeze-wizards-api.svg?branch=master)](https://travis-ci.org/PierrickGT/node-cheeze-wizards-api) [![npm version](https://badge.fury.io/js/node-cheeze-wizards-api.svg)](https://badge.fury.io/js/node-cheeze-wizards-api) [![Coverage Status](https://coveralls.io/repos/github/PierrickGT/node-cheeze-wizards-api/badge.svg?branch=master)](https://coveralls.io/github/PierrickGT/node-cheeze-wizards-api?branch=master) [![Latest Documentation](https://doxdox.org/images/badge-flat.svg)](https://doxdox.org/PierrickGT/node-cheeze-wizards-api) [![dependencies Status](https://david-dm.org/PierrickGT/node-cheeze-wizards-api/status.svg)](https://david-dm.org/PierrickGT/node-cheeze-wizards-api) [![devDependencies Status](https://david-dm.org/PierrickGT/node-cheeze-wizards-api/dev-status.svg)](https://david-dm.org/PierrickGT/node-cheeze-wizards-api?type=dev)

Node Wrapper for the Alchemy Cheeze Wizards API: https://docs.alchemyapi.io/docs/cheeze-wizards-api
You'll need a valid API key and a verified email address. To get your key, just sign up on the Cheeze Wizards developer page: https://www.cheezewizards.com/cheezyverse

## Installation
```
npm install --save node-cheeze-wizards-api
```

## Usage
```
// Import the desired module
const { CheezeWizardsAPI } = require('node-cheeze-wizards-api');

// Create an instance
const cheezeWizardsAPI = new CheezeWizardsAPI('your@email.com', 'your-api-token');

// Get stuff done
cheezeWizardsAPI
    .wizard(1)
    .then(response => {
        console.log(response.data);
        console.log(response.status);
    })
    .catch(error => {
        console.log(error);
    });
```

## Methods

### Duel
```
duel();
duel(duelId);
```

### Duels
```
duels();
duels(params);
```

### Wizard
```
wizard();
wizard(wizardId);
```

### Wizards
```
wizards();
wizards(params);
```

