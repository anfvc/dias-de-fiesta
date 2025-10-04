import { v2 as cloudinary } from "cloudinary";


cloudinary.config({
  cloud_name: 'my_cloud_name',
  api_key: process.env.CLOUDINARY_CLOUD_NAME,
  api_secret: 'my_secret'
});
