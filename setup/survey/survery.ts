import { LicensesListResponseItem } from "@octokit/rest";
import { objects, prompt, Question } from "inquirer";
import { version } from "../../package.json";
import { git, root, suggest } from "../tools";
import { check, hasNoWhitespace, isNotBlank, isNotEmpty, isSemVer } from "./validate";
import GitHub = require("@octokit/rest");

export interface Answers {
  name: string;
  version: string;
  repository: string;
  author: string;
  license: string;
  monorepo: boolean;
}

export async function ask(): Promise<Answers> {
  const github = new GitHub();
  const config = git.config(root);
  const questions: Question<Answers>[] = [
    {
      name: "name",
      type: "input",
      default: suggest.libraryName(root),
      validate: v => check(v, isNotEmpty, hasNoWhitespace),
    },
    {
      name: "version",
      type: "input",
      default: version,
      validate: isSemVer,
    },
    {
      name: "repository",
      type: "input",
      default: answers => suggest.repositoryUrl(config, answers.name),
      validate: isNotBlank,
    },
    {
      name: "author",
      type: "input",
      default: suggest.author(config),
      validate: isNotBlank,
    },
    {
      name: "license",
      type: "list",
      default: "MIT",
      async choices(): Promise<objects.ChoiceOption<Answers>[]> {
        const r = await github.licenses.listCommonlyUsed();
        return r.data.map(licenseToOption);
      },
    },
    {
      name: "monorepo",
      type: "confirm",
      message: "configure as monorepo?",
      default: false,
    },
  ];

  return await prompt<Answers>(questions);
}

function licenseToOption(license: LicensesListResponseItem): objects.ChoiceOption<Answers> {
  return {
    name: `${license.name} | ${license.url}`,
    value: license.spdx_id,
  };
}
