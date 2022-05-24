import { Photo } from "../types/Photo";
import { storage } from "../libs/firebase";

import { v4 as randomName } from "uuid";

import { ref, listAll, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";

export const getAll = async () => {
  let list:Photo[] = [];

  const imagesFolder = ref(storage, 'images');
  const photoList = await listAll(imagesFolder);

  for(let i in photoList.items) {
    let photoUrl = await getDownloadURL(photoList.items[i]);

    list.push({
       name : photoList.items[i].name,
       url : photoUrl
    })
  }

  return list;
}

export const uploadFile = async (file: File) => {
  if(['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {

    let newFile = ref(storage, `images/${randomName()}`);
    let upload = await uploadBytes(newFile, file);

    let uploadedFile = await getDownloadURL(upload.ref);

    return {
      name : upload.ref.name,
      url : uploadedFile
    } as Photo;

  }else{
    return new Error('Tipo de arquivo nao permitido!')
  }
}

export const deleteFile = async (name : string) => {

  let fileToDeleteRef = ref(storage, `images/${name}`);
  
  deleteObject(fileToDeleteRef)
  .catch((message) => {
    return message;
  })

  return true;
}