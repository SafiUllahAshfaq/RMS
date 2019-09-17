'use strict';

const path = require('path');
const send = require('koa-send');
const fs = require('fs');

const { RecruitmentForm } = require('../../models/recruitmentform.model');

const imagesPath = 'uploads/images/candidate/profile/';
const cvsPath = 'uploads/documents/candidate/cv/';

exports.uploadCadidateImage = async (ctx, next) => {
  const id = ctx.request.body._id;
  const file = ctx.request.files.profilePicture;
  const reader = fs.createReadStream(file.path);
  // const [name, type] = file.name.split('.');
  // const stream = fs.createWriteStream(path.join(imagesPath, id + "." + type));
  const stream = fs.createWriteStream(path.join(imagesPath, id + ".jpg"));
  reader.pipe(stream);
  reader.on('close', () => {
    console.log("Done with image saving @ ", stream.path);
  })
  ctx.body = ctx.request.files;
  next();
}


exports.deleteCandidateImage = (ctx, next) => {
  const id = ctx.params.id;
  fs.unlinkSync(imagesPath + id + '.jpg');
  ctx.body = { success: true, message: `Image Removed`, id };
  next();
}

exports.getCandidateImage = async (ctx, next) => {
  const id = ctx.params.id;
  await send(ctx, imagesPath + id + ".jpg");
  next();
};

exports.uploadCadidateCv = async (ctx, next) => {
  // const id = ctx.request.body._id;
  // const candidateName = ctx.request.body.candidateName;
  // const file = ctx.request.body.cv;
  // // const reader = fs.createReadStream(file.path);
  // const [name, type] = file.name.split('.');
  // // // const stream = fs.createWriteStream(path.join(imagesPath, id + "." + type));
  // // const stream = fs.createWriteStream(path.join(cvsPath, candidateName + "_" + id + '.' + type));
  // // reader.pipe(stream);
  // // reader.on('close', () => {
  // //   console.log("Done with cv saving @ ", stream.path);
  // // })
  // var buf = new Buffer(ctx.request.body.cv.path, 'base64');
  // fs.writeFile(path.join(cvsPath, candidateName + "_" + id + '.' + type), buf, function (err) {
  //   if (err) {
  //     console.log("err", err);
  //   } else {
  //     console.log('Success...')
  //   }
  // });

  // ctx.body = ctx.request.body;

  const id = ctx.request.body._id;
  const candidateName = ctx.request.body.candidateName;
  const file = ctx.request.files.cv;
  const reader = fs.createReadStream(file.path);
  const [name, type] = file.name.split('.');
  // const stream = fs.createWriteStream(path.join(imagesPath, id + "." + type));
  const stream = fs.createWriteStream(path.join(cvsPath, candidateName + "_" + id + '.' + type));
  reader.pipe(stream);
  reader.on('close', () => {
    console.log("Done with cv saving @ ", stream.path);
  })
  ctx.body = ctx.request.files;

  next();
}

exports.getCandidateCv = async (ctx, next) => {
  const id = ctx.params.id;
  const candidateName = ctx.params.candidateName;
  await send(ctx, cvsPath + candidateName + "_" + id + ".pdf");
  next();
};

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
  const config = { new: true, useFindAndModify: true };
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
