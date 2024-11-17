//动态类型提示
// a=1&b=2
type QueryStringType<T>=T extends `${infer Param}&${infer Rest}`?MergeValue<ParamParse<Param>,QueryStringType<Rest>>:ParamParse<Param>;
// a=1,b=2
type ParamParse<T>=T extends `${infer Key}=${infer Value}`?{
    [k in Key]:Value
}:{};

type MergeValue<OneParam,OtherParam>=''


function parseQueryString( str:string='a=1&b=2&c=3'):object{
    let params=str.split('&');
    let paramObj:Record<string,any>={}
    params.forEach(item=>{
        let [key,value]=item.split('=');
        if(paramObj[key]){
            if(Array.isArray(paramObj[key])){
                paramObj[key].push(value)
            }else{
                paramObj[key]=[paramObj[key],value]
            }
        }else{
            paramObj[key]=value
        }
    })
    return paramObj
}

