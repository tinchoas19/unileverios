import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { SecondPage } from './../second/second';
import { CameraPreview, CameraPreviewOptions, CameraPreviewPictureOptions } from '@ionic-native/camera-preview';
import { ManagedataProvider } from '../../providers/managedata/managedata';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('homepagecanvas') homepagecanvas: ElementRef;

  private homePageCanvasCtx: any;
  screen: any;
  state: boolean = false;
  showUI: boolean = true;
  imageText: string;
  idEmpleado: number;
  userScreenshoot:string;
  picture:string;
  buttonvisible: boolean = true;

  cameraPreviewOpts : CameraPreviewOptions = {
    x: 0,
    y: 0,
    width: window.screen.width,
    height: window.screen.height,
    camera: 'front',
    tapPhoto: true,
    previewDrag: true,
    toBack: true,
    alpha: 1
  };

  // picture options
  pictureOpts: CameraPreviewPictureOptions = {
    width: 1280,
    height: 1280,
    quality: 85
  }

  constructor(
    private platform: Platform,
    public navCtrl: NavController, 
    private cameraPreview: CameraPreview,
    private mdprovider: ManagedataProvider) {
      this.cameraPreview.startCamera(this.cameraPreviewOpts).then(
        (res) => {
          console.log(res)
        },
        (err) => {
          console.log(err)
        }
      )
  }

  takePhoto(){   
    this.cameraPreview.takePicture(this.pictureOpts).then((imageData)=>{
      this.picture = 'data:image/jpeg;base64,' + imageData;
      //Aca tengo que unirlo a las otras imagenes
      let mergedImage = this.mergeImages(this.picture);
      this.navCtrl.push(SecondPage, mergedImage); 
        /* foto:mergedImage,
        fish1:jQuery('.fish').css('margin-left'),
        fish2:jQuery('.fish2').css('margin-left')
      }); */
    }, (err)=>{
      this.picture = 'assets/img/test.jpg'
    });
  }

  mergeImages(foto): string{
    const exampleImage = document.createElement('img');
    exampleImage.setAttribute('src', foto);
    const exampleImage2 = document.createElement('img');
    exampleImage2.setAttribute('src', '../../assets/imgs/bg-filtro.png');

    ///////////////////////////
    const exampleImage3 = document.createElement('img');
    exampleImage3.setAttribute('src', '../../assets/imgs/pez1.png');
    const exampleImage4 = document.createElement('img');
    exampleImage4.setAttribute('src', '../../assets/imgs/pez2.png');

    //this.srcimage = '../../assets/imgs/cualquiera.jpg';
    this.homePageCanvasCtx = this.homepagecanvas.nativeElement.getContext('2d');

    this.platform.ready().then((readySource) => {
      console.log('Width: ' + this.platform.width());
      console.log('Height: ' + this.platform.height());
      this.homePageCanvasCtx.canvas.width = this.platform.width().toString();
      this.homePageCanvasCtx.canvas.height = this.platform.height().toString();


      setTimeout(() => {
        this.homePageCanvasCtx.drawImage(exampleImage, 0, 0,this.platform.width().toString(),this.platform.height().toString());
        this.homePageCanvasCtx.drawImage(exampleImage2, 0, 0,this.platform.width().toString(),this.platform.height().toString());
        this.homePageCanvasCtx.drawImage(exampleImage3, 10, 0);
        this.homePageCanvasCtx.drawImage(exampleImage4, 120, 0);
        console.log("rendered from provider!")

      }, 3000);
    });
    return this.homepagecanvas.nativeElement.toDataURL();
  }

  refresh() {
    window['location'].reload();
  }
  
/*   async takeScreenshot() {
    try{
      this.buttonvisible = false;
      await this.platform.ready();

      const res = await this.screenshot.save('jpg', 80, 'tuvieja.jpg');
      console.log(res);
    }catch(e){
      console.error(e)
    }
  } */

/*   async takeScreenshotGetUri() {
    try{
      await this.platform.ready();

      const res = await this.screenshot.URI(80);
      this.userScreenshoot = res.URI;
    }catch(e){
      console.error(e)
    }
  } */
 
/*   convertToBase64(imagePath): any {
    let filePath: string = imagePath;
    this.base64.encodeFile(filePath).then((base64File: string) => {
      console.log(base64File);
      return base64File;
    }, (err) => {
      console.log(err);      
    });
  } */

   
    //navegar a la siguiente pagina o al popup que te dice que ya estas adentro

}
