{
    // 深层promise类型
    type temp = Promise<Promise<Promise<string>>>
    type DeepPromiseType<T extends Promise<unknown>> = T extends Promise<infer PromiseType> ? PromiseType extends Promise<unknown> ? DeepPromiseType<PromiseType> : PromiseType : never;

    // 数组类型的递归
    type arr = [1, 2, 3, 4];
    type ReverseType<T extends unknown[]>=T extends [infer first,...infer rest]?[...ReverseType<rest>,first]:T;
    type ReverseTypeRes=ReverseType<arr>

    // includes
    type IsEqual<A,B>=(A extends B?true:false)&(B extends A?true:false)
    type Temp=IsEqual<string,string>

    type Includes<arr extends unknown[],Item>=arr extends [infer first,...infer rest]?IsEqual<Item,first> extends true?true:Includes<rest,Item>:false;
    type IncludesRes=Includes<[1,2,3,4],4>

    // removeItem
    type RemoveItem<arr extends unknown[],Item,Result extends unknown[]=[]>=arr extends [infer first,...infer rest]?
    IsEqual<first,Item> extends true?RemoveItem<rest,Item,Result>:RemoveItem<rest,Item,[...Result,first]>:Result
    type RemoveItemRes=RemoveItem<[1,2,3,4,3,2,1],1>

    //BuildArray:构造数组
    // type BuildArray<Item,Length,Result extends unknown[]=[]>=Result["length"] extends Length?Result:[...Result,Item]['length']extends Length?[...Result,Item]:BuildArray<Item,Length,[...Result,Item]>
    type BuildArray<Item,Length,Result extends unknown[]=[]>=Result['length'] extends Length?Result:BuildArray<Item,Length,[...Result,Item]>
    type BuildArrayRes=BuildArray<'a',5>


    //字符串类型的递归
    // ReplaceAll
    type ReplaceSingle<Str extends string,From extends string,To extends string>=Str extends `${infer prefix}${ From}${infer suffix}`?`${prefix}${To}${suffix}`:Str;
    type ReplaceAllRes=ReplaceSingle<'abac','a','d'>

    const obj={
        name:'112'
    }
    type A=typeof obj extends Record<string,any>?true:false

    type ReplaceAll<Str extends string,From extends string,To extends string>=
    Str extends `${infer prefix}${From}${infer suffix}`?ReplaceAll<`${prefix}${To}${suffix}`,From,To>:Str;

    type ReplaceAllRess=ReplaceAll<'abbc','b','dd'>

    // stringToUnion 将字符串所有字母提取出来
    type StringToUnion<Str extends string>=Str extends `${infer First}${infer rest}`?First|StringToUnion<rest>:never;
    type StringToUnionRes=StringToUnion<'abc'>

    // ReverseStr:字符串反转
    // type ReverseStr<Str extends string>=Str extends `${infer rest}${infer suffix}`?`${suffix}${ReverseStr<rest>}`:Str;
    // type ReverseStrRes=ReverseStr<'abc'>//实例化过深
    type temp2<str extends string>=str extends `${infer a}${infer b}`?a:never;
    type temp2Res=temp2<'a'>

    // type ReverseStr<Str extends string>=Str extends `${infer Rest}${infer suffix}`?`${suffix}${ReverseStr<Rest>}`:Str;
    type ReverseStr<Str extends string>=Str extends `${infer prefix}${infer rest}`?`${ReverseStr<rest>}${prefix}`:Str;
    type ReverseStrRes=ReverseStr<'abc'>//类型实例化过深，且可能无限
    // 原因是typescript有一个递归深度的限制，从末尾字符串开始，由于字符串长度未知，因此无法确定到底哪个时候该停止递归

    // 对象的递归
    type DeepObjReadonly<Obj extends Record<string,any>>={
        readonly [k in keyof Obj]:Obj[k] extends object?Obj[k] extends Function ? Obj[k]:DeepObjReadonly<Obj[k]>:Obj[k]
    }
    
    type ObjType={
        name:string,
        age:number
    }
    type DeepObjReadonlyRes=DeepObjReadonly<ObjType>

    let obj3:DeepObjReadonlyRes={
        name:'tom',
        age:11
    }
    // obj3.age=11
    
}