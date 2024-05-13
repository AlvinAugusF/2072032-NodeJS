let pendudukData = [];

exports.index = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(pendudukData));
};

exports.create = (req, res) => {
    let body = '';

    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', () => {
        const data = JSON.parse(body);

        if (!validateInput(data)) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Invalid input data');
            return;
        }

        const newPenduduk = {
        };

        pendudukData.push(newPenduduk);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newPenduduk));
    });
};

exports.edit = (req, res) => {
};
