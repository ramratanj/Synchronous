const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
/////////////////////////////////////////
//GET ID
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});
//////////////////////////////////
//GET ID BY URL
app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params);
  const id = parseInt(req.params.id);

  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    // results: tours.length,
    data: {
      tour,
    },
  });
});
//////////////////////////
//POST ID
app.post('/api/v1/tours', (req, res) => {
  console.log('Received request body :', req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
        res.status(500).json({
          status: 'error',
          message: 'Failed to write to file.',
        });
      } else {
        res.status(201).json({
          status: 'success',
          data: {
            tour: newTour,
          },
        });
      }
    }
  );
});
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}.....`);
});
