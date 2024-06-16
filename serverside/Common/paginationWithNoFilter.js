const paginateWithNoFilter = async (Model, page, pageSize) => {
    
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const result = {}
    if(endIndex > await Model.countDocuments().exec()){
        result.next = {
            page: page + 1,
            pageSize: pageSize,
        }
    }
    if(startIndex > 0){
        result.previous = {
            page: page - 1,
            pageSize: pageSize,
        }
    }

    result.results = await Model.find()
       .sort({createdAt: 'desc'})
       .skip((page-1) * pageSize)
       .limit(pageSize)
       .exec();
    
    return result;
}
module.exports = paginateWithNoFilter;