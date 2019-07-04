import path from "path";
import { kebabCase } from "lodash";
import { GitConfig } from "./git";

export namespace suggest {
  /**
   * Suggest library name is by looking at the root path.
   * @param directory - directory root path.
   */
  export function libraryName(directory: string): string {
    return kebabCase(path.basename(directory)).toLowerCase();
  }

  /**
   * Suggest author by evaluating git configuration.
   * @param git - git configuration.
   */
  export function author(git: GitConfig): string {
    return git.user ? [git.user.name, git.user.email].filter(x => x).join(" ") : "";
  }

  /**
   * Suggest repository url by evaluating git configuration.
   * @param git - git configuration.
   * @param libraryName - chosen name of the library.
   */
  export function repositoryUrl(git: GitConfig, libraryName: string): string {
    return (
      (git.remote && git.remote.origin && git.remote.origin.url) || //
      `git@github.com:${git.user.name}/${libraryName}.git`
    );
  }
}
