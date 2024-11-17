type p=Promise<'guang'>
type GetValueType<p>=p extends Promise<infer Value>?Value:never;
type C=GetValueType<Promise<'ddd'>>

// 提取第一个元素的类型
type arr=[1,'abc',Promise<'hh'>]
type GetFirstType<T extends unknown[]>=T extends [infer first,...unknown[]]?first:never;// 需要写unknown[]，

// 提取最后一个元素类型
type GetLast<T extends unknown[]>=T extends [...unknown[],infer last] ? last:never;
type LastType=GetValueType<GetLast<arr>>

// 判断字符串是否以prefix开头
type str='/api/test';
type StartWith<T extends string,prefix extends string>=T extends `${prefix}${string}`?true:false;
type StartWithResult=StartWith<str,'/api'>

// 替换字符串元素
type ReplaceStr<str extends string,from extends string,to extends string>=str extends `${infer prefix}${from}${infer suffix}`?`${prefix}${to}${suffix}`:str
type ReplaceStrResult=ReplaceStr<str,'/','d'>

// 清除空格\n,\t等
type testStr='/api/test \n'
type TrimRight<Str extends string>=Str extends `${infer prefix}${' '|"\n"|"\t"}`? TrimRight<prefix>:Str
type TrimRightResult=TrimRight<testStr>


