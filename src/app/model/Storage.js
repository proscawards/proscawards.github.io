export default class Storage{

    visitorCountry; //JSON object of top 3 visitors' countries
    visitorCount; //Total count of visitors
    ls = localStorage; //Shorthand for localStorage
    length = localStorage.length; 
    state = 0; //State of logoBtn

    //Visitor Country
    setVisitorCountry(data){this.ls.setItem("visitorCountry", JSON.stringify(data));}
    getVisitorCountry(){return this.ls.getItem("visitorCountry") ? JSON.parse(this.ls.getItem("visitorCountry")) : null;}

    //Visitor Count
    setVisitorCount(count){this.ls.setItem("visitorCount", count);}
    getVisitorCount(){return this.ls.getItem("visitorCount") ? this.ls.getItem("visitorCount") : null;}

    //State
    setState(state){this.state = state;}
    getState(){return this.state;}
}