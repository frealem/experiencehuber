const LogginLogs = require('../Models/LogginLogs');
const registerLogs = require('../Models/RegisterLogs');
const History = require('../Models/History');
const asyncHandler = require('express-async-handler');
const User = require('../../UserManagementModule/Models/User');
const Post = require('../../PostManagmentModule/Models/Post');
const Like = require('../Models/Like');
const PostReview = require('../../PostManagmentModule/Models/PostReview');


const getSystemSummary = asyncHandler(async (req, res)=>{
    const yearRange = req.params.id;
    const monthNames = {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December'
      };
    const year = new Date().getFullYear() - yearRange;
    let data = []
    if(yearRange == 0){
        const month = new Date().getMonth()
        for(var index = month; index>=0; index--){
            const monthName = monthNames[index];
            const countUser = await User.countDocuments({
                createdAt: {
                  $gte: new Date(year, index - 1, 1),
                  $lt: new Date(year, month, 1)
                }
              });
            const countPost = await Post.countDocuments({
                createdAt: {
                  $gte: new Date(year, index - 1, 1),
                  $lt: new Date(year, month, 1)
                }
              });
            const countLike = await Like.countDocuments({
                createdAt: {
                  $gte: new Date(year, index - 1, 1),
                  $lt: new Date(year, month, 1)
                }
              });
              const countReviews = await PostReview.countDocuments({
                createdAt: {
                  $gte: new Date(year, index - 1, 1),
                  $lt: new Date(year, month, 1)
                }
              });

              data.push({monthName, countUser , countPost, countLike, countReviews})
        }
        if(month > 0){
          let userPercent = 0;
          let likePercent = 0;
          let reviewPercent = 0;
          let postPercent = 0;
          if(data[month-1].countUser > 0){
            userPercent = (((data[month].countUser-data[month-1].countUser)/data[month-1].countUser)*100).toFixed(2);
          }
          if(data[month-1].countLike> 0){
            const likePercent = (((data[month].countLike-data[month-1].countLike)/data[month-1].countLike)*100).toFixed(2);
          }
          if(data[month-1].countPost > 0){
            postPercent = (((data[month].countPost-data[month-1].countPost)/data[month-1].countPost)*100).toFixed(2);
          }
          if(data[month-1].countReviews >0 ){
            reviewPercent = (((data[month].countReviews-data[month-1].countReviews)/data[month-1].countReviews)*100).toFixed(2);
          }
          const userCount = await User.countDocuments();
          const postCount = await Post.countDocuments();
          const likeCount = await Like.countDocuments();
          const reviewsCount = await PostReview.countDocuments();
          const user = {userCount, userPercent};
          const post = {postCount, postPercent};
          const like = {likeCount, likePercent};
          const review = {reviewsCount, reviewPercent}
          res.status(200).json({user, post, like, review, data});
          return;
        }
        
    }
    
    console.log(year)
    const userCount = await User.countDocuments();
    const postCount = await Post.countDocuments();
    const likeCount = await Like.countDocuments();
    const reviewsCount = await PostReview.countDocuments();
    res.status(200).json({userCount, postCount})
})


module.exports = {getSystemSummary}