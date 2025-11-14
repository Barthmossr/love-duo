import type { JSX } from 'react'
import { Pressable, Text, View } from 'react-native'

interface ConfirmProps {
  navigation: {
    navigate: (route: string) => void
  }
}

const Confirm = ({ navigation }: ConfirmProps): JSX.Element => {
  return (
    <View>
      <Text>Confirm</Text>
      <Pressable
        testID="confirm-next"
        accessibilityRole="button"
        accessibilityLabel="Complete"
        onPress={() => navigation.navigate('Complete')}
      >
        <Text>Complete</Text>
      </Pressable>
    </View>
  )
}

export { Confirm }
