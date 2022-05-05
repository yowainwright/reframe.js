const qunit = require('node-qunit-phantomjs')
const options = {
  timeout: 30,
}
qunit('tests/reframe/index.html', options)
qunit('tests/noframe/index.html', options)
qunit('tests/jquery-reframe/index.html', options)
qunit('tests/jquery-noframe/index.html', options)
