import Admin from './models/admin.js';
import dotenv from 'dotenv';
import connectDB from './db.js';

dotenv.config();

const createInitialAdmin = async () => {
  try {
    await connectDB();

    const adminExists = await Admin.findOne({ email: 'admin@ten.com' });

    if (adminExists) {
      console.log('Admin user already exists');
      process.exit();
    }

    const admin = await Admin.create({
      email: 'admin@ten.com',
      password: 'admin@12345',
      isAdmin: true
    });

    console.log('Admin user created successfully:');
    console.log('Email: admin@ten.com');
    console.log('Password: admin@12345');
    
    process.exit();
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

createInitialAdmin();