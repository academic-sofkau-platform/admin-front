import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-aprendices-training-activos-modal',
  templateUrl: './add-aprendices-training-activos-modal.component.html',
  styleUrls: ['./add-aprendices-training-activos-modal.component.css']
})
export class AddAprendicesTrainingActivosModalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  trainingId(): void {
    console.log("id training:");
  }
}
