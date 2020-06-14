module.exports.getAll = (handler) => {
    return this.asyncRequest((req, res) => {
        const { query, pageParams } = req;

        return handler(query, pageParams);
    });
};

module.exports.getById = (handler, withRelated) => {
    return this.asyncRequest((req, res) => {
        const { query } = req;
        
        query.id = req.params.id;

        return handler(query, withRelated);
    })
};

module.exports.asyncRequest = (handler) => {
    return async (req, res, next) => {
        try {
            const result = await handler(req, res);

            if (!res.headersSent) {
                return res.status(200).send(result);
            }

            return next();
        } catch (err) {
            return next(err);
        }
    }
};