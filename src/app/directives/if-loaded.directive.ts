import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

export type Loaded<T> = { type: 'loaded'; data: T };
export type Loading = { type: 'loading' };
export type LoadingState<T> = Loaded<T> | Loading;

@Directive({
  selector: '[ifLoaded]',
})
export class IfLoadedDirective<T> {
  @Input('ifLoaded') set state(state: LoadingState<T>) {
    if (state.type === 'loaded') {
      this.viewContainerRef.createEmbeddedView(this.tpl);
    } else {
      this.viewContainerRef.clear();
    }
  }
  @Input('ifLoadedElse') alternativeTmp: TemplateRef<any> | null = null;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private tpl: TemplateRef<any>
  ) {}

  ngOnInit(): void {
    if (this.alternativeTmp)
      this.viewContainerRef.createEmbeddedView(this.alternativeTmp);
  }

  static ngTemplateGuard_ifLoaded<T>(
    dir: IfLoadedDirective<T>,
    expr: LoadingState<T>
  ): expr is Loaded<T> {
    return true;
  }
}
