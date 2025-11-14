import { registerRootComponent } from 'expo'

import { App } from './app/App'
import { getEnv } from './config'

getEnv()
registerRootComponent(App)
