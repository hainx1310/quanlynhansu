import { Component, OnInit, Inject } from '@angular/core';
import { Career } from 'src/app/model/Career';
import { CareerService } from 'src/app/services/career.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-career-details',
  templateUrl: './career-details.component.html',
  styleUrls: ['./career-details.component.css']
})
export class CareerDetailsComponent implements OnInit {

  // khai bao bien
  private career: Career;
  private careerId;

  constructor(
    @Inject(CareerService) private careerService: CareerService,
    @Inject(ActivatedRoute) private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.careerId = this.route.snapshot.paramMap.get('id');
    this.initData();
  }

  initData() {
    this.careerService.getCareerById(this.careerId).subscribe(res => {
      this.career = res;
    }, error => {

    });
  }

}
