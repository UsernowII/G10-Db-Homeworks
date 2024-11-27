import { Sequelize } from 'sequelize';
import sequelize from '../config/database.js';  
import ArtistModel from './Artist.js';
import SongModel from './Song.js';


const Artist = ArtistModel(sequelize, Sequelize.DataTypes);
const Song = SongModel(sequelize, Sequelize.DataTypes);

Artist.associate({ Song });
Song.associate({ Artist });

export { sequelize, Artist, Song };



/*
import { Sequelize } from 'sequelize';
import Artist from './Artist.js';
import Song from './Song.js';

Artist.associate({ Song });
Song.associate({ Artist });

export { Artist, Song };
*/