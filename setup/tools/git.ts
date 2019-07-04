import fs from "fs";
import path from "path";
import { parse } from "dotenv";
import { exec } from "shelljs";
import { inflate } from "./json";

/** GIT commands. */
export namespace git {
  /**
   * Check if directory is a GIT repository.
   * @param directory - path to a directory to check.
   */
  export function is(directory: string): boolean {
    return fs.existsSync(path.join(directory, ".git"));
  }

  /** Parse values of the `git config`. */
  export function config(directory: string): GitConfig {
    const raw = exec("git config --list", { cwd: directory, silent: true }).stdout;
    const props = parse(raw);
    return inflate(props);
  }
}

/** Represents common structure of the `git config`. */
export interface GitConfig {
  user: {
    name: string;
    email: string;
  };
  remote: GitRemote;
}

export interface GitRemote {
  origin: GitRepository;
  [remote: string]: GitRepository;
}

export interface GitRepository {
  url: string;
  fetch: string;
}
