const fs = require('fs').promises;
const superagent = require('superagent');

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   const breed = data.toString().trim();

//   console.log(`Breed: ${breed}`);

//   superagent
//     .get(`https://dog.ceo/api/breed/${breed}/images/random`)
//     .then((res) => {
//       console.log(res.body.message);

//       fs.writeFile('dog-img.txt', res.body.message, (err) => {
//         if (err) return console.log('Error saving image URL:', err.message);
//         console.log('Random dog image saved to file!');
//       });
//     })
//     .catch((err) => {
//       console.log('Error fetching image:', err.message);
//     });
// });
// const readFilePro = (file) => {
//   return new Promise((resolve, reject) => {
//     fs.readFile(file, (err, data) => {
//       if (err) reject('I could not find that file');
//       resolve(data);
//     });
//   });
// };
// const getDogPic = async () => {
//   try {
//     const data = await readFilePro(`${__dirname}/dog.txt`);
//     const breed = data.toString().trim();
//     console.log(`Breed : ${breed}`);
//     const res = await superagent.get(
//       `https://dog.ceo/api/breed/${breed}/images/random`
//     );
//     console.log(res.body.message);
//     await fs.promises.writeFile('dog-img.txt', res.body.message);
//     console.log('Random dog image saved to file!');
//   } catch (err) {
//     console.log(err);
//   }
// };
// getDogPic();

// readFilePro(`${__dirname}/dog.txt`)
//   .then((data) => {
//     const breed = data.toString().trim();
//     console.log(`Breed: ${breed}`);
//     return superagent.get(`https://dog.ceo/api/breed/${breed}/images/random`);
//   })
//   .then((res) => {
//     console.log(res.body.message);
//     fs.writeFile('dog-img.txt', res.body.message, (err) => {
//       if (err) throw err; // Handle error if any
//       console.log('Random dog image saved to files');
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });
//try-catch

// const getDogPic = async () => {
//   try {
//     // Read the content of the dog.txt file
//     const data = await fs.readFile(`${__dirname}/dog.txt`, 'utf-8');
//     // Extract the breed from the file content
//     const breed = data.trim();
//     console.log(`Breed: ${breed}`);

//     // Fetch a random image of the specified breed from the Dog CEO API
//     const res = await superagent.get(
//       `https://dog.ceo/api/breed/${breed}/images/random`
//     );
//     console.log(res.body.message);

//     // Write the image URL to the dog-img.txt file
//     await fs.writeFile(`${__dirname}/dog-img.txt`, res.body.message);

//     console.log('Random dog image saved to file!');
//   } catch (err) {
//     console.log(err);
//   }
// };
// // console.log('I: will get dog pics');
// // // Call the function to fetch the dog picture
// // getDogPic();
// // console.log('2: done getting dog pics !');
// (async () => {
//   try {
//     console.log('1: will get dog pics !');
//     const x = await getDogPic();
//     console.log('3: Done getting dog pics !');
//   } catch (err) {
//     console.log(err);
//   }
// })();
const getDogPic = async () => {
  try {
    // Read the content of the dog.txt file
    const data = await fs.readFile(`${__dirname}/dog.txt`, 'utf-8');
    // Extract the breed from the file content
    const breed = data.trim();
    console.log(`Breed: ${breed}`);

    // Make multiple asynchronous requests simultaneously using Promise.all()
    const responses = await Promise.all([
      superagent.get(`https://dog.ceo/api/breed/${breed}/images/random`),
      superagent.get(`https://dog.ceo/api/breed/${breed}/images/random`),
      superagent.get(`https://dog.ceo/api/breed/${breed}/images/random`),
    ]);

    // Extract the message from each response and log it
    responses.forEach((res) => {
      console.log(res.body.message);
    });

    // Write the image URL to the dog-img.txt file
    await fs.writeFile(`${__dirname}/dog-img.txt`, responses[0].body.message);

    console.log('Random dog images saved to file!');
  } catch (err) {
    console.log(err);
  }
};

// Call the function to fetch multiple dog pictures
getDogPic();
