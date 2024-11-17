// 实现加减乘除
// 加法
// 通过根据数值构造相应长度的数组，然后返回合并后的数组的长度
type BuildArr<Length extends number,Ele extends unknown=unknown,Result extends unknown[]=[]>=
    Result['length'] extends Length?Result:BuildArr<Length,Ele,[...Result,Ele]>
type BuildArrRes=BuildArr<5>

type Add<num1 extends number,num2 extends number>=[...BuildArr<num1>,...BuildArr<num2>]['length']
type AddRes=Add<12,35>

// 减法
type Substract<num1 extends number,num2 extends number>=BuildArr<num1> extends [...BuildArr<num2>,...infer res]?res['length']:never;
type SubstractRes=Substract<21,11>

// 乘法
type Multiply<num1 extends number,num2 extends number,Result extends unknown[]=[]>=num2 extends 0?Result['length']:
    Multiply<num1,Substract<num2,1>,[...Result,...BuildArr<num1>]>;

type MultiplyRes=Multiply<2,3>

// 除法
type Divide<num1 extends number,num2 extends number,Result extends unknown[]=[]>=num1 extends 0?
Result['length']:Divide<Substract<num1,num2>,num2,[...Result,...BuildArr<1>]>

type DivideRes=Divide<6,2>

// 数组长度实现计数
// StrLen字符串长度
type StrLen<Str extends string,Result extends unknown[]=[]>=Str extends `${string}${infer rest}`?
    StrLen<rest,[...Result,unknown]>:Result['length'];
type StrLenRes=StrLen<'abc'>

// GreaterThan
type GreaterThan<num1 extends number,num2 extends number,Temp extends unknown[]=[]>=Temp['length'] extends num1 ?false:
    Temp['length'] extends num2?true:GreaterThan<num1,num2,[...Temp,unknown]>

type GreaterThanRes=GreaterThan<2,2>


