import { cd, echo, exec, touch } from "shelljs";
import url from "url";
import pkg from "../package.json";

let repoUrl;
if (typeof pkg.repository === "object") {
  if ("url" in pkg.repository) repoUrl = pkg.repository.url;
  else throw new Error("URL does not exist in repository section");
} else {
  repoUrl = pkg.repository;
}

const parsedUrl = url.parse(repoUrl);
const repository = (parsedUrl.host || "") + (parsedUrl.path || "");
const ghToken = process.env.GH_TOKEN;

echo("Deploying docs!!!");
cd("docs");
touch(".nojekyll");
exec("git init");
exec("git add .");
exec('git config user.name "--username--"');
exec('git config user.email "--usermail--"');
exec('git commit -m "docs(docs): update gh-pages"');
exec(`git push --force --quiet "https://${ghToken}@${repository}" master:gh-pages`);
echo("Docs deployed!!");
