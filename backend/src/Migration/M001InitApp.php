<?php 

namespace Main\Migration;

use Main\Model\Database;

class M001InitApp {

    public function up() {
        $database = new Database;
        $database->multiquery("
            CREATE TABLE db.product_type (
                id INT auto_increment NOT NULL,
                name varchar(100) NOT NULL,
                CONSTRAINT product_type_PK PRIMARY KEY (id)
            )
            ENGINE=InnoDB
            DEFAULT CHARSET=utf8mb4
            COLLATE=utf8mb4_0900_ai_ci;

            CREATE TABLE db.product (
                id INT auto_increment NOT NULL,
                name varchar(100) NOT NULL,
                weight FLOAT NOT NULL,
                price FLOAT NOT NULL,
                image_url varchar(300) DEFAULT NULL,
                product_type_id INT NOT NULL,
                CONSTRAINT product_PK PRIMARY KEY (id),
                CONSTRAINT product_type_id_FK FOREIGN KEY (product_type_id) REFERENCES db.product_type(id)
            )
            ENGINE=InnoDB
            DEFAULT CHARSET=utf8mb4
            COLLATE=utf8mb4_0900_ai_ci;

            CREATE TABLE db.user (
                id INT auto_increment NOT NULL,
                name varchar(100) NOT NULL,
                email varchar(100) NOT NULL,
                password varchar(100) NOT NULL,
                CONSTRAINT user_PK PRIMARY KEY (id)
            )
            ENGINE=InnoDB
            DEFAULT CHARSET=utf8mb4
            COLLATE=utf8mb4_0900_ai_ci;

            CREATE TABLE db.sale (
                id INT auto_increment NOT NULL,
                distance INT DEFAULT NULL,
                status INT NOT NULL,
                user_id INT NOT NULL,
                CONSTRAINT sale_PK PRIMARY KEY (id),
                CONSTRAINT user_id_FK FOREIGN KEY (user_id) REFERENCES db.user(id)
            )
            ENGINE=InnoDB
            DEFAULT CHARSET=utf8mb4
            COLLATE=utf8mb4_0900_ai_ci;

            CREATE TABLE db.sale_product (
                id INT auto_increment NOT NULL,
                quantity INT NOT NULL,
                sale_id INT NOT NULL,
                product_id INT NOT NULL,
                CONSTRAINT sale_PK PRIMARY KEY (id),
                CONSTRAINT sale_id_FK FOREIGN KEY (sale_id) REFERENCES db.sale(id),
                CONSTRAINT product_id_FK FOREIGN KEY (product_id) REFERENCES db.product(id)
            )
            ENGINE=InnoDB
            DEFAULT CHARSET=utf8mb4
            COLLATE=utf8mb4_0900_ai_ci;
            
            INSERT INTO db.`user` (id,name,email,password) VALUES
                (1,'Usuário A','email','".'$2y$10$78vCUe4XtacvzDfPsYGLOerrnlNbO19Zezwb8NDjd5qAXPolI/GMq'."'),
                (2,'Usuário B','teste@com.br','".'$2y$10$FZipjGULuomT4hoE1MmKM.jejjU34ge4krDRWbBtyb/R.MV4V7NqS'."');
                
            INSERT INTO db.product_type (id,name) VALUES
                (1,'Branco'),
                (2,'Tinto'),
                (3,'Espumante'),
                (4,'Rosé');
                
            INSERT INTO db.product (id,name,weight,price,image_url,product_type_id) VALUES
                (1,'Jurupinga',1.5,20.5,'https://i.imgur.com/nYhU5GP.png',1),
                (2,'Campo Largo',2.0,12.9,'https://upside.vteximg.com.br/arquivos/ids/161352-1000-1000/33428.png',2),
                (3,'Sangue de boi',1.75,9.99,'https://bebidasfamosas.vtexassets.com/arquivos/ids/156718/sangue-de-boi.jpg',2),
                (4,'Campo largo',2.0,15.9,'https://supermercadopaisefilhos.loji.com.br/storage/uploads/0IkMZS0Yokh8xOAcgj8sryQIQWjYYek0IJpp7RkT.png',1),
                (5,'Blueberry',2.1,162.3,'https://www.blueberrywinery.com.au/wp-content/uploads/blueberry-sparkling-wine.png',3),
                (6,'Chandon',3.0,40.6,'https://i.imgur.com/0CJStxU.png',3),
                (7,'Cigarra',1.0,35.3,'https://lovino.vtexassets.com/arquivos/ids/156991/VINHO-CIGARRA-ROSE.png',4),
                (8,'Tapada do Filgado',1.3,62.49,'https://barrinhasvinhos.com.br/wp-content/uploads/2022/09/14619364666_Tapada-do-fidalgo-rose.png',4);
                
            INSERT INTO db.sale (id,distance,status,user_id) VALUES
                (1,200,2,1);
                
            INSERT INTO db.sale_product (id,quantity,sale_id,product_id) VALUES
                (1,4,1,1),
                (3,5,1,2);

        ");
    }

    public function down() {
        $database = new Database;
        $database->multiquery("
            DROP TABLE db.sale_product;
            DROP TABLE db.sale;
            DROP TABLE db.user;
            DROP TABLE db.product;
            DROP TABLE db.product_type;
        ");
    }

}