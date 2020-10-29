/*
============================================
; Title:  about.component.ts
; Authors: Nicole Forke, Janet Blohn, and Joann Saeou
; Date:   28 October 2020
; Added By: Janet Blohn
; Description: Bob's Computer Repair Services Project
; Typescript for About Component
============================================
*/

/* Import required modules from Angular */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
