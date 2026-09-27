import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  AlertController,
  ToastController
} from '@ionic/angular';

import { PostProvider } from '../../providers/post-provider';
import { Storage } from '@ionic/storage';

import {
  BarcodeScanner,
  BarcodeScannerOptions
} from '@ionic-native/barcode-scanner/ngx';

import { Flashlight } from '@ionic-native/flashlight/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

import { Network } from '@ionic-native/network/ngx';
import { Dialogs } from '@ionic-native/dialogs/ngx';


@Component({
  selector: 'app-scaninventaire',
  templateUrl: './scaninventaire.page.html',
  styleUrls: ['./scaninventaire.page.scss'],
})
export class ScaninventairePage implements OnInit {
totallus: number = 0;
scanEnBoucle: boolean = false;
totalstock: number = 0;

totalstocklus: number = 0;


// Poids
totalPoids: number = 0;

poidsLus: number = 0;

poidsRestants: number = 0;

  /* =====================================================
     LISTE INVENTAIRE
  ===================================================== */

  customers: any[] = [];

  limit: number = 20;

  start: number = 0;


  /* =====================================================
     STATISTIQUES
     
     totallus      = pièces lues
     totalstock    = pièces restantes
     totalstocklus = total pièces
  ===================================================== */





 

  nbrepiece: number = 0;

  nbre: number = 0;


  /* =====================================================
     ONGLET
  ===================================================== */

  selectedTab: string = 'inventory';


  /* =====================================================
     BIJOU
  ===================================================== */

  item_id: string = '';

  quantity: number = 0;

  prix_vente_g: number = 0;

  poids: number = 0;

item_location: any = '';

/* =====================================================
   EMPLOYE
===================================================== */

employee_id: any = 0;


/* =====================================================
   PLATEAU ACTUEL
===================================================== */

plateau_id: string = '';

/* =====================================================
   POIDS DU PLATEAU ACTUEL
===================================================== */

poidsPlateau: number = 0;


/* =====================================================
   STATS GLOBALES LOCATION
===================================================== */

totalGlobalLus: number = 0;

poidsGlobalLus: number = 0;

poidsGlobalTotal: number = 0;

poidsGlobalRestants: number = 0;


/* =====================================================
   STATS PERSONNELLES
===================================================== */

totalLusPersonnel: number = 0;

poidsLusPersonnel: number = 0;


  /* =====================================================
     UTILISATEUR
  ===================================================== */

  codeacces: string = '';

  anggota: any = null;


  /* =====================================================
     SCANNER
  ===================================================== */

  scanEnCours: boolean = false;

  showCamera: boolean = false;

  flashActive: boolean = false;

  isFlashlight: boolean = false;

  textScanned: string = '';

  scannedData: any = '';

  scannedCode: any = '';


  /* =====================================================
     ETAT
  ===================================================== */

  loading: boolean = false;

  validationEnCours: boolean = false;

  sessionChargee: boolean = false;


  /* =====================================================
     COMPATIBILITE ANCIEN HTML
  ===================================================== */

  id: any = 0;

  comment: string = '';

  sale_id: number = 0;

  name: string = '';


  /* =====================================================
     CONSTRUCTEUR
  ===================================================== */

  constructor(
    private postPvdr: PostProvider,
    private router: Router,
    private toastController: ToastController,
    private storage: Storage,
    private barcodeScanner: BarcodeScanner,
    private torchLight: Flashlight,
    private nativeAudio: NativeAudio,
    private alertCtrl: AlertController,
    public network: Network,
    public dialog: Dialogs
  ) {

    /*
     * IMPORTANT :
     *
     * On NE lance plus le scanner ici.
     *
     * Avant tu avais :
     *
     * this.scanBarcode();
     *
     * dans le constructeur.
     *
     * Cela pouvait ouvrir le scanner avant que
     * codeacces et item_location soient chargés.
     */

  }


  /* =====================================================
     INIT
  ===================================================== */

 ngOnInit(): void {

  this.selectedTab = 'inventory';

  this.chargerSession();

}


  /* =====================================================
     SESSION
  ===================================================== */
/* =====================================================
   SESSION
   employee_id = codeacces
===================================================== */

async chargerSession(): Promise<void> {

  try {

    const res = await this.storage.get('session_storage');

    console.log('====================================');
    console.log('SESSION COMPLETE =', res);
    console.log('====================================');


    /*
    |--------------------------------------------------------------------------
    | SESSION ABSENTE
    |--------------------------------------------------------------------------
    */

    if (!res) {

      await this.message(
        'Veuillez vous identifier avant de commencer.',
        'warning'
      );

      this.router.navigate(['/login']);

      return;
    }


    /*
    |--------------------------------------------------------------------------
    | STOCKER SESSION
    |--------------------------------------------------------------------------
    */

    this.anggota = res;


    /*
    |--------------------------------------------------------------------------
    | CODE ACCÈS
    |--------------------------------------------------------------------------
    |
    | C'est l'identifiant de l'employé.
    |
    */

    this.codeacces = String(
      res.codeacces ||
      res.code_access ||
      res.employee_id ||
      res.employeeid ||
      res.id ||
      ''
    ).trim();


    /*
    |--------------------------------------------------------------------------
    | EMPLOYEE ID
    |--------------------------------------------------------------------------
    |
    | IMPORTANT :
    | employee_id = codeacces
    |
    | On ne cherche PAS person_id.
    | On ne convertit PAS en Number.
    |
    */

    this.employee_id = this.codeacces;


    /*
    |--------------------------------------------------------------------------
    | LOCATION
    |--------------------------------------------------------------------------
    */

    this.item_location = String(
      res.item_location ||
      res.location_id ||
      res.location ||
      res.itemlocation ||
      ''
    ).trim();


    /*
    |--------------------------------------------------------------------------
    | DEBUG
    |--------------------------------------------------------------------------
    */

    console.log('====================================');
    console.log('SESSION INVENTAIRE');
    console.log('CODE ACCES   =', this.codeacces);
    console.log('EMPLOYEE ID  =', this.employee_id);
    console.log('LOCATION     =', this.item_location);
    console.log('====================================');


    /*
    |--------------------------------------------------------------------------
    | VÉRIFICATION CODE ACCÈS
    |--------------------------------------------------------------------------
    */

    if (!this.codeacces) {

      await this.message(
        'Code utilisateur introuvable.',
        'danger'
      );

      console.error(
        'CODEACCES ABSENT DANS LA SESSION',
        res
      );

      return;
    }


    /*
    |--------------------------------------------------------------------------
    | VÉRIFICATION LOCATION
    |--------------------------------------------------------------------------
    */

    if (!this.item_location) {

      await this.message(
        'Location du stock introuvable dans la session.',
        'danger'
      );

      console.error(
        'ITEM_LOCATION ABSENT DANS LA SESSION',
        res
      );

      return;
    }


    /*
    |--------------------------------------------------------------------------
    | SESSION PRÊTE
    |--------------------------------------------------------------------------
    */

    this.sessionChargee = true;


    /*
    |--------------------------------------------------------------------------
    | CHARGER LE PLATEAU
    |--------------------------------------------------------------------------
    */

    this.chargerPlateau();


    /*
    |--------------------------------------------------------------------------
    | CHARGER LES BIJOUX DU PLATEAU
    |--------------------------------------------------------------------------
    */

    await this.actualiserInventaire();


    /*
    |--------------------------------------------------------------------------
    | STATISTIQUES PERSONNELLES
    |--------------------------------------------------------------------------
    */

    this.loadStatsPersonnel();


    console.log('====================================');
    console.log('SESSION INVENTAIRE CHARGÉE');
    console.log('EMPLOYEE ID = CODEACCES');
    console.log('PLATEAU     =', this.plateau_id);
    console.log('====================================');


  } catch (error) {

    console.error(
      'ERREUR RÉCUPÉRATION SESSION',
      error
    );


    this.sessionChargee = false;


    await this.message(
      'Impossible de récupérer la session.',
      'danger'
    );

  }

}
/* =====================================================
   CLÉ DU PLATEAU DANS STORAGE
===================================================== */

getPlateauStorageKey(): string {

  return (
    'inventaire_plateau_' +
    this.employee_id +
    '_' +
    this.item_location
  );

}


/* =====================================================
   CHARGER PLATEAU ACTUEL
===================================================== */

chargerPlateau(): void {

  const key = this.getPlateauStorageKey();

  const ancienPlateau =
    localStorage.getItem(key);


  if (ancienPlateau && ancienPlateau.trim() !== '') {

    this.plateau_id =
      ancienPlateau.trim();


    console.log(
      'PLATEAU EXISTANT =',
      this.plateau_id
    );

    return;
  }


  this.creerNouveauPlateau();

}


/* =====================================================
   CRÉER NOUVEAU PLATEAU
===================================================== */

creerNouveauPlateau(): void {

  this.plateau_id =
    'P_' +
    this.employee_id +
    '_' +
    this.item_location +
    '_' +
    Date.now();


  localStorage.setItem(
    this.getPlateauStorageKey(),
    this.plateau_id
  );


  console.log(
    '===================================='
  );

  console.log(
    'NOUVEAU PLATEAU'
  );

  console.log(
    'PLATEAU ID =',
    this.plateau_id
  );

  console.log(
    'LOCATION =',
    this.item_location
  );

  console.log(
    'EMPLOYEE =',
    this.employee_id
  );

  console.log(
    '====================================');

}


  /* =====================================================
     ION VIEW WILL ENTER
  ===================================================== */

async ionViewWillEnter(): Promise<void> {

  if (!this.sessionChargee) {
    return;
  }


  if (!this.codeacces) {
    return;
  }


  if (!this.item_location) {
    return;
  }


  if (!this.plateau_id) {

    this.chargerPlateau();

  }


  await this.actualiserInventaire();

}


  /* =====================================================
     REFRESH
  ===================================================== */

  async doRefresh(event: any): Promise<void> {

    try {

      await this.actualiserInventaire();

    } finally {

      if (
        event &&
        event.target
      ) {

        event.target.complete();

      }

    }

  }


  /* =====================================================
     ACTUALISER INVENTAIRE
  ===================================================== */

  async actualiserInventaire(): Promise<void> {

  if (!this.sessionChargee) {
    return;
  }


  if (!this.codeacces) {
    return;
  }


  if (!this.item_location) {
    return;
  }


  if (!this.plateau_id) {

    this.chargerPlateau();

  }


  this.customers = [];

  this.start = 0;


  await this.loadCustomer();

}


  /* =====================================================
     PAGINATION
  ===================================================== */

  async loadData(event: any): Promise<void> {

    this.start += this.limit;


    try {

      await this.loadCustomer();

    } finally {

      if (
        event &&
        event.target
      ) {

        event.target.complete();

      }

    }

  }


  /* =====================================================
     STATISTIQUES INVENTAIRE
     
     RESULTAT ATTENDU :

     {
       total: 694,
       lus: 8,
       restants: 686
     }

  ===================================================== */
loadStats(): void {

  if (
    !this.codeacces ||
    !this.item_location ||
    !this.plateau_id
  ) {

    console.error(
      'STATISTIQUES BLOQUEES',
      {
        codeacces: this.codeacces,
        item_location: this.item_location,
        plateau_id: this.plateau_id
      }
    );

    return;
  }


  const body = {

    aksi: 'getinventairestats',

    codeacces:
      this.codeacces,

    item_location:
      this.item_location,

    plateau_id:
      this.plateau_id

  };


  console.log(
    '===================================='
  );

  console.log(
    'STATS INVENTAIRE'
  );

  console.log(body);

  console.log(
    '===================================='
  );


  this.postPvdr
    .postData(
      body,
      'file_aksi.php'
    )
    .subscribe(

      (data: any) => {

        console.log(
          'REPONSE STATS =',
          data
        );


        if (
          data &&
          data.success === true &&
          data.result
        ) {

          /*
          |--------------------------------------------------------------------------
          | NOMBRES
          |--------------------------------------------------------------------------
          */

          this.totalstocklus =
            Number(
              data.result.total || 0
            );


          this.totalstock =
            Number(
              data.result.restants || 0
            );


          /*
          |--------------------------------------------------------------------------
          | POIDS GLOBAL
          |--------------------------------------------------------------------------
          */

          this.totalPoids =
            Number(
              data.result.totalpoids || 0
            );


          this.poidsRestants =
            Number(
              data.result.poids_restants || 0
            );


          /*
          |--------------------------------------------------------------------------
          | POIDS DU PLATEAU
          |--------------------------------------------------------------------------
          |
          | On garde le calcul local du plateau.
          |
          */

          this.totallus =
            this.customers.length;


          this.poidsLus =
            this.customers.reduce(
              (
                total: number,
                item: any
              ) => {

                return (
                  total +
                  Number(item.poids || 0)
                );

              },
              0
            );


          this.poidsLus =
            Number(
              this.poidsLus.toFixed(2)
            );


          /*
          |--------------------------------------------------------------------------
          | SÉCURITÉ
          |--------------------------------------------------------------------------
          |
          | Si l'API donne un poids lu différent,
          | on affiche celui calculé à partir du plateau.
          |
          */

          console.log(
            'TOTAL =',
            this.totalstocklus
          );

          console.log(
            'LUS =',
            this.totallus
          );

          console.log(
            'RESTANTS =',
            this.totalstock
          );

          console.log(
            'POIDS TOTAL =',
            this.totalPoids
          );

          console.log(
            'POIDS PLATEAU =',
            this.poidsLus
          );

          console.log(
            'POIDS RESTANT =',
            this.poidsRestants
          );

        }

      },


      (error: any) => {

        console.error(
          'ERREUR API STATS',
          error
        );

      }

    );

}
loadStatsPersonnel(): void {

  if (
    !this.codeacces ||
    !this.item_location ||
    !this.employee_id
  ) {

    return;

  }


  const body = {

    aksi: 'getinventairestatspersonnel',

    codeacces:
      this.codeacces,

    item_location:
      this.item_location,

    employee_id:
      this.employee_id

  };


  this.postPvdr
    .postData(
      body,
      'file_aksi.php'
    )
    .subscribe(

      (data: any) => {

        console.log(
          'STATS EMPLOYE =',
          data
        );


        if (
          data &&
          data.success === true &&
          data.result
        ) {

          this.totalLusPersonnel =
            Number(
              data.result.lus || 0
            );


          this.poidsLusPersonnel =
            Number(
              data.result.poids || 0
            );

        }

      },

      (error: any) => {

        console.error(
          'ERREUR STATS EMPLOYE =',
          error
        );

      }

    );

}


  /* =====================================================
     CHARGER LISTE BIJOUX LUS
     
     CORRECTION TS2322 :
     
     Promise<void>
     et non Promise<boolean>
  ===================================================== */
async loadCustomer(): Promise<void> {

  if (
    !this.codeacces ||
    !this.item_location ||
    !this.plateau_id
  ) {

    console.error(
      'LOAD CUSTOMER BLOQUE',
      {
        codeacces: this.codeacces,
        item_location: this.item_location,
        plateau_id: this.plateau_id
      }
    );

    return;
  }


  this.loading = true;


  const body = {

    aksi: 'getdatainventaire2',

    limit: this.limit,

    start: this.start,

    codeacces: this.codeacces,

    employee_id: this.employee_id,

    item_location: this.item_location,

    plateau_id: this.plateau_id

  };


  console.log('====================================');
  console.log('CHARGEMENT PLATEAU');
  console.log('====================================');

  console.log(
    'PLATEAU =',
    this.plateau_id
  );

  console.log(
    'LOCATION =',
    this.item_location
  );

  console.log(
    'BODY =',
    body
  );


  return new Promise<void>((resolve) => {

    this.postPvdr
      .postData(
        body,
        'file_aksi.php'
      )
      .subscribe(

        (data: any) => {

          console.log(
            'REPONSE getdatainventaire2 =',
            data
          );


          if (
            data &&
            data.success === true &&
            Array.isArray(data.result)
          ) {

            if (this.start === 0) {

              this.customers =
                data.result;

            } else {

              this.customers =
                this.customers.concat(
                  data.result
                );

            }

          } else {

            if (this.start === 0) {

              this.customers = [];

            }


            console.warn(
              'AUCUN BIJOU POUR CE PLATEAU',
              data
            );

          }


          /*
          |--------------------------------------------------------------------------
          | CALCUL PLATEAU ACTUEL
          |--------------------------------------------------------------------------
          */

          this.calculerPoidsPlateau();


          /*
          |--------------------------------------------------------------------------
          | STATS GLOBALES
          |--------------------------------------------------------------------------
          */

          this.loadStats();


          this.loading = false;

          resolve();

        },


        (error: any) => {

          console.error(
            'ERREUR getdatainventaire2 =',
            error
          );


          this.loading = false;


          if (this.start === 0) {

            this.customers = [];

          }


          this.calculerPoidsPlateau();


          resolve();

        }

      );

  });

}

/* =====================================================
   POIDS DU PLATEAU ACTUEL
===================================================== */

calculerPoidsPlateau(): void {

  /*
  |--------------------------------------------------------------------------
  | NOMBRE DE BIJOUX DU PLATEAU
  |--------------------------------------------------------------------------
  */

  this.totallus =
    this.customers.length;


  /*
  |--------------------------------------------------------------------------
  | POIDS DU PLATEAU
  |--------------------------------------------------------------------------
  */

  this.poidsPlateau =
    this.customers.reduce(

      (
        total: number,
        item: any
      ) => {

        const poids =
          Number(
            item.poids || 0
          );


        return total + poids;

      },

      0

    );


  this.poidsPlateau =
    Number(
      this.poidsPlateau.toFixed(2)
    );


  /*
  |--------------------------------------------------------------------------
  | POIDS LUS = PLATEAU ACTUEL
  |--------------------------------------------------------------------------
  */

  this.poidsLus =
    this.poidsPlateau;


  console.log('====================================');
  console.log('STATISTIQUES PLATEAU ACTUEL');
  console.log('====================================');

  console.log(
    'PLATEAU =',
    this.plateau_id
  );

  console.log(
    'BIJOUX =',
    this.totallus
  );

  console.log(
    'POIDS =',
    this.poidsLus
  );

  console.log('====================================');

}
  /* =====================================================
     SCANNER BARCODE / QR CODE
  ===================================================== */

  /* =====================================================
   SCANNER EN BOUCLE
   Scanner → validation → retour scanner
   jusqu'à arrêt manuel
===================================================== */

async demarrerScanner(): Promise<void> {

  if (this.scanEnCours) {
    return;
  }

  if (!this.codeacces) {

    await this.message(
      'Veuillez vous identifier avant de scanner.',
      'warning'
    );

    return;
  }

  if (!this.item_location) {

    await this.message(
      'Location non identifiée.',
      'danger'
    );

    return;
  }

  /*
  |--------------------------------------------------------------------------
  | ACTIVATION DU MODE BOUCLE
  |--------------------------------------------------------------------------
  */

  this.scanEnBoucle = true;

  /*
  |--------------------------------------------------------------------------
  | LANCER LA BOUCLE
  |--------------------------------------------------------------------------
  */

  await this.lancerScanSuivant();

}
/* =====================================================
   LANCER UN SCAN PUIS REVENIR AU SCANNER
===================================================== */

async lancerScanSuivant(): Promise<void> {

  /*
  |--------------------------------------------------------------------------
  | SI L'UTILISATEUR A ARRÊTÉ
  |--------------------------------------------------------------------------
  */

  if (!this.scanEnBoucle) {

    this.scanEnCours = false;
    this.showCamera = false;

    return;
  }


  /*
  |--------------------------------------------------------------------------
  | SCAN EN COURS
  |--------------------------------------------------------------------------
  */

  this.scanEnCours = true;
  this.showCamera = true;


  const options: BarcodeScannerOptions = {

    preferFrontCamera: false,

    showFlipCameraButton: false,

    showTorchButton: true,

    torchOn: this.flashActive,

    prompt:
      'Scannez le bijou suivant',

    resultDisplayDuration: 300,

    formats:
      'EAN_13,EAN_8,UPC_A,UPC_E,' +
      'CODE_128,CODE_39,ITF,' +
      'QR_CODE,DATA_MATRIX,PDF_417',

    orientation: 'portrait'

  };


  try {

    /*
    |--------------------------------------------------------------------------
    | LECTURE
    |--------------------------------------------------------------------------
    */

    const barcodeData =
      await this.barcodeScanner.scan(options);


    /*
    |--------------------------------------------------------------------------
    | CAMÉRA FERMÉE APRÈS LA LECTURE
    |--------------------------------------------------------------------------
    */

    this.scanEnCours = false;
    this.showCamera = false;


    /*
    |--------------------------------------------------------------------------
    | UTILISATEUR A ARRÊTÉ
    |--------------------------------------------------------------------------
    */

    if (!this.scanEnBoucle) {

      return;
    }


    /*
    |--------------------------------------------------------------------------
    | ANNULATION
    |--------------------------------------------------------------------------
    */

    if (
      !barcodeData ||
      barcodeData.cancelled
    ) {

      /*
       * On ne quitte PAS la boucle.
       *
       * On revient simplement au scanner.
       */

      setTimeout(() => {

        if (this.scanEnBoucle) {
          this.lancerScanSuivant();
        }

      }, 250);

      return;
    }


    /*
    |--------------------------------------------------------------------------
    | RÉCUPÉRATION DU CODE
    |--------------------------------------------------------------------------
    */

    const code =
      String(
        barcodeData.text || ''
      ).trim();


    if (!code) {

      this.playaudiofalse();

      setTimeout(() => {

        if (this.scanEnBoucle) {
          this.lancerScanSuivant();
        }

      }, 250);

      return;
    }


    console.log(
      '===================================='
    );

    console.log(
      'SCAN BOUCLE'
    );

    console.log(
      'CODE =',
      code
    );

    console.log(
      '===================================='
    );


    /*
    |--------------------------------------------------------------------------
    | STOCKAGE
    |--------------------------------------------------------------------------
    */

    this.scannedData = code;
    this.scannedCode = code;
    this.textScanned = code;
    this.item_id = code;


    /*
    |--------------------------------------------------------------------------
    | VALIDATION
    |--------------------------------------------------------------------------
    |
    | On attend réellement que la validation soit terminée
    | avant de lancer le scan suivant.
    |
    */

    await this.validerBijou();


    /*
    |--------------------------------------------------------------------------
    | NETTOYAGE
    |--------------------------------------------------------------------------
    */

    this.item_id = '';
    this.textScanned = '';
    this.scannedData = '';
    this.scannedCode = '';


    /*
    |--------------------------------------------------------------------------
    | PETIT DÉLAI
    |--------------------------------------------------------------------------
    |
    | Important pour éviter que la caméra précédente
    | soit encore en train de se fermer.
    |
    */

    setTimeout(() => {

      if (this.scanEnBoucle) {

        this.lancerScanSuivant();

      }

    }, 300);


  } catch (error) {

    console.error(
      'ERREUR SCANNER BOUCLE =',
      error
    );


    this.scanEnCours = false;
    this.showCamera = false;


    /*
    |--------------------------------------------------------------------------
    | NE PAS QUITTER LA BOUCLE SUR UNE ERREUR
    |--------------------------------------------------------------------------
    */

    if (this.scanEnBoucle) {

      setTimeout(() => {

        if (this.scanEnBoucle) {
          this.lancerScanSuivant();
        }

      }, 500);

    }

  }

}

/* =====================================================
   ARRÊTER LE SCANNER EN BOUCLE
===================================================== */

async arreterScanner(): Promise<void> {

  this.scanEnBoucle = false;

  this.scanEnCours = false;

  this.showCamera = false;

  this.turnOffTorch();

  console.log(
    'SCANNER ARRÊTÉ'
  );

}

  /* =====================================================
     ALIAS ANCIEN NOM
     
     Ton ancien HTML utilise scanBarcode()
  ===================================================== */

  async scanBarcode(): Promise<void> {

    await this.demarrerScanner();

  }


  /* =====================================================
     TORCHE
  ===================================================== */

  toggleFlash(): void {

    try {

      if (!this.torchLight.available()) {

        this.message(
          'La lampe torche n’est pas disponible.',
          'warning'
        );

        return;
      }


      if (this.flashActive) {

        this.torchLight.switchOff();

        this.flashActive = false;

        this.isFlashlight = false;

      } else {

        this.torchLight.switchOn();

        this.flashActive = true;

        this.isFlashlight = true;

      }

    } catch (error) {

      console.error(
        'Erreur torche',
        error
      );

    }

  }


  /* =====================================================
     ANCIEN NOM TORCHE
  ===================================================== */

  turnOnTorch(): void {

    this.toggleFlash();

  }


  /* =====================================================
     ARRET TORCHE
  ===================================================== */

  turnOffTorch(): void {

    try {

      if (
        this.torchLight.available()
      ) {

        this.torchLight.switchOff();

      }

    } catch (error) {

      console.log(
        'Torche indisponible'
      );

    }


    this.flashActive = false;

    this.isFlashlight = false;

  }


  /* =====================================================
     VALIDATION D'UN BIJOU
     
     Cette fonction est utilisée par :
     
     1. Scanner
     2. Saisie manuelle
     
     C'est LA fonction centrale.
  ===================================================== */

  async validerBijou(): Promise<void> {

  const code = String(this.item_id || '').trim();

  if (!code) {

    await this.message(
      'Veuillez entrer ou scanner le code du bijou.',
      'warning'
    );

    return;
  }

  if (!this.codeacces) {

    await this.message(
      'Utilisateur non identifié.',
      'danger'
    );

    return;
  }



  if (!this.item_location) {

    await this.message(
      'Location non identifiée.',
      'danger'
    );

    return;
  }

  if (!this.plateau_id) {

    this.creerNouveauPlateau();

  }

  if (this.validationEnCours) {
    return;
  }

  this.validationEnCours = true;

  const body = {

    aksi: 'additeminventory',

    item_id: code,

    codeacces: this.codeacces,
employee_id: this.employee_id,
    item_location: this.item_location,

    plateau_id: this.plateau_id,
    

  };

  console.log(
    '===================================='
  );

  console.log(
    'AJOUT BIJOU AU PLATEAU'
  );

  console.log(body);

  console.log(
    '===================================='
  );


  this.postPvdr
    .postData(
      body,
      'file_aksi.php'
    )
    .subscribe(

      async (data: any) => {

        this.validationEnCours = false;

        console.log(
          'REPONSE AJOUT =',
          data
        );


        /* =================================================
           SUCCES
        ================================================= */

        if (
          data &&
          data.success === true
        ) {

          this.playaudio();

          this.item_id = '';

          this.textScanned = '';

          this.scannedData = '';

          this.scannedCode = '';

          this.selectedTab = 'inventory';


          await this.message(
            '✓ Bijou ' +
            code +
            ' ajouté au plateau.',
            'success'
          );


          await this.actualiserInventaire();

          return;
        }


        /* =================================================
           RECUPERER TYPE REPONSE
        ================================================= */

        const typeErreur =
          data && data.type
            ? data.type
            : '';


        /* =================================================
           DOUBLON
        ================================================= */

        if (
          typeErreur === 'DUPLICATE' ||
          typeErreur === 'ALREADY_SCANNED'
        ) {

          this.playaudiofalse();

          this.item_id = '';

          this.textScanned = '';

          this.scannedData = '';

          this.scannedCode = '';

          await this.message(
            '✕ Ce bijou est déjà dans ce plateau.',
            'danger'
          );

          return;
        }


        /* =================================================
           CODE INEXISTANT
        ================================================= */

        if (
          typeErreur === 'NOT_FOUND'
        ) {

          this.playaudiofalse();

          this.item_id = '';

          this.textScanned = '';

          await this.message(
            '✕ Le code ' +
            code +
            ' n’existe pas.',
            'danger'
          );

          return;
        }


        /* =================================================
           BIJOU SUPPRIME
        ================================================= */

        if (
          typeErreur === 'DELETED'
        ) {

          this.playaudiofalse();

          this.item_id = '';

          this.textScanned = '';

          await this.message(
            '✕ Ce bijou est supprimé.',
            'danger'
          );

          return;
        }


        /* =================================================
           DEJA OK
        ================================================= */

        if (
          typeErreur === 'ALREADY_OK'
        ) {

          this.playaudiofalse();

          this.item_id = '';

          this.textScanned = '';

          await this.message(
            '✕ Ce bijou est déjà validé OK.',
            'danger'
          );

          return;
        }


        /* =================================================
           PAS DE STOCK
        ================================================= */

        if (
          typeErreur === 'NO_STOCK'
        ) {

          this.playaudiofalse();

          this.item_id = '';

          this.textScanned = '';

          const messageStock =
            data && data.msg
              ? data.msg
              : 'Ce bijou n’a pas de stock disponible.';

          await this.message(
            messageStock,
            'danger'
          );

          return;
        }


        /* =================================================
           ERREUR GENERALE
        ================================================= */

        this.playaudiofalse();

        const messageErreur =
          data && data.msg
            ? data.msg
            : 'Erreur pendant la validation.';

        await this.message(
          messageErreur,
          'danger'
        );


        this.item_id = '';

        this.textScanned = '';

        this.scannedData = '';

        this.scannedCode = '';

      },


      async (error: any) => {

        this.validationEnCours = false;

        console.error(
          'ERREUR API VALIDATION =',
          error
        );

        await this.message(
          'Erreur de connexion au serveur.',
          'danger'
        );

      }

    );

}

  /* =====================================================
     SAISIE MANUELLE
  ===================================================== */

  async validerCodeManuel(): Promise<void> {

    await this.validerBijou();

  }


  /* =====================================================
     ANCIEN NOM
     
     Compatibilité avec ton ancien HTML
  ===================================================== */

  async createdProses(): Promise<void> {

    await this.validerBijou();

  }


  /* =====================================================
     ANCIEN NOM SAISIE MANUELLE
  ===================================================== */

  async createdProses5(
    item_id: string
  ): Promise<void> {

    this.item_id =
      String(
        item_id || ''
      ).trim();


    await this.validerBijou();

  }


  /* =====================================================
     VERIFICATION CODE
     
     Compatibilité ancien code.
     
     La vraie validation reste validerBijou().
  ===================================================== */

  async verifCode(): Promise<void> {

    await this.validerBijou();

  }


  /* =====================================================
     SON SUCCES
  ===================================================== */

  playaudio(): void {

    try {

      this.nativeAudio
        .preloadComplex(
          'inventory_success',
          'assets/son.wav',
          1,
          1,
          1
        );


      this.nativeAudio
        .play(
          'inventory_success'
        );

    } catch (error) {

      console.log(
        'Audio succès indisponible'
      );

    }

  }


  /* =====================================================
     SON ERREUR
  ===================================================== */

  playaudiofalse(): void {

    try {

      this.nativeAudio
        .preloadComplex(
          'inventory_error',
          'assets/false.wav',
          1,
          1,
          1
        );


      this.nativeAudio
        .play(
          'inventory_error'
        );

    } catch (error) {

      console.log(
        'Audio erreur indisponible'
      );

    }

  }


  /* =====================================================
     TOAST
  ===================================================== */

  async message(
    text: string,
    color:
      | 'success'
      | 'danger'
      | 'warning'
      | 'primary' = 'primary'
  ): Promise<void> {

    const toast =
      await this.toastController.create({

        message: text,

        duration: 1800,

        color: color,

        position: 'top',

        buttons: [

          {
            icon: 'close-outline',
            role: 'cancel'
          }

        ]

      });


    await toast.present();

  }


  /* =====================================================
     SUPPRIMER UNE LECTURE
  ===================================================== */

  async supprimerLecture(
    num_sale: any
  ): Promise<void> {

    const alert =
      await this.alertCtrl.create({

        header:
          'Annuler la lecture',

        message:
          'Voulez-vous retirer ce bijou de l’inventaire en cours ?',

        buttons: [

          {
            text: 'Non',

            role: 'cancel'

          },

          {

            text: 'Oui',

            role: 'destructive',

            handler: () => {

              this.supprimerLectureServeur(
                num_sale
              );

            }

          }

        ]

      });


    await alert.present();

  }


  /* =====================================================
     COMPATIBILITE ANCIEN HTML
     
     Ancien HTML :
     delCustomers(customer.num_sale)
  ===================================================== */

  async delCustomers(
    num_sale: any
  ): Promise<void> {

    await this.supprimerLecture(
      num_sale
    );

  }


  /* =====================================================
     SUPPRESSION SERVEUR
  ===================================================== */

  supprimerLectureServeur(
    num_sale: any
  ): void {

    const body = {

      aksi: 'deleteiteminventory',

      num_sale: num_sale,

      codeacces: this.codeacces

    };


    console.log(
      'SUPPRESSION LECTURE =',
      body
    );


    this.postPvdr
      .postData(
        body,
        'file_aksi.php'
      )
      .subscribe(

        async (data: any) => {

          console.log(
            'REPONSE SUPPRESSION =',
            data
          );


          if (
            data &&
            data.success === true
          ) {

            await this.message(
              'Lecture annulée.',
              'success'
            );


            await this.actualiserInventaire();

          } else {

            await this.message(
              data && data.msg
                ? data.msg
                : 'Impossible d’annuler la lecture.',
              'danger'
            );

          }

        },

        async (error: any) => {

          console.error(
            'Erreur suppression',
            error
          );


          await this.message(
            'Erreur de connexion au serveur.',
            'danger'
          );

        }

      );

  }


  /* =====================================================
     VOIR PRIX
     
     Compatibilité ancien HTML
  ===================================================== */

  showCustomer(
    num_sale: any,
    name: any,
    item_unit_price: any
  ): void {

    console.log(
      'VOIR BIJOU',
      {
        num_sale,
        name,
        item_unit_price
      }
    );

  }


  /* =====================================================
     MODIFIER PRIX
     
     Compatibilité ancien HTML
  ===================================================== */

  updateCustomer(
    num_sale: any,
    name: any,
    item_unit_price: any,
    prix_vente_g: any,
    poids: any,
    location_id: any
  ): void {

    console.log(
      'PRIX BIJOU',
      {
        num_sale,
        name,
        item_unit_price,
        prix_vente_g,
        poids,
        location_id
      }
    );

  }


  /* =====================================================
     ANCIEN UPDATE
  ===================================================== */

  updateProses(): void {

    console.log(
      'updateProses() appelé'
    );

  }


  /* =====================================================
     VALIDER LE PLATEAU
  ===================================================== */
/* =====================================================
   VALIDER LE PLATEAU
===================================================== */

async validertableau(): Promise<void> {

  /*
  |--------------------------------------------------------------------------
  | PRENDRE UNE PHOTO DU PLATEAU AVANT VALIDATION
  |--------------------------------------------------------------------------
  */

  const plateau =
    this.plateau_id;

  const nombre =
    Number(this.totallus || this.customers.length || 0);

  const poids =
    Number(this.poidsLus || 0);


  console.log('====================================');
  console.log('BOUTON VALIDER PLATEAU');
  console.log('====================================');

  console.log('PLATEAU ID =', plateau);
  console.log('CUSTOMERS =', this.customers);
  console.log('CUSTOMERS LENGTH =', this.customers.length);
  console.log('TOTAL LUS =', this.totallus);
  console.log('POIDS =', poids);
  console.log('EMPLOYEE =', this.employee_id);
  console.log('CODE ACCES =', this.codeacces);
  console.log('LOCATION =', this.item_location);

  console.log('====================================');


  /*
  |--------------------------------------------------------------------------
  | AUCUN BIJOU
  |--------------------------------------------------------------------------
  */

  if (nombre <= 0) {

    await this.message(
      'Ce plateau ne contient aucun bijou.',
      'warning'
    );

    return;
  }


  /*
  |--------------------------------------------------------------------------
  | PLATEAU INCONNU
  |--------------------------------------------------------------------------
  */

  if (!plateau) {

    await this.message(
      'Identifiant du plateau introuvable.',
      'danger'
    );

    return;
  }


  /*
  |--------------------------------------------------------------------------
  | CONFIRMATION
  |--------------------------------------------------------------------------
  */

  const alert =
    await this.alertCtrl.create({

      header:
        'Valider le plateau',

      message:
        'Vous avez contrôlé <strong>' +
        nombre +
        ' bijou(x)</strong>.<br><br>' +

        'Poids contrôlé : <strong>' +
        poids.toFixed(2) +
        ' g</strong><br><br>' +

        'Plateau : <strong>' +
        plateau +
        '</strong><br><br>' +

        'Voulez-vous terminer ce décompte ?',

      buttons: [

        {
          text: 'Annuler',

          role: 'cancel'

        },

        {
          text: 'Confirmer',

          handler: () => {

            /*
             * On envoie exactement le plateau
             * qui était affiché au moment du clic.
             */

            this.finaliserPlateau(
              plateau,
              nombre,
              poids
            );

          }

        }

      ]

    });


  await alert.present();

}

  /* =====================================================
     FINALISER PLATEAU
  ===================================================== */
/* =====================================================
   FINALISER LE PLATEAU
===================================================== */

async finaliserPlateau(
  ancienPlateau: string,
  nombreBijoux: number,
  poidsControle: number
): Promise<void> {

  /*
  |--------------------------------------------------------------------------
  | SÉCURITÉ
  |--------------------------------------------------------------------------
  */

  if (!ancienPlateau) {

    await this.message(
      'Plateau introuvable.',
      'danger'
    );

    return;
  }


  if (!this.codeacces) {

    await this.message(
      'Utilisateur non identifié.',
      'danger'
    );

    return;
  }


  if (!this.item_location) {

    await this.message(
      'Location non identifiée.',
      'danger'
    );

    return;
  }


  /*
  |--------------------------------------------------------------------------
  | BODY
  |--------------------------------------------------------------------------
  */

  const body = {

    aksi: 'validertableau',

    /*
     * IMPORTANT
     */

    plateau_id:
      ancienPlateau,

    codeacces:
      this.codeacces,

    employee_id:
      this.codeacces,

    item_location:
      this.item_location,

    /*
     * Informations de contrôle
     */

    nombre:
      nombreBijoux,

    poids:
      poidsControle.toFixed(2)

  };


  console.log('====================================');
  console.log('VALIDATION PLATEAU SERVEUR');
  console.log('====================================');

  console.log('PLATEAU =', ancienPlateau);
  console.log('NOMBRE =', nombreBijoux);
  console.log('POIDS =', poidsControle);
  console.log('EMPLOYEE =', this.codeacces);
  console.log('LOCATION =', this.item_location);

  console.log('BODY =', body);

  console.log('====================================');


  this.loading = true;


  this.postPvdr
    .postData(
      body,
      'file_aksi.php'
    )
    .subscribe(

      async (data: any) => {

        this.loading = false;


        console.log(
          'REPONSE VALIDERTABLEAU =',
          data
        );


        /*
        |--------------------------------------------------------------------------
        | SUCCÈS
        |--------------------------------------------------------------------------
        */

        if (
          data &&
          data.success === true
        ) {

          /*
          | SON
          */

          this.playaudio();


          /*
          |--------------------------------------------------------------------------
          | SUPPRIMER L'ANCIEN PLATEAU DU STORAGE
          |--------------------------------------------------------------------------
          */

          localStorage.removeItem(
            this.getPlateauStorageKey()
          );


          /*
          |--------------------------------------------------------------------------
          | VIDER L'ANCIEN DÉCOMPTE
          |--------------------------------------------------------------------------
          */

          this.customers = [];

          this.start = 0;

          this.totallus = 0;

          this.poidsLus = 0;

          this.poidsPlateau = 0;


          /*
          |--------------------------------------------------------------------------
          | CRÉER UN NOUVEAU PLATEAU
          |--------------------------------------------------------------------------
          */

          this.creerNouveauPlateau();


          /*
          |--------------------------------------------------------------------------
          | FORCER LE NOUVEAU COMPTEUR À 0
          |--------------------------------------------------------------------------
          */

          this.customers = [];

          this.totallus = 0;

          this.poidsLus = 0;

          this.poidsPlateau = 0;


          console.log(
            '===================================='
          );

          console.log(
            'NOUVEAU DÉCOMPTE'
          );

          console.log(
            'NOUVEAU PLATEAU =',
            this.plateau_id
          );

          console.log(
            'TOTAL =',
            this.totallus
          );

          console.log(
            'POIDS =',
            this.poidsLus
          );

          console.log(
            '===================================='
          );


          await this.message(
            '✓ ' +
            nombreBijoux +
            ' bijou(x) contrôlé(s).\n' +
            'Plateau validé.\n\n' +
            'Nouveau décompte prêt.',
            'success'
          );


          /*
          |--------------------------------------------------------------------------
          | STATS GLOBALes
          |--------------------------------------------------------------------------
          */

          this.loadStats();

          this.loadStatsPersonnel();


          /*
          |--------------------------------------------------------------------------
          | IMPORTANT :
          | NE PAS FAIRE actualiserInventaire()
          |--------------------------------------------------------------------------
          |
          | Le nouveau plateau est volontairement vide.
          |
          */


          return;

        }


        /*
        |--------------------------------------------------------------------------
        | ERREUR SERVEUR
        |--------------------------------------------------------------------------
        */

        console.error(
          'VALIDATION REFUSÉE PAR LE SERVEUR',
          data
        );


        const msg =
          data && data.msg
            ? data.msg
            : 'Le serveur n’a pas pu valider ce plateau.';


        await this.message(
          '✕ ' + msg,
          'danger'
        );

      },


      async (error: any) => {

        this.loading = false;


        console.error(
          'ERREUR API VALIDERTABLEAU',
          error
        );


        await this.message(
          'Erreur de connexion au serveur.',
          'danger'
        );

      }

    );

}

  /* =====================================================
     CONFIRMATION ANCIEN NOM
  ===================================================== */

  async showConfirmvente(): Promise<void> {

    await this.validertableau();

  }


  /* =====================================================
     TEST CONNEXION
  ===================================================== */

  testconnecion(): void {

    this.network
      .onDisconnect()
      .subscribe(() => {

        setTimeout(() => {

          this.dialog.alert(
            'Attention !!! Vous n’avez plus de connexion Internet. Vérifiez votre WiFi ou vos données mobiles.'
          );

        }, 1000);

      });

  }


  /* =====================================================
     RETOUR
  ===================================================== */

  retour(): void {

    this.turnOffTorch();

    this.showCamera = false;

    this.router.navigate([
      '/moninventaire'
    ]);

  }


  /* =====================================================
     RETOUR SCANNER
     
     Ancienne fonction
  ===================================================== */

  retour2(): void {

    this.selectedTab =
      'inventory';

  }


  /* =====================================================
     FERMER CAMERA
  ===================================================== */

  closeCamera(): void {

    this.turnOffTorch();

    this.showCamera = false;

    this.scanEnCours = false;


    this.retour();

  }


  /* =====================================================
     FERMER / DEMARRER SCANNER
     
     Compatible avec ton ancien HTML :

     closeCamera2()
  ===================================================== */

  async closeCamera2(): Promise<void> {

    this.showCamera = false;

    this.scanEnCours = false;

    this.turnOffTorch();


    /*
     * Petit délai pour laisser le plugin
     * fermer proprement la caméra.
     */

    setTimeout(() => {

      this.demarrerScanner();

    }, 250);

  }


  /* =====================================================
     AJOUT CLIENT
     
     Compatibilité ancien code
  ===================================================== */

  addCustomer(): void {

    this.router.navigate([
      '/scanbijoux'
    ]);

  }


  /* =====================================================
     CHARGEMENT
  ===================================================== */

  async presentLoading(): Promise<void> {

    await this.message(
      'Chargement...',
      'primary'
    );

  }


  /* =====================================================
     ANCIEN QRCODE EXIST
  ===================================================== */

  async qrcodeexist(): Promise<void> {

    await this.validerBijou();

  }


}