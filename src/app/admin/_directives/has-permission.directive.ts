import { Directive, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { AuthorizationService } from '../_services/authorization.service';

@Directive({
  selector: '[hasPermission]',
  standalone: true,
})
export class HasPermissionDirective implements OnInit {
  @Input('hasPermission') permission!: string; // Expecting "Controller.Action"

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthorizationService
  ) {}

  ngOnInit() {
    this.updateView();
  }

  private updateView() {
    if (!this.permission) {
      this.viewContainer.clear();
      return;
    }

    const [controller, action] = this.permission.split('.'); 

    if (!controller || !action) {
      this.viewContainer.clear();
      return;
    }

    const hasAccess = this.authService.hasPermission(controller, action);

    if (hasAccess) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
