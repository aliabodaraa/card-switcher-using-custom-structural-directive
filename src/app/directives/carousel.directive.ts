import {
  Directive,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

class CarouselContext {
  public get $implicit() {
    return this.source;
  }
  public source = '';
  public controller!: { next: () => void; prev: () => void };
  actionsAllowed = { prev: false, next: true };
}
interface ImageEntry {
  source: string;
}

@Directive({
  selector: '[carousel]',
})
export class CarouselDirective implements OnInit, OnChanges {
  private counter = 0;
  private context = new CarouselContext();
  @Input('carouselFrom') images!: ImageEntry[];

  constructor(
    private view_container: ViewContainerRef,
    private template: TemplateRef<CarouselContext>
  ) {
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.context.controller = { next: this.next, prev: this.prev };
  }

  ngOnInit(): void {
    this.view_container.createEmbeddedView(this.template, this.context);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.images.currentValue.length > 0) {
      this.context.source = this.images[this.counter]?.source;
    }
  }

  next(): void {
    if (this.counter <= this.images.length - 1) {
      this.context.source = this.images[++this.counter].source;
      this.context.actionsAllowed.next = true;
      this.context.actionsAllowed.prev = true;

      if (this.counter === this.images.length - 1)
        this.context.actionsAllowed.next = false;
      if (this.counter === 0) this.context.actionsAllowed.prev = false;
    } else this.context.actionsAllowed.next = false;
  }

  prev(): void {
    if (this.counter >= 0) {
      this.context.source = this.images[--this.counter].source;
      this.context.actionsAllowed.prev = true;
      this.context.actionsAllowed.next = true;

      if (this.counter === 0) this.context.actionsAllowed.prev = false;
      if (this.counter === this.images.length - 1)
        this.context.actionsAllowed.next = false;
    } else this.context.actionsAllowed.prev = false;
  }

  static ngTemplateContextGuard(
    dir: CarouselDirective,
    ctx: unknown
  ): ctx is CarouselContext {
    return true;
  }
}
