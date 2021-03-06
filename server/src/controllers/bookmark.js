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
exports.fetchAll = async (req, res) => {
    // Init the res object to be send as return
    let resObj = {};

    // Pagination params
    const page = parseInt(req.body.page);
    const limit = parseInt(req.body.limit);
    const skip = page <= 0 ? limit : (page - 1) * limit;

    // Filters params
    const filters = {};

    if (req.body.categories.length > 0) {
        filters.categories = {$elemMatch: {name: {$in: req.body.categories}}}
    };

    if (req.body.tags.length > 0) {
        filters.tags = {$elemMatch: {name: {$in: req.body.tags}}}
    };

    // Search params
    if (req.body.hasOwnProperty('search') && req.body.search !== '') {
        const titleSearch = {title: { $regex: req.body.search, $options: "i" }};
        const descriptionSearch = {description: { $regex: req.body.search, $options: "i" }};
        filters.$or = [titleSearch, descriptionSearch];
    }

    let count = await countTotalBookmarks(filters);

    // Query
    Bookmark.find(filters, null, {limit: limit, skip: skip}, (error, bookmarks) => {
        if (error) {
            console.error(error);
            resObj.success = false;
        } else {
            resObj.success = true;
            resObj.count = count;
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

// Get bookmarks total count
exports.fetchFilters = (req, res) => {
    Bookmark.find({}, null, (error, bookmarks) => {
        if (error) {
            res.send({
                success: false
            });
        } else {
            let categories = [];
            let tags = [];

            bookmarks.forEach((bookmark) => {
                if (bookmark.categories !== undefined) {
                    bookmark.categories.forEach((category) => {
                        categories.push(category.name);
                    });
                }
                // Remove duplicates
                categories = [...new Set(categories)];
            });

            bookmarks.forEach((bookmark) => {
                if (bookmark.tags !== undefined) {
                    bookmark.tags.forEach((tag) => {
                        tags.push(tag.name);
                    });
                }
                // Remove duplicates
                tags = [...new Set(tags)];
            });

            res.send({
                success: true,
                categories,
                tags
            });
        }
    });
};

// Get bookmarks total count
async function countTotalBookmarks(filters) {
    let count = await Bookmark.countDocuments(filters, (error, count) => {
        if (error) {
            console.log(error);
        } else {
            return count;
        }
    });
    return count;
}