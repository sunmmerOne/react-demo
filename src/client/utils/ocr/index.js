/**
 * Created by SamMFFL on 2017/11/6.
 */
// const bizId = 'site_chongqing';
// const ip = '10.9.30.7';
// const url = '/image/upload';
// const secretKey = config.env == 'test' ? 'D2F9EF80435B4F33A4A06A1E9A7BE675' : '50ECD43890FB4DC7B223C57FB59DB796';
// const timestamp = new Date().Format('yyyyMMddhhmmss');


export {
    getOCRSign,
    compress,
    getBlob,
    getOCRTicket,
    getOCRImgMsg,
} from './OCRTools.js'

/*
getOCRSign({
    bizId: 'site_chongqing',
    ip: '10.9.30.7',
    url: '/image/upload',
    secretKey: 'D2F9EF80435B4F33A4A06A1E9A7BE675',
});

compress(img);

getOCRTicket({
    api: 'https://test-toa-pps-stg.pingan.com.cn:4443/api/v2/ticket'
    bizId: 'site_chongqing',
    ip: '10.9.30.7',
    url: '/image/upload',
    secretKey: 'D2F9EF80435B4F33A4A06A1E9A7BE675',
    formData
});

*/

// export default {
//     compress,
//     getOCRSign,
//     getBlob,
//     getOCRTicket,
//     getOCRImgMsg,
// }

