const { Post } = require('../models');

// Utility function for logging and handling errors related to the dashboard
function handleDashboardError(error, res) {
    console.error('Dashboard error:', error);
    res.status(500).send('Error loading dashboard');
}

// Checks if the user is authenticated
function isAuthenticated(req) {
    return req.session && req.session.userId;
}

// Retrieves user's posts for the dashboard
async function getUserPosts(userId) {
    return Post.findAll({ where: { userId } });
}

const dashboardController = {
    async getDashboard(req, res) {
        try {
            if (!isAuthenticated(req)) {
                return res.redirect('/login');
            }

            const userId = req.session.userId;
            const posts = await getUserPosts(userId);
            return res.render('dashboard', { posts });
        } catch (error) {
            handleDashboardError(error, res);
        }
    },
};

module.exports = dashboardController;


