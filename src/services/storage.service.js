const ImageKit =require('@imagekit/nodejs');

const client = new ImageKit({
  privateKey: process.env['privateKey'], // This is the default and can be omitted
});
async function uploadFile(file) {
const response = await client.files.upload({
  file,
  fileName: 'musicfile.jpg',
  folder:"sportify"
})
return response
};


module.exports={uploadFile};