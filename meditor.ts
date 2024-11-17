export interface MeditorProps{
    uuid?:number,
    publish?:(topic:string,...args:unknown[])=>void,
    subscribe?:(topic:string,callback:(...args:unknown[])=>void)=>void;
}
interface Topic{
    callback:(...args:unknown[])=>void,
    delegate:unknown
}

class Meditor{
    topic:{
        [key:string]:Topic[]
    }={};
    uuid:number=0;
    constructor(){


    }
    subscribe(topic:string,callback:(...args:unknown[])=>void,delegate?:unknown):void{
        this.topic[topic]?this.topic[topic].push({
            callback,
            delegate
        }):this.topic[topic]=[{callback,delegate}];
    }
    publish(topic:string):void{
        if(this.topic[topic]){
            this.topic[topic].forEach((item:Topic)=>{
                item.callback.call(item.delegate);
            })
        }
    }
}
const meditor=new Meditor();
export default meditor;