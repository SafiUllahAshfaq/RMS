'use strict';

const { RecruitmentForm } = require('../../models/recruitmentform.model');
const fs = require('fs');
// const storage = require('../../config/gridfs');
const environment = require('../../environment');
const multer = require('multer');
// const multer = require('@koa/multer');
const mongo = require('../../config/database');
const { createBucket } = require('mongoose-gridfs');

const Grid = require('gridfs-stream');
const GridFsStorage = require('multer-gridfs-storage');

let storage = undefined;
let upload = undefined;
{
  // mongo
  //   .then(db => {
  //     let gfs;
  //     db.connection.once("open", () => {
  //       gfs = Grid(db.connection.db, db.connection.mongo);
  //       gfs.collection('profilePictures');
  //     });
  //   }).catch(err => console.log(err));
  // const storage = new GridFsStorage({
  //   url: envirtonment.mongodburl,
  //   file: (req, file) => {
  //     return new Promise((resolve, reject) => {
  //       crypto.randomBytes(16, (err, buf) => {
  //         if (err) {
  //           return reject(err);
  //         }
  //         const filename = buf.toString('hex') + path.extname(file.originalname);
  //         const fileInfo = {
  //           filename: filename,
  //           bucketName: 'profilePictures'
  //         };
  //         resolve(fileInfo);
  //       });
  //     });
  //   }
  // });
  // const upload = multer(storage);
}

exports.uploadCadidateImage = async (ctx, next) => {
  const file = ctx.request.files.profilePicture;
  const fileName = ctx.request.files.profilePicture.name;
  // {
  await mongo
    .then(async db => {
      const bucketName = 'profilePictures';
      storage = createBucket({ bucketName, connection: db.connection });
      upload = multer({ storage });
      // const readStream = gridfs.storage.createReadStream({
      //   filename: '/uploads/'
      // });
      const writeStream = storage.createWriteStream({
        _id: db.Types.ObjectId('5d7dacec1b3f1519f0afc84c'),
        filename: fileName,
        writeConcern: { w: 1 }
      });
      // writeStream.write(file)
      // storage.writeFile({ filename: fileName });
      await upload.single('profilePicture');
    }).catch(err => console.log(err));
  // }
  ctx.body = ctx.request.files;
  next();
};

// exports.getCandidateImage = async (ctx, next) => {
//   const fileName = ctx.request.files.profilePicture.name;
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
