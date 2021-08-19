import { Component, SecurityContext } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Output } from '@angular/core';
// import { EventEmitter } from 'stream';
import { EventEmitter } from '@angular/core';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
}) 
export class AppComponent {
  title = 'aspose-test-app';

  urlRender = "https://localhost:44393/Home/RenderFile";
  urlGetExcelTabsNames = "https://localhost:44393/Home/GetExcelTabsNames";
  urlFileUpload = "https://localhost:44393/Home/Upload"

  content = "";
  mhtml = "";

  myHTML = "";
  tabListJson: any;

  fileName = "";

  test: any;


  public message = "";
  public progress = 0;
  @Output() public onUploadFinished = new EventEmitter();

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }  

  // getFile() {
  //   this.getExcelFileTabsNames();
  //   this.http.get(this.urlRender, {responseType: 'text'}).toPromise().then(data => {   
  //     this.content = "";
  //     this.myHTML = this.sanitizer.bypassSecurityTrustHtml(data) as string;  
  //     this.content = this.myHTML;      
  //   });
  // }

  // getExcelFileTabsNames() {
  //   this.http.get(this.urlGetClickedTab).toPromise().then(data => {
  //     this.tabListJson = data;
  //   });
  // }


  // getClickedTab(tabName: any) {
  //   // this.getExcelFileTabsNames();  

  //   // this.http.get((this.urlRender + "?tabName=" + tabName), {responseType: 'text'} ).toPromise().then((data: any) => {
  //   //   this.content = "";
  //   //   this.myHTML = this.sanitizer.bypassSecurityTrustHtml(data) as string;  
  //   //   this.content = this.myHTML;  
  //   // });

  //   // this.uploadFile(files:any);
  // }

  
  getExcelFileTabsNames(files: any) {
    if (files.length === 0)
      return;

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    
    this.http.post(this.urlGetExcelTabsNames, formData).toPromise().then(data => {
      this.tabListJson = data;
    });
  }

  public uploadFile = (files:any, tabName:any) => {

    this.content = "";

    if (files.length === 0)
      return;

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    

    let fileExtension = fileToUpload.name.substring(fileToUpload.name.lastIndexOf('.'), fileToUpload.name.length);
    
    if (fileExtension === '.xls' || fileExtension === '.xlsx' || fileExtension === '.xlsm' || fileExtension === '.xlsb') {
      this.getExcelFileTabsNames(files);
    } else {
      this.tabListJson = "";
    }
    // this.http.post(this.urlFileUpload, formData, { reportProgress: true, observe: 'events'})
    this.http.post(this.urlFileUpload + "?tabName=" + tabName, formData, {responseType: 'text'})
    .subscribe((data:any) => {
          this.fileName = fileToUpload.name;
          this.content = "";
          this.myHTML = this.sanitizer.bypassSecurityTrustHtml(data) as string;
          this.content = this.myHTML; 
    })
    // .subscribe((event:any) => {
    //     if (event.type === HttpEventType.UploadProgress) {
    //       this.progress = Math.round(100 * event.loaded / event.total);
    //     }
    //     else if (event.type === HttpEventType.Response) {
    //       this.message = 'Upload Success!!!';
    //       this.onUploadFinished.emit(event.body);

          
    //     }
    // })    


    // this.content = "";
    //       this.myHTML = this.sanitizer.bypassSecurityTrustHtml(data) as string;
    //       this.content = this.myHTML; 
    
  }
}
