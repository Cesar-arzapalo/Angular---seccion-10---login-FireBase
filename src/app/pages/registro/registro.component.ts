import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme = false;

  constructor(private auth: AuthService, private router: Router) {
    this.usuario = new UsuarioModel();
  }

  ngOnInit() { }

  onSubmit(formulario: NgForm) {

    if (formulario.invalid) {
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor'
    });
    Swal.showLoading();

    this.auth.register(this.usuario)
      .subscribe( respuesta => {
        console.log(respuesta);
        Swal.close();

        if ( this.recordarme) {
          localStorage.setItem('email', this.usuario.email);
        }


        this.router.navigateByUrl('/home');
      }, err => {
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar',
          text: err.error.error.message
        });
        console.log(err.error.error.message);
      });
    console.log('Formulario envidao');
    console.log(this.usuario);
    console.log(formulario);
  }

}
