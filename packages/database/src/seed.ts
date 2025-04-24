import path from 'path'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function seed() {
  const db = await open({
    filename: path.join(__dirname, '..', 'data', 'dev.db'),
    driver: sqlite3.Database,
  })

  const dane = [
    `
        INSERT INTO Statistics (category, value, percentage) VALUES
        ('totalRevenue', '$45,231.89', '+20.1%'),
        ('subscriptions', '+2350', '+180.1%');
        `,
    `
        INSERT INTO Statistics (category, value, percentage, daily, weekly, monthly)
        VALUES ('sales', '+12,234', '+19%', 423, 2876, 12234);
        `,
    `
        INSERT INTO Statistics (category, value, percentage, desktop, mobile, tablet, since_last_hour)
        VALUES ('activeNow', '+573', '+201 since last hour', 342, 231, 89, '+201 since last hour');
        `,
    `
        INSERT INTO Users (id, name, email, cash, status, address, phone) VALUES
        (1, 'John Doe', 'john.doe@company.com', '+$1,999.00', 'active', '123 Main St, New York, USA', '+1-234-567-890'),
        (2, 'Jane Smith', 'jane.smith@company.com', '+$2,500.00', 'active', '456 Oak Ave, Los Angeles, USA', '+1-345-678-901'),
        (3, 'Bob Johnson', 'bob.johnson@company.com', '+$3,000.00', 'active', '789 Pine Rd, Chicago, USA', '+1-456-789-012'),
        (4, 'Sarah Williams', 'sarah.w@company.com', '+$4,250.00', 'active', '321 Elm St, Boston, USA', '+1-567-890-123'),
        (5, 'Michael Brown', 'michael.b@company.com', '+$1,750.00', 'pending', '654 Maple Dr, Seattle, USA', '+1-678-901-234'),
        (6, 'Emily Davis', 'emily.d@company.com', '+$3,500.00', 'active', '987 Cedar Ln, Miami, USA', '+1-789-012-345'),
        (7, 'Alice Green', 'alice.green@company.com', '+$2,000.00', 'active', '111 Birch St, Denver, USA', '+1-890-123-456'),
        (8, 'David Lee', 'david.lee@company.com', '+$1,500.00', 'pending', '222 Spruce Ave, Austin, USA', '+1-901-234-567'),
        (9, 'Sophia Martinez', 'sophia.m@company.com', '+$3,200.00', 'active', '333 Walnut Rd, San Francisco, USA', '+1-012-345-678'),
        (10, 'James Taylor', 'james.t@company.com', '+$2,800.00', 'active', '444 Ash Ln, Portland, USA', '+1-123-456-789'),
        (11, 'Olivia White', 'olivia.w@company.com', '+$2,300.00', 'active', '555 Pine St, Houston, USA', '+1-234-567-890'),
        (12, 'William Harris', 'william.h@company.com', '+$1,800.00', 'pending', '666 Oak Rd, Dallas, USA', '+1-345-678-901'),
        (13, 'Emma Clark', 'emma.c@company.com', '+$4,000.00', 'active', '777 Maple Ave, San Diego, USA', '+1-456-789-012'),
        (14, 'Noah Lewis', 'noah.l@company.com', '+$2,700.00', 'active', '888 Cedar St, Phoenix, USA', '+1-567-890-123'),
        (15, 'Ava Walker', 'ava.w@company.com', '+$3,100.00', 'active', '999 Birch Ln, Philadelphia, USA', '+1-678-901-234');
        `,
    `
        INSERT INTO Products (id, name, description, price, stock) VALUES
        (1, 'Premium Headphones', 'Wireless noise-cancelling headphones with premium sound quality', '$249.99', 45),
        (2, 'Smart Watch', 'Fitness tracker with heart rate monitoring and sleep analysis', '$199.99', 32),
        (3, 'Ergonomic Keyboard', 'Mechanical keyboard with customizable RGB lighting', '$129.99', 78),
        (4, 'Ultra HD Monitor', '32-inch 4K monitor with HDR support and USB-C connectivity', '$399.99', 15),
        (5, 'Wireless Mouse', 'Precision wireless mouse with programmable buttons', '$59.99', 120),
        (6, 'Portable SSD', '1TB external SSD with USB 3.2 and shock-resistant design', '$179.99', 53),
        (7, 'Bluetooth Speaker', 'Portable Bluetooth speaker with 360-degree sound', '$89.99', 67),
        (8, 'Gaming Laptop', 'High-performance laptop with NVIDIA RTX graphics', '$1,499.99', 10),
        (9, 'Smartphone', 'Latest model with 5G support and triple camera system', '$999.99', 25),
        (10, 'Tablet', '10.2-inch tablet with retina display and A13 Bionic chip', '$329.99', 40),
        (11, 'Action Camera', 'Waterproof 4K action camera with stabilization', '$299.99', 18),
        (12, 'Drone', 'Quadcopter drone with 4K camera and GPS', '$499.99', 12),
        (13, 'Wireless Earbuds', 'True wireless earbuds with active noise cancellation', '$149.99', 85),
        (14, 'Smart Home Hub', 'Central hub for controlling smart home devices', '$79.99', 30),
        (15, 'VR Headset', 'Virtual reality headset with 6DoF tracking', '$399.99', 22),
        (16, 'Fitness Tracker', 'Water-resistant fitness tracker with GPS and heart rate monitor', '$129.99', 50),
        (17, 'Electric Scooter', 'Foldable electric scooter with 20-mile range', '$499.99', 8),
        (18, 'Robot Vacuum', 'Smart robot vacuum with mapping and app control', '$349.99', 15),
        (19, 'Smart Thermostat', 'Wi-Fi enabled thermostat with energy-saving features', '$199.99', 25),
        (20, 'Wireless Charger', 'Fast wireless charging pad for smartphones', '$29.99', 100);
        `,
    `
        INSERT INTO Teams (group_label, team_label, team_value) VALUES
        ('Personal Account', 'John Doe', 'personal'),
        ('Teams', 'Tech Innovators', 'tech-innovators'),
        ('Teams', 'Creative Solutions', 'creative-solutions');
        `,
  ]

  try {
    await db.run('BEGIN TRANSACTION')

    for (const wartosc of dane) {
      await db.run(wartosc)
    }
    await db.run('COMMIT')
    console.log('Seeding zakończony')
  } catch (err) {
    await db.run('ROLLBACK')
    console.error('Coś poszło nie tak', err)
  } finally {
    await db.close()
  }
}

seed().catch((err) => {
  console.error('Coś poszło nie tak', err)
})
