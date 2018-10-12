import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FirstPage } from './../pages/first/first';
import { SecondPage } from './../pages/second/second';

import { CameraPreview } from '@ionic-native/camera-preview';
import { Screenshot } from '@ionic-native/screenshot';
import { ManagedataProvider } from '../providers/managedata/managedata';
import { Base64 } from '@ionic-native/base64';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FirstPage,
    SecondPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FirstPage,
    SecondPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CameraPreview,
    Screenshot,
    Base64,
    Base64ToGallery,
    ManagedataProvider
  ]
})
export class AppModule {}
