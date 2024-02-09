const { Sequelize } = require('sequelize');
const User = require('../models/User');

class Seeder {
    constructor() {
        this.sequelize = new Sequelize('techblog_db', 'root', 'U3hwdyi#', {
            host: 'localhost',
            dialect: 'mysql',
        });
    }

    async seedUsers() {
        try {
            // Fetch all existing users
            const users = await User.findAll();

            // Delete each existing user
            await Promise.all(users.map(user => user.destroy()));

            // Create new users
            await User.bulkCreate([
                { username: 'user1', email: 'user1@example.com', password: 'password1' },
                { username: 'user2', email: 'user2@example.com', password: 'password2' },
                { username: 'user3', email: 'user3@example.com', password: 'password3' },
            ]);

            console.log('Seed data inserted successfully');
        } catch (error) {
            console.error('Error seeding data:', error);
        } finally {
            // Close the database connection
            await this.sequelize.close();
        }
    }

    async execute() {
        await this.seedUsers();
    }
}

// Create an instance of the Seeder class and execute seeding
const seeder = new Seeder();
seeder.execute();