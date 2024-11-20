const sequelize = require('./config/database');
const Artist = require('./models/Artist');
const Song = require('./models/Song');
require('dotenv').config();

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log('Base de datos sincronizada.');

        const artists = await Artist.bulkCreate(
            [
                { 
                    name: 'The Beatles', 
                    bio: 'The Beatles were an English rock band formed in Liverpool.', 
                    photoUrl: 'https://picsum.photos/id/1015/400/400' 
                },
                { 
                    name: 'Adele', 
                    bio: 'Adele is an English singer-songwriter known for her soulful voice.', 
                    photoUrl: 'https://picsum.photos/id/1016/400/400' 
                },
            ]);

        await Song.bulkCreate(
            [
                { 
                    title: 'Hey Jude', 
                    artistId: artists[0].id, 
                    releaseYear: 1968, 
                    duration: 431, 
                    coverUrl: 'https://picsum.photos/id/1018/400/400' 
                },
                { 
                    title: 'Let It Be', 
                    artistId: artists[0].id, 
                    releaseYear: 1970, 
                    duration: 243, 
                    coverUrl: 'https://picsum.photos/id/1020/400/400' 
                },
                { 
                    title: 'Rolling in the Deep', 
                    artistId: artists[1].id, 
                    releaseYear: 2010, 
                    duration: 228, 
                    coverUrl: 'https://picsum.photos/id/1021/400/400' 
                },
                { 
                    title: 'Someone Like You', 
                    artistId: artists[1].id, 
                    releaseYear: 2011, 
                    duration: 284, 
                    coverUrl: 'https://picsum.photos/id/1022/400/400' 
                },
                { 
                    title: 'Hello', 
                    artistId: artists[1].id, 
                    releaseYear: 2015, 
                    duration: 295, 
                    coverUrl: 'https://picsum.photos/id/1023/400/400' 
                },
            ]);

        console.log('Datos de ejemplo insertados correctamente.');
        
    } catch (error) {
        console.error('Error al llenar la base de datos:', error);
    }finally{
        await sequelize.close();
    }
  

  console.log('Database seeded!');
};

seedDatabase();
