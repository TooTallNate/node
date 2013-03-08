# This file is used with the GYP meta build system.
# http://code.google.com/p/gyp
# To build try this:
#   svn co http://gyp.googlecode.com/svn/trunk gyp
#   ./gyp/gyp -f make --depth=. wrk.gyp
#   make
#   ./out/Debug/wrk

{
  'targets': [{
    'target_name': 'wrk',
    'type': 'executable',
    'sources': [
      'src/wrk.c',
      'src/aprintf.c',
      'src/stats.c',
      'src/units.c',
      'src/ae.c',
      'src/zmalloc.c',
      'src/http_parser.c',
      'src/tinymt64.c',
    ],
    'libraries': [
      '-lm',
      '-pthread',
    ],
    'cflags': [
      '-std=c99',
      '-Wall',
      '-O2',
      '-pthread',
    ],
    'conditions': [
      ['OS=="solaris"', {
        'libraries': [
          '-lnsl',
          '-lsocket',
          '-lresolv',
        ],
      }],
    ],
  }],
}
