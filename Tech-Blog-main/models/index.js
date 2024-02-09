const sequelize = require('../config/connection');
const Sequelize = require('sequelize');

const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');


User.init(
    {
    },
    { sequelize, modelName: 'User' }
);

Post.init(
    {
    },
    { sequelize, modelName: 'Post' }
);

Comment.init(
    {

    },
    { sequelize, modelName: 'Comment' }
);

User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

Post.hasMany(Comment, { foreignKey: 'postId' });
Comment.belongsTo(Post, { foreignKey: 'postId' });

User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId' });

module.exports = { sequelize, User, Post, Comment };
