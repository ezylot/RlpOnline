import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NameSelectorComponent} from "./character-builder/name-selector/name-selector.component";
import {EquipmentComponent} from "./character-builder/equipment/equipment.component";
import {PerksComponent} from "./character-builder/perks/perks.component";
import {RaceSelectorComponent} from "./character-builder/race-selector/race-selector.component";
import {ZodiacSignComponent} from "./character-builder/zodiac-sign/zodiac-sign.component";
import {WelcomeComponent} from "./welcome/welcome.component";
import {OverviewComponent} from "./character-builder/overview/overview.component";
import {AttributesComponent} from "./character-builder/attributes/attributes.component";
import {LanguagesComponent} from "./character-builder/languages/languages.component";
import {BackgroundsComponent} from "./character-builder/backgrounds/backgrounds.component";

const routes: Routes = [
    { path: "",                                   component: WelcomeComponent },
    { path: "character-builder",                  component: NameSelectorComponent },
    { path: "character-builder/attributes",       component: AttributesComponent },
    { path: "character-builder/equipment",        component: EquipmentComponent },
    { path: "character-builder/name-selector",    component: NameSelectorComponent },
    { path: "character-builder/perks",            component: PerksComponent },
    { path: "character-builder/martial-perks",    component: PerksComponent },
    { path: "character-builder/magical-perks",    component: PerksComponent },
    { path: "character-builder/skill-perks",      component: PerksComponent },
    { path: "character-builder/race-selector",    component: RaceSelectorComponent },
    { path: "character-builder/zodiac-sign",      component: ZodiacSignComponent },
    { path: "character-builder/background",       component: BackgroundsComponent },
    { path: "character-builder/languages",        component: LanguagesComponent },
    { path: "character-builder/overview",         component: OverviewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
