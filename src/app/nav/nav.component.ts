import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {FormControl,Validators} from '@angular/forms';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  showSpinner:boolean=true;
  arr:string[]=["Bengaluru","Hyderabad","Chennai","Delhi","Mumbai"];
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  cityFormControl = new FormControl('', [
    Validators.required,
  ]);
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
  constructor(private breakpointObserver: BreakpointObserver) {
    setInterval(()=>{
      this.showSpinner=false;
    },10000);
    }
  }
 
