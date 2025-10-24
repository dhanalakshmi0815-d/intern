const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const Category = require('./models/Category');
const Product = require('./models/Product');
const User = require('./models/User');

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/grocerydb';
    await mongoose.connect(mongoUri);

    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});

    // Create categories
    const fruits = await Category.create({ name: 'Fruits', description: 'Fresh fruits', icon: '🍎' });
    const vegetables = await Category.create({ name: 'Vegetables', description: 'Fresh vegetables', icon: '🥕' });
    const dairy = await Category.create({ name: 'Dairy', description: 'Dairy products', icon: '🥛' });
    const beverages = await Category.create({ name: 'Beverages', description: 'Drinks and beverages', icon: '🥤' });
    const meatPoultry = await Category.create({ name: 'Meat & Poultry', description: 'Fresh meat and poultry', icon: '🍗' });
    const bakery = await Category.create({ name: 'Bakery', description: 'Baked goods and breads', icon: '🍞' });
    const snacks = await Category.create({ name: 'Snacks', description: 'Chips, candies, and snacks', icon: '🍿' });
    const frozenFoods = await Category.create({ name: 'Frozen Foods', description: 'Frozen meals and vegetables', icon: '🧊' });
    const cannedGoods = await Category.create({ name: 'Canned Goods', description: 'Canned foods and soups', icon: '🥫' });
    const personalCare = await Category.create({ name: 'Personal Care', description: 'Hygiene and personal care products', icon: '🧴' });
    const household = await Category.create({ name: 'Household', description: 'Cleaning and household supplies', icon: '🧽' });
    const condiments = await Category.create({ name: 'Condiments', description: 'Sauces, spices, and condiments', icon: '🧂' });

    // Create products
    await Product.create([
      // Fruits (6 products)
      { name: 'Apple', price: 2.5, category: fruits._id, description: 'Red apple', image: '' },
      { name: 'Banana', price: 1.2, category: fruits._id, description: 'Yellow banana', image: '' },
      { name: 'Orange', price: 2.0, category: fruits._id, description: 'Juicy orange', image: '' },
      { name: 'Grapes', price: 3.5, category: fruits._id, description: 'Seedless grapes', image: '' },
      { name: 'Strawberries', price: 4.0, category: fruits._id, description: 'Fresh strawberries', image: '' },
      { name: 'Pineapple', price: 5.0, category: fruits._id, description: 'Sweet pineapple', image: '' },

      // Vegetables (6 products)
      { name: 'Carrot', price: 1.0, category: vegetables._id, description: 'Orange carrot', image: '' },
      { name: 'Broccoli', price: 2.0, category: vegetables._id, description: 'Green broccoli', image: '' },
      { name: 'Spinach', price: 1.5, category: vegetables._id, description: 'Fresh spinach leaves', image: '' },
      { name: 'Tomato', price: 1.8, category: vegetables._id, description: 'Red tomato', image: '' },
      { name: 'Potato', price: 0.8, category: vegetables._id, description: 'Russet potato', image: '' },
      { name: 'Onion', price: 1.2, category: vegetables._id, description: 'Yellow onion', image: '' },

      // Dairy (5 products)
      { name: 'Milk', price: 3.5, category: dairy._id, description: 'Fresh milk', image: '' },
      { name: 'Cheese', price: 5.0, category: dairy._id, description: 'Cheddar cheese', image: '' },
      { name: 'Yogurt', price: 2.5, category: dairy._id, description: 'Plain yogurt', image: '' },
      { name: 'Butter', price: 4.0, category: dairy._id, description: 'Salted butter', image: '' },
      { name: 'Eggs', price: 3.0, category: dairy._id, description: 'Dozen eggs', image: '' },

      // Beverages (6 products)
      { name: 'Orange Juice', price: 4.0, category: beverages._id, description: 'Fresh juice', image: '' },
      { name: 'Water', price: 1.0, category: beverages._id, description: 'Bottled water', image: '' },
      { name: 'Soda', price: 1.5, category: beverages._id, description: 'Cola soda', image: '' },
      { name: 'Coffee', price: 6.0, category: beverages._id, description: 'Ground coffee', image: '' },
      { name: 'Tea', price: 3.5, category: beverages._id, description: 'Green tea bags', image: '' },
      { name: 'Energy Drink', price: 2.5, category: beverages._id, description: 'Caffeinated energy drink', image: '' },

      // Meat & Poultry (5 products)
      { name: 'Chicken Breast', price: 8.0, category: meatPoultry._id, description: 'Boneless chicken breast', image: '' },
      { name: 'Ground Beef', price: 7.5, category: meatPoultry._id, description: 'Lean ground beef', image: '' },
      { name: 'Pork Chops', price: 9.0, category: meatPoultry._id, description: 'Bone-in pork chops', image: '' },
      { name: 'Turkey', price: 6.5, category: meatPoultry._id, description: 'Ground turkey', image: '' },
      { name: 'Salmon', price: 12.0, category: meatPoultry._id, description: 'Fresh salmon fillet', image: '' },

      // Bakery (5 products)
      { name: 'Bread', price: 2.5, category: bakery._id, description: 'Whole wheat bread', image: '' },
      { name: 'Croissant', price: 3.0, category: bakery._id, description: 'Butter croissant', image: '' },
      { name: 'Muffin', price: 2.0, category: bakery._id, description: 'Blueberry muffin', image: '' },
      { name: 'Bagel', price: 1.5, category: bakery._id, description: 'Plain bagel', image: '' },
      { name: 'Cake', price: 15.0, category: bakery._id, description: 'Chocolate cake', image: '' },

      // Snacks (6 products)
      { name: 'Chips', price: 2.5, category: snacks._id, description: 'Potato chips', image: '' },
      { name: 'Chocolate Bar', price: 1.5, category: snacks._id, description: 'Milk chocolate bar', image: '' },
      { name: 'Popcorn', price: 2.0, category: snacks._id, description: 'Microwave popcorn', image: '' },
      { name: 'Cookies', price: 3.5, category: snacks._id, description: 'Chocolate chip cookies', image: '' },
      { name: 'Nuts', price: 5.0, category: snacks._id, description: 'Mixed nuts', image: '' },
      { name: 'Candy', price: 1.0, category: snacks._id, description: 'Assorted candies', image: '' },

      // Frozen Foods (5 products)
      { name: 'Frozen Pizza', price: 6.0, category: frozenFoods._id, description: 'Pepperoni pizza', image: '' },
      { name: 'Ice Cream', price: 4.5, category: frozenFoods._id, description: 'Vanilla ice cream', image: '' },
      { name: 'Frozen Vegetables', price: 2.5, category: frozenFoods._id, description: 'Mixed frozen veggies', image: '' },
      { name: 'Frozen Fries', price: 3.0, category: frozenFoods._id, description: 'Frozen french fries', image: '' },
      { name: 'Frozen Chicken Nuggets', price: 5.5, category: frozenFoods._id, description: 'Chicken nuggets', image: '' },

      // Canned Goods (5 products)
      { name: 'Canned Soup', price: 2.0, category: cannedGoods._id, description: 'Chicken noodle soup', image: '' },
      { name: 'Canned Beans', price: 1.5, category: cannedGoods._id, description: 'Black beans', image: '' },
      { name: 'Canned Tuna', price: 3.0, category: cannedGoods._id, description: 'Tuna in water', image: '' },
      { name: 'Canned Corn', price: 1.8, category: cannedGoods._id, description: 'Sweet corn', image: '' },
      { name: 'Canned Tomatoes', price: 2.5, category: cannedGoods._id, description: 'Diced tomatoes', image: '' },

      // Personal Care (5 products)
      { name: 'Shampoo', price: 5.0, category: personalCare._id, description: 'Herbal shampoo', image: '' },
      { name: 'Toothpaste', price: 3.0, category: personalCare._id, description: 'Fluoride toothpaste', image: '' },
      { name: 'Soap', price: 2.5, category: personalCare._id, description: 'Bar soap', image: '' },
      { name: 'Deodorant', price: 4.0, category: personalCare._id, description: 'Antiperspirant deodorant', image: '' },
      { name: 'Shaving Cream', price: 3.5, category: personalCare._id, description: 'Foaming shaving cream', image: '' },

      // Household (5 products)
      { name: 'Laundry Detergent', price: 8.0, category: household._id, description: 'Liquid laundry detergent', image: '' },
      { name: 'Dish Soap', price: 3.0, category: household._id, description: 'Lemon dish soap', image: '' },
      { name: 'Paper Towels', price: 4.0, category: household._id, description: 'Kitchen paper towels', image: '' },
      { name: 'Trash Bags', price: 5.0, category: household._id, description: 'Large trash bags', image: '' },
      { name: 'Cleaning Spray', price: 3.5, category: household._id, description: 'All-purpose cleaner', image: '' },

      // Condiments (5 products)
      { name: 'Ketchup', price: 2.5, category: condiments._id, description: 'Tomato ketchup', image: '' },
      { name: 'Mustard', price: 2.0, category: condiments._id, description: 'Yellow mustard', image: '' },
      { name: 'Mayonnaise', price: 3.0, category: condiments._id, description: 'Classic mayonnaise', image: '' },
      { name: 'Soy Sauce', price: 3.5, category: condiments._id, description: 'Low-sodium soy sauce', image: '' },
      { name: 'Hot Sauce', price: 2.5, category: condiments._id, description: 'Spicy hot sauce', image: '' },
    ]);

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await User.create({
      name: 'Admin',
      email: 'admin@gmail.com',
      password: hashedPassword,
      contact: '1234567890',
      role: 'admin'
    });

    console.log('Data seeded successfully');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();
