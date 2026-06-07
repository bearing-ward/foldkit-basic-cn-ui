import { Runtime } from "foldkit";

import { Model, init, update, view } from "./main";

const program = Runtime.makeProgram({
  Model,
  init,
  update,
  view: (model) => ({ title: "Chart Basic", body: view(model) }),
  container: document.querySelector("#root"),
});

Runtime.run(program);
