const https = require('https');
var exec = require('child_process').exec;

const options = {
    host: 'api.github.com',
    path: '/users/zeta44/repos',
    method: 'GET',
    headers: {
        'user-agent': 'node.js',
        'Content-Type': 'application/JSON'
    }
};

function list(cb) {
    var req = https.get(options, (res) => {
        let body = '';

        res.on('data', (d) => {
            body += d;
        });
        res.on('end', () => {
            let repos = JSON.parse(body);
            repos.forEach(element => {
                exec(`git clone ${element.clone_url}`, { cwd: '../'}, (err, stdout, stderr) => {
                    console.log(stdout)
                    console.log(stderr)
                })
                console.log(element)
            });
            cb();
        })

    }).on('error', (e) => {
        console.error(e)
        cb()
    });
}

exports.default = list