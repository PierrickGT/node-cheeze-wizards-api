const doxdox = require('doxdox');
const fs = require('fs');

doxdox
    .parseInputs(['lib/cheeze-wizards.js'], {
        parser: 'dox',
        layout: 'bootstrap'
    })
    .then(content => {
        if (!fs.existsSync('doc')) {
            fs.mkdirSync('doc');
        }
        fs.writeFile('./doc/index.html', content, function(err) {
            if (err) {
                return console.log(err);
            }
            console.log(
                'Cheeze Wizards API Node Wrapper Doc has been generated!'
            );
        });
    });
