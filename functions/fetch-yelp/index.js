const fetch = require('node-fetch');
require('dotenv').config({ path: `.env.development.local` });

exports.handler = async (event) => {
  // add code here to fetch data from yelp API
  // be sure to include the parameters from event.queryStringParameters
  const zip = event.queryStringParameters.zip;
  const term = event.queryStringParameters.term;

  console.log('zip is: ', zip);
  console.log('term is: ', term);

  try {
    const resp = await fetch(
      `https://api.yelp.com/v3/businesses/search?categories=restaurants&location=${zip}&term=${term}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`,
        },
      }
    );
    const data = await resp.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data.businesses),
    };
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' }),
    };
  }
};

