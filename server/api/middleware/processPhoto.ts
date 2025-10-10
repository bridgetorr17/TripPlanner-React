import formidable, { Fields, Files } from 'formidable';
import { put } from '@vercel/blob';
import { PassThrough } from 'stream';
import fs from 'fs'
import sharp from 'sharp'
import { Request } from 'express'

//helper function for processing picture through form
function parseForm(req: Request): Promise<{ fields: Fields; files: Files}>{
    return new Promise((resolve, reject) => {
        const form = formidable({multiples: false});
        form.parse(req, (err, fields, files) => {
            if(err) return reject(err);
            resolve ({fields, files})
        })
    });
}

async function proccessPhoto(req: Request){
    try{    
        const {fields, files} = await parseForm(req);

        if (!files.newPhoto || files.newPhoto.length === 0){ 
            throw new Error('There needs to be a photo to upload.')
        }
        
        const readableStream = fs.createReadStream(files.newPhoto[0].filepath)

        const resize = sharp()
            .rotate()
            .resize(800)
            .jpeg({quality: 70})

        const optimizeStream = readableStream
            .pipe(resize);

        const pass = new PassThrough()
        optimizeStream.pipe(pass);

        if (!files.newPhoto[0].originalFilename) {
            throw new Error ('file name needs to be a string')
        }

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