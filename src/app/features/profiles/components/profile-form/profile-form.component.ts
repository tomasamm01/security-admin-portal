import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models/profile.model';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {
  profileForm: FormGroup;
  idProfile: number | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.profileForm = this.fb.group({
      nombrePerfil: ['', [Validators.required]],
      descripcion: [''],
      activo: [true]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.idProfile = +id;
      this.loadProfile();
    }
  }

  loadProfile(): void {
    if (!this.idProfile) return;

    this.loading = true;
    this.error = null;

    this.profileService.getProfileById(this.idProfile).subscribe({
      next: (profile) => {
        this.profileForm.patchValue(profile);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar el perfil';
        this.loading = false;
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = null;

    const profile: Profile = this.profileForm.value;
    
    if (this.idProfile) {
      profile.idProfile = this.idProfile;
    }

    const operation = this.idProfile
      ? this.profileService.updateProfile(profile)
      : this.profileService.createProfile(profile);

    operation.subscribe({
      next: () => {
        this.router.navigate(['/perfiles']);
      },
      error: (err) => {
        this.error = `Error al ${this.idProfile ? 'actualizar' : 'crear'} el perfil`;
        this.loading = false;
        console.error(err);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/perfiles']);
  }
}
