const { User } = require('../models');
const bcrypt = require('bcrypt');

// Utility function for hashing passwords
async function hashPassword(password) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}

// Utility function for verifying passwords
async function verifyPassword(inputPassword, userPassword) {
    return bcrypt.compare(inputPassword, userPassword);
}

const auth = {
    // Display login page
    getLoginPage(req, res) {
        res.render('login');
    },

    // Handle user login
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });

            if (!user) {
                // Redirect if user not found
                return res.redirect('/login?error=User not found');
            }

            const isMatch = await verifyPassword(password, user.password);
            if (!isMatch) {
                // Redirect if password does not match
                return res.redirect('/login?error=Invalid credentials');
            }

            // Set user session on successful login
            req.session.userId = user.id;
            return res.redirect('/dashboard');
        } catch (error) {
            console.error('Login error:', error);
            return res.status(500).send('Error during login');
        }
    },

    // Display signup page
    getSignupPage(req, res) {
        res.render('signup');
    },

    // Handle user signup
    async signup(req, res) {
        try {
            const { username, email, password } = req.body;
            const hashedPassword = await hashPassword(password);

            // Create user with hashed password
            await User.create({ username, email, password: hashedPassword });
            res.redirect('/dashboard');
        } catch (error) {
            console.error('Signup error:', error);
            res.status(500).send('Error during signup');
        }
    },

    // Handle user logout
    logout(req, res) {
        req.session.destroy(err => {
            if (err) {
                console.error('Logout error:', err);
                return res.status(500).send('Error during logout');
            }
            res.redirect('/');
        });
    },
};

module.exports = auth;
