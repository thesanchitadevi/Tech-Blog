import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const search = this?.query?.search;

    if (search) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: search, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  filter() {
    const queryObject = { ...this.query };

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

    this.modelQuery = this.modelQuery.find(queryObject as FilterQuery<T>);

    return this;
  }

  sortBy() {
    const sortBy =
      (this?.query?.sortBy as string)?.split(',')?.join(' ') || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sortBy as string);

    return this;
  }

  sortOrder() {
    const sortOrder = this?.query?.sortOrder === 'asc' ? 1 : -1;

    // Apply the sorting based on the sortOrder value
    this.modelQuery = this.modelQuery.sort({ createdAt: sortOrder });

    return this;
  }

  paginate() {
    const limit = Number(this?.query?.limit) || 10;
    const page = Number(this?.query?.page) || 1;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';

    this.modelQuery = this.modelQuery.select(fields);

    return this;
  }
}

export default QueryBuilder;
