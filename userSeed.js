// require("dotenv").config();
// const fs = require("fs");
// const path = require("path");
// const bcrypt = require("bcrypt");

// const { sequelize } = require("./config/sql");
// const User = require("./models/userSchema");

// const seedUsers = async () => {
//   try {
//     console.log("⏳ Starting seeding...");

//     // 1. Connect DB
//     await sequelize.authenticate();
//     console.log("✅ DB connected");

//     // 2. Sync table
//     await sequelize.sync({ alter: true }); // safer during dev
//     console.log("✅ Tables synced");

//     // 3. Read JSON file
//     const filePath = path.join(__dirname, "users_seed.json"); // ✅ fix name
//     const users = JSON.parse(fs.readFileSync(filePath, "utf-8"));

//     console.log(`📦 Found ${users.length} users`);

//     // 4. Hash passwords
//     const hashedUsers = await Promise.all(
//       users.map(async (user) => {
//         return {
//           ...user,
//           password_hash: await bcrypt.hash(user.password_hash, 10),
//         };
//       })
//     );

//     // 5. Insert into DB
//     await User.bulkCreate(hashedUsers, {
//       validate: true, // ensures schema validation
//     });

//     console.log("🎉 Users seeded successfully!");
//     process.exit(0);
//   } catch (error) {
//     console.error("❌ Seeding failed:", error);
//     process.exit(1);
//   }
// };

// seedUsers();


require("dotenv").config();
const fs = require("fs");
const path = require("path");

const { sequelize } = require("./config/sql");
const User = require("./models/userSchema");

const seedUsers = async () => {
  try {
    console.log("⏳ Starting seeding...");

    // 1. Connect DB
    await sequelize.authenticate();
    console.log("✅ DB connected");

    // 2. Sync table
    await sequelize.sync({ alter: true });
    console.log("✅ Tables synced");

    // 3. Read JSON file
    const filePath = path.join(__dirname, "users_seed.json");
    const users = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    console.log(`📦 Found ${users.length} users`);

    // 4. Insert into DB (NO hashing)
    await User.bulkCreate(users, {
      validate: true,
      ignoreDuplicates: true, // ✅ skip if already exists
    });

    console.log("🎉 Users seeded successfully (duplicates skipped)");
    process.exit(0);

  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedUsers();