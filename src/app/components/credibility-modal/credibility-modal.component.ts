import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CaseStudyBlueprint } from '../../../systems.config';

@Component({
  selector: 'app-credibility-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink],
  templateUrl: './credibility-modal.component.html',
  styleUrl: './credibility-modal.component.css'
})
export class CredibilityModalComponent {
  @Input({ required: true }) isOpen = false;
  @Input() title = '';
  @Input() data: CaseStudyBlueprint | null = null;
  @Output() closeModal = new EventEmitter<void>();

  protected activeTab = signal<'blueprint' | 'specs'>('blueprint');

  protected setTab(tab: 'blueprint' | 'specs'): void {
    this.activeTab.set(tab);
  }

  protected close(): void {
    this.closeModal.emit();
  }
}