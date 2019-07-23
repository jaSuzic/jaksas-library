import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.css"]
})
export class SidenavComponent implements OnInit {
  @Output() clicked = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onClick() {
    this.clicked.emit(true);
  }
}
