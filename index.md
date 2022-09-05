---
layout: default
title : "Zach's MicroSite"
---

# Zachary Fetters

## Zachary Fetters

### Zachary Fetters

#### [Zachary Fetters](/)

##### Zachary Fetters

###### Zachary Fetters

This is a paragraph with `inline code` in the middle of it.

```cpp
// cross-platform static variables
short vidmasterStringSetID = -1; // can be set with MML

static std::string a1_getenv(const char* name)
{
#ifdef __WIN32__
	wchar_t* wstr = _wgetenv(utf8_to_wide(name).c_str());
	return wstr ? wide_to_utf8(wstr) : std::string{};
#else
	char* str = getenv(name);
	return str ? str : std::string{};
#endif
}
```

```html
<p>Hello world!</p>
```

```python
import argparse
import os
import platform
import sys
import socket
from typing import List, Optional, Union, Callable

import requests
from pygments import __version__ as pygments_version
from requests import __version__ as requests_version

from . import __version__ as httpie_version
from .cli.constants import OUT_REQ_BODY
from .cli.nested_json import HTTPieSyntaxError
from .client import collect_messages
from .context import Environment, LogLevel
from .downloads import Downloader
from .models import (
    RequestsMessageKind,
    OutputOptions
)
from .output.models import ProcessingOptions
from .output.writer import write_message, write_stream, write_raw_data, MESSAGE_SEPARATOR_BYTES
from .plugins.registry import plugin_manager
from .status import ExitStatus, http_status_to_exit_status
from .utils import unwrap_context
from .internal.update_warnings import check_updates
from .internal.daemon_runner import is_daemon_mode, run_daemon_task


# noinspection PyDefaultArgument
def raw_main(
    parser: argparse.ArgumentParser,
    main_program: Callable[[argparse.Namespace, Environment], ExitStatus],
    args: List[Union[str, bytes]] = sys.argv,
    env: Environment = Environment(),
    use_default_options: bool = True,
) -> ExitStatus:
    program_name, *args = args
    env.program_name = os.path.basename(program_name)
    args = decode_raw_args(args, env.stdin_encoding)

    if is_daemon_mode(args):
        return run_daemon_task(env, args)

    plugin_manager.load_installed_plugins(env.config.plugins_dir)

    if use_default_options and env.config.default_options:
        args = env.config.default_options + args

    include_debug_info = '--debug' in args
    include_traceback = include_debug_info or '--traceback' in args

    def handle_generic_error(e, annotation=None):
        msg = str(e)
        if hasattr(e, 'request'):
            request = e.request
            if hasattr(request, 'url'):
                msg = (
                    f'{msg} while doing a {request.method}'
                    f' request to URL: {request.url}'
                )
        if annotation:
            msg += annotation
        env.log_error(f'{type(e).__name__}: {msg}')
        if include_traceback:
            raise

    if include_debug_info:
        print_debug_info(env)
        if args == ['--debug']:
            return ExitStatus.SUCCESS

    exit_status = ExitStatus.SUCCESS
```

---

- This
- Is
- A
- List

1. This
2. is
3. also
4. a
5. list

- Again,
  - This
    - is
      - a
- list
