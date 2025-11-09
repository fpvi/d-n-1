-- Tạo database
CREATE DATABASE IF NOT EXISTS web_banhang CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE web_banhang;

-- Bảng Người dùng
CREATE TABLE nguoidung (
    id_nguoidung INT AUTO_INCREMENT PRIMARY KEY,
    ten_khach_hang VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    mat_khau VARCHAR(255),
    dia_chi VARCHAR(255),
    sdt VARCHAR(20),
    thoi_gian_tao DATETIME DEFAULT CURRENT_TIMESTAMP,
    trang_thai TINYINT DEFAULT 1,
    quyen ENUM('admin', 'khach') DEFAULT 'khach'
);

-- Bảng Danh mục
CREATE TABLE danhmuc (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ten_danh_muc VARCHAR(100),
    hinh_anh VARCHAR(255),
    mo_ta TEXT
);

-- Bảng Sản phẩm
CREATE TABLE sanpham (
    id_sanpham INT AUTO_INCREMENT PRIMARY KEY,
    id_danhmuc INT,
    ten_sanpham VARCHAR(150),
    hinh_anh VARCHAR(255),
    mo_ta TEXT,
    FOREIGN KEY (id_danhmuc) REFERENCES danhmuc(id) ON DELETE SET NULL ON UPDATE CASCADE
);

-- Bảng Biến thể (có thêm cột hinh_anh)
CREATE TABLE bienthe (
    id_bienthe INT AUTO_INCREMENT PRIMARY KEY,
    id_sanpham INT,
    mau_sac VARCHAR(50),
    day_deo VARCHAR(50),
    hinh_anh VARCHAR(255),
    FOREIGN KEY (id_sanpham) REFERENCES sanpham(id_sanpham) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Bảng Đơn hàng
CREATE TABLE donhang (
    id_donhang INT AUTO_INCREMENT PRIMARY KEY,
    id_khach_hang INT,
    tong_tien DECIMAL(12,2),
    thoi_gian_dat_hang DATETIME DEFAULT CURRENT_TIMESTAMP,
    trang_thai ENUM('cho_duyet', 'da_duyet', 'dang_giao', 'da_giao', 'huy') DEFAULT 'cho_duyet',
    FOREIGN KEY (id_khach_hang) REFERENCES nguoidung(id_nguoidung) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Bảng Đơn hàng chi tiết
CREATE TABLE donhangchitiet (
    id_donhangchitiet INT AUTO_INCREMENT PRIMARY KEY,
    id_donhang INT,
    id_bienthe INT,
    so_luong INT DEFAULT 1,
    gia_truoc_khi_dat DECIMAL(12,2),
    FOREIGN KEY (id_donhang) REFERENCES donhang(id_donhang) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_bienthe) REFERENCES bienthe(id_bienthe) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Bảng Bình luận (Comment)
CREATE TABLE comment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_nguoidung INT,
    noi_dung TEXT,
    ngay_dang DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_nguoidung) REFERENCES nguoidung(id_nguoidung) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Bảng Blog
CREATE TABLE blog (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_nguoidung INT,
    noi_dung TEXT,
    ngay_dang DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_nguoidung) REFERENCES nguoidung(id_nguoidung) ON DELETE SET NULL ON UPDATE CASCADE
);

-- Bảng Tin tức
CREATE TABLE tintuc (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_nguoidung INT,
    noi_dung TEXT,
    ngay_dang DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_nguoidung) REFERENCES nguoidung(id_nguoidung) ON DELETE SET NULL ON UPDATE CASCADE
);
