import { drizzle } from "drizzle-orm/node-postgres";
import * as fs from "fs";

const db = drizzle(process.env.DATABASE_URL!);

async function seedDatabase() {
  try {
    // Load the SQL file
    const sql = fs.readFileSync("seed.sql", "utf8");

    // Execute the SQL statements
    await db.execute(sql);

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seedDatabase();
