import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { GithubService } from '../../services/github.service';
import { User } from 'src/app/models/User';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userName: string | undefined;
  user: User | null = null;
  error: null | string = null;

  constructor(
    private ref: ChangeDetectorRef,
    private githubService: GithubService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  handleFind = () => {
    if (this.userName !== undefined) {
      this.githubService.getUserDetails(this.userName).subscribe(
        (user: any) => {
          this.user = user;
          this.error = null;
          this.ref.detectChanges();
        },
        (err) => {
          (this.user = null), (this.error = 'User not found');
          this.ref.detectChanges();
          this.toastr.error('User not found');
        }
      );
    }
  };
}
