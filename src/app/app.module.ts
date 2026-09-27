import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { IonicModule, IonicRouteStrategy, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { PostProvider } from '../providers/post-provider';
import { IonicStorageModule } from '@ionic/storage';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import { QRCodeModule } from 'angularx-qrcode';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Network } from '@ionic-native/network/ngx';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import {Camera} from '@ionic-native/camera/ngx'
import {File} from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import {WebView} from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, HttpModule, IonicModule.forRoot(), IonicStorageModule.forRoot(), AppRoutingModule,QRCodeModule,HttpClientModule],

  providers: [
    StatusBar,
    PostProvider,
    SplashScreen,
    QRScanner,
    Flashlight,
    BarcodeScanner,
    NativeAudio,
    Network,
    Ng2SearchPipeModule,
    FilterPipeModule,
    FileOpener,
    QRCodeModule,
    FilePath,
    Dialogs,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera,File,WebView
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
