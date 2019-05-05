let Bookmark = require('../models/bookmark');

// Create a bookmark
exports.create = (req, res) => {
    let bookmark = new Bookmark(
        {
            url: req.body.url,
            title: req.body.title,
            description: req.body.description
        }
    );

    bookmark.save(error => {
        if (error) console.error(error);

        res.send({
            success: true,
            message: `${bookmark.title} created successfully !`
        });
    });
};

// Fetch all bookmarks
exports.fetchAll = (req, res) => {
    Bookmark.find((error, bookmarks) => {
        if (error) console.error(error);

        res.send({
            success: true,
            bookmarks: bookmarks
        });
    });
};

// Fetch a single bookmark
exports.fetchSingle = (req, res) => {
    Bookmark.findById(req.params.id,  'url title description', (error, bookmark) => {
        if (error) console.error(error);

        res.send({
            success: true,
            bookmark: bookmark
        });
    });
};

// Update a bookmark
exports.update = (req, res) => {
    Bookmark.findById(req.params.id, 'url title description', (error, bookmark) => {
        if (error) console.error(error);

        bookmark.url = req.body.url;
        bookmark.title = req.body.title;
        bookmark.description = req.body.description;

        bookmark.save((error, bookmark) => {
            if (error) console.error(error);

            res.send({
                success: true,
                message: `${bookmark.title} updated successfully !`
            });
        });
    })
};

// Delete a bookmark
exports.delete = (req, res) => {
    Bookmark.deleteOne({
        _id: req.params.id
    }, (error, bookmark) => {
        if (error) console.error(error);

        res.send({
            success: true,
            message: `Bookmark deleted successfully !`
        });
    });
};