import { Component, OnInit } from '@angular/core';
import { ClientenodeService } from 'src/app/service/clientenode.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styles: [
  ]
})
export class CategoriaComponent implements OnInit {

  title='CATEGORIAS'
  categorias:any
  myFormCategoria: FormGroup;
  constructor(public servc:ClientenodeService) { 
  }

  ngOnInit(): void {
    this.obtenerCategorias();
    this.myFormCategoria = new FormGroup({
      nombreF: new FormControl(''),
    });
  }
  obtenerCategorias(){
    this.servc.getCategorias().subscribe(r=>{
      console.table(r.categorias)
      return this.categorias=r.categorias
     })
  }

  ingresarCategoria(){
    let nombre = this.myFormCategoria.value.nombreF;

    this.servc.addCategoria(nombre)
    .subscribe(r =>{
      this.obtenerCategorias()
      this.myFormCategoria = new FormGroup({
        nombreF: new FormControl('')
      });
    })
}

}
