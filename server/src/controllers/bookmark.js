let Bookmark = require('../models/bookmark');

// Create a bookmark
exports.create = (req, res) => {
    let categories, tags;

    if (req.body.categories !== undefined) {
        categories = req.body.categories.map( category => {
            return {
                'name': category
            };
        });
    }

    if (req.body.tags !== undefined) {
        tags = req.body.tags.map( tag => {
            return {
                'name': tag
            };
        });
    }

    let bookmark = new Bookmark(
        {
            url: req.body.url,
            title: req.body.title,
            description: req.body.description,
            categories: categories,
            tags: tags
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
    // Init the res object to be send as return
    let resObj = {};

    // Pagination params
    const page = parseInt(req.body.page);
    const limit = parseInt(req.body.limit);
    const skip = page <= 0 ? limit : (page - 1) * limit;

    // Count
    Bookmark.countDocuments({}, (error, count) => {
        if (error) {
            resObj.count = 0;
        } else {
            resObj.count = count;
        }
    });

    // Query
    Bookmark.find({}, null, {limit: limit, skip: skip}, (error, bookmarks) => {
        if (error) {
            console.error(error);
            resObj.success = false;
        } else {
            resObj.success = true;
            resObj.bookmarks = bookmarks;
            resObj.currentPage = page;
        }

        res.send(resObj);
    });
};

// Fetch a single bookmark
exports.fetchSingle = (req, res) => {
    Bookmark.findById(req.params.id, (error, bookmark) => {
        if (error) console.error(error);

        res.send({
            success: true,
            bookmark: bookmark
        });
    });
};

// Update a bookmark
exports.update = (req, res) => {
    Bookmark.findById(req.params.id, (error, bookmark) => {
        if (error) console.error(error);

        let categories, tags;

        if (req.body.categories !== undefined) {
            categories = req.body.categories.map( category => {
                return {
                    'name': category
                };
            });
        }

        if (req.body.tags !== undefined) {
            tags = req.body.tags.map( tag => {
                return {
                    'name': tag
                };
            });
        }

        bookmark.url = req.body.url;
        bookmark.title = req.body.title;
        bookmark.description = req.body.description;
        bookmark.categories = categories;
        bookmark.tags = tags;

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
    }, (error) => {
        if (error) console.error(error);

        res.send({
            success: true,
            message: `Bookmark deleted successfully !`
        });
    });
};