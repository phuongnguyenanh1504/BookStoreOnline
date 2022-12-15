import { Component, OnInit } from '@angular/core';
import {BookService} from "../../service/book.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  indexPagination = 0;
  id:number;
  books:any;
  bookfind:any;
  quantity:number;
  numberOfModal:number;
  size=5;
  sort="book.name";
  constructor(private bookService:BookService,private activatedRoute: ActivatedRoute, private route: Router) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.getBookByCategory(this.indexPagination,this.sort,this.size,this.id);
    })
  }

  ngOnInit(): void {
    this.getBookByCategory(this.indexPagination,this.sort,this.size,this.id);
    console.log(this.books);
    this.quantity=1;
  }
  // getAll(indexPagination) {
  //   this.bookService.getBook(indexPagination).subscribe(
  //     data => {
  //       this.books = data;
  //       console.log(data);
  //     });
  // }
  sizeNumber: number;

  viewById(id: any) {
    console.log(id);
    if (this.numberOfModal==null){
      this.numberOfModal=id;
      this.quantity=1;
    }
    else if (this.numberOfModal!=id){
      this.quantity=1;
    }
    this.bookService.findById(id).subscribe(
      data=>{
        this.bookfind=data;
        console.log(this.bookfind);
      }
    )

  }

  addValue() {
    this.quantity++;
  }

  MinusValue() {
    if (this.quantity>1){
      this.quantity--;
    }
  }

  onSelected(value: number) {
    this.size=value;
    this.getBookByCategory(this.indexPagination,this.sort,this.size,this.id);
    this.goToPage(0,this.size);
  }

  onSort(value: string) {
    this.sort=value;
    this.getBookByCategory(this.indexPagination,this.sort,this.size,this.id);


  }
  getBookByCategory(page,sort,size,id){
    this.bookService.getBookByCategory(page,sort,size,id).subscribe(data=>{
      this.books=data;
      console.log(data);
    })
  }

  goToPage(pageNumber, sizeNumber) {
    this.sizeNumber=sizeNumber;
    // this.size=sizeNumber;
    this.indexPagination = pageNumber;
    console.log("size"+this.size);
    console.log("page"+this.indexPagination);
    this.getBookByCategory(this.indexPagination,this.sort,sizeNumber,this.id);
  }

  goToNextOrPreviousPage(direction, size) {
    this.sizeNumber=size;
    // this.size=size;

    this.goToPage(direction === 'forward' ? this.indexPagination + 1 : this.indexPagination - 1, size);
  }

}
