import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MaterialService } from '../shared/classes/material.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  aSub: Subscription 

  constructor(private auth: AuthService, 
              private router: Router, 
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });

    this.route.queryParams.subscribe((params: Params) => {
      if (params['registred'])
        MaterialService.toast('Теперь вы можете войти в систему используя свои данные');
      else if (params['accessDenied'])
        MaterialService.toast('Для начала авторизируйтесь в системе');
      else if (params['sessionFailed'])
      MaterialService.toast('Пожалуйста войдите в систему заного');
    });
  }

  ngOnDestroy() {
    this.aSub && this.aSub.unsubscribe();
  }

  onSubmit() {
    this.form.disable();
    this.aSub = this.auth.login(this.form.value).subscribe(
      () => this.router.navigate(['/overview']),
      error => {
        MaterialService.toast(error.error.message);
        this.form.enable();
      }
    )
  }
}
