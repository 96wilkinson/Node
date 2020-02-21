const router = require('express').Router();
const { ClimbingAttempts } = require('../db');

router.get('/hello', (req, res) => res.send('Hello, World!'));

router.get('/getAll', (req, res, next) => {
  ClimbingAttempts.find((error, result) => {
    if (error) {
      next(error);
    }
    res.send(result);
  });
});

router.get('/get/:id', (req, res, next) => {
  ClimbingAttempts.findById(req.params.id, (error, result) => {
    if (error) {
      next(error);
    }
    res.send(result);
  });
});

router.delete('/DeleteClimber/:id', (req, res, next) => {
  ClimbingAttempts.findByIdAndDelete(req.params.id, (error, result) => {
    if (error) {
      next(error);
    }
    res.status(204).send(result);
  });
});

router.post('/createClimber', ({ body }, res, next) => {
  const climber = new ClimbingAttempts(body);
  climber.save((error) => {
    if (error) {
      next(error);
    }
    res.status(201).send(`${body.name} added successfully`);
  })
});

router.put('/updateClimber/:id', (req, res, next) => {
  const climber = ClimbingAttempts.findById(req.params.id);
  climber.name = req.query.name;
  climber.dob = req.query.dob;
  climber.save().then(result => {
    res.status(202).send(`${id} successfully replaced`);
  }).catch(error => {
    next(error);
  })
});

// router.patch('/updateClimber/:id', (req, res, next) => {
//   ClimbingAttempts.findById(req.params.id, (error, result) => {
//     if (error) {
//       next(error);
//     }
//     const climber = result;
//     climber.name = req.query.name;
//     climber.dob = req.query.dob;
//     climber.save((error) => {
//       if (error) {
//         next(error);
//       }
//       res.status(202).send(`Successfully replaced`);
//     });
//   });
// });

module.exports = router;