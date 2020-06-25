const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

// Connect to lightbnb DB
const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});



/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool.query(`
    SELECT * FROM users
    where email = $1;
    `, [email])
  .then(res => res.rowCount > 0 ? res.rows[0] : null);
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool.query(`
    SELECT * FROM users
    where id = $1;
    `, [id])
  .then(res => res.rowCount > 0 ? res.rows[0] : null);
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  return pool.query(`
  INSERT INTO users (name, email, password) 
  VALUES ($1, $2, $3)
  RETURNING *;
  `, [user.name, user.email, user.password])
  .then(res => res.rowCount > 0 ? res.rows[0] : null);
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return pool.query(`
  SELECT reservations.*, properties.*, avg(property_reviews.rating) as average_rating
  FROM reservations
    JOIN properties ON reservations.property_id = properties.id
    JOIN property_reviews ON properties.id = property_reviews.property_id
  WHERE reservations.guest_id = $1
    AND reservations.end_date < now()
  ::date
  GROUP BY properties.id, reservations.id
  ORDER BY reservations.start_date
  LIMIT $2;
    `, [guest_id, limit])
  .then(res => res.rowCount > 0 ? res.rows : null);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  const queryParams = [];
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id`;
  
  // Add city filter
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `
    WHERE properties.city LIKE $${queryParams.length}`;
  };

  // Add min price filter
  if (options.minimum_price_per_night) {
    queryParams.length > 0 ? queryString += `
    AND ` : queryString += `
    WHERE `;
    queryParams.push(options.minimum_price_per_night);
    queryString += `properties.cost_per_night >= $${queryParams.length}`;
  };

  // Add max price filter
  if (options.maximum_price_per_night) {
    queryParams.length > 0 ? queryString += `
    AND ` : queryString += `
    WHERE `;
    queryParams.push(options.maximum_price_per_night);
    queryString += `properties.cost_per_night <= $${queryParams.length}`;
  };

  // Add group by
  queryString += `
  GROUP BY properties.id`;

  // Add minimum rating filter
  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    queryString += `
    HAVING avg(property_reviews.rating) >= $${queryParams.length}`;
  };

  // Add limit and order by
  queryParams.push(limit);
  queryString += `
  ORDER BY properties.cost_per_night
  LIMIT $${queryParams.length};
  `;

  return pool.query(queryString, queryParams)
  .then(res => res.rows);
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;