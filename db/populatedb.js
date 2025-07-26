#! /usr/bin/env node
require("dotenv").config()
const {Client} = require("pg");

const text1 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam iaculis ornare consectetur. Nullam ultrices lorem aliquam est faucibus mattis. Etiam ultricies purus quis pharetra sagittis. Fusce varius est eget sapien malesuada cursus. Cras aliquet nisi vel hendrerit consectetur. Proin iaculis, eros tempus tincidunt convallis, metus metus varius mi, id malesuada nunc nisl a enim. In porttitor urna mattis velit gravida, ut tempor odio vulputate. Curabitur id augue ex.'
const text2 = 'Ut magna urna, fringilla vel elit et, dictum interdum dolor. Sed fringilla nec risus vel imperdiet. In tempus, tortor ut tempor maximus, nisl risus faucibus ligula, at porta arcu lectus ac dui. Vivamus sodales ex ac orci scelerisque imperdiet. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus facilisis, leo in ultrices vehicula, augue arcu placerat arcu, in ullamcorper neque velit vitae tortor. Vestibulum nibh ligula, ornare sed lectus ut, ultricies dictum purus. Donec libero ex, dictum ac tempor vitae, dictum quis mi. Sed dolor nunc, maximus id efficitur at, maximus quis mi. Donec neque dolor, malesuada at eros at, laoreet accumsan lectus.'
const text3 = 'Nullam quis diam eros. Nulla a purus lacus. In felis enim, interdum at mattis at, maximus a purus. Integer malesuada mauris sed lacus varius viverra. Maecenas aliquet risus nec mattis consequat. Pellentesque dui nulla, feugiat ac quam vitae, vulputate laoreet libero. Nullam dapibus placerat metus, nec vulputate nulla suscipit non. Praesent ut quam condimentum, ullamcorper nisl nec, ullamcorper nisl. Mauris mattis, est a efficitur ornare, sapien mauris placerat sapien, quis malesuada justo est eget ex. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam dui odio, porta vitae interdum sed, auctor quis lectus. Duis ipsum urna, semper et risus nec, convallis malesuada odio. Morbi fermentum porta mi. Vivamus facilisis nibh eros, eu facilisis risus pulvinar sit amet. Maecenas euismod lectus diam, in imperdiet odio scelerisque non. Phasellus eu diam sit amet quam lobortis interdum eu nec lacus.'


const SQL = `
    CREATE TABLE IF NOT EXISTS creators (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(50)
    );


    CREATE TABLE IF NOT EXISTS worlds (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(50),
    description TEXT,
    creator_id INTEGER,
    FOREIGN KEY (creator_id) REFERENCES creators (id)
    );

 

    CREATE TABLE IF NOT EXISTS characters (
     id  INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
     name VARCHAR(50),
     description TEXT,
     world_id INTEGER,
     FOREIGN KEY (world_id) REFERENCES worlds (id)
    );

   
    INSERT INTO creators(name)
    VALUES ('Pierce Brown'), ('George R.R Martin'), ('JK Rowling');

     INSERT INTO worlds (name, description, creator_id)
    VALUES ('Red Rising',  '${text1}', 1),
     ('A Song of Ice and Fire',  '${text2}', 2),
     ('Harry Potter',  '${text3}', 3);


    INSERT INTO characters (name, description, world_id)
    VALUES ('Darrow o Lykos', '${text1}', 1),
    ('Virginia au Agustus', '${text2}', 1),
    ('Sevro au Barco', '${text3}', 1),
    ('Sansa Stark', '${text1}', 2),
    ('Jon Snow', '${text2}', 2),
    ('Harry Potter', '${text3}', 3);

;`


async function main(){
    const string = `postgresql://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.DB_HOST}:${process.env.PORT}/${process.env.DB}`
  
    console.log(string)
     const client = new Client({
    connectionString: `postgresql://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.DB_PORT}/${process.env.DB}`
  });
  console.log(1)
await client.connect();
console.log(2)
  await client.query(SQL);
  await client.end();
  console.log('done')

}


main();

