import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  name: string = "test";
  lastName: string = "test";
  position: string = "test";

  constructor() {}

  ngOnInit() {}
}
