import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { BUDGET_OPTIONS, SCOPE_OPTIONS, SITE } from '../../../systems.config';
import { swapIn } from '../../core/animations';
import { IconComponent } from '../../shared/icon/icon.component';

type Field = 'name' | 'email' | 'scope' | 'budget' | 'brief';

/** Project intake form. Validates, then opens a prepared email to the corporate inbox (no backend required). */
@Component({
  selector: 'app-contact-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, IconComponent],
  animations: [swapIn],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent {
  protected readonly site = SITE;
  protected readonly scopes = SCOPE_OPTIONS;
  protected readonly budgets = BUDGET_OPTIONS;
  protected readonly maxBrief = 2000;

  protected readonly submitted = signal(false);
  protected readonly copied = signal(false);
  protected readonly briefText = signal('');

  private readonly fb = inject(FormBuilder);
  private readonly doc = inject(DOCUMENT);
  private readonly route = inject(ActivatedRoute);

  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
    email: ['', [Validators.required, Validators.email]],
    scope: ['', Validators.required],
    budget: ['', Validators.required],
    brief: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(this.maxBrief)]]
  });

  constructor() {
    const scope = this.route.snapshot.queryParamMap.get('scope');
    if (scope && SCOPE_OPTIONS.some(s => s.value === scope)) this.form.patchValue({ scope });
  }

  protected invalid(name: Field): boolean {
    const c = this.form.controls[name];
    return c.invalid && (c.touched || c.dirty);
  }

  protected get briefLength(): number { return this.form.controls.brief.value.length; }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.doc.querySelector<HTMLElement>('.field--error input, .field--error select, .field--error textarea')?.focus();
      return;
    }
    const v = this.form.getRawValue();
    const scopeLabel = SCOPE_OPTIONS.find(s => s.value === v.scope)?.label ?? v.scope;
    const body = `Name: ${v.name}\nCorporate email: ${v.email}\nProject scope: ${scopeLabel}\nBudget range: ${v.budget}\n\nTechnical brief:\n${v.brief}`;
    this.briefText.set(body);
    this.submitted.set(true);

    const href = `mailto:${SITE.email}?subject=${encodeURIComponent(`Project inquiry: ${scopeLabel}`)}&body=${encodeURIComponent(body)}`;
    this.doc.defaultView?.location.assign(href);
  }

  protected async copyBrief(): Promise<void> {
    try {
      await this.doc.defaultView?.navigator.clipboard.writeText(`To: ${SITE.email}\n\n${this.briefText()}`);
      this.copied.set(true);
      this.doc.defaultView?.setTimeout(() => this.copied.set(false), 2200);
    } catch { /* clipboard unavailable: the brief stays visible for manual copy */ }
  }

  protected reset(): void {
    this.form.reset({ name: '', email: '', scope: this.form.controls.scope.value, budget: '', brief: '' });
    this.submitted.set(false);
  }
}
