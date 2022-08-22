import {Component, OnDestroy, OnInit} from '@angular/core';
import {CharacterStorageService} from "../../services/character-storage.service";
import {Observable, Subject, take, takeUntil} from "rxjs";
import {Character} from "../../classes/character";
import {CharacterInjectingComponent} from "../CharacterInjectingComponent";

@Component({
  selector: 'quick-overview-bar',
  templateUrl: './quick-overview-bar.component.html',
  styleUrls: ['./quick-overview-bar.component.scss']
})
export class QuickOverviewBarComponent extends CharacterInjectingComponent{

}
