import gulp from 'gulp'

import preCommit from '#hapi-common-log/build/gulp'

gulp
  .task('pre-commit', preCommit)

gulp
  .task('default', gulp.series('pre-commit'))
