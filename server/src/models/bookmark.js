const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema definition
const BookmarkSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: false,
        default: new Date()
    },
    categories: [{
        name: {
            type: String,
            required: false
        }
    }],
    tags: [{
        name: {
            type: String,
            required: false
        }
    }]
});

// Set the schema as a model 'Bookmark'
const Bookmark = mongoose.model('Bookmark', BookmarkSchema);

module.exports = Bookmark;


