// require postgresql library
const { Pool } = require('pg');

// Create a new connection pool to your PostgreSQL database
const pool = new Pool({
    user: 'postgres',
    host: 'database-1.cpb6hjfazsgd.ap-southeast-1.rds.amazonaws.com',
    database: 'multiplicationDB',
    password: 'multiplier1',
    port: 5432,
});

exports.handler = async (event) => {
    // Parse the input body
    const { num1, num2 } = JSON.parse(event.body);

    // Perform the multiplication
    const result = num1 * num2;

    // Save the result in the PostgreSQL database
    await pool.query('INSERT INTO results(value) VALUES($1)', [result]);

    // Return the result
    return {
        statusCode: 200,
        body: JSON.stringify({ result }),
    };
};
