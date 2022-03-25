const Student = require('../models/Student');
const catchAsync = require('../utils/catchAsync');
const Interview = require('../models/Interview');
const os = require('os');
const path = require('path');

exports.getAllInterviews = catchAsync(async (req, res, next) => {
  // finding all interviews
  const interviews = await Interview.deleteMany();

  res.status(200).json({
    status: 'success',
    data: interviews,
  });
});

exports.createInterview = catchAsync(async (req, res, next) => {
  const { companyName, date, registeredStudent } = req.body;

  // creating date object from input date
  const interviewDate = new Date(date).toDateString();

  //    creating new interview from data
  const interview = await Interview.create({
    companyName,
    interviewDate,
    registeredStudent,
  });

  //  also pushing interview id in student account
  const student = await Student.findById(registeredStudent);
  student.interviews.push(interview._id);
  await student.save();

  res.status(200).json({
    status: 'success',
    data: interview,
  });
});

exports.updateInterview = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  // updating the interview status
  const interview = await Interview.findByIdAndUpdate(
    id,
    { status },
    {
      new: true,
      runValidators: true,
    }
  );

  if (interview.status === 'Pass') {
    // updating student status
    const student = await Student.findByIdAndUpdate(
      interview.registeredStudent._id,
      { placement_status: 'Placed' }
    );
  }

  res.status(200).json({
    status: 'success',
    data: interview,
  });
});

exports.download = async (req, res, next) => {
  try {
    const data = await Student.find();
    const createCsvWriter = require('csv-writer').createObjectCsvWriter;

    const dir = __dirname;
    console.log(`${dir}/studentsData.csv` + '👍');
    const csvWriter = createCsvWriter({
      path: `${dir}/studentsData.csv`,

      header: [
        '_id',
        'name',
        'college',
        'status',
        'dsaScore',
        'webScore',
        'reactScore',
        'interviews',
      ].map((item) => ({
        id: item,
        title: item,
      })),
    });

    await csvWriter.writeRecords(data);
    req.alert = 'CSV DOWNLOADED';
    res.status(200).redirect('/?alert=success');
  } catch (error) {
    res.status(200).json({
      status: 'error',
      message: error,
    });
  }
};
