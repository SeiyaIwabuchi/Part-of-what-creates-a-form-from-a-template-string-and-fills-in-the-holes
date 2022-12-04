/**
 * # 字句解析器
 * - 正しいテンプレートだった場合は、テンプレート内にある変数名を重複なしでRegExpMatchArray[]にして返す。
 */

export default function(template: string):RegExpMatchArray[] {
    const variablePattern = /\$\{(.*?)\}/g;
    const result: RegExpMatchArray[] = [];
    for(const acc of template.matchAll(variablePattern)){
        if(result.filter(r => r[0] === acc[0]).length === 0)
            result.push(acc);
    }
    return result;
}