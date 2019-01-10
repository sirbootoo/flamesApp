import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  isFormOpened: boolean = false;
  crushForm: FormGroup;
  isLoading: boolean = false;
  isBigLoading: boolean = false;

  crushName: any;
  myName: any;

  flameName: any;
  flameDescription: any;

  isResultOpened: boolean = false;

  constructor(private formbuilder: FormBuilder) {
    this.crushForm = this.formbuilder.group({
      crush: ['', Validators.required],
      perName: ['', Validators.required],
    });
  }

  openForm() {
    this.isFormOpened = !this.isFormOpened;
  }

  submitForm() {
    console.log(this.crushForm);
    this.isLoading = true;
    if (this.crushForm.invalid) {
      return;
    } else {
      const crush = this.crushForm.controls["crush"].value.toLowerCase();
      const perName = this.crushForm.controls["perName"].value.toLowerCase();

      let flame = [
        { name: 'Friends', numbers: [0, 6, 12], description: 'Oh well! Either one of you have been made the Executive head of the friend zone.' },
        { name: 'Lovers', numbers: [1, 7, 13], description: 'Oh lucky you! You guys have something that we hardly have in this generation. You both should cherish it and I hope it last forever.' },
        { name: 'Admirers', numbers: [2, 8, 14], description: 'Oh! Oh!! I guess someone has a Secret Admirer.' },
        { name: 'Marriage', numbers: [3, 9, 15], description: 'Oh boy!!! This is a strong one. You both are so sprung on each other you guys should get married already if you are not married already.' },
        { name: 'Enemies', numbers: [4, 10, 16], description: 'I am sure you were expecting something like Marriage yeah?? But yikes!! You guys hate each others guts. Really dunno what can help both of you though.' },
        { name: 'Siblings', numbers: [5, 11, 17], description: 'Mehn!! This will only feel somehow if you had intentions. But I guess you have been made brother/sister of each other. Enjoy the family zone. And this zone is one that cannot be broken, once a brother always a brother.' }
      ];

      console.log(crush, perName);

      let ArrVar1 = crush.split('');
      let ArrVar2 = perName.split('');

      let myArray = ArrVar1.filter(function (el) {
        return ArrVar2.indexOf(el) < 0;
      });

      let myArray2 = ArrVar2.filter(function (el) {
        return ArrVar1.indexOf(el) < 0;
      });

      myArray.push(...myArray2);

      for (let i = 0; i < flame.length; i++) {
        let coo = flame[i].numbers;
        let ki = flame[i].numbers.indexOf(myArray.length);
    
        if (ki > -1) {
          console.log(flame[i].name);
          this.flameName = flame[i].name;
          this.flameDescription = flame[i].description;

          this.crushName = crush;
          this.myName = perName;

          var flameUrl = 'https://flamesng.herokuapp.com/?val1='+crush+'&val2='+perName;
          var text;
          if(flame[i].name.toLowerCase() == 'marriage'){
            text = 'I just found out that '+crush+' & '+perName+' are ripe for '+flame[i].name+'. You can check this out at';
          }else if(flame[i].name.toLowerCase() == 'friends'){
            text = 'I just found out that '+crush+' & '+perName+' have either one in '+flame[i].name+' zone. You can check this out at';
          }else if(flame[i].name.toLowerCase() == 'lovers'){
            text = 'I just found out that '+crush+' & '+perName+' are '+flame[i].name+'. You can check this out at';
          }else if(flame[i].name.toLowerCase() == 'admirers' || flame[i].name.toLowerCase() == 'enemies' || flame[i].name.toLowerCase() == 'siblings'){
            text = 'I just found out that '+crush+' & '+perName+' are '+flame[i].name+'. You can check this out at';
          }
          this.isBigLoading = false;
          this.isFormOpened = false;
          this.isResultOpened = true;
          
          // var sharingurlFacebook = 'http://www.facebook.com/sharer.php?u='+encodeURIComponent(flameUrl);
          // var twitterInfo = 'text='+encodeURIComponent(text)+'&amp;url='+encodeURIComponent(flameUrl)+'&amp;hashtags=flamesMatch';
          // var sharingurlTwitter = 'https://twitter.com/share?'+twitterInfo; 
          // $('.icon--twitter a').attr('href', sharingurlTwitter);
          // $('.icon--facebook a').attr('href', sharingurlFacebook);
          // $('.answer').slideDown();
          // $('.rrssb-buttons').fadeIn();
        }
      }



    }
  }

  goTo(page) {
    switch (page) {
      case "home":
          this.isFormOpened = false;
          this.isResultOpened = false;
          this.isBigLoading = false;
        break;
      case "form":
          this.isFormOpened = true;
          this.isResultOpened = false;
          this.isBigLoading = false;
        break;
    
      default:
        break;
    }
  }

}
