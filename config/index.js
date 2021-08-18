const outputRootStrtegy = {
  h5: {
    production: 'dist/prod/h5',
    development: 'dist/dev/h5'
  },
  weapp: {
    production: 'dist/prod/weapp',
    development: 'dist/dev/weapp'
  },
  alipay: {
    production: 'dist/prod/alipay',
    development: 'dist/dev/alipay'
  },
  swan: {
    production: 'dist/prod/swan',
    development: 'dist/dev/swan'
  },
  jd: {
    production: 'dist/prod/jd',
    development: 'dist/dev/jd'
  },
  ['undefined']: {
    production: 'dist/prod/other',
    development: 'dist/dev/other'
  }
}

console.log(process.env.NODE_ENV, outputRootStrtegy[process.env.TARO_ENV][process.env.NODE_ENV])

const config = {
  projectName: 'myApp',
  date: '2021-7-19',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: outputRootStrtegy[process.env.TARO_ENV][process.env.NODE_ENV],
  plugins: [],
  defineConstants: {
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  framework: 'react',
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {

        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
