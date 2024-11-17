// PUSH,元组类型的重新构造
// 因为type,infer ,类型参数都不支持重新赋值，那么只能返回一个新的类型

type PushType<arr extends unknown[],ele extends unknown>=[...arr,ele]
type turple1=[1,2,3,'str']
type PushTypeRes=PushType<turple1,'2123'>

// Zip
type Zip<arr1 extends unknown[],arr2 extends unknown[]>=arr1 extends [infer firstType,...infer restType] ?
    arr2 extends [infer otherFirstType,...infer otherRestType]?[[firstType,otherFirstType],...Zip<restType,otherRestType>]:[]:[];

// type type1=typeof [1,2,3,4,5] //错误用法，typeof 获取一个变量或者对象的类型，对于数组,字符串，数字等字面量来说，不能直接跟typeof，而要先弄到一个变量里面再用typeof
// type type1=typeof 1;
/* const temp=[1,2,3];
type type1=typeof temp; */
type ZipRes=Zip<[1,2,3],['a','b','c']>


// 字符串
// 首字母大写
type CaptializeStr<str>=str extends `${infer first}${infer rest}`?`${Uppercase<first>}${rest}`:str;
type CaptializeStrRes=CaptializeStr<'tom'>

// 下划线转驼峰
type CameralCase<str>=str extends `${infer first}_${infer second}${infer rest}`?`${first}${Uppercase<second>}${CameralCase<rest>}`:str;

type CameralCaseRes=CameralCase<'dong_dong_dong'>


// 函数类型的重新构造
type AppendArgs<func extends Function,arg extends unknown>=func extends (...args:infer argType)=>infer returnType ?(...args:[...argType,arg])=>returnType:never;

type func2=(a:string,b:number)=>void;
type c='123'
type AppendArgsRes=AppendArgs<func2,c>

// 索引类型的重新构造
type obj={
    name:string,
    age?:number,
    readonly role:string,
}

// mapping
type Mapping<obj extends object>={
    [k in keyof obj]:[obj[k],obj[k],obj[k]]
}

type MappingRes=Mapping<{
    name:'张三',
    age:12
}>

// 重映射
type UppercaseKey<obj extends object>={
    [k in keyof obj as Uppercase<k&string>]:obj[k]
}