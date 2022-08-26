const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');
/// Users

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});


/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
 

const getUserWithEmail = function(email) {
  
  return pool
    .query(`SELECT * FROM users
    WHERE email = $1`, [`${email}`])
    .then((result) => {
      if (result) {
        console.log(result.rows[0]);
        return result.rows[0];
      } else {
        return null;
      }
      
    })
    .catch((err) => {
      console.log(err.message);
    });
  
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool
    .query(`SELECT * FROM users
    WHERE id = $1`, [id])
    .then((result) => {
      if (result) {
        return result.rows[0];
      } else {
        return null;
      }
      
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
 
const addUser =  function(user) {
  
  let pass = user.password;
  
  return pool
    .query(`INSERT INTO users (
      name, email, password) 
      VALUES (
      $1, $2, 
      $3)
      RETURNING *`, [`${user.name}`, `${user.email}`, `${pass}`])
    .then((result) => {
      
      if (result) {
        return result.rows[0];
      } else {
        return null;
      }
      
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */

const getAllReservations = function(guest_id, limit = 10) {
  return pool
    .query(`SELECT reservations.id, properties.title, properties.thumbnail_photo_url, properties.number_of_bedrooms,
    properties.number_of_bathrooms, properties.parking_spaces, reservations.end_date,
    properties.cost_per_night, reservations.start_date, avg(rating) as average_rating
    FROM reservations
    JOIN properties ON reservations.property_id = properties.id
    JOIN property_reviews ON properties.id = property_reviews.property_id
    WHERE reservations.guest_id = $1
    GROUP BY properties.id, reservations.id
    ORDER BY reservations.start_date
    LIMIT $2`, [guest_id, limit])
    .then((result) => {
      if (result) {
        return result.rows;
      } else {
        return null;
      }
      
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getAllReservations = getAllReservations;



/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {

  // Parameter array will passed into pool.query('qeuery string', params)
  const queryParams = [];

  // Default: Searched regardless of no search parameters.
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  // City serach
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }

  // Min Price
  if (options.minimum_price_per_night) {
    queryParams.push(options.minimum_price_per_night * 100);
    if (queryParams.length === 1) {
      queryString += `WHERE cost_per_night > $${queryParams.length} `;
    } else {
      queryString += `AND cost_per_night > $${queryParams.length} `;
    }
  }

  // Max Price
  if (options.maximum_price_per_night) {
    queryParams.push(options.maximum_price_per_night * 100);
    if (queryParams.length === 1) {
      queryString += `WHERE cost_per_night < $${queryParams.length} `;
    } else {
      queryString += `AND cost_per_night < $${queryParams.length}`;
    }
  }

  
  queryString += `
  GROUP BY properties.id `;

  // Minimum rating
  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    queryString += `HAVING avg(property_reviews.rating) >= $${queryParams.length} `;
  }
  
  // Limit of properties shown
  queryParams.push(limit);
  queryString += `ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // 5
  console.log(queryString, queryParams);

  // 6
  return pool.query(queryString, queryParams).then((res) => res.rows);
};
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  let queryString = `INSERT INTO properties (owner_id, title, description, 
    thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province,
    post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`;
    
  let parameters = [property.owner_id,`${property.title}`, `${property.description}`,
  `${property.thumbnail_photo_url}`, `${property.cover_photo_url}`, property.cost_per_night, `${property.street}`,
  `${property.city}`, `${property.province}`, `${property.post_code}`, `${property.country}`,
    property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms];
  console.log(property.owner_id);
  return pool
    .query(queryString, parameters)
    .then((result) => {
      if (result) {
        return result.rows[0];
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.addProperty = addProperty;

// SELECT title, owner_id, street FROM properties WHERE title = 'bobby town';


