const qunit = require('node-qunit-phantomjs')

qunit('tests/reframe/index.html')
qunit('tests/noframe/index.html')
qunit('tests/jquery-reframe/index.html')
qunit('tests/jquery-noframe/index.html')
