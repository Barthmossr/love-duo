import { registerRootComponent } from 'expo'

import { App } from './app'
import { getEnv } from './config'

getEnv()
registerRootComponent(App)
