const chalk = require("chalk");

const { GLOBAL_NAME } = require("../variables/constants");

/**
 * A function to interpret an error and format
 * the error code and message.
 *
 * @param {number | string} code The error code that should be in the error.
 * @param {string} message The error message that should be in the error.
 */
const _interpretError = (code, message) => {
  console.log(chalk.red(`${chalk.bold(`[${String(code)}]`)} ${message}\n`));
};

/**
 * A class which does **not** require initialization (`new Errors`). Contains all errors used in BubbleOS.
 *
 * All errors are listed below:
 *
 * - `1` - `unrecognizedCommand()`
 * - `2` - `enterParameter()`
 * - `3` - `doesNotExist()`
 * - `4` - `noPermissions()`
 * - `5` - `inUse()`
 * - `6` - `alreadyExists()`
 * - `7` - `expectedFile()`
 * - `8` - `expectedDir()`
 * - `9` - `invalidOS()`
 * - `10` - `invalidEncoding()`
 * - `11` - `invalidExtension()`
 * - `12` - `invalidCharacters()`
 * - `13` - `pathTooLong()`
 * - `14` - `dirToNonDir()`
 * - `15` - `invalidUNCPath()`
 * - `16` - `unknown()`
 */
class Errors {
  constructor() {}

  /**
   * Information about the error message:
   *
   * **Name:** _Unrecognized command_
   *
   * **Parameters:** `command`
   *
   * **Error code:** `1`
   *
   * **Message:** The command, **_`command`_**, is unrecognized. Type _'help'_ for a list of available commands.
   *
   * @param {string} command The command that the user entered.
   */
  static unrecognizedCommand(command) {
    const CODE = 1;
    const MESSAGE = `The command, ${chalk.italic.bold(
      `'${command}'`
    )}, is unrecognized. Type ${chalk.italic("'help'")} for a list of available commands.`;

    _interpretError(CODE, MESSAGE);
  }

  /**
   * Information about the error message:
   *
   * **Name:** _Enter parameter_
   *
   * **Parameters:** `type`, `example`
   *
   * **Error code:** `2`
   *
   * **Message:** You must enter `type`, for example, like so: **_'`example`'_**
   *
   * @param {string} type The type of data the user should enter. For example: _a directory_, or, _the files_.
   * @param {string} example An example of what the user should enter.
   */
  static enterParameter(type, example) {
    const CODE = 2;
    const MESSAGE = `You must enter ${type}, for example, like so: ${chalk.italic.bold(
      `'${example}'`
    )}. ${chalk.dim("(NO_PARAMS_ENTERED)")}`;

    _interpretError(CODE, MESSAGE);
  }

  /**
   * Information about the error message:
   *
   * **Name:** _Does not exist / Non-existent_
   *
   * **Parameters:** `type`, `variable`
   *
   * **Error code:** `3`
   *
   * **Message:** The `type`, **_'`variable`'_**, does not exist. (ENOENT)
   *
   * @param {string} type The type of thing that does not exist. For example: _directory_, or, _file_.
   * @param {string} variable The value that the user entered.
   */
  static doesNotExist(type, variable) {
    const CODE = 3;
    const MESSAGE = `The ${type}, ${chalk.italic.bold(
      `'${variable}'`
    )}, does not exist. ${chalk.dim("(NON_EXISTENT)")}`;

    _interpretError(CODE, MESSAGE);
  }

  /**
   * Information about the error message:
   *
   * **Name:** _No permissions_
   *
   * **Parameters:** `todo`, `variable`
   *
   * **Error code:** `4`
   *
   * **Message:** Invalid permissions to `todo` **_'`variable`'_**. You need elevated privileges. (EPERM)
   *
   * @param {string} todo The thing that the user was attempting to do (e.g. _read the file_).
   * @param {string} variable The value that the user entered.
   */
  static noPermissions(todo, variable) {
    const CODE = 4;
    const MESSAGE = `Invalid permissions to ${todo} ${chalk.italic.bold(
      `'${variable}'`
    )}. You need elevated privileges. ${chalk.dim("(INVALID_PERMS)")}`;

    _interpretError(CODE, MESSAGE);
  }

  /**
   * Information about the error message:
   *
   * **Name:** _In use_
   *
   * **Parameters:** `type`, `variable`
   *
   * **Error code:** `5`
   *
   * **Message:** The `type`, **_'`variable`'_**, is currently being used. (EBUSY)
   *
   * @param {string} type The type of thing that is in use. For example: _directory_, or, _file_.
   * @param {string} variable The value that the user entered.
   */
  static inUse(type, variable) {
    const CODE = 5;
    const MESSAGE = `The ${type}, ${chalk.bold.italic(
      `'${variable}'`
    )}, is currently being used. ${chalk.dim("(PATH_BUSY)")}`;

    _interpretError(CODE, MESSAGE);
  }

  /**
   * Information about the error message:
   *
   * **Name:** _Already exists_
   *
   * **Parameters:** `type`, `variable`
   *
   * **Error code:** `6`
   *
   * **Message:** The `type`, **_'`variable`'_**, already exists. (EEXIST)
   *
   * @param {string} type The type of thing that already exists. For example: _directory_, or, _file_.
   * @param {string} variable The value that the user entered.
   */
  static alreadyExists(type, variable) {
    const CODE = 6;
    const MESSAGE = `The ${type}, ${chalk.bold.italic(
      `'${variable}'`
    )}, already exists. ${chalk.dim("(PATH_EXISTS)")}`;

    _interpretError(CODE, MESSAGE);
  }

  /**
   * Information about the error message:
   *
   * **Name:** _Expected file_
   *
   * **Parameters:** `variable`
   *
   * **Error code:** `7`
   *
   * **Message:** Expected a file, but got a directory (**_'`variable`'_**) instead. (EISDIR)
   *
   * @param {string} variable The value that the user entered.
   */
  static expectedFile(variable) {
    const CODE = 7;
    const MESSAGE = `Expected a file, but got a directory (${chalk.bold.italic(
      `'${variable}'`
    )}) instead. ${chalk.dim("(PATH_IS_DIR)")}`;

    _interpretError(CODE, MESSAGE);
  }

  /**
   * Information about the error message:
   *
   * **Name:** _Expected directory_
   *
   * **Parameters:** `variable`
   *
   * **Error code:** `8`
   *
   * **Message:** Expected a directory, but got a file (**_'`variable`'_**) instead. (ENOTDIR)
   *
   * @param {string} variable The value that the user entered.
   */
  static expectedDir(variable) {
    const CODE = 8;
    const MESSAGE = `Expected a directory, but got a file (${chalk.bold.italic(
      `'${variable}'`
    )}) instead. ${chalk.dim("(PATH_IS_NOT_DIR)")}`;

    _interpretError(CODE, MESSAGE);
  }

  /**
   * Information about the error message:
   *
   * **Name:** _Invalid OS_
   *
   * **Parameters:** `os`
   *
   * **Error code:** `9`
   *
   * **Message:** This command can only run on `os`.
   *
   * @param {string} os The operating system that the command can run on.
   */
  static invalidOS(os) {
    const CODE = 9;
    const MESSAGE = `This command can only run on ${os}. ${chalk.dim("(INVALID_OS)")}`;

    _interpretError(CODE, MESSAGE);
  }

  /**
   * Information about the error message:
   *
   * **Name:** _Invalid encoding_
   *
   * **Parameters:** `encoding`
   *
   * **Error code:** `10`
   *
   * **Message:** This command can only read `encoding` files.
   *
   * @param {string} encoding The encoding that the command can read.
   */
  static invalidEncoding(encoding) {
    const CODE = 10;
    const MESSAGE = `This command can only read ${encoding} files. ${chalk.dim(
      "(INVALID_ENCODING)"
    )}`;

    _interpretError(CODE, MESSAGE);
  }

  /**
   * Information about the error message:
   *
   * **Name:** _Invalid extension_
   *
   * **Parameters:** `extension`
   *
   * **Error code:** `11`
   *
   * **Message:** Only files ending with the **_'`extension`'_** extension can be used.
   *
   * @param {string} extension The extension that was expected.
   */
  static invalidExtension(extension) {
    const CODE = 11;
    const MESSAGE = `Only files ending with the ${chalk.italic.bold(
      `'${extension}'`
    )} extension can be used. ${chalk.dim("(INVALID_EXTENSION)")}`;

    _interpretError(CODE, MESSAGE);
  }

  /**
   * Information about the error message:
   *
   * **Name:** _Invalid characters_
   *
   * **Parameters:** `type`, `supposedTo`, `notContain`, `variable`
   *
   * **Error code:** `12`
   *
   * **Message:** The `type` can only contain `supposedTo` and not contain `notContain` (received **_'`variable`'_**).
   *
   * @param {string} type The type of thing that was validated (e.g. _file name_).
   * @param {string} supposedTo The characters that the item **can** contain.
   * @param {string} notContain The characters that the item **cannot** contain.
   * @param {string} variable The variable passed from the user.
   */
  static invalidCharacters(type, supposedTo, notContain, variable) {
    const CODE = 12;
    const MESSAGE = `The ${type} can only contain ${supposedTo} and not contain ${notContain} (received ${chalk.bold.italic(
      `'${variable}'`
    )}). ${chalk.dim("(INVALID_CHARS)")}`;

    _interpretError(CODE, MESSAGE);
  }

  /**
   * Information about the error message:
   *
   * **Name:** _Path too long_
   *
   * **Parameters:** `path`
   *
   * **Error code:** `13`
   *
   * **Message:** The path (**_'`path`'_**) is too long. Please choose a shorter path.
   *
   * @param {string} path The path that the user entered.
   */
  static pathTooLong(path) {
    const CODE = 13;
    const MESSAGE = `The path (${chalk.bold.italic(
      `'${path}'`
    )}) is too long. Please choose a shorter path. ${chalk.dim("(PATH_TOO_LONG)")}`;

    _interpretError(CODE, MESSAGE);
  }

  /**
   * Information about the error message:
   *
   * **Name:** _Directory to non-directory_
   *
   * **Parameters:** _(none)_
   *
   * **Error code:** `14`
   *
   * **Message:** Cannot overwrite a directory with a non-directory. (COPY_DIR_TO_NON_DIR)
   */
  static dirToNonDir() {
    const CODE = 14;
    const MESSAGE = `Cannot overwrite a directory with a non-directory. ${chalk.dim(
      "(COPY_DIR_TO_NON_DIR)"
    )}`;

    _interpretError(CODE, MESSAGE);
  }

  /**
   * Information about the error message:
   *
   * **Name:** _Invalid UNC path_
   *
   * **Parameters:** _(none)_
   *
   * **Error code:** `15`
   *
   * **Message:** UNC paths are currently unsupported by _%GLOBAL_NAME%_. (INVALID_UNC_PATH)
   */
  static invalidUNCPath() {
    const CODE = 15;
    const MESSAGE = `UNC paths are currently unsupported by ${GLOBAL_NAME}. ${chalk.dim(
      "(INVALID_UNC_PATH)"
    )}`;

    _interpretError(CODE, MESSAGE);
  }

  /**
   * Information about the error message:
   *
   * **Name:** _Unknown action_
   *
   * **Parameters:** `toDo`, `variable`
   *
   * **Error code:** `16`
   *
   * **Message:** _%GLOBAL_NAME%_ does not know how to `toDo` **_'`variable`'_**. (UNKNOWN)
   *
   * @param {string} toDo The action that was unknown.
   * @param {string} variable The variable that the user entered.
   */
  static unknown(toDo, variable) {
    const CODE = 16;
    const MESSAGE = `${GLOBAL_NAME} does not know how to ${toDo} ${chalk.bold.italic(
      `'${variable}'`
    )}. ${chalk.dim("(UNKNOWN)")}`;

    _interpretError(CODE, MESSAGE);
  }
}

module.exports = Errors;
