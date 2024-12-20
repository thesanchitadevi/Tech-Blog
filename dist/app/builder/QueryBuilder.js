"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    search(searchableFields) {
        var _a;
        const search = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.search;
        if (search) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((field) => ({
                    [field]: { $regex: search, $options: 'i' },
                })),
            });
        }
        return this;
    }
    filter() {
        const queryObject = Object.assign({}, this.query);
        // Filtering
        const excludeFields = [
            'search',
            'sortBy',
            'sortOrder',
            'filter',
            'limit',
            'page',
            'fields',
        ];
        excludeFields.forEach((element) => delete queryObject[element]);
        // Apply 'filter' to get blogs by authorId
        if (this.query.filter) {
            queryObject.author = this.query.filter;
        }
        this.modelQuery = this.modelQuery.find(queryObject);
        return this;
    }
    sortBy() {
        var _a, _b, _c;
        const sortBy = ((_c = (_b = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.sortBy) === null || _b === void 0 ? void 0 : _b.split(',')) === null || _c === void 0 ? void 0 : _c.join(' ')) || '-createdAt';
        this.modelQuery = this.modelQuery.sort(sortBy);
        return this;
    }
    sortOrder() {
        var _a;
        const sortOrder = ((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.sortOrder) === 'asc' ? 1 : -1;
        // Apply the sorting based on the sortOrder value
        this.modelQuery = this.modelQuery.sort({ createdAt: sortOrder });
        return this;
    }
    paginate() {
        var _a, _b;
        const limit = Number((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.limit) || 10;
        const page = Number((_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.page) || 1;
        const skip = (page - 1) * limit;
        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }
    fields() {
        var _a, _b, _c;
        const fields = ((_c = (_b = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.fields) === null || _b === void 0 ? void 0 : _b.split(',')) === null || _c === void 0 ? void 0 : _c.join(' ')) || '-__v';
        this.modelQuery = this.modelQuery.select(fields);
        return this;
    }
}
exports.default = QueryBuilder;
