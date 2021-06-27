import { CameraPhoto } from '@capacitor/camera';

export class ImageItem {
  constructor(public id: string, public image: CameraPhoto) {}
}
