const asyncHanler = require('expres-async-handler');
const Report = require('../Models/Report');
const paginate = require('../../../Common/pagination');

//@desc get all reports
//@route 
//@access public
const getReports = asyncHanler(async (req, res) => {
    const page = req.query.page;
    const pageSize = req.query.pageSize;
    const filter = {ownerId: req.user.id};

    const reports = await paginate( Report , page, pageSize, filter); 
    res.status(200).json(reports);
});

//@desc get a report by id
//@route 
//@access public
const getReport = asyncHanler(async (req, res) => {
    const report = await Report.findById(req.params.id);
    if(!report){
        res.status(404);
        throw new Error("Report not found!");
    }
    res.status(200).json(report);
});

//@desc create new report
//@route 
//@access public
const createReport = asyncHanler(async (req, res) => {
    const {reporterId, postId, reportCase, reportDetail, status} = req.body;
    if(!reporterId || !postId || !reportCase){
        res.status(400);
        throw new Error("Mandatory fields are not filled!");
    }
    const report = await Report.Create({
        reporterId, 
        postId, 
        reportCase, 
        reportDetail, 
        status
    });
    res.status(200).json(report);
});

//@desc update a report
//@route 
//@access public
const updateReport = asyncHanler(async (req, res) => {
    const report = await Report.findById(req.params.id);
    if(!report){
        res.status(404);
        throw new Error("Report not ound");
    }

    const updateReport = await Report.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );

    res.status(200).json(updateReport);
});

//@desc delete a report
//@route 
//@access public
const deleteReport = asyncHanler(async (req, res) => {
    const report = await Report.findById(req.params.id);
    if(!report){
        res.status(404);
        throw new Error("Report not found");
    }

    await Report.findByIdAndRemove(req.params.id);
    res.status(200).json(Report);
});



module.exports = {getReports, getReport, createReport, updateReport, deleteReport};