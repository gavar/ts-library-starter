import { which } from "shelljs";
import { ask } from "../survey";
import { git, root, terminate } from "../tools";

(async function() {
  // check GIT
  if (!which("git")) terminate("install GIT to run the script: https://git-scm.com/");
  if (!git.is(root)) terminate("package should be a GIT repository");

  // run survey
  const answers = await ask();
  console.log(answers);
})();
