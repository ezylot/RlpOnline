import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RaceSelectorComponent} from './character-builder/race-selector/race-selector.component';
import {ZodiacSignComponent} from './character-builder/zodiac-sign/zodiac-sign.component';
import {PerksComponent} from './character-builder/perks/perks.component';
import {EquipmentComponent} from './character-builder/equipment/equipment.component';
import {NameSelectorComponent} from "./character-builder/name-selector/name-selector.component";
import {RouterModule} from "@angular/router";
import {WelcomeComponent} from './welcome/welcome.component';
import {NavigationComponent} from './character-builder/navigation/navigation.component';
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {DragDropModule} from "@angular/cdk/drag-drop";
import { OverviewComponent } from './character-builder/overview/overview.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { QuickOverviewBarComponent } from './character-builder/quick-overview-bar/quick-overview-bar.component';
import {AttributesComponent} from "./character-builder/attributes/attributes.component";

@NgModule({
    declarations: [
        AppComponent,
        NameSelectorComponent,
        RaceSelectorComponent,
        AttributesComponent,
        ZodiacSignComponent,
        PerksComponent,
        EquipmentComponent,
        WelcomeComponent,
        NavigationComponent,
        OverviewComponent,
        QuickOverviewBarComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterModule,
        FormsModule,
        BrowserAnimationsModule,
        MatTooltipModule,
        MatExpansionModule,
        MatIconModule,
        DragDropModule,
        MatSnackBarModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
