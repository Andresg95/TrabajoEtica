'use-strict'

const forge = require("node-forge");
const {createBuffer, hexToBytes, bytesToHex} = forge.util;

const generateKey = () =>{
    let byteArray = bytesToHex(forge.random.getBytesSync(24));
    const tdes1 =  byteArray.slice(0,16)
    const tdes2 = byteArray.slice(16,32);
    const tdes3 = byteArray.slice(32,48);
    //vector inicializacion
    console.log("bytearay:", byteArray);
    
    return {
        tdes1,
        tdes2,
        tdes3
    }
}


const encrypt = (key, text)=>{
    
    key = createBuffer(hexToBytes(key));
    const cipher = forge.cipher.createCipher('3DES-ECB', key);
    cipher.start({iv: iv});
    cipher.update(createBuffer(text, 'utf-8'));
    cipher.finish();
    return cipher.output.toHex();    
};


console.log(generateKey());

const decrypt = (key, text_to_decript) => {

    key = createBuffer(hexToBytes(key));
    const decipher = forge.cipher.createDecipher('3DES-ECB', key);
    decipher.start();
    decipher.update(createBuffer(hexToBytes(text_to_decript)));
    decipher.finish();
    return decipher.output.getBytes();
};

const encryptWithRSA = (tdes, rsaPublicKey) => {




}

module.exports = {
    decrypt,
    encrypt,
    generateKey
}

