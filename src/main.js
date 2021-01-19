//dom在window上可全局使用
const div = dom.create("<div>newDiv</div>");
console.log("div", div);

// dom.after(test, div);
// const div3 = dom.create('<div id="parent">parent</div>');
// dom.wrap(test, div3);
// const nodes = dom.empty(window.empty);
// console.log(nodes);
dom.attr(test, "title", "hi I am 66");
const title = dom.attr(test, "title");
console.log(title);

dom.text(test, "你好这是新文本");
dom.text(test);

dom.style(test, { border: "1px solid red", color: "blue" });
console.log(dom.style(test, "border"));
dom.style(test, "border", "1px solid red");

dom.class.add(test, "red");
dom.class.add(test, "blue");
// dom.class.remove(test, "blue");
console.log(dom.class.has(test, "blue"));

const fn = () => {
  console.log("点击了");
};
//监听事件
dom.on(test, "click", fn);
dom.off(test, "click", fn);

//查
const testDiv = dom.find("#test")[0];
console.log(testDiv);

console.log(dom.parent(test));

console.log(dom.siblings(dom.find("#e2")[0]));
console.log(dom.next(dom.find("#e2")[0]));
console.log(dom.previous(dom.find("#e2")[0]));

const t = dom.find("#empty")[0];
dom.each(dom.children(t), (n) => {
  dom.style(n, "color", "red");
});
console.log(dom.index(dom.find("#e2")[0]));
