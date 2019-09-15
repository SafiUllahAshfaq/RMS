'use strict';

const { RecruitmentForm } = require('../../models/recruitmentform.model');
const fs = require('fs');
// const storage = require('../../config/gridfs');
const envirtonment = require('../../environment');
const multer = require('multer');
const mongo = require('../../config/database');
const { createBucket } = require('mongoose-gridfs');

const gridfs = {
  storage: undefined,
  upload: undefined
};

exports.uploadCadidateImage = async (ctx, next) => {
  const fileName = ctx.request.files.profilePic.name;
  await mongo
    .then(db => {
      const bucketName = 'profilePictures';
      gridfs.storage = createBucket({ bucketName, connection: db.connection });
      gridfs.upload = multer({ storage: gridfs.storage });
      // const readStream = gridfs.storage.createReadStream({
      //   filename: '/uploads/'
      // });
      const writeStream = gridfs.storage.createWriteStream({
        _id: db.Types.ObjectId('5d7dacec1b3f1519f0afc84c'),
        filename: fileName
      });
      gridfs.storage.writeFile({ filename: fileName });
      gridfs.upload.single(fileName);
    })
    .catch(err => console.log(err));
  ctx.body = ctx.request.files;
  next();
};

// exports.getCandidateImage = async (ctx, next) => {
//   const fileName = ctx.request.files.profilePic.name;
// };

exports.getAllEvaluations = async (ctx, next) => {
  await RecruitmentForm.find()
    .then(result => {
      ctx.body = result;
    })
    .catch(err => {
      ctx.body = err;
    });
  next();
};

exports.postEvaluation = async (ctx, next) => {
  const document = ctx.request.body;
  await RecruitmentForm.create(document)
    .then(result => {
      ctx.body = result;
    })
    .catch(err => {
      ctx.body = err;
    });
  next();
};

exports.getEvaluation = async (ctx, next) => {
  const id = ctx.params.id;
  console.log(id);
  await RecruitmentForm.findById(id)
    .then(result => {
      ctx.body = result;
    })
    .catch(err => {
      console.log('err', err);
      if (err.name === 'CastError') {
        ctx.status = 400;
        ctx.body = {
          error: {
            type: 'Database error',
            message: `Invalid user id: ${id}`
          }
        };
      }
    });
  next();
};

exports.updateEvaluation = async (ctx, next) => {
  const document = ctx.request.body;
  const id = document._id;
  delete document._id;
  const config = { new: true };
  await RecruitmentForm.findByIdAndUpdate(id, document, config)
    .then(result => {
      ctx.body = result;
    })
    .catch(err => {
      ctx.body = err;
    });
  next();
};

exports.deleteEvaluation = async (ctx, next) => {
  const id = ctx.params.id;
  await RecruitmentForm.findByIdAndDelete(id)
    .then(result => {
      ctx.body = result;
    })
    .catch(err => {
      ctx.body = err;
    });
  next();
};
