import { Component } from '@angular/core';
import { LoadingState } from './directives/if-loaded.directive';
export type Person = { name: string };
@Component({
  selector: 'app-root',
  template: `
    <section *ifLoaded="state; else alt_tmp">
      Data was Loaded . User name:{{ state.data.name }}
    </section>
    <ng-template #alt_tmp>alternative_tmp {{ state.type }}</ng-template>
  `,
})
export class AppComponent {
  state: LoadingState<Person> = {
    type: 'loading',
  };
  ngOnInit(): void {
    setTimeout(() => {
      this.state = {
        type: 'loaded',
        data: { name: 'Ali Abodaraa' },
      };
    }, 2000);
  }
}
