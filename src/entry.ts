import { Runtime } from "foldkit";

import { view } from "./docsView";
import {
  ChangedUrl,
  ClickedLink,
  Flags,
  Message,
  Model,
  flags,
  init,
  subscriptions,
  update,
} from "app-main";

const program = Runtime.makeProgram({
  Model,
  Flags,
  flags,
  init,
  update,
  view,
  subscriptions,
  container: document.querySelector("#root"),
  routing: {
    onUrlRequest: (request) => ClickedLink({ request }),
    onUrlChange: (url) => ChangedUrl({ url }),
  },
  devTools: {
    Message,
  },
});

Runtime.run(program);
