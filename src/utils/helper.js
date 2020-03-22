function convertQuery(query, total) {
    const pagination = convertPagination(query, total);
    const sort = convertSortQuery(query.sort);
    const search = query.q;
    return { pagination, sort, search };
}
function convertPagination(query, count) {
    if (count === 0) {
        return { page: 1, pageSize: 10, pages: 1 };
    }
    let { pageSize, page } = query;
    pageSize = parseInt(query.pageSize);
    page = parseInt(query.page);
    if (page < 1) {
        page = 1;
    }
    const pages = Math.ceil(count / pageSize);
    if (page > pages) {
        page = pages;
    }
    return { page, pageSize, pages };
}
function convertSortQuery(sortQuery) {
    const sort = {};
    if (sortQuery) {
        const keys = sortQuery.split(",");
        keys.forEach(key => {
            if (key.includes("-")) {
                sort[key.replace("-", "")] = -1;
            } else {
                sort[key] = 1;
            }
        });
    }
    return sort;
}

module.exports = {
    convertQuery
};
