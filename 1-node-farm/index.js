const fs = require('fs');
const http = require('http');
const { todo } = require('node:test');
const url = require('url');

///////////////////////////////////////////
//files
//blocking, synchoronous way
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);

// const textOut = `this is what we know abote the avocade:${textIn}.\n Created on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("file written!");

// const ramratanin = `this is ramratan or now days working as a mern stack:${textIn}.\n Created Time ${Date.now()}`;
// fs.writeFileSync("./txt/ram.txt", ramratanin);
// console.log("file written!");
//non-bloking, asynchronous way
// fs.readFile("./txt/append.txt", "utf-8", (err, data1) => {
//   console.log(data1);
//   fs.readFile("./txt/input.txt", "utf-8", (arr, data2) => {
//     console.log(data2);
//     fs.readFile(`./txt/${data2}.txt`, "utf-8", (err, data3) => {
//       console.log(data3);
//       fs.writeFile(
//         "./txt/finalf.txt",
//         `${data1}\n${data2}\n${data3}`,
//         "utf-8",
//         (err) => {
//           console.log("your are here");
//         }
//       );
//       const dataToWrite = "this is some data to write to the file";
//       fs.writeFile("./txt/output.txt", dataToWrite, "utf-8", (err) => {
//         if (err) {
//           console.log("Error writing file:", err);
//           return;
//         }
//         console.log("File written successfully");
//       });
//     });
//   });
// });
//////////////////////////////////////////////////
//server
// const server = http.createServer((req, res) => {
//   console.log(req);
//   res.end("hello from the server");
// });

// server.listen(8000, "127.0.0.1", () => {
//   console.log("Listening to request on port 8000");
// });
// const txts = fs.readFileSync("./txt/final.txt", "utf-8");
// console.log(txts);
// const written = "hey ra,m night party";
// const happy = fs.writeFileSync("./txt/night.txt", written);
// console.log(happy);
// //non-blocking
// fs.readFile("./txt/night.txt", "utf-8", (arr, datas) => {
//   console.log(datas);
// });
// const dinner = "cn we go dinner party at night";
// fs.writeFile(".txt/writes.txt", dinner, "utf-8", (err) => {
//   if (err) {
//     console.log("we are successfully submit project");
//   } else {
//     console.log(" error will come");
//   }
// });
// const server = http.createServer((req, res) => {
//   console.log(req);
//   console.end("server is on going");
// });
//const server = http.createServer((req, res) => {
//   console.log(req);
//   res.end("hello from the server");
// });
// server.listen(8000, "127.0.0.1", () => {
//   console.log("the port is running part");
// });
// server.listen(8000, "127.0.0.1", () => {
//   console.log("Listening to request on port 8000");
// });
//routing
// const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
// const dataObj = JSON.parse(data);

// const server = http.createServer((req, res) => {
//   console.log(req.url);
//   const pathName = req.url;
//   if (pathName === "/" || pathName === "/overview") {
//     res.end("This is the overview");
//   } else if (pathName === "/product") {
//     res.end("This is the product");
//   } else if (pathName === "/api") {
//     res.writeHead(200, { "Content-type": "application/json" });
//     res.end(data);
//   } else {
//     res.writeHead(404, {
//       "Content-type": "text/html",
//       "my-own-header": "hello-world",
//     });
//     res.end("<h1>user request not found</h1>");
//   }
// });

// server.listen(8000, "127.0.0.1", () => {
//   console.log("Listening is going port numbers 8000");
// });
//practics
const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);
  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
  return output;
};
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
//const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);
const server = http.createServer((req, res) => {
  console.log(req.url);
  const pathName = req.url;

  //OVERVIEW PAGE
  if (pathName === '/' || pathName === '/overview') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    res.end(output);
    //PRODUCT PAGE
  } else if (pathName === '/product') {
    res.end('this is product page');
    //API
  } else if (pathName === '/api') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(data);
    //NOT FOUND
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello world',
    });
    res.end('<h1>User request not found</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening on port 8000');
});
