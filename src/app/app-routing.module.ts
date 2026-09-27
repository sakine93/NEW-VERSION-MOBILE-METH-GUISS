import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'setting', loadChildren: './setting/setting.module#SettingPageModule' },
  { path: 'customer', loadChildren: './customer/customer.module#CustomerPageModule' },
  { path: 'addcustomer', loadChildren: './addcustomer/addcustomer.module#AddcustomerPageModule' },
  { path: 'addcustomer/:id/:name/:desc', loadChildren: './addcustomer/addcustomer.module#AddcustomerPageModule' },
  { path: 'showcustomer/:id', loadChildren: './showcustomer/showcustomer.module#ShowcustomerPageModule' },
  { path: 'updatecustomer/:id/:name/:desc/:prix_du_g/:poids/:location_id', loadChildren: './updatecustomer/updatecustomer.module#UpdatecustomerPageModule' },
  { path: 'scanbijoux', loadChildren: './scanbijoux/scanbijoux.module#ScanbijouxPageModule' },
  { path: 'transfert', loadChildren: './transfert/transfert.module#TransfertPageModule' },
  { path: 'achats', loadChildren: './achats/achats.module#AchatsPageModule' },
  { path: 'scanachats', loadChildren: './scanachats/scanachats.module#ScanachatsPageModule' },
  { path: 'updateachat/:id/:titre', loadChildren: './updateachat/updateachat.module#UpdateachatPageModule' },
  { path: 'paramgrammage', loadChildren: './paramgrammage/paramgrammage.module#ParamgrammagePageModule' },
  { path: 'paramachat', loadChildren: './paramachat/paramachat.module#ParamachatPageModule' },
  { path: 'menu', loadChildren: './menu/menu.module#MenuPageModule' },
  { path: 'historiquevente', loadChildren: './historiquevente/historiquevente.module#HistoriqueventePageModule' },
  { path: 'historiqueachats', loadChildren: './historiqueachats/historiqueachats.module#HistoriqueachatsPageModule' },
  { path: 'inventaire', loadChildren: './inventaire/inventaire.module#InventairePageModule' },
  { path: 'scaninventaire', loadChildren: './scaninventaire/scaninventaire.module#ScaninventairePageModule' },
  { path: 'barcodes', loadChildren: './barcodes/barcodes.module#BarcodesPageModule' },
  { path: 'updateitem/:id/:category/:type_or', loadChildren: './updateitem/updateitem.module#UpdateitemPageModule' },
  { path: 'ventepoids', loadChildren: './ventepoids/ventepoids.module#VentepoidsPageModule' },
  { path: 'titrevendre', loadChildren: './titrevendre/titrevendre.module#TitrevendrePageModule' },
  { path: 'updatecustomerpoids/:id/:name/:desc/:prix_du_g/:location_id', loadChildren: './updatecustomerpoids/updatecustomerpoids.module#UpdatecustomerpoidsPageModule' },
  { path: 'scanninginventaire', loadChildren: './scanninginventaire/scanninginventaire.module#ScanninginventairePageModule' },
  { path: 'historiquerecu', loadChildren: './historiquerecu/historiquerecu.module#HistoriquerecuPageModule' },
  { path: 'updateachatpoids', loadChildren: './updateachatpoids/updateachatpoids.module#UpdateachatpoidsPageModule' },
  { path: 'menubijouterie', loadChildren: './menubijouterie/menubijouterie.module#MenubijouteriePageModule' },
  { path: 'listebijoux/:id/:name/', loadChildren: './listebijoux/listebijoux.module#ListebijouxPageModule' },
  { path: 'transfertmenu', loadChildren: './transfertmenu/transfertmenu.module#TransfertmenuPageModule' },
  { path: 'facturebijoux/:receiving_id', loadChildren: './facturebijoux/facturebijoux.module#FacturebijouxPageModule' },
  { path: 'rapportstock', loadChildren: './rapportstock/rapportstock.module#RapportstockPageModule' },
  { path: 'scanbijouxtransfert', loadChildren: './scanbijouxtransfert/scanbijouxtransfert.module#ScanbijouxtransfertPageModule' },
  { path: 'listetransfert', loadChildren: './listetransfert/listetransfert.module#ListetransfertPageModule' },
  { path: 'transactionspoints', loadChildren: './transactionspoints/transactionspoints.module#TransactionspointsPageModule' },
  { path: 'photo-produit', loadChildren: './photo-produit/photo-produit.module#PhotoProduitPageModule' },
  { path: 'miseajourapk', loadChildren: './miseajourapk/miseajourapk.module#MiseajourapkPageModule' },
  { path: 'updatecustomerpoidsvd/:id/:name/:desc/:prix_du_g/:location_id', loadChildren: './updatecustomerpoidsvd/updatecustomerpoidsvd.module#UpdatecustomerpoidsvdPageModule' },
  { path: 'aida', loadChildren: './aida/aida.module#AidaPageModule' },
  { path: 'faturerecu', loadChildren: './faturerecu/faturerecu.module#FaturerecuPageModule' },
  { path: 'photo-bijoux', loadChildren: './photo-bijoux/photo-bijoux.module#PhotoBijouxPageModule' },
  { path: 'moninventaire', loadChildren: './moninventaire/moninventaire.module#MoninventairePageModule' },
  { path: 'bijouxmanquants', loadChildren: './bijouxmanquants/bijouxmanquants.module#BijouxmanquantsPageModule' },
  { path: 'imagemodal', loadChildren: './imagemodal/imagemodal.module#ImagemodalPageModule' },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
