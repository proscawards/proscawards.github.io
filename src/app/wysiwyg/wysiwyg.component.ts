import { Component, Host, HostListener, Inject, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { DOCUMENT } from '@angular/common';
import { WINDOW } from "../services/window.service";

interface Css {
  key: string,
  value: string
}

interface Style {
  isActive: boolean,
  tag: string[],
  css: Css[]
}

interface SubString {
  value: string,
  tag: string[],
}

@Component({
  selector: 'wysiwyg',
  templateUrl: './wysiwyg.component.html',
  styleUrls: ['./wysiwyg.component.scss']
})

export class WysiwygComponent implements OnInit {

  private isBold: Style;
  private isItalic: Style;
  private isUnderline: Style;
  private isOverline: Style;
  private isLinethrough: Style;
  private isSub: Style;
  private isSup: Style;
  private isCapitalize: Style;
  private isUppercase: Style;
  private isLowercase: Style;
  private isAlignLeft: Style;
  private isAlignCenter: Style;
  private isAlignRight: Style;
  private isAlignJustify: Style;
  private isOrderedList: Style;
  private isUnorderedList: Style;
  private subString: SubString;
  private substrStart: number;
  private substrEnd: number;
  private istextDecorActive: boolean;
  private istextTransformActive: boolean;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window,
  ) { 
    this.subString = {value: "", tag: ["<s_>", "<_s>"]};
    this.isBold = {isActive: false, tag: ["font-weight:bold;"], css: [{key: "font-weight", value: "normal"},{key: "font-weight", value: "bold"}]};
    this.isItalic = {isActive: false, tag: ["font-style:italic;"], css: [{key: "font-style", value: "normal"},{key: "font-style", value: "italic"}]};
    this.isUnderline = {isActive: false, tag: ["text-decoration:underline;", "underline"], css: [{key: "text-decoration", value: "none"},{key: "text-decoration", value: "underline"}]};
    this.isOverline = {isActive: false, tag: ["text-decoration:overline;", "overline"], css: [{key: "text-decoration", value: "none"},{key: "text-decoration", value: "overline"}]};
    this.isLinethrough = {isActive: false, tag: ["text-decoration:line-through;", "line-through"], css: [{key: "text-decoration", value: "none"},{key: "text-decoration", value: "line-through"}]};
    this.isSub = {isActive: false, tag: ["vertical-align:sub;"], css: [{key: "vertical-align", value: "initial"},{key: "vertical-align", value: "sub"}]};
    this.isSup = {isActive: false, tag: ["vertical-align:super;"], css: [{key: "vertical-align", value: "initial"},{key: "vertical-align", value: "super"}]};
    this.isCapitalize = {isActive: false, tag: ["text-transform:capitalize;"], css: [{key: "text-transform", value: "none"},{key: "text-transform", value: "capitalize"}]};
    this.isUppercase = {isActive: false, tag: ["text-transform:uppercase;"], css: [{key: "text-transform", value: "none"},{key: "text-transform", value: "uppercase"}]};
    this.isLowercase = {isActive: false, tag: ["text-transform:lowercase;"], css: [{key: "text-transform", value: "none"},{key: "text-transform", value: "lowercase"}]};
    this.isAlignLeft = {isActive: false, tag: ["text-align:left;"], css: [{key: "text-align", value: "initial"},{key: "text-align", value: "left"}]};
    this.isAlignCenter = {isActive: false, tag: ["text-align:center;"], css: [{key: "text-align", value: "initial"},{key: "text-align", value: "center"}]};
    this.isAlignRight = {isActive: false, tag: ["text-align:right;"], css: [{key: "text-align", value: "initial"},{key: "text-align", value: "right"}]};
    this.isAlignJustify = {isActive: false, tag: ["text-align:justify;"], css: [{key: "text-align", value: "initial"},{key: "text-align", value: "justify"}]};
    this.isOrderedList = {isActive: false, tag: ["list-style-type:upper-roman;"], css: [{key: "list-style-type", value: "none"},{key: "list-style-type", value: "upper-roman"}]};
    this.isUnorderedList = {isActive: false, tag: ["list-style-type:circle;"], css: [{key: "list-style-type", value: "none"},{key: "list-style-type", value: "circle"}]};
    this.substrStart = 0; this.substrEnd = 0;
    this.istextDecorActive = false;
    this.istextTransformActive = false;
  }

  ngOnInit(): void {
  }

  @HostListener('window.mouseup', ['$event'])
  onGetSelection(e: any){
    this.outOfFocus();
    var html: any = this.window.getSelection() || this.document.getSelection() || "";
    this.subString.value = html.toString(); 
    var str = $("#raw").text();
    this.substrStart = str.indexOf(this.subString.value);
    this.substrEnd = this.substrStart + this.subString.value.length;
    console.log(this.substrStart+","+this.substrEnd)
    if ((this.substrStart == 0 && this.substrEnd == 0)){
      $("#raw").text(str.replace(/(\<s_>|\<_s>)+/gmi, ''))
    }
    else{
      this.preprocessHighlight($("#raw").text(), this.subString.value)
    }
    $("#highlight").html(this.subString.value+" length ("+this.subString.value.length+")");
  }

  @HostListener('document:click', ['$event'])
  domOnClick(e: any){
    console.log(e.target.id)
    if (e.target.id != $("#wysiwyg").attr('id')){
      $("#raw").text($("#raw").text().replace(/(\<s_>|\<_s>)+/gmi, ''))
    }
  }

  preprocessHighlight(str: string, substr: string){
    $("#raw").text(str.substring(0, this.substrStart)+this.subString.tag[0]+substr+this.subString.tag[1]+str.substring(this.substrEnd))
  }

  textareaOnChange(e: any){
    if ($(`#wysiwyg`).html()){
      $("#raw").text("");
    }
    if ($("#raw").text().indexOf("<span style='") !== -1){
      let spanStartTag = $("#raw").text().lastIndexOf("'>"); //<span style=''>
      let spanEndTag = $("#raw").text().indexOf("</span>"); //</span>
      let spanStartLen = spanStartTag + "'>".length;
      let spanEndLen = spanEndTag + "</span>".length;
      $("#raw").text($("#raw").text().substring(0, spanStartLen)+$("#wysiwyg").html()+$("#raw").text().substring(spanEndLen)); 
      //Replace <div> with <br/> since trigger event for Shift+Enter is not working
      if (!this.isOrderedList.isActive && !this.isUnorderedList.isActive){
        $("#raw").text($("#raw").text().replace(/(\r\n|\n|\r|<br>)/gm, "<br/>").replace(/(\<div>)/gmi, "<br/>").replace(/(<\/div>)/gmi, ""));
      }
      else{
        $("#raw").text($("#raw").text().replace(/(\r\n|\n|\r|<br>)/gm, "<br/>").replace(/(\<div>)/gmi, "<li>").replace(/(<\/div>)/gmi, "</li>"));
      }
    }
    else{
      if (!this.isOrderedList.isActive && !this.isUnorderedList.isActive){
        $("#raw").text(""+$("#wysiwyg").html().replace(/(\r\n|\n|\r|<br>)/gm, "<br/>").replace(/(\<div>)/gmi, "<br/>").replace(/(<\/div>)/gmi, ""));
      }
      else{
        $("#raw").text(""+$("#wysiwyg").html().replace(/(\r\n|\n|\r|<br>)/gm, "<br/>").replace(/(\<div>)/gmi, "<li>").replace(/(<\/div>)/gmi, "</li>"));
      }

    }
    
    $("#formatted").html(""+$("#raw").text());
    this.btnOnClick()
  }

  textareaOnBlur(e: any){
    $("#raw").text($("#raw").text().replace(/(\<s_>|\<_s>)+/gmi, ''))
  }

  textareaOnClick(e: any){

  }

  textareaOnKeyPress(e: KeyboardEvent){
    
  }

  textareaOnKeydown(e: KeyboardEvent){
    //this.fireOnEnter(e);
    //console.log('Caret at: ', this.getCaretCharOffset(this.document.querySelector("#wysiwyg")))
    console.log($("#raw").text())
  }

  fireOnEnter(e: any){
    if (e.key == "Enter" && !e.shiftKey) {
      let elem: any = document.querySelector("#wysiwyg")
      elem.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter', shiftKey: true}));
      elem.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter', shiftKey: true}));
      elem.onkeydown = function(e:any){console.log(e.key,e.shiftKey)}
      //var event = $.Event("keydown", { 'key': "Enter", shiftKey: true})
      //$("#wysiwyg").trigger(event);
      //console.log('enter only')
      //this.addElementAtPos("<br/>", this.getCaretCharOffset(elem))
    } else if (e.key == "Enter" && e.shiftKey) {
      console.log('shift + enter');
    }
  }

  outOfFocus(){
    if (this.istextDecorActive){this.textDecorOnClick()}
    if (this.istextTransformActive){this.textTransformOnClick()}
  }

  getCaretCharOffset(element: any) {
    var caretOffset = 0;
    var document: any = this.document;
    var window: any = this.window;
  
    if (window.getSelection) {
      var range: any = window.getSelection().getRangeAt(0);
      var preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(element);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      caretOffset = preCaretRange.toString().length;
    } 
  
    else if (document.getSelection() && document.getSelection().type != "Control") {
      var textRange: any = document.getSelection().createRange();
      var preCaretTextRange: any = document.body.createTextRange();
      preCaretTextRange.moveToElementText(element);
      preCaretTextRange.setEndPoint("EndToEnd", textRange);
      caretOffset = preCaretTextRange.text.length;
    }
  
    return caretOffset;
  }

  addElementAtPos(element: any, pos: any){
    let start = pos;
    console.log(start)
    var text = $("#raw").text().substring(0, start)+element+$("#raw").text().substring(start);
    console.log(text)
    $("#raw").text($("#wysiwyg").html().substring(0, start)+element+$("#wysiwyg").html().substring(start)); 
  }

  setActiveClass(){
    this.isBold.isActive ? $("#boldBtn").addClass("active") : $("#boldBtn").removeClass("active");
    this.isItalic.isActive ? $("#italicBtn").addClass("active") : $("#italicBtn").removeClass("active");
    this.isUnderline.isActive ? $("#underlineBtn").addClass("active") : $("#underlineBtn").removeClass("active");
    this.isOverline.isActive ? $("#overlineBtn").addClass("active") : $("#overlineBtn").removeClass("active");
    this.isLinethrough.isActive ? $("#linethroughBtn").addClass("active") : $("#linethroughBtn").removeClass("active");
    this.isSub.isActive ? $("#subBtn").addClass("active") : $("#subBtn").removeClass("active");
    this.isSup.isActive ? $("#supBtn").addClass("active") : $("#supBtn").removeClass("active");
    this.isCapitalize.isActive ? $("#capitalizeBtn").addClass("active") : $("#capitalizeBtn").removeClass("active");
    this.isUppercase.isActive ? $("#uppercaseBtn").addClass("active") : $("#uppercaseBtn").removeClass("active");
    this.isLowercase.isActive ? $("#lowercaseBtn").addClass("active") : $("#lowercaseBtn").removeClass("active");
    this.isLowercase.isActive ? $("#lowercaseBtn").addClass("active") : $("#lowercaseBtn").removeClass("active");
    this.isAlignLeft.isActive ? $("#leftBtn").addClass("active") : $("#leftBtn").removeClass("active");
    this.isAlignCenter.isActive ? $("#centerBtn").addClass("active") : $("#centerBtn").removeClass("active");
    this.isAlignRight.isActive ? $("#rightBtn").addClass("active") : $("#rightBtn").removeClass("active");
    this.isAlignJustify.isActive ? $("#justifyBtn").addClass("active") : $("#justifyBtn").removeClass("active");
    this.isOrderedList.isActive ? $("#olBtn").addClass("active") : $("#olBtn").removeClass("active");
    this.isUnorderedList.isActive ? $("#ulBtn").addClass("active") : $("#ulBtn").removeClass("active");
  }

  setBtnTag(){
    let str = $("#raw").text();
    if (str.indexOf("<span style='") !== -1){
      let spanStart = str.indexOf("<span style='");
      let spanEnd = spanStart + "<span style='".length;
      this.isBold.isActive ? str = str.substring(0, spanStart)+"<span style='"+this.isBold.tag[0]+str.substring(spanEnd) : ''; 
      this.isItalic.isActive ? str = str.substring(0, spanStart)+"<span style='"+this.isItalic.tag[0]+str.substring(spanEnd) : ''; 
      this.isUnderline.isActive ? str = str.substring(0, spanStart)+"<span style='"+this.isUnderline.tag[0]+str.substring(spanEnd) : ''; 
      this.isOverline.isActive ? str = str.substring(0, spanStart)+"<span style='"+this.isOverline.tag[0]+str.substring(spanEnd) : ''; 
      this.isLinethrough.isActive ? str = str.substring(0, spanStart)+"<span style='"+this.isLinethrough.tag[0]+str.substring(spanEnd) : ''; 
      this.isSub.isActive ? str = str.substring(0, spanStart)+"<span style='"+this.isSub.tag[0]+str.substring(spanEnd) : ''; 
      this.isSup.isActive ? str = str.substring(0, spanStart)+"<span style='"+this.isSup.tag[0]+str.substring(spanEnd) : ''; 
      this.isCapitalize.isActive ? str = str.substring(0, spanStart)+"<span style='"+this.isCapitalize.tag[0]+str.substring(spanEnd) : ''; 
      this.isUppercase.isActive ? str = str.substring(0, spanStart)+"<span style='"+this.isUppercase.tag[0]+str.substring(spanEnd) : ''; 
      this.isLowercase.isActive ? str = str.substring(0, spanStart)+"<span style='"+this.isLowercase.tag[0]+str.substring(spanEnd) : ''; 
      this.isAlignLeft.isActive ? str = str.substring(0, spanStart)+"<span style='"+this.isAlignLeft.tag[0]+str.substring(spanEnd) : ''; 
      this.isAlignCenter.isActive ? str = str.substring(0, spanStart)+"<span style='"+this.isAlignCenter.tag[0]+str.substring(spanEnd) : ''; 
      this.isAlignRight.isActive ? str = str.substring(0, spanStart)+"<span style='"+this.isAlignRight.tag[0]+str.substring(spanEnd) : ''; 
      this.isAlignJustify.isActive ? str = str.substring(0, spanStart)+"<span style='"+this.isAlignJustify.tag[0]+str.substring(spanEnd) : ''; 
    }
    else{
      this.isBold.isActive ? str = `<span style='${this.isBold.tag[0]}'>${str}</span>` : ''; 
      this.isItalic.isActive ? str = `<span style='${this.isItalic.tag[0]}'>${str}</span>` : ''; 
      this.isUnderline.isActive ? str = `<span style='${this.isUnderline.tag[0]}'>${str}</span>` : ''; 
      this.isOverline.isActive ? str = `<span style='${this.isOverline.tag[0]}'>${str}</span>` : ''; 
      this.isLinethrough.isActive ? str = `<span style='${this.isLinethrough.tag[0]}'>${str}</span>` : ''; 
      this.isSub.isActive ? str = `<span style='${this.isSub.tag[0]}'>${str}</span>` : ''; 
      this.isSup.isActive ? str = `<span style='${this.isSup.tag[0]}'>${str}</span>` : ''; 
      this.isCapitalize.isActive ? str = `<span style='${this.isCapitalize.tag[0]}'>${str}</span>` : ''; 
      this.isUppercase.isActive ? str = `<span style='${this.isUppercase.tag[0]}'>${str}</span>` : ''; 
      this.isLowercase.isActive ? str = `<span style='${this.isLowercase.tag[0]}'>${str}</span>` : ''; 
      this.isAlignLeft.isActive ? str = `<span style='${this.isAlignLeft.tag[0]}'>${str}</span>` : ''; 
      this.isAlignCenter.isActive ? str = `<span style='${this.isAlignCenter.tag[0]}'>${str}</span>` : ''; 
      this.isAlignRight.isActive ? str = `<span style='${this.isAlignRight.tag[0]}'>${str}</span>` : ''; 
      this.isAlignJustify.isActive ? str = `<span style='${this.isAlignJustify.tag[0]}'>${str}</span>` : ''; 
    }
    this.isOrderedList.isActive ? str = `<ol type='1'>`+str+"</ol>" : ''; 
    this.isUnorderedList.isActive ? str = `<ul style='${this.isUnorderedList.tag[0]}'>`+str+"</ul>" : ''; 
    $("#raw").text(str);
  }

  setBtnStyle(){
    this.isBold.isActive ? $("#wysiwyg").css(this.isBold.css[1].key, this.isBold.css[1].value) : $("#wysiwyg").css(this.isBold.css[0].key, this.isBold.css[0].value); 
    this.isItalic.isActive ? $("#wysiwyg").css(this.isItalic.css[1].key, this.isItalic.css[1].value) : $("#wysiwyg").css(this.isItalic.css[0].key, this.isItalic.css[0].value); 
    var tdValue = "";
    this.isUnderline.isActive ? tdValue+=this.isUnderline.css[1].value : ''; 
    this.isOverline.isActive ? tdValue+=" "+this.isOverline.css[1].value : ''; 
    this.isLinethrough.isActive ? tdValue+=" "+this.isLinethrough.css[1].value : ''; 
    $("#wysiwyg").css(this.isUnderline.css[1].key, tdValue);
    this.isSub.isActive ? $("#wysiwyg").css(this.isSub.css[1].key, this.isSub.css[1].value) : $("#wysiwyg").css(this.isSub.css[0].key, this.isSub.css[0].value); 
    this.isSup.isActive ? $("#wysiwyg").css(this.isSup.css[1].key, this.isSup.css[1].value) : $("#wysiwyg").css(this.isSup.css[0].key, this.isSup.css[0].value); 
    var ttValue = "";
    this.isCapitalize.isActive ? ttValue+=this.isCapitalize.css[1].value : ''; 
    this.isUppercase.isActive ? ttValue+=" "+this.isUppercase.css[1].value : ''; 
    this.isLowercase.isActive ? ttValue+=" "+this.isLowercase.css[1].value : ''; 
    $("#wysiwyg").css(this.isCapitalize.css[1].key, ttValue);
    //this.isCapitalize.isActive ? $("#wysiwyg").css(this.isCapitalize.css[1].key, this.isCapitalize.css[1].value) : $("#wysiwyg").css(this.isCapitalize.css[0].key, this.isCapitalize.css[0].value); 
    //this.isUppercase.isActive ? $("#wysiwyg").css(this.isUppercase.css[1].key, this.isUppercase.css[1].value) : $("#wysiwyg").css(this.isUppercase.css[0].key, this.isUppercase.css[0].value); 
    //this.isLowercase.isActive ? $("#wysiwyg").css(this.isLowercase.css[1].key, this.isLowercase.css[1].value) : $("#wysiwyg").css(this.isLowercase.css[0].key, this.isLowercase.css[0].value); 
    var taValue = "";
    this.isAlignLeft.isActive ? taValue+=this.isAlignLeft.css[1].value : ''; 
    this.isAlignCenter.isActive ? taValue+=" "+this.isAlignCenter.css[1].value : ''; 
    this.isAlignRight.isActive ? taValue+=" "+this.isAlignRight.css[1].value : ''; 
    this.isAlignJustify.isActive ? taValue+=" "+this.isAlignJustify.css[1].value : ''; 
    $("#wysiwyg").css(this.isAlignLeft.css[1].key, taValue);
    //this.isAlignLeft.isActive ? $("#wysiwyg").css(this.isAlignLeft.css[1].key, this.isAlignLeft.css[1].value) : $("#wysiwyg").css(this.isAlignLeft.css[0].key, this.isAlignLeft.css[0].value); 
    //this.isAlignCenter.isActive ? $("#wysiwyg").css(this.isAlignCenter.css[1].key, this.isAlignCenter.css[1].value) : $("#wysiwyg").css(this.isAlignCenter.css[0].key, this.isAlignCenter.css[0].value); 
    //this.isAlignRight.isActive ? $("#wysiwyg").css(this.isAlignRight.css[1].key, this.isAlignRight.css[1].value) : $("#wysiwyg").css(this.isAlignRight.css[0].key, this.isAlignRight.css[0].value); 
    //this.isAlignJustify.isActive ? $("#wysiwyg").css(this.isAlignJustify.css[1].key, this.isAlignJustify.css[1].value) : $("#wysiwyg").css(this.isAlignJustify.css[0].key, this.isAlignJustify.css[0].value); 
  }

  removeBtnStyle(){
    $("#raw").text($("#raw").text().replace(/(font\-weight\:bold\;)+/gmi, ''))
    $("#raw").text($("#raw").text().replace(/(font\-style\:italic\;)+/gmi, ''))
    $("#raw").text($("#raw").text().replace(/(text\-decoration\:underline\;|underline)+/gmi, ''))
    $("#raw").text($("#raw").text().replace(/(text\-decoration\:overline\;|overline)+/gmi, ''))
    $("#raw").text($("#raw").text().replace(/(text\-decoration\:line\-through\;|line\-through)+/gmi, ''))
    $("#raw").text($("#raw").text().replace(/(vertical\-align\:sub\;)+/gmi, ''))
    $("#raw").text($("#raw").text().replace(/(vertical\-align\:super\;)+/gmi, ''))
    $("#raw").text($("#raw").text().replace(/(text\-transform\:capitalize\;)+/gmi, ''))
    $("#raw").text($("#raw").text().replace(/(text\-transform\:uppercase\;)+/gmi, ''))
    $("#raw").text($("#raw").text().replace(/(text\-transform\:lowercase\;)+/gmi, ''))
    $("#raw").text($("#raw").text().replace(/(text\-align\:left\;)+/gmi, ''))
    $("#raw").text($("#raw").text().replace(/(text\-align\:center\;)+/gmi, ''))
    $("#raw").text($("#raw").text().replace(/(text\-align\:right\;)+/gmi, ''))
    $("#raw").text($("#raw").text().replace(/(text\-align\:justify\;)+/gmi, ''))
    $("#raw").text($("#raw").text().replace(/(<span style=''>|<\/span>)+/gmi, ''))
    $("#raw").text($("#raw").text().replace(/(<ul style\='list\-style\-type\:circle\;'>|<\/ul>)+/gmi, ''))
    $("#raw").text($("#raw").text().replace(/(<ol type='1'>|<\/ol>)+/gmi, ''))
    //$("#raw").text($("#raw").text().replace(/(<li>|<\/li>)+/gmi, ''))
  }

  btnOnClick(){
    this.removeBtnStyle();
    this.setActiveClass();
    this.setBtnTag();
    this.setBtnStyle();
    $("#formatted").html(""+$("#raw").text());
  }

  orderedListOnInit(){
    const sourceStr: any = $("#raw").text();
    const searchStr: any = '<br\/>';
    const indexes = [...sourceStr.matchAll(new RegExp(searchStr, 'gmi'))].map(a => a.index);
    console.log("ol", indexes)
    for (let i = 0; i < indexes.length; i++){
      $("#raw").text($("#raw").text().substring(0, indexes[i])+`${i}. `+$("#raw").text().substring(indexes[i]));
      $("#wysiwyg").html($("#raw").text())
      $("#raw").text($("#wysiwyg").html()) 
    }
  }

  unorderedListOnInit(){
    const sourceStr: any = $("#raw").text();
    const searchStr: any = '<br\/>';
    const indexes = [...sourceStr.matchAll(new RegExp(searchStr, 'gmi'))].map(a => a.index);
    for (let i = 0; i < indexes.length; i++){
      $("#raw").text($("#raw").text().substring(0, indexes[i])+"● "+$("#raw").text().substring(indexes[i]));
      $("#wysiwyg").html($("#raw").text()) 
      $("#raw").text($("#wysiwyg").html())
    }
  }

  boldOnClick(e: any){
    this.isBold.isActive ? this.isBold.isActive = false: this.isBold.isActive = true; 
    this.btnOnClick();
  }

  italicOnClick(e: any){
    this.isItalic.isActive ? this.isItalic.isActive = false : this.isItalic.isActive = true; 
    this.btnOnClick();
  }

  underlineOnClick(e: any){
    this.isUnderline.isActive ? this.isUnderline.isActive = false: this.isUnderline.isActive = true;
    this.btnOnClick();
  }

  overlineOnClick(e: any){
    this.isOverline.isActive ? this.isOverline.isActive = false: this.isOverline.isActive = true;
    this.btnOnClick();
  }

  linethroughOnClick(e: any){
    this.isLinethrough.isActive ? this.isLinethrough.isActive = false: this.isLinethrough.isActive = true;
    this.btnOnClick();
  }

  subOnClick(e: any){
    this.isSub.isActive ? this.isSub.isActive = false : this.isSub.isActive = true;
    this.btnOnClick();
  }

  supOnClick(e: any){
    this.isSup.isActive ? this.isSup.isActive = false : this.isSup.isActive = true;
    this.btnOnClick();
  }

  capitalizeOnClick(e: any){
    this.isCapitalize.isActive ? this.isCapitalize.isActive = false : this.isCapitalize.isActive = true;
    this.isUppercase.isActive = false; this.isLowercase.isActive = false;
    this.btnOnClick();
  }

  uppercaseOnClick(e: any){
    this.isUppercase.isActive ? this.isUppercase.isActive = false : this.isUppercase.isActive = true;
    this.isCapitalize.isActive = false; this.isLowercase.isActive = false;
    this.btnOnClick();
  }

  lowercaseOnClick(e: any){
    this.isLowercase.isActive ? this.isLowercase.isActive = false : this.isLowercase.isActive = true;
    this.isCapitalize.isActive = false; this.isUppercase.isActive = false;
    this.btnOnClick();
  }

  leftOnClick(e: any){
    this.isAlignLeft.isActive ? this.isAlignLeft.isActive = false : this.isAlignLeft.isActive = true;
    this.isAlignCenter.isActive = false; this.isAlignRight.isActive = false; this.isAlignJustify.isActive = false;
    this.btnOnClick();
  }

  centerOnClick(e: any){
    this.isAlignCenter.isActive ? this.isAlignCenter.isActive = false : this.isAlignCenter.isActive = true;
    this.isAlignLeft.isActive = false; this.isAlignRight.isActive = false; this.isAlignJustify.isActive = false;
    this.btnOnClick();
  }

  rightOnClick(e: any){
    this.isAlignRight.isActive ? this.isAlignRight.isActive = false : this.isAlignRight.isActive = true;
    this.isAlignLeft.isActive = false; this.isAlignCenter.isActive = false; this.isAlignJustify.isActive = false;
    this.btnOnClick();
  }

  justifyOnClick(e: any){
    this.isAlignJustify.isActive ? this.isAlignJustify.isActive = false : this.isAlignJustify.isActive = true;
    this.isAlignLeft.isActive = false; this.isAlignCenter.isActive = false; this.isAlignRight.isActive = false;
    this.btnOnClick();
  }

  ulOnClick(e: any){
    this.isUnorderedList.isActive ? this.isUnorderedList.isActive = false : this.isUnorderedList.isActive = true;
    this.isOrderedList.isActive = false;
    this.btnOnClick();
  }

  olOnClick(e: any){
    this.isOrderedList.isActive ? this.isOrderedList.isActive = false : this.isOrderedList.isActive = true;
    this.isUnorderedList.isActive = false;
    this.btnOnClick();
  }

  textDecorOnClick(){
    if (!this.istextDecorActive){
      $("#linethroughBtn").fadeIn();
      $("#overlineBtn").fadeIn();
      this.istextDecorActive = true;
    }
    else{
      $("#linethroughBtn").fadeOut();
      $("#overlineBtn").fadeOut();
      this.istextDecorActive = false;
    }
    
  }

  textTransformOnClick(){
    if (!this.istextTransformActive){
      $("#uppercaseBtn").fadeIn();
      $("#lowercaseBtn").fadeIn();
      this.istextTransformActive = true;
    }
    else{
      $("#uppercaseBtn").fadeOut();
      $("#lowercaseBtn").fadeOut();
      this.istextTransformActive = false;
    }
    
  }

}
