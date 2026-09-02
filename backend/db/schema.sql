-- -----------------------------------------------------------------------------
-- db/schema.sql
-- Rode este arquivo uma vez no seu banco SQL Server (Azure SQL, SQL Server
-- local, etc.) antes de usar a API. Ele cria todas as tabelas necessárias.
-- -----------------------------------------------------------------------------

CREATE TABLE admin_users (
  id INT IDENTITY(1,1) PRIMARY KEY,
  username NVARCHAR(50) NOT NULL UNIQUE,
  password_hash NVARCHAR(255) NOT NULL,
  created_at DATETIME2 DEFAULT SYSUTCDATETIME()
);

CREATE TABLE categories (
  id NVARCHAR(50) PRIMARY KEY,           -- ex: "camisetas"
  label NVARCHAR(100) NOT NULL,          -- ex: "Camisetas"
  image NVARCHAR(300) NULL,
  sort_order INT DEFAULT 0
);

CREATE TABLE accessory_subcategories (
  id NVARCHAR(50) PRIMARY KEY,           -- ex: "bones"
  label NVARCHAR(100) NOT NULL,          -- ex: "Bonés"
  sort_order INT DEFAULT 0
);

CREATE TABLE products (
  id INT IDENTITY(1,1) PRIMARY KEY,
  name NVARCHAR(200) NOT NULL,
  slug NVARCHAR(200) NOT NULL UNIQUE,
  category_id NVARCHAR(50) NOT NULL
    CONSTRAINT FK_products_category REFERENCES categories(id),
  subcategory_id NVARCHAR(50) NULL
    CONSTRAINT FK_products_subcategory REFERENCES accessory_subcategories(id),
  price DECIMAL(10,2) NOT NULL,
  description NVARCHAR(MAX) NULL,
  rating DECIMAL(2,1) DEFAULT 0,
  reviews INT DEFAULT 0,
  badge NVARCHAR(20) NULL,               -- 'bestseller' | 'new' | NULL
  featured BIT DEFAULT 0,
  fallback_gradient NVARCHAR(100) NULL,
  images NVARCHAR(MAX) NULL,             -- JSON: { "Preto": "/path.jpg", ... }
  colors NVARCHAR(MAX) NULL,             -- JSON: ["Preto", "Branco"]
  sizes NVARCHAR(MAX) NULL,              -- JSON: ["P", "M", "G"]
  created_at DATETIME2 DEFAULT SYSUTCDATETIME(),
  updated_at DATETIME2 DEFAULT SYSUTCDATETIME()
);

CREATE TABLE banners (
  id INT IDENTITY(1,1) PRIMARY KEY,
  slug NVARCHAR(200) NOT NULL UNIQUE,
  image NVARCHAR(300) NULL,
  fallback_gradient NVARCHAR(100) NULL,
  tag NVARCHAR(100) NULL,
  title NVARCHAR(200) NOT NULL,
  subtitle NVARCHAR(300) NULL,
  cta_label NVARCHAR(100) NULL,
  cta_category NVARCHAR(50) NULL,
  sort_order INT DEFAULT 0
);

CREATE TABLE brands (
  id INT IDENTITY(1,1) PRIMARY KEY,
  name NVARCHAR(100) NOT NULL,
  slug NVARCHAR(100) NOT NULL UNIQUE,
  sort_order INT DEFAULT 0
);

-- Configurações do site editáveis pelo admin (ex: quantos itens mostrar em
-- "Destaques da Semana"). Guardado como texto pra manter simples e
-- extensível — o app converte pro tipo certo na hora de usar.
CREATE TABLE site_settings (
  setting_key NVARCHAR(50) PRIMARY KEY,
  setting_value NVARCHAR(200) NOT NULL
);

INSERT INTO site_settings (setting_key, setting_value) VALUES ('featuredLimit', '4');
INSERT INTO site_settings (setting_key, setting_value) VALUES ('bestsellersLimit', '4');
