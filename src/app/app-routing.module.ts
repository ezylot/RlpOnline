import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NameSelectorComponent} from "./character-builder/name-selector/name-selector.component";
import {EquipmentComponent} from "./character-builder/equipment/equipment.component";
import {PerksComponent} from "./character-builder/perks/perks.component";
import {RaceSelectorComponent} from "./character-builder/race-selector/race-selector.component";
import {ZodiacSignComponent} from "./character-builder/zodiac-sign/zodiac-sign.component";
import {OverviewComponent} from "./character-builder/overview/overview.component";
import {AttributesComponent} from "./character-builder/attributes/attributes.component";
import {LanguagesComponent} from "./character-builder/languages/languages.component";
import {BackgroundsComponent} from "./character-builder/backgrounds/backgrounds.component";
import {CultureComponent} from "./character-builder/culture/culture.component";
import {ItemsComponent} from "./character-builder/items/items.component";

const routes: Routes = [
    { path: "",                                             component: NameSelectorComponent },
    { path: "character-builder",                            component: NameSelectorComponent },
    { path: "character-builder/attributes",                 component: AttributesComponent },
    { path: "character-builder/name-selector",              component: NameSelectorComponent },

    { path: "character-builder/armor/armor",                component: EquipmentComponent },
    { path: "character-builder/armor/simple-weapon",        component: EquipmentComponent },
    { path: "character-builder/armor/regular-weapon",       component: EquipmentComponent },
    { path: "character-builder/armor/unusual-weapon",       component: EquipmentComponent },
    { path: "character-builder/armor/shields",              component: EquipmentComponent },
    { path: "character-builder/armor/hat",                  component: EquipmentComponent },
    { path: "character-builder/armor/gloves",               component: EquipmentComponent },
    { path: "character-builder/armor/boots",                component: EquipmentComponent },
    { path: "character-builder/armor/rings",                component: EquipmentComponent },
    { path: "character-builder/armor/necklaces",            component: EquipmentComponent },
    { path: "character-builder/armor/belts",                component: EquipmentComponent },

    { path: "character-builder/items/mundane-objects",      component: ItemsComponent },
    { path: "character-builder/items/consumables",          component: ItemsComponent },
    { path: "character-builder/items/containers",           component: ItemsComponent },
    { path: "character-builder/items/potions",              component: ItemsComponent },

    { path: "character-builder/perks",                      component: PerksComponent },
    { path: "character-builder/martial-perks",              component: PerksComponent },
    { path: "character-builder/odem-perks",                 component: PerksComponent },
    { path: "character-builder/maneuvers",                  component: PerksComponent },
    { path: "character-builder/magical-perks",              component: PerksComponent },
    { path: "character-builder/divine-perks",               component: PerksComponent },
    { path: "character-builder/skill-perks",                component: PerksComponent },

    { path: "character-builder/race-selector",              component: RaceSelectorComponent },
    { path: "character-builder/zodiac-sign",                component: ZodiacSignComponent },
    { path: "character-builder/background",                 component: BackgroundsComponent },
    { path: "character-builder/culture",                    component: CultureComponent },
    { path: "character-builder/languages",                  component: LanguagesComponent },
    { path: "character-builder/overview",                   component: OverviewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
