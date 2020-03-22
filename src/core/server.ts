import http from 'http';

export const server = http.createServer((req, res) => {
  res.end("Hacker News Owl");
});
