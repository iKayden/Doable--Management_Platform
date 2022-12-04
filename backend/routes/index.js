const express = require('express');
const router = express.Router();
const db = require('../db/index');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', async (req, res) => {
  const findUserByEmail = `
  SELECT * FROM users WHERE email = $1;
  `;
  const data = await db.query(findUserByEmail, [req.body.email]);

  if (data.rows.length === 0) {
    res
      .status(400)
      .send({
        message:
          'The email address or password you entered was incorrect. Please try again.',
      });
    return;
  }

  const user = data.rows[0];
  if (user.password !== req.body.password) {
    return res.status(403).send({
      status: 'error',
      message:
        'The email address or password you entered was incorrect. Please try again.',
    });
  }
  res.json(user);
  req.session.user_id = user.id;
});

module.exports = router;
