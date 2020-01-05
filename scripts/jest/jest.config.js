module.exports = {
  rootDir: '../..',
  preset: 'ts-jest',
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testEnvironment: 'node',
  transform: {
    // 用 ts-jest 将 tsx 文件编译成 js
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'babel-jest', // 支持 .ts 文件里直接 import 'xx.scss'
  },
  testRegex: 'src/.*\\.test.(ts|tsx)$', // 正则匹配哪些是要执行的测试文件
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: ['<rootDir>/scripts/jest/setup.ts'], // 测试启动文件（即运行测试前会跑的脚本）
  collectCoverage: false, // 是否在执行测试时收集覆盖率信息
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/api/api-test-helpers.ts'], // 设置哪些文件需要（或不需要）覆盖率信息
};
