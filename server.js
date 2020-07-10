const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});
connection.connect();

const multer = require('multer');
const upload = multer({dest: './upload'});

app.get('/api/employees', (req, res) => {
   connection.query(
     "SELECT * FROM employee WHERE isDeleted = 0",
     (err, rows, fields) => {
       res.send(rows);
     }
   );
});

app.use('/image', express.static('./upload'));
app.post('/api/employees', upload.single('empProfile'), (req, res) => {
  let sql = 'INSERT INTO employee VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)';
  let empProfile = '/image/' + req.file.filename;
  let empName = req.body.empName;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let title = req.body.title;
  let phone = req.body.phone;
  let email = req.body.email;
  let entryDate = req.body.entryDate;
  let deptName = req.body.deptName;
  let params = [empProfile, empName, title, phone, email, birthday, gender, entryDate, deptName];
  connection.query(sql, params, 
    (err, rows, feilds) => {
      res.send(rows);
    }
  );
}); 

app.delete('/api/employees/:id', (req, res) => {
  let sql = 'UPDATE employee SET isDeleted = 1 WHERE empNo = ?';
  let params = [req.params.id];
  connection.query(sql, params, 
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.listen(port, () => console.log(`Listening on port ${port}`));