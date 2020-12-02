import { useState, useEffect } from "react";
import { useCamera } from '@ionic/react-hooks/camera';
import { useFilesystem, base64FromPath } from '@ionic/react-hooks/filesystem';
import { useStorage } from '@ionic/react-hooks/storage';
import { isPlatform } from '@ionic/react';
import { CameraResultType, CameraSource, CameraPhoto, Capacitor, FilesystemDirectory } from "@capacitor/core";

export interface Photo {
    filepath: string;
    webviewPath?: string;
}

const PHOTO_STORAGE = "photos";

const { deleteFile, getUri, readFile, writeFile } = useFilesystem();
//API File System
const savePicture = async (photo: CameraPhoto, fileName: string)

    : Promise<Photo> => {
    let base64Data: string;
    // "hybrid" will detect Cordova or Capacitor;
    if (isPlatform('hybrid')) {
        const file = await readFile({
            path: photo.path!
        });
        base64Data = file.data;
    } else {
        base64Data = await base64FromPath(photo.webPath!);
    }
    const savedFile = await writeFile({
        path: fileName,
        data: base64Data,
        directory: FilesystemDirectory.Data
    });

    if (isPlatform('hybrid')) {
        // Display the new image by rewriting the 'file://' path to HTTP
        // Details: https://ionicframework.com/docs/building/webview#file-protocol
        return {
            filepath: savedFile.uri,
            webviewPath: Capacitor.convertFileSrc(savedFile.uri),
        };
    }
    else {
        // Use webPath to display the new image instead of base64 since it's
        // already loaded into memory
        return {
            filepath: fileName,
            webviewPath: photo.webPath
        };
    }
};

export function usePhotoGallery() {

    const { getPhoto } = useCamera();

    const [photos, setPhotos] = useState<Photo[]>([]);

    const { get, set } = useStorage();

    useEffect(() => {
        const loadSaved = async () => {
            const photosString = await get(PHOTO_STORAGE);
            const photos = (photosString ? JSON.parse(photosString) : []) as Photo[];
            for (let photo of photos) {
                const file = await readFile({
                    path: photo.filepath,
                    directory: FilesystemDirectory.Data
                });
                photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
            }
            setPhotos(photos);
        };
        loadSaved();
    }, [get, readFile]);

    const takePhoto = async () => {
        const CameraPhoto = await getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 100
        });
        set(PHOTO_STORAGE, JSON.stringify(newPhotos));
    };

    const fileName = new Date().getTime() + '.jpeg';
    const newPhotos = [{
        filepath: fileName,
        webviewPath: cameraPhoto.webPath
    }, ...photos];
    setPhotos(newPhotos)

    const loadSaved = async () => {


        const photosString = await get('photos');
        const photosInStorage = (photosString ? JSON.parse(photosString) : []) as Photo[];
        // If running on the web...
        if (!isPlatform('hybrid')) {
            for (let photo of photosInStorage) {
                const file = await readFile({
                    path: photo.filepath,
                    directory: FilesystemDirectory.Data
                });
                // Web platform only: Load photo as base64 data
                photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
            }
        }
        setPhotos(photosInStorage);
    };


    return {
        photos,
        takePhoto
    };
}