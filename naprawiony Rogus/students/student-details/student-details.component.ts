import { Component, OnInit, Input } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Student } from '../student';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  @Input() student: Student | undefined;

  constructor(private studentService: StudentService) { }

  ngOnInit() {
  }

  deleteStudent() {
    if (confirm("You are trying to delete one of your students!") this.studentService.delete(this.student);
    else allert("You made a better choice!");
    // TODO: check syntax
  }

}
