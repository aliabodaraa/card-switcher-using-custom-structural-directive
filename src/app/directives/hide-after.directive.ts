import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

class HideAfterContext {
  public hideAfter = 0; //for using "as" keyword should match the directive input "hideAfter"
}

@Directive({
  selector: '[hideAfter]',
})
export class HideAfterDirective implements OnInit {
  private _delay = 0;
  @Input('hideAfter') set delay(value: number | null) {
    this._delay = value ?? 0;
    this.context.hideAfter = this._delay / 1000;
  }
  @Input('hideAfterThen') placeholder: TemplateRef<any> | null = null;
  private context = new HideAfterContext();

  constructor(
    private view_container: ViewContainerRef,
    private template: TemplateRef<any>
  ) {}
  ngOnInit(): void {
    this.view_container.createEmbeddedView(this.template, this.context);
    setTimeout(() => {
      this.view_container.clear();
      if (this.placeholder)
        this.view_container.createEmbeddedView(this.placeholder);
    }, this._delay);
  }
}
