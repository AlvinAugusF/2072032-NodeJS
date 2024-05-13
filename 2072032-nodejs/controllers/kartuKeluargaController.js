let kartuKeluargaData = [];

const generateID = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
};

const validateInput = (data) => {
    return true;
};

exports.index = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(kartuKeluargaData));
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

        const newKartuKeluarga = {
            id: data.id,
            kepala_keluarga: data.kepala_keluarga
        };

        kartuKeluargaData.push(newKartuKeluarga);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newKartuKeluarga));
    });
};

exports.edit = (req, res) => {
};
