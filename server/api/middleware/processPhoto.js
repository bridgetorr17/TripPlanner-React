import formidable from 'formidable';
import { put } from '@vercel/blob';
import { PassThrough } from 'stream';
import fs from 'fs'
import sharp from 'sharp'

//helper function for processing picture through form
function parseForm(req){
    return new Promise((resolve, reject) => {
        const form = formidable({multiples: false});
        form.parse(req, (err, fields, files) => {
            if(err) return reject(err);
            resolve ({fields, files})
        })
    });
}

async function proccessPhoto(req){
    try{    
        const {fields, files} = await parseForm(req);
        const readableStream = fs.createReadStream(files.newPhoto[0].filepath)

        const resize = sharp()
            .rotate()
            .resize(800)
            .jpeg({quality: 70})

        const optimizeStream = readableStream
            .pipe(resize);

        const pass = new PassThrough()
        optimizeStream.pipe(pass);

        const blob = await put(files.newPhoto[0].originalFilename, pass, {
            access: 'public',
            token: process.env.BLOB_READ_WRITE_TOKEN,
            addRandomSuffix: true
        });

        return blob.url;
    }
    catch(err){
        console.error(err)
        return false;
    }
}

export { proccessPhoto }