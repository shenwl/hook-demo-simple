export default function request(path) {
  return new Promise(resolve => {
    setTimeout(() => {
      if (path === "/user") {
        return resolve({ name: "Allen", age: 25, id: 1 });
      }
      if (path === "/books") {
        return resolve([
          { id: 1, name: "JS高级程序设计" },
          { id: 2, name: "你不知道的JS" },
          { id: 3, name: "JS忍者秘籍" }
        ]);
      }
      // moview
      return resolve([
        { id: 1, name: "绿野仙踪" },
        { id: 2, name: "了不起的盖兹比" }
      ]);
    }, 1500);
  });
}
