import { Buffer } from "buffer";

export const fileToBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

export const blobToBase64 = blob => {
    if (blob) return new Buffer(blob, 'base64').toString('binary')
    else return false
}