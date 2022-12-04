import lexical from "./analyzer/lexical";
import temlateEngine from "./temlateEngine";

function lexical_test() {
  /**
   * メソッドの引数にテストデータを入れて結果を出力する
   */
  const testDataArr = ["こんにちは。私の名前は${あなたの名前}です。"];
  testDataArr.push(
    "${あなたの名前}の生年月日は${あなたの生年月日}で、現在は${あなたの今の年齢}です。"
  );
  testDataArr.push("${自由記述欄}");
  testDataArr.push("どうぞよろしくお願いします。");
  const testDataStr = testDataArr.join("\n");
  const actual = lexical(testDataStr);
  actual.forEach((acc) => console.log(acc));
}

function templateEngine_test() {
  /**
   * メソッドの引数にテストデータを入れて結果を出力する
   */
  const testDataArr = ["こんにちは。私の名前は${あなたの名前}です。"];
  testDataArr.push(
    "${あなたの名前}の生年月日は${あなたの生年月日}で、現在は${あなたの今の年齢}です。"
  );
  testDataArr.push("${自由記述欄}");
  testDataArr.push("どうぞよろしくお願いします。");
  const testDataStr = testDataArr.join("\n");
  const variables: RegExpMatchArray[] = [
    ["${あなたの名前}", "あなたの名前", "岩渕 誠也"],
    ["${あなたの生年月日}", "あなたの生年月日", "1999年5月15日"],
    ["${あなたの今の年齢}", "あなたの今の年齢", "23ちゃい"],
    ["${自由記述欄}", "自由記述欄", "(*´Д｀) < おうち帰りたい"],
  ];
  const actual = temlateEngine(testDataStr, variables);

  console.log(actual);
}

async function input(pronpt: string) {
  console.log(pronpt);
  process.stdin.resume();
  process.stdin.setEncoding("utf8");

  var lines: string[] = [];
  var reader = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return await new Promise<string>((resolve, reject) => {
    reader.on("line", (l: string) => {
      resolve(l);
      reader.close();
    });
  });
}

async function input_test() {
  /*
  こんにちは。私の名前は${あなたの名前}です。
  ${あなたの名前}の生年月日は${あなたの生年月日}で、現在は${あなたの今の年齢}です。
  ${自由記述欄}
  どうぞよろしくお願いします。
    */
   let temp = "";
   let w = "";
    do {
        w = await input("");
        temp += w + "\n";
    } while (w !== "");

    const variables = lexical(temp);

    for(const v of variables) {
        v.push(await input(`${v[1]} > `));
    }

    console.log(temlateEngine(temp, variables));
}

lexical_test();
templateEngine_test();
input_test();
