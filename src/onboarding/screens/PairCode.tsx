import type { JSX } from 'react'
import { useState } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'

import { coupleCodeSchema } from '../validation'

interface PairCodeProps {
  navigation: {
    navigate: (route: string) => void
  }
}

const PairCode = ({ navigation }: PairCodeProps): JSX.Element => {
  const [code, setCode] = useState('')
  const valid = coupleCodeSchema.safeParse(code).success
  return (
    <View>
      <Text>Pair Code</Text>
      <TextInput
        testID="paircode-input"
        accessibilityLabel="Pair Code"
        value={code}
        onChangeText={setCode}
        placeholder="Enter code"
        autoCapitalize="characters"
      />
      <Pressable
        testID="paircode-next"
        accessibilityRole="button"
        accessibilityLabel="Next"
        onPress={() => navigation.navigate('Confirm')}
        disabled={!valid}
      >
        <Text>Next</Text>
      </Pressable>
    </View>
  )
}

export { PairCode }
