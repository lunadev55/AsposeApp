import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  public arrayOfKeys: any;
  tabListJson: any;
  temp = [];
  // array[]: Array<Text>;
  

  url = "https://localhost:44393/Home/GetExcelTabsNames";

  baseURl = "https://localhost:44393/Home/RenderFile"

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  getExcelFileTabsNames() {
    this.http.get(this.url).toPromise().then(data => {
      this.tabListJson = data;

      // this.arrayOfKeys = Object.keys(this.tabListJson);

      // this.arrayOfKeys = data;
      // temp = data.valueOf().fromJson(data);
      // var test = JSON.parse(data.toString());
      // var test = Object.keys(data).map(i => JSON.parse(json[Text[i]]))
    });
  }

  // getClickedTab(tabName: Text) {
  //   this.http.get(this.url, {responseType: 'text'}).toPromise().then(data => {   
  //     this.content = "";
  //     this.myHTML = this.sanitizer.bypassSecurityTrustHtml(data) as string;  
  //     this.content = this.myHTML;      
  //   });
  // }

  // getClickedTab(tabName: Text) {
  //   this.http.get(this.url).toPromise()
  // }

}
