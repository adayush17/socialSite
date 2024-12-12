const pool = require('../config/db');

const allUser = async () => {
  const query = 'SELECT * FROM users';
  return await pool.query(query);
}

const createUser = async (username, email, hashedPassword) => {
  const query = 'INSERT INTO users (username, email, password, profile_picture) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [username, email, hashedPassword, ''];
  return await pool.query(query, values);
};

const findUserByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = $1';
  return await pool.query(query, [email]);
};

const findUserById = async (id) => {
  const query = 'SELECT * FROM users WHERE id = $1';
  return await pool.query(query, [id]);
};

const updateUserProfile = async (userId, username, profilePicture) => {
  let query = `UPDATE users SET username = $1`;
  const params = [username];

  if (profilePicture) {
    query += `, profile_picture = $2 WHERE id = $3 RETURNING *`;
    params.push(profilePicture, userId);
  } else {
    query += ` WHERE id = $2 RETURNING *`;
    params.push(userId);
  }

  return await pool.query(query, params);
};


const findUsersByQuery = async (query) => {
  const searchQuery = `SELECT * FROM users WHERE username ILIKE $1`;
  const values = [`%${query}%`]; // Use ILIKE for case-insensitive search
  const result = await pool.query(searchQuery, values);
  return result; 
};


module.exports = {
  allUser,
  createUser,
  findUserByEmail,
  findUserById,
  updateUserProfile,
  findUsersByQuery,
};
