const { Client } = require('pg');

const handler = async (event) => {
    // check if numbers are provided and are actually numbers
    if(event.requestContext.authorizer){
      console.log(event.requestContext.authorizer.claims)
    }
    if (!('num1' in event) || !('num2' in event) || isNaN(event.num1) || isNaN(event.num2)) {
        return {
            statusCode: 400,
            body: JSON.stringify('Invalid input! Please provide num1 and num2 in the event.'),
        };
    }

    let num1 = event.num1;
    let num2 = event.num2;

    // perform multiplication
    let result = num1 * num2;

    // create new postgres client
    const client = new Client({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'multiplicationdb',
        ssl: {
            rejectUnauthorized: false
        }
    });

    try {
        // connect to db
        await client.connect();

        // insert result into results table
        await client.query('INSERT INTO results (result) VALUES ($1)', [result]);

        // disconnect after finishing work
        await client.end();

        const response = {
            statusCode: 200,
            body: JSON.stringify({ 'result': result }),
        };

        return response;
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: JSON.stringify('An error occurred while performing the operation.'),
        };
    }
};

module.exports = { handler };
