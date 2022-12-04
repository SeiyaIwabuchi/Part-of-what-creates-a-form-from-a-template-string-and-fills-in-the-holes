/**
 * テンプレートテキストに埋め込む
 */

export default function (template: string, variables: RegExpMatchArray[]) {
    let work = template;
    variables.forEach(v => {work = work.replace(new RegExp(`\\$\\{${v[1]}\\}`,"gu"),v[2])});
    return work;
}