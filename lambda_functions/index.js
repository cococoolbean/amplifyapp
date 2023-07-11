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

exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    
    // Parse the input body
    const { num1, num2 } = JSON.parse(event.body);

    // Perform the multiplication
    const result = num1 * num2;

    try {
        // Save the result in the PostgreSQL database
        await pool.query('INSERT INTO results(value) VALUES($1)', [result]);
    } catch (error) {
        console.error(`Error while inserting into DB: ${error}`);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to insert into DB' }),
        };
    }

    // Return the result
    return {
        statusCode: 200,
        body: JSON.stringify({ result }),
    };
};
