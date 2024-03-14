import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[hideAfter]',
})
export class HideAfterDirective implements OnInit {
  @Input('hideAfter') delay = 0;
  @Input('hideAfterThen') placeholder: TemplateRef<any> | null = null;
  constructor(
    private view_container: ViewContainerRef,
    private template: TemplateRef<any>
  ) {}
  ngOnInit(): void {
    this.view_container.createEmbeddedView(this.template);
    setTimeout(() => {
      this.view_container.clear();
      if (this.placeholder)
        this.view_container.createEmbeddedView(this.placeholder);
    }, this.delay);
  }
}
