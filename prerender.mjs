import fs from 'node:fs'
import { render } from './dist-server/entry-server.js'

const template = fs.readFileSync('dist/index.html', 'utf-8')
fs.writeFileSync('dist/index.html', template.replace('<!--app-html-->', render()))