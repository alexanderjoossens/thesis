CREATE TABLE spotify_table4(id int AUTO_INCREMENT, code VARCHAR(225),vector1 VARCHAR(225),vector2 VARCHAR(225),PRIMARY KEY(id), sel_pl1 VARCHAR(1000), sel_pl2 VARCHAR(1000), recTracksA LONGTEXT, recTracksB LONGTEXT, tracksA LONGTEXT, tracksB LONGTEXT, artistsA LONGTEXT, artistsB LONGTEXT);

INSERT INTO spotify_table4(code) VALUES("a0");

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY '123456';

flush privileges;
