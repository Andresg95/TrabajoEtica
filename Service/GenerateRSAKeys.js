"use-strict"

const forge = require('node-forge');


let privateKey, publicKey;

 
const GeneratePublicPrivate = () =>{
    const { rsa } = forge.pki;
    const {privateKey, publicKey } = rsa.generateKeyPair({bits: 512, workers: 2});
    
    const privatePEM = forge.pki.privateKeyToPem(privateKey);
    const publicPEM = forge.pki.publicKeyToPem(publicKey);
    //obtener clave directamente.

    return ({
        privateKey: privatePEM,
        publicKey: publicPEM
    })
}


const encrypt = (toEncrypt, publicKey)=>{

    const key = forge.pki.publicKeyFromPem(publicKey);
    return forge.util.encode64(key.encrypt(toEncrypt))
}

const decrypt = (toDecrypt, privateKey)=>{
    const key = forge.pki.publicKeyFromPem(privateKey);
    return key.decrypt(forge.util.decode64(toDecrypt));
}


console.log(GeneratePublicPrivate());


module.exports={
    GeneratePublicPrivate
}