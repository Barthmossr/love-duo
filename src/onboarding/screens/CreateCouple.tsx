import type { JSX } from 'react'
import { Pressable, Text, View } from 'react-native'

interface CreateCoupleProps {
  navigation: {
    navigate: (route: string) => void
  }
}

const CreateCouple = ({ navigation }: CreateCoupleProps): JSX.Element => {
  return (
    <View>
      <Text>Create Couple</Text>
      <Pressable
        testID="create-next"
        accessibilityRole="button"
        accessibilityLabel="Confirm"
        onPress={() => navigation.navigate('Confirm')}
      >
        <Text>Next</Text>
      </Pressable>
    </View>
  )
}

export { CreateCouple }
