/**
 * -a、--archive参数表示存档模式，保存所有的元数据，比如修改时间（modification time）、权限、所有者等，并且软链接也会同步过去。
 *
 * --append参数指定文件接着上次中断的地方，继续传输。
 *
 * --append-verify参数跟--append参数类似，但会对传输完成后的文件进行一次校验。如果校验失败，将重新发送整个文件。
 *
 * -b、--backup参数指定在删除或更新目标目录已经存在的文件时，将该文件更名后进行备份，默认行为是删除。更名规则是添加由--suffix参数指定的文件后缀名，默认是~。
 *
 * --backup-dir参数指定文件备份时存放的目录，比如--backup-dir=/path/to/backups。
 *
 * --bwlimit参数指定带宽限制，默认单位是 KB/s，比如--bwlimit=100。
 *
 * -c、--checksum参数改变rsync的校验方式。默认情况下，rsync 只检查文件的大小和最后修改日期是否发生变化，如果发生变化，就重新传输；使用这个参数以后，则通过判断文件内容的校验和，决定是否重新传输。
 *
 * --delete参数删除只存在于目标目录、不存在于源目标的文件，即保证目标目录是源目标的镜像。
 *
 * -e参数指定使用 SSH 协议传输数据。
 *
 * --exclude参数指定排除不进行同步的文件，比如--exclude="*.iso"。
 *
 * --exclude-from参数指定一个本地文件，里面是需要排除的文件模式，每个模式一行。
 *
 * --existing、--ignore-non-existing参数表示不同步目标目录中不存在的文件和目录。
 *
 * -h参数表示以人类可读的格式输出。
 *
 * -h、--help参数返回帮助信息。
 *
 * -i参数表示输出源目录与目标目录之间文件差异的详细情况。
 *
 * --ignore-existing参数表示只要该文件在目标目录中已经存在，就跳过去，不再同步这些文件。
 *
 * --include参数指定同步时要包括的文件，一般与--exclude结合使用。
 *
 * --link-dest参数指定增量备份的基准目录。
 *
 * -m参数指定不同步空目录。
 *
 * --max-size参数设置传输的最大文件的大小限制，比如不超过200KB（--max-size='200k'）。
 *
 * --min-size参数设置传输的最小文件的大小限制，比如不小于10KB（--min-size=10k）。
 *
 * -n参数或--dry-run参数模拟将要执行的操作，而并不真的执行。配合-v参数使用，可以看到哪些内容会被同步过去。
 *
 * -P参数是--progress和--partial这两个参数的结合。
 *
 * --partial参数允许恢复中断的传输。不使用该参数时，rsync会删除传输到一半被打断的文件；使用该参数后，传输到一半的文件也会同步到目标目录，下次同步时再恢复中断的传输。一般需要与--append或--append-verify配合使用。
 *
 * --partial-dir参数指定将传输到一半的文件保存到一个临时目录，比如--partial-dir=.rsync-partial。一般需要与--append或--append-verify配合使用。
 *
 * --progress参数表示显示进展。
 *
 * -r参数表示递归，即包含子目录。
 *
 * --remove-source-files参数表示传输成功后，删除发送方的文件。
 *
 * --size-only参数表示只同步大小有变化的文件，不考虑文件修改时间的差异。
 *
 * --suffix参数指定文件名备份时，对文件名添加的后缀，默认是~。
 *
 * -u、--update参数表示同步时跳过目标目录中修改时间更新的文件，即不同步这些有更新的时间戳的文件。
 *
 * -v参数表示输出细节。-vv表示输出更详细的信息，-vvv表示输出最详细的信息。
 *
 * --version参数返回 rsync 的版本。
 *
 * -z参数指定同步时压缩数据。
 */

import { spawn } from 'child_process'
import { formatPath } from '../format-path.mjs'

/**
 *
 * @param {string} source
 * @param {string} destination
 * @param {string[]} opt
 * @param {boolean} test
 * @returns {ChildProcessWithoutNullStreams}
 */
export const rsync = (source, destination, opt = [], test = false) => {
  if (test) {
    opt.push('-n')
  }

  console.log('rsync', [...opt, source, destination].join(' '))

  return spawn('rsync', [...opt, source, destination])
}

/**
 *
 * @param {string} source
 * @param {string} destination
 * @param {boolean} has_delete_source
 * @param {boolean} test
 * @returns {ChildProcessWithoutNullStreams}
 */
export const rsyncMovePath = (source, destination, has_delete_source = false, test = false) => {
  const opt = ['-a', '--progress']

  has_delete_source && opt.push('--remove-source-files')

  return rsync(formatPath(source), formatPath(destination), opt, test)
}
