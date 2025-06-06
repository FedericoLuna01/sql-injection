import { db } from "./db";

export const seedDatabase = () => {
  const seedQuery = `
    SET FOREIGN_KEY_CHECKS = 0;
    -- Tabla de usuarios
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      first_name VARCHAR(100),
      last_name VARCHAR(100),
      role ENUM('admin', 'user', 'editor') DEFAULT 'user',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

    -- Tabla de productos
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      price DECIMAL(10, 2) NOT NULL,
      stock INT NOT NULL DEFAULT 0,
      category VARCHAR(100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Tabla de pedidos
    CREATE TABLE IF NOT EXISTS orders (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      total_amount DECIMAL(10, 2) NOT NULL,
      status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
      order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    -- Tabla de artículos del pedido
    CREATE TABLE IF NOT EXISTS order_items (
      id INT AUTO_INCREMENT PRIMARY KEY,
      order_id INT NOT NULL,
      product_id INT NOT NULL,
      quantity INT NOT NULL,
      unit_price DECIMAL(10, 2) NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    );

    -- Tabla de posts del blog
    CREATE TABLE IF NOT EXISTS posts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      author_id INT NOT NULL,
      status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
      published_at TIMESTAMP NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
    );

    -- Insertar usuarios de ejemplo
    INSERT INTO users (email, password, first_name, last_name, role) VALUES
      ('admin@example.com', 'admin', 'Admin', 'Principal', 'admin'),
      ('user@example.com', 'password', 'Usuario', 'Normal', 'user'),
      ('editor@example.com', '123123', 'Editor', 'Contenido', 'editor'),
      ('juan.perez@example.com', '123123', 'Juan', 'Pérez', 'user'),
      ('maria.garcia@example.com', '123123', 'María', 'García', 'user'),
      ('carlos.lopez@example.com', '123123', 'Carlos', 'López', 'user'),
      ('ana.martinez@example.com', '123123', 'Ana', 'Martínez', 'editor'),
      ('luis.rodriguez@example.com', '123123', 'Luis', 'Rodríguez', 'user')
    ON DUPLICATE KEY UPDATE email=email;

    -- Insertar productos de ejemplo
    INSERT INTO products (name, description, price, stock, category) VALUES
      ('Laptop Pro', 'Laptop de última generación con 16GB RAM y 512GB SSD', 1299.99, 50, 'Electrónicos'),
      ('Smartphone X', 'Teléfono inteligente con cámara de 48MP', 799.99, 100, 'Electrónicos'),
      ('Auriculares Bluetooth', 'Auriculares inalámbricos con cancelación de ruido', 199.99, 75, 'Accesorios'),
      ('Teclado Mecánico', 'Teclado para gamers con retroiluminación RGB', 89.99, 120, 'Accesorios'),
      ('Monitor 27"', 'Monitor QHD de 27 pulgadas', 349.99, 30, 'Electrónicos'),
      ('Ratón Inalámbrico', 'Ratón ergonómico con 6 botones programables', 49.99, 200, 'Accesorios'),
      ('Tablet 10"', 'Tablet con pantalla Full HD y 64GB de almacenamiento', 249.99, 40, 'Electrónicos')
    ON DUPLICATE KEY UPDATE name=name;

    -- Insertar pedidos de ejemplo
    INSERT INTO orders (user_id, total_amount, status) VALUES
      (2, 2099.98, 'delivered'),
      (3, 349.99, 'shipped'),
      (4, 1299.99, 'processing'),
      (5, 199.99, 'pending'),
      (6, 339.98, 'delivered')
    ON DUPLICATE KEY UPDATE user_id=user_id;

    -- Insertar artículos de pedido de ejemplo
    INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES
      (1, 1, 1, 1299.99),
      (1, 2, 1, 799.99),
      (2, 5, 1, 349.99),
      (3, 1, 1, 1299.99),
      (4, 3, 1, 199.99),
      (5, 6, 2, 49.99),
      (5, 4, 1, 89.99),
      (5, 7, 1, 249.99)
    ON DUPLICATE KEY UPDATE order_id=order_id;

    -- Insertar posts de ejemplo
    INSERT INTO posts (title, content, author_id, status, published_at) VALUES
      ('Introducción a la Tecnología', 'Contenido del primer post sobre tecnología...', 3, 'published', NOW()),
      ('Guía de Productos 2023', 'Una revisión completa de nuestros productos...', 7, 'published', NOW()),
      ('Novedades en Electrónica', 'Descubre las últimas tendencias en electrónica...', 7, 'published', NOW()),
      ('Tutorial: Configuración Inicial', 'Cómo configurar tu nuevo dispositivo...', 3, 'draft', NULL),
      ('Reseña: Smartphone X', 'Nuestra opinión sobre el nuevo Smartphone X...', 7, 'published', DATE_SUB(NOW(), INTERVAL 2 DAY))
    ON DUPLICATE KEY UPDATE title=title;
  `;

  db.query(seedQuery, (err) => {
    if (err) {
      console.error('Error ejecutando el seed de la base de datos:', err);
    } else {
      console.log('Seed de la base de datos ejecutado correctamente');
    }
  });
};