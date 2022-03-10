export default function ToSentenceCase(str: string, seperator: string){
    let arr: string[] = str.split(seperator);
    let newArr: string[] = [];

    for (let i=0; i < arr.length; i++){
        newArr.push(arr[i].charAt(0).toUpperCase() + arr[i].substring(1).toLowerCase());
    }

    return newArr.join(" ");
}