import { fork } from "node:child_process";
const urls = [
  "https://example.com",
  "https://example2.com",
  "https://example3.com",
];
const results: Array<any> = [];

function createWorker(url) {
  const worker = fork("./src/worker.js");

  worker.send(url);

  worker.on("message", (result) => {
    results.push(result);
    console.log(`Resultado da URL ${url}:`, result);

    if (urls.length) {
      createWorker(urls.pop());
    } else {
      worker.kill();
    }
  });

  worker.on("error", (err) => {
    console.error(`Erro no worker para ${url}:`, err);
  });
}

for (let i = 0; i < Math.min(3, urls.length); i++) {
  createWorker(urls.pop());
}
