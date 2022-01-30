export default class Storage{

    private visitorCountry: any; //JSON object of top 3 visitors' countries
    private visitorCount: any; //Total count of visitors
    private ls: any = localStorage; //Shorthand for localStorage
    private length: any = localStorage.length; 
    private state: any; //State of logoBtn

    //Length of Local Storage
    getLength(){return this.length}

    //Visitor Country
    setVisitorCountry(data: any){this.ls.setItem("visitorCountry", JSON.stringify(data));}
    getVisitorCountry(){return this.ls.getItem("visitorCountry") ? JSON.parse(this.ls.getItem("visitorCountry")) : null;}

    //Visitor Count
    setVisitorCount(count: any){this.ls.setItem("visitorCount", count);}
    getVisitorCount(){return this.ls.getItem("visitorCount") ? this.ls.getItem("visitorCount") : null;}

    //State
    setState(state: any){this.state = state;}
    getState(){return this.state ? this.state : 0;}
}