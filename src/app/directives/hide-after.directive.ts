import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

class HideAfterContext {
  public get $implicit() {
    return this.hideAfter;
  }
  public hideAfter = 0; //for using "as" keyword should match the directive input "hideAfter"
  public counter = 0;
}

@Directive({
  selector: '[hideAfter]',
})
export class HideAfterDirective implements OnInit {
  private _delay = 0;
  @Input('hideAfter') set delay(value: number | null) {
    this._delay = value ?? 0;
    this.context.hideAfter = this.context.counter = this._delay / 1000;
  }
  @Input('hideAfterThen') placeholder: TemplateRef<HideAfterContext> | null =
    null;
  private context = new HideAfterContext();

  constructor(
    private view_container: ViewContainerRef,
    private template: TemplateRef<HideAfterContext>
  ) {}
  ngOnInit(): void {
    this.view_container.createEmbeddedView(this.template, this.context);
    const counter_interval_id = setInterval(() => {
      this.context.counter--;
    }, 1000);
    setTimeout(() => {
      this.view_container.clear();
      if (this.placeholder)
        this.view_container.createEmbeddedView(this.placeholder, this.context);
      clearInterval(counter_interval_id);
    }, this._delay);
  }
}
