import { Component, OnInit } from '@angular/core';
import { NavigationService } from '@app/navigation/navigation.service';
import { Navigation } from '@shared/modules/navigation/navigation.enum';
import { SelectorFoldersService } from '@app/selector-folders/selector-folders.service';
import { Router } from '@angular/router';

@Component({
  selector: 'disarm-selector-folders',
  templateUrl: './selector-folders.component.html',
  styleUrls: ['./selector-folders.component.scss'],
})
export class SelectorFoldersComponent implements OnInit {
  constructor(
    private router: Router,
    private navigationService: NavigationService,
    private selectorFoldersService: SelectorFoldersService
  ) {}

  ngOnInit(): void {
    this.navigationService.setNavigation(Navigation.DEFAULT);
  }

  async select() {
    const dialog = await this.selectorFoldersService.selectFolders();
    if (!dialog.canceled) {
      this.router.navigate(['/', 'process']).catch();
    }
  }
}
