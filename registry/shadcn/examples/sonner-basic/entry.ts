import { Runtime } from "foldkit";

import { Model, init, update, view } from "./main";

const program = Runtime.makeApplication({
  Model,
  init,
  update,
  view: (model) => ({ title: "Sonner Basic", body: view(model) }),
  container: document.querySelector("#root"),
});

Runtime.run(program);
