const express = require('express');
const router = express.Router();

const db = require('../db/index');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', async (req, res) => {
  console.log(req.body);
  //need to move this
  const findUserByEmail = `
  SELECT * FROM users WHERE email = $1;
  `;
  console.log("req.body", req.body);
  const data = await db.query(findUserByEmail, [req.body.email]);

  if (data.rows.length === 0) {
    console.log('not found in db');
    res.status(400).send({ message: 'Email or password is wrong' });
    return;
  }

  const user = data.rows[0];
  console.log('user', user);
  if (user.password !== req.body.password) {
    console.log('password does not match', user.password, req.body.password);
    return res.status(403).send
    ({
      status: 'error',
      message: 'Email or password is wrong',
    });
  }
  res.json(user);
  req.session.user_id = user.id;
  console.log(req.session);
});

module.exports = router;
