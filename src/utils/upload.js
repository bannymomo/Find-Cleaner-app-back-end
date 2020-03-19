const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

const BUCKET = 'find-broomer';

aws.config.update({
    secretAccessKey: process.env.S3_KEY,
    accessKeyId: process.env.S3_ID,
    region: 'ap-southeast-2'
});

const s3 = new aws.S3();

const uploadImage =  multer({
    storage: multerS3({
        s3,
        bucket: BUCKET,
        acl: "public-read",
        key: (req, file, cb) => {
            cb(null, `${Date.now().toString()}.jpeg`)
        }
    }),
    limits: {
        fileSize: 1024 * 1024
    },
})

const deleteImage = key => {
    new Promise((res, rej) => {
        s3.deleteObject({ Bucket: BUCKET, Key: key }, (err, data) => {
            if (err) rej(err);
            res(data);
        });
    });
};

module.exports = {
    uploadImage,
    deleteImage,
};