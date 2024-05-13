const http = require('http');
const url = require('url');
const fs = require('fs');
const kartuKeluargaController = require('./controllers/kartuKeluargaController');
const pendudukController = require('./controllers/pendudukController');

const server = http.createServer((req, res) => {
    const reqUrl = url.parse(req.url, true);
    const path = reqUrl.pathname;
    const method = req.method;

    if (path.startsWith('/ctz') || path.startsWith('/kk')) {
        let filePath = __dirname + '/views' + path;
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                return res.end('404 Not Found');
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            return res.end();
        });
    }

    else if (path === '/kk' && method === 'GET') {
        kartuKeluargaController.index(req, res);
    } else if (path === '/kk/create' && method === 'POST') {
        kartuKeluargaController.create(req, res);
    } else if (path === '/kk/edit' && method === 'POST') {
        kartuKeluargaController.edit(req, res);
    }

    else if (path === '/ctz' && method === 'GET') {
        pendudukController.index(req, res);
    } else if (path === '/ctz/create' && method === 'POST') {
        pendudukController.create(req, res);
    }

    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('404 Not Found');
    }
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});