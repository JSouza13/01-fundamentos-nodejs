import http from 'node:http';

const users = [];

const server = http.createServer((req, res) => {
  const { url, method } = req;

  if(method === 'GET' && url === '/users') {
    return res
    .setHeader('Content-Type', 'application/json')
    .end(JSON.stringify(users));
  }

  if(method === 'POST' && url === '/users') {
    users.push({
      id: 1,
      name: 'João',
      email: 'joao.souza@hotmail.com'
    });
    
    return res.writeHead(201).end();
  }

  console.log(`Request URL: ${url} - Method: ${method}`);
  return res.writeHead(404).end('Not Found');
});

server.listen(3333);