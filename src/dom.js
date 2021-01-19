window.dom = {
  create(string) {
    // return document.createElement(tagName);
    //template标签可以容纳任意元素
    const container = document.createElement("template");
    container.innerHTML = string.trim(); //trim去两边空格
    console.log("container", container);
    return container.content.firstChild;
  },
  //后插
  after(node, node2) {
    //insertBefore的第一个参数插到第二个参数之前，插到它下个之前不就是插它后面吗
    node.parentNode.insertBefore(node2, node.nextSibling);
  },
  //前插
  before(node, node2) {
    node.parentNode.insertBefore(node2, node);
  },
  //追加儿子
  append(parent, node) {
    parent.appendChild(node);
  },
  //追加爸爸
  wrap(node, parent) {
    dom.before(node, parent);
    dom.append(parent, node);
  },
  //删除节点
  remove(node) {
    //node.remove()ie可能不支持
    node.parentNode.removeChild(node);
    return node;
  },
  //删除后代
  empty(node) {
    // node.innerHTML=''
    const array = [];
    const { childNodes } = node;
    let x = node.firstChild;
    while (x) {
      array.push(dom.remove(node.firstChild));
      x = node.firstChild;
    }
    return array;
  },
  //读写属性
  attr(node, name, value) {
    if (arguments.length === 3) {
      //设置
      node.setAttribute(name, value);
    } else if (arguments.length === 2) {
      //读取
      return node.getAttribute(name, value);
    }
  },
  //新文本
  text(node, string) {
    if (arguments.length === 2) {
      if ("innertext" in node) {
        //适配
        node.innerText = string; //ie
      } else {
        node.textContent = string; //chrome\firefox
      }
    } else if (arguments.length === 1) {
      if ("innertext" in node) {
        //适配
        return node.innerText;
      } else {
        return node.textContent; //chrome\firefox
      }
    }
  },
  html(node, string) {
    if (arguments.length === 2) {
      node.innerHTML = string;
    } else if (arguments.length === 1) {
      return node.innerHTML;
    }
  },
  style(node, name, value) {
    if (arguments.length === 3) {
      node.style[name] = value;
    } else if (arguments.length === 2) {
      if (typeof name === "string") {
        //获取style里的某个属性
        return node.style[name];
      } else if (name instanceof Object) {
        //是对象实例
        //dom.style(div,{color:red})
        const object = name;
        for (let key in object) {
          node.style[key] = object[key];
        }
      }
    }
  },
  class: {
    add(node, className) {
      node.classList.add(className);
    },
    remove(node, className) {
      node.classList.remove(className);
    },
    has(node, className) {
      return node.classList.contains(className);
    },
  },
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  },
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  },
  //查
  find(selector, scope) {
    return (scope || document).querySelectorAll(selector);
  },
  parent(node) {
    return node.parentNode;
  },
  children(node) {
    return node.children;
  },
  siblings(node) {
    return Array.from(node.parentNode.children).filter((n) => n !== node);
  },
  next(node) {
    let x = node.nextSibling;
    while (x && x.nodeType === 3) {
      //如果是文本节点
      x = x.nextSibling;
    }
    return x;
  },
  previous(node) {
    let x = node.previousSibling;
    while (x && x.nodeType === 3) {
      //如果是文本节点
      x = x.previousSibling;
    }
    return x;
  },
  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i]);
    }
  },
  index(node) {
    const list = dom.children(node.parentNode);
    for (let i = 0; i < list.length; i++) {
      if (list[i] === node) {
        return i;
      }
    }
  },
};
