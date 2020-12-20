const express = require('express');
const bodyparser = require('body-parser');
const mysql = require('mysql');

var app = express();
app.use(bodyparser.json());

app.listen(3000, () => {
    console.log('Express server is runnig at port no : 3000')
});

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employeesdb',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err) {
        console.log('DB Connection Succeded.');
    } else {
        console.log('DB Connection Failed \n Error : ' + JSON.stringify(err));
    }
});

app.get('/employees', (req, res) => {
    mysqlConnection.query('SELECT * FROM Employees', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

app.get('/employees/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM Employees WHERE Emp_no = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

app.delete('/employees/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM Employees WHERE Emp_no = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send('Deleted Successfully.');
        } else {
            console.log(err);
        }
    })
});

app.post('/employees', (req, res) => {
    let emp = req.body;
    var sql = "INSERT INTO `Employees`(`emp_no`, `birth_date`, `first_name`, `last_name`, `gender`, `hire_date`) VALUES (?, ?, ?, ?, ?, ?)";
    mysqlConnection.query(sql, [emp.emp_no, emp.birth_date, emp.first_name, emp.last_name, emp.gender, emp.hire_date], (err, rows, fields) => {
        if (!err) {
            res.send('Inserted Successfully.');
        } else {
            console.log(err);
        }
    })
});

app.put('/employees', (req, res) => {
    let emp = req.body;
    var sql = "UPDATE `Employees` SET `birth_date` = ?, `first_name` = ?, `last_name` = ?, `gender` = ?, `hire_date` = ? WHERE `emp_no` = ?";
    mysqlConnection.query(sql, [emp.birth_date, emp.first_name, emp.last_name, emp.gender, emp.hire_date, emp.emp_no], (err, rows, fields) => {
        if (!err) {
            res.send('Updated Successfully.');
        } else {
            console.log(err);
        }
    })
});
