const fs = require("fs");
const chalk = require("chalk");
const path = require("path");
const { question, questionInt } = require("readline-sync");

const _parseDoubleQuotes = require("../functions/parseQuotes");
const _convertAbsolute = require("../functions/convAbs");
const _caseSenstivePath = require("../functions/caseSensitivePath");
const _fatalError = require("../functions/fatalError");
const _promptForYN = require("../functions/promptForYN");

const Errors = require("../classes/Errors");
const Checks = require("../classes/Checks");
const InfoMessages = require("../classes/InfoMessages");
const Verbose = require("../classes/Verbose");

/**
 * Make a file synchronously using `fs.mkfileSync()`.
 *
 * If a parent directory does not exist, this command
 * will not work.
 *
 * Note that there is a small hiccup in the error
 * codes, where if the path/file names are too long,
 * Linux and macOS will show the error code correctly
 * as `ENAMETOOLONG`, but Windows will show it as
 * `EINVAL`.
 *
 * Available arguments:
 * - `-s`: Silence all outputs to the standard output,
 * which includes the success message. Only error
 * messages are shown.
 *
 * @param {string} file The file that should be created. Both absolute and relative paths are accepted.
 * @param {...string} args Arguments to change the behavior of `mkfile()`. Available arguments are listed above.
 */
const mkfile = (file, ...args) => {
  try {
    // Converts path to an absolute path and corrects
    // casing on Windows, and resolves spaces
    Verbose.pathAbsolute(file);
    Verbose.parseQuotes();
    file = _caseSenstivePath(_convertAbsolute(_parseDoubleQuotes([file, ...args])[0]));

    Verbose.initChecker();
    const fileChk = new Checks(file);

    Verbose.initArgs();
    const silent = args?.includes("-s");

    if (fileChk.paramUndefined()) {
      Verbose.chkEmpty();
      Errors.enterParameter("a file", "mkfile test.txt");
      return;
    }

    if (fileChk.doesExist()) {
      Verbose.promptUser();
      if (
        _promptForYN(
          `The file, '${chalk.italic(
            path.basename(file)
          )}', already exists. Would you like to delete it?`
        )
      ) {
        try {
          Verbose.custom("Deleting the file...");
          fs.rmSync(file, { recursive: true, force: true });
          InfoMessages.success(`Successfully deleted ${chalk.bold(file)}.`);
        } catch {
          if (err.code === "EPERM") {
            Verbose.permError();
            Errors.noPermissions("delete the file", file);
          } else if (err.code === "EBUSY") {
            Verbose.inUseError();
            Errors.inUse("file", file);
          }

          return;
        }
      } else {
        console.log(chalk.yellow("Process aborted.\n"));
        return;
      }
    }

    if (fileChk.pathUNC()) {
      Verbose.chkUNC();
      Errors.invalidUNCPath();
      return;
    }

    console.log(
      `Add the content of the new file. Type ${chalk.italic(
        "'!SAVE'"
      )} to save changes, ${chalk.italic("'!CANCEL'")} to discard, or ${chalk.italic(
        "'!EDIT'"
      )} to modify previous input:\n`
    );

    // Collect new content line by line
    let contents = [];
    while (true) {
      Verbose.custom("Asking for line input...");
      const input = question("> ");

      if (input.toUpperCase() === "!SAVE") {
        // Save the new content to the file, ensuring no trailing newline
        Verbose.custom("Saving file with provided file contents...");
        fs.writeFileSync(file, contents.join("\n"), "utf8");

        // If the user requested output, show a success message, else, show a newline
        if (!silent) InfoMessages.success(`Successfully made the file ${chalk.bold(file)}.`);
        else console.log();
        return;
      } else if (input.toUpperCase() === "!CANCEL") {
        Verbose.custom("Discarding changes and removing file...");
        console.log(chalk.yellow("Edits discarded and process aborted."));
        return;
      } else if (input.toUpperCase() === "!EDIT") {
        if (contents.length === 0) {
          console.log(chalk.yellow("No previous input to edit.\n"));
        } else {
          Verbose.custom("Asking for the line to edit...");
          const lineNumber = questionInt(
            chalk.blue("Choose a line number to edit (1-" + contents.length + "): ")
          );
          if (lineNumber >= 1 && lineNumber <= contents.length) {
            Verbose.custom("Requesting for new line content...");
            const newLine = question(`Edit line ${lineNumber}: `, { defaultInput: "\n" });

            Verbose.custom("Updating content...");
            contents[lineNumber - 1] = newLine; // Replace the selected line
            console.log(chalk.green(`Line ${lineNumber} has been updated.\n`));
          } else {
            console.log(chalk.red("Invalid line number.\n"));
          }
        }
      } else {
        Verbose.custom("Adding line to memory...");
        contents.push(input);
      }
    }
  } catch (err) {
    if (err.code === "ENOENT") {
      // If the parent directory does not exist
      Verbose.chkExists(file);
      Errors.doesNotExist("file", file);
      return;
    } else if (err.code === "EPERM") {
      Verbose.permError();
      Errors.noPermissions("make the file", file);
      return;
    } else if (err.code === "ENAMETOOLONG") {
      // Name too long
      // This code only seems to appear on Linux and macOS
      // On Windows, the code is 'EINVAL'
      Verbose.custom("The file name was detected to be too long.");
      Errors.pathTooLong(file);
      return;
    } else if (err.code === "EINVAL") {
      // Invalid characters; basically just goes for Windows
      // NTFS' file system character limitations
      // However, Windows also uses this code when the file
      // path exceeds 260 characters, or when the file name
      // exceeds 255 characters
      Verbose.custom("The file name was detected to contain invalid characters, or is too long.");
      Errors.invalidCharacters(
        "directory name",
        "valid path characters",
        "characters such as '?' or ':' (Windows only)",
        dir
      );
      return;
    } else {
      Verbose.fatalError();
      _fatalError(err);
    }
  }
};

module.exports = mkfile;
